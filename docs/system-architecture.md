# Mafqoodi (مفقودي) - System Design & Architecture Specification

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Target:** Version 1.0 (Responsive Web Platform)  
**Architecture Pattern:** Modular Monolith (Clean / Hexagonal Architecture within Modules)

---

## 1. Executive Summary & Architectural Goals

Mafqoodi is an AI-assisted lost-and-found platform designed for universities and institutions in Palestine. It centralizes lost-and-found reporting, provides AI-assisted candidate matching, ensures rigorous ownership privacy, and provides institutional staff with end-to-end workflows for review, claim verification, and item return.

### Core Architectural Goals:

1. **Separation of Concerns (Modular Monolith):** Single deployable backend codebase with strictly bounded contexts to avoid premature microservice complexity while guaranteeing clean architectural boundaries.
2. **API-First Design:** Independent FastAPI REST API serving a Next.js responsive web frontend, completely reusable by future mobile clients (Flutter/React Native).
3. **Ironclad Privacy Isolation:** Absolute architectural separation between public report attributes and private ownership-verification secrets to prevent accidental data leaks.
4. **Advisory AI Pipeline:** AI matching engine acts solely as a decision-support and candidate-ranking service; it never makes authoritative decisions or bypasses human staff verification.
5. **Traceability & Auditability:** Comprehensive audit logging and strict state-machine enforcement for all report, claim, and handover lifecycle transitions.
6. **Bilingual & Responsive First:** Designed to support Arabic (RTL) and English (LTR) across mobile browsers, tablets, and desktop computers.

---

## 2. High-Level System Architecture

### 2.1 C4 Context Diagram

```mermaid
graph TD
    User["Registered User / Student"] -->|Uses Web Browser| WebApp["Mafqoodi Web App (Next.js)"]
    Guest["Guest Visitor"] -->|Browses & Searches| WebApp
    Staff["Lost & Found Staff"] -->|Moderates, Verifies, Returns| WebApp
    Admin["System Administrator"] -->|Configures, Audits, Manages| WebApp

    WebApp -->|HTTPS / REST API / JSON| Backend["Mafqoodi Core API (FastAPI)"]

    subgraph "Mafqoodi Platform Infrastructure"
        Backend -->|SQL / Async Pool| DB[(PostgreSQL 16 DB)]
        Backend -->|Blob Upload / Retrieval| Storage[("Object Storage / S3 / MinIO")]
        Backend -->|Async Task Trigger| Worker["Async Matching Engine (BackgroundTasks)"]
        Worker -->|Reads / Writes Matches| DB
        Worker -->|Reads Public Descriptions| Storage
    end
```

### 2.2 Container & Technology Stack

| Layer                | Component           | Technology                                                       | Rationale                                                                                                                         |
| -------------------- | ------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**         | Responsive Web App  | **Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS** | Server-side rendering for public pages/SEO, responsive layouts, rich component ecosystem, RTL support.                            |
| **Backend**          | Application Server  | **Python 3.11+, FastAPI, Pydantic v2, Uvicorn**                  | High performance, native async I/O, automatic OpenAPI docs, tight integration with Python AI/ML ecosystem.                        |
| **Data Access**      | ORM & Migrations    | **SQLAlchemy 2.0 (Async), Alembic**                              | Robust async database abstractions, schema migration management, enterprise-grade connection pooling.                             |
| **Primary Database** | Relational Database | **PostgreSQL 16**                                                | Relational integrity, ACID guarantees for claims/handovers, native Full-Text Search (tsvector), and `pgvector` / pg_trgm support. |
| **File Storage**     | Blob / Object Store | **MinIO (Dev/Staging) / AWS S3 (Prod) / Local Driver**           | Offloads binary storage from PostgreSQL. Pluggable storage abstraction for images and documents.                                  |
| **AI / NLP Engine**  | Matching Service    | **scikit-learn, sentence-transformers, RapidFuzz**               | Hybrid lexical + semantic embedding pipeline running asynchronously within backend workers.                                       |
| **Authentication**   | Auth Provider       | **JWT (Access + Refresh tokens) & HTTP-only cookies**            | Stateless authentication with secure cookie storage, CSRF protection, and Argon2id / bcrypt password hashing.                     |

---

## 3. Modular Monolith Architecture (Backend)

The backend follows Clean/Hexagonal Architecture within distinct functional domain modules:

```
backend/
├── app/
│   ├── core/                  # Cross-cutting concerns (config, security, database, errors)
│   ├── modules/
│   │   ├── auth/              # Registration, Login, JWT tokens, Passwords
│   │   ├── users/             # User accounts, Profiles, Admin user management
│   │   ├── catalog/           # Categories and Locations management
│   │   ├── reports/           # Lost and Found reports, Image upload handling
│   │   ├── claims/            # Claim submission, Review, Evidence verification
│   │   ├── matching/          # AI-assisted matching pipeline & scoring
│   │   ├── handovers/         # Return records, Official handover documentation
│   │   ├── notifications/     # In-app notification dispatch and management
│   │   └── audit/             # System audit logs and operational analytics
│   └── main.py                # FastAPI application entrypoint & middleware setup
```

### Module Boundary Dependency Rules:

1. **Modules do not query each other's database tables directly.** Cross-module data retrieval occurs via public service interfaces (e.g. `ReportsService` queries `CatalogService` to validate category existence).
2. **Domain Logic is Isolated from HTTP Transport:** API routers only handle request parsing, schema validation, and HTTP responses. Business logic resides in dedicated `services/` and `domain/` models.
3. **Zero Leaks of Sensitive Evidence:** The `reports` module separates public report representations from `report_private_details`. Public API endpoints never include private verification fields.

```mermaid
flowchart TD
    Router["FastAPI API Router (/api/v1/...)"] -->|Validates Input (Pydantic)| Service["Domain Service (Business Logic)"]
    Service -->|Checks Permissions & Roles| Security["Security & RBAC Guard"]
    Service -->|Executes DB Queries| Repo["Repository (SQLAlchemy Async)"]
    Service -->|Async Trigger| AI["Matching Engine Worker"]
    Service -->|Dispatches Events| Notif["Notification Service"]
    Service -->|Records State Changes| Audit["Audit Logger"]
    Repo --> DB[(PostgreSQL Database)]
```

---

## 4. Domain Models & Relational Database Schema

### 4.1 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ REPORT : creates
    USER ||--o{ CLAIM : submits
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ AUDIT_LOG : triggers

    CATEGORY ||--o{ REPORT : classifies
    LOCATION ||--o{ REPORT : occurs_at

    REPORT ||--o| REPORT_PRIVATE_DETAIL : has_sensitive_clues
    REPORT ||--o{ REPORT_IMAGE : contains
    REPORT ||--o{ MATCH : participates_in
    REPORT ||--o{ CLAIM : target_of

    CLAIM ||--o| RETURN_RECORD : concludes_with
    CLAIM ||--o{ CLAIM_EVIDENCE : contains

    STAFF_USER ||--o{ CLAIM : reviews
    STAFF_USER ||--o{ RETURN_RECORD : executes
```

### 4.2 Complete Database Table Definitions

#### `users`

| Column          | Type            | Constraints                      | Description                             |
| --------------- | --------------- | -------------------------------- | --------------------------------------- |
| `id`            | `UUID`          | PK, default: `gen_random_uuid()` | Unique user identifier                  |
| `email`         | `VARCHA1R(255)` | UNIQUE, NOT NULL, INDEX          | Normalized lowercase email address      |
| `password_hash` | `VARCHAR(255)`  | NOT NULL                         | Argon2id / bcrypt password hash         |
| `full_name`     | `VARCHAR(150)`  | NOT NULL                         | User's legal / display full name        |
| `phone_number`  | `VARCHAR(50)`   | NULLABLE                         | Contact telephone / mobile number       |
| `role`          | `VARCHAR(20)`   | NOT NULL, DEFAULT: `'USER'`      | Enum: `USER`, `STAFF`, `ADMIN`          |
| `status`        | `VARCHAR(20)`   | NOT NULL, DEFAULT: `'ACTIVE'`    | Enum: `ACTIVE`, `SUSPENDED`, `INACTIVE` |
| `created_at`    | `TIMESTAMPTZ`   | NOT NULL, DEFAULT: `NOW()`       | Timestamp created                       |
| `updated_at`    | `TIMESTAMPTZ`   | NOT NULL, DEFAULT: `NOW()`       | Timestamp last updated                  |

#### `categories`

| Column        | Type           | Constraints                      | Description                       |
| ------------- | -------------- | -------------------------------- | --------------------------------- |
| `id`          | `UUID`         | PK, default: `gen_random_uuid()` | Category identifier               |
| `name_ar`     | `VARCHAR(100)` | NOT NULL                         | Arabic name (e.g., إلكترونيات)    |
| `name_en`     | `VARCHAR(100)` | NOT NULL                         | English name (e.g., Electronics)  |
| `description` | `TEXT`         | NULLABLE                         | Category description              |
| `icon_name`   | `VARCHAR(50)`  | NULLABLE                         | UI icon identifier                |
| `is_active`   | `BOOLEAN`      | NOT NULL, DEFAULT: `TRUE`        | Whether available for new reports |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`       | Timestamp created                 |

#### `locations`

| Column        | Type           | Constraints                      | Description                                          |
| ------------- | -------------- | -------------------------------- | ---------------------------------------------------- |
| `id`          | `UUID`         | PK, default: `gen_random_uuid()` | Location identifier                                  |
| `name_ar`     | `VARCHAR(150)` | NOT NULL                         | Arabic location name (e.g., كلية الهندسة)            |
| `name_en`     | `VARCHAR(150)` | NOT NULL                         | English location name (e.g., Faculty of Engineering) |
| `campus_code` | `VARCHAR(50)`  | NOT NULL                         | Campus or building identifier                        |
| `description` | `TEXT`         | NULLABLE                         | Approximate location notes                           |
| `is_active`   | `BOOLEAN`      | NOT NULL, DEFAULT: `TRUE`        | Active status                                        |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`       | Timestamp created                                    |

#### `reports`

| Column               | Type           | Constraints                           | Description                                                                                                      |
| -------------------- | -------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `id`                 | `UUID`         | PK, default: `gen_random_uuid()`      | Unique report identifier                                                                                         |
| `creator_id`         | `UUID`         | FK -> `users(id)`, NOT NULL           | Author of the report                                                                                             |
| `report_type`        | `VARCHAR(10)`  | NOT NULL                              | Enum: `LOST`, `FOUND`                                                                                            |
| `title`              | `VARCHAR(200)` | NOT NULL, INDEX                       | Brief title describing the item                                                                                  |
| `public_description` | `TEXT`         | NOT NULL                              | Publicly visible item description                                                                                |
| `category_id`        | `UUID`         | FK -> `categories(id)`, NOT NULL      | Item category                                                                                                    |
| `location_id`        | `UUID`         | FK -> `locations(id)`, NOT NULL       | Location lost or found                                                                                           |
| `incident_date`      | `DATE`         | NOT NULL, INDEX                       | Date the item was lost or found                                                                                  |
| `incident_time`      | `TIME`         | NULLABLE                              | Approximate time                                                                                                 |
| `status`             | `VARCHAR(25)`  | NOT NULL, DEFAULT: `'PENDING_REVIEW'` | Enum: `PENDING_REVIEW`, `APPROVED`, `REJECTED`, `ACTIVE`, `CLAIM_IN_PROGRESS`, `RETURNED`, `CLOSED`, `WITHDRAWN` |
| `rejection_reason`   | `TEXT`         | NULLABLE                              | Reason provided by staff if rejected                                                                             |
| `is_public`          | `BOOLEAN`      | NOT NULL, DEFAULT: `FALSE`            | Set `TRUE` once approved by staff                                                                                |
| `created_at`         | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`            | Timestamp created                                                                                                |
| `updated_at`         | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`            | Timestamp updated                                                                                                |

#### `report_private_details` (Strict Privacy Isolation)

| Column          | Type           | Constraints                               | Description                               |
| --------------- | -------------- | ----------------------------------------- | ----------------------------------------- |
| `report_id`     | `UUID`         | PK, FK -> `reports(id)` ON DELETE CASCADE | 1-to-1 relationship with report           |
| `secret_marks`  | `TEXT`         | NULLABLE                                  | Unannounced markings, scratches, stickers |
| `serial_number` | `VARCHAR(100)` | NULLABLE                                  | Serial or IMEI number                     |
| `proof_notes`   | `TEXT`         | NULLABLE                                  | Internal ownership notes kept private     |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`                | Timestamp created                         |

#### `report_images`

| Column          | Type           | Constraints                           | Description                              |
| --------------- | -------------- | ------------------------------------- | ---------------------------------------- |
| `id`            | `UUID`         | PK, default: `gen_random_uuid()`      | Image record ID                          |
| `report_id`     | `UUID`         | FK -> `reports(id)` ON DELETE CASCADE | Associated report                        |
| `storage_key`   | `VARCHAR(500)` | NOT NULL                              | Object storage path / key                |
| `file_name`     | `VARCHAR(255)` | NOT NULL                              | Original sanitized file name             |
| `file_size`     | `INTEGER`      | NOT NULL                              | File size in bytes                       |
| `mime_type`     | `VARCHAR(50)`  | NOT NULL                              | Validated MIME type (`image/jpeg`, etc.) |
| `is_primary`    | `BOOLEAN`      | NOT NULL, DEFAULT: `FALSE`            | Main cover image                         |
| `display_order` | `INTEGER`      | NOT NULL, DEFAULT: `0`                | Order of presentation                    |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`            | Timestamp uploaded                       |

#### `matches`

| Column              | Type           | Constraints                      | Description                                                           |
| ------------------- | -------------- | -------------------------------- | --------------------------------------------------------------------- |
| `id`                | `UUID`         | PK, default: `gen_random_uuid()` | Match identifier                                                      |
| `lost_report_id`    | `UUID`         | FK -> `reports(id)`, NOT NULL    | Lost report candidate                                                 |
| `found_report_id`   | `UUID`         | FK -> `reports(id)`, NOT NULL    | Found report candidate                                                |
| `match_score`       | `NUMERIC(5,2)` | NOT NULL                         | Composite similarity score (0.00 to 100.00)                           |
| `factors_breakdown` | `JSONB`        | NOT NULL                         | Explanatory metrics (category, date, text, etc.)                      |
| `status`            | `VARCHAR(20)`  | NOT NULL, DEFAULT: `'SUGGESTED'` | Enum: `SUGGESTED`, `UNDER_REVIEW`, `CONFIRMED`, `REJECTED`, `EXPIRED` |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`       | Timestamp computed                                                    |
| `updated_at`        | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`       | Timestamp updated                                                     |

_Unique Index:_ `(lost_report_id, found_report_id)` ensures duplicate match pairs are not created.

#### `claims`

| Column              | Type          | Constraints                      | Description                                                                       |
| ------------------- | ------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| `id`                | `UUID`        | PK, default: `gen_random_uuid()` | Claim identifier                                                                  |
| `found_report_id`   | `UUID`        | FK -> `reports(id)`, NOT NULL    | Target found item report                                                          |
| `lost_report_id`    | `UUID`        | FK -> `reports(id)`, NULLABLE    | Optional claimant's lost report                                                   |
| `claimant_id`       | `UUID`        | FK -> `users(id)`, NOT NULL      | User making the claim                                                             |
| `proof_description` | `TEXT`        | NOT NULL                         | Claimant's proof of ownership statement                                           |
| `evidence_files`    | `JSONB`       | NULLABLE                         | Array of private evidence image storage keys                                      |
| `status`            | `VARCHAR(25)` | NOT NULL, DEFAULT: `'PENDING'`   | Enum: `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CANCELLED`, `COMPLETED` |
| `reviewed_by_id`    | `UUID`        | FK -> `users(id)`, NULLABLE      | Staff member evaluating the claim                                                 |
| `staff_notes`       | `TEXT`        | NULLABLE                         | Internal staff deliberation notes                                                 |
| `reviewed_at`       | `TIMESTAMPTZ` | NULLABLE                         | Review timestamp                                                                  |
| `created_at`        | `TIMESTAMPTZ` | NOT NULL, DEFAULT: `NOW()`       | Timestamp submitted                                                               |
| `updated_at`        | `TIMESTAMPTZ` | NOT NULL, DEFAULT: `NOW()`       | Timestamp updated                                                                 |

#### `return_records` (Handovers)

| Column                | Type           | Constraints                          | Description                                |
| --------------------- | -------------- | ------------------------------------ | ------------------------------------------ |
| `id`                  | `UUID`         | PK, default: `gen_random_uuid()`     | Handover record identifier                 |
| `claim_id`            | `UUID`         | FK -> `claims(id)`, UNIQUE, NOT NULL | Concluded claim                            |
| `report_id`           | `UUID`         | FK -> `reports(id)`, NOT NULL        | Returned found report                      |
| `recipient_id`        | `UUID`         | FK -> `users(id)`, NOT NULL          | Verified recipient                         |
| `staff_id`            | `UUID`         | FK -> `users(id)`, NOT NULL          | Staff member supervising handover          |
| `handover_date`       | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`           | Physical handover timestamp                |
| `verification_method` | `VARCHAR(100)` | NOT NULL                             | ID card check, private mark match, receipt |
| `handover_notes`      | `TEXT`         | NULLABLE                             | Confidential internal handover notes       |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`           | Record created                             |

#### `notifications`

| Column         | Type           | Constraints                        | Description                                                      |
| -------------- | -------------- | ---------------------------------- | ---------------------------------------------------------------- |
| `id`           | `UUID`         | PK, default: `gen_random_uuid()`   | Notification ID                                                  |
| `recipient_id` | `UUID`         | FK -> `users(id)`, NOT NULL, INDEX | Target user                                                      |
| `type`         | `VARCHAR(50)`  | NOT NULL                           | Enum: `REPORT_APPROVED`, `MATCH_SUGGESTED`, `CLAIM_UPDATE`, etc. |
| `title`        | `VARCHAR(200)` | NOT NULL                           | In-app notification title                                        |
| `message`      | `TEXT`         | NOT NULL                           | Notification body                                                |
| `entity_type`  | `VARCHAR(50)`  | NULLABLE                           | `REPORT`, `CLAIM`, `MATCH`                                       |
| `entity_id`    | `UUID`         | NULLABLE                           | Target entity UUID                                               |
| `is_read`      | `BOOLEAN`      | NOT NULL, DEFAULT: `FALSE`         | Read status                                                      |
| `created_at`   | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`         | Timestamp dispatched                                             |

#### `audit_logs`

| Column         | Type           | Constraints                      | Description                                    |
| -------------- | -------------- | -------------------------------- | ---------------------------------------------- |
| `id`           | `UUID`         | PK, default: `gen_random_uuid()` | Audit log identifier                           |
| `actor_id`     | `UUID`         | FK -> `users(id)`, NULLABLE      | Actor who initiated action (NULL for system)   |
| `action`       | `VARCHAR(100)` | NOT NULL                         | Action name (e.g., `REPORT_STATUS_CHANGE`)     |
| `entity_type`  | `VARCHAR(50)`  | NOT NULL                         | Target entity type (`REPORT`, `CLAIM`, `USER`) |
| `entity_id`    | `UUID`         | NOT NULL                         | Target entity UUID                             |
| `before_state` | `JSONB`        | NULLABLE                         | Previous state snapshot                        |
| `after_state`  | `JSONB`        | NULLABLE                         | New state snapshot                             |
| `ip_address`   | `VARCHAR(45)`  | NULLABLE                         | Client IP address                              |
| `created_at`   | `TIMESTAMPTZ`  | NOT NULL, DEFAULT: `NOW()`       | Timestamp executed                             |

---

## 5. Lifecycle State Machines & Rules

### 5.1 Report Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING_REVIEW: User Submits Report

    PENDING_REVIEW --> APPROVED: Staff Approves
    PENDING_REVIEW --> REJECTED: Staff Rejects (With Reason)

    APPROVED --> ACTIVE: Publicly Listed & Matching Triggered

    ACTIVE --> CLAIM_IN_PROGRESS: Valid Claim Under Review
    ACTIVE --> WITHDRAWN: Creator Withdraws

    CLAIM_IN_PROGRESS --> ACTIVE: Claim Rejected / Cancelled
    CLAIM_IN_PROGRESS --> RETURNED: Staff Confirms Handover

    RETURNED --> CLOSED: Archive & Link Permanent Records
    WITHDRAWN --> CLOSED
    REJECTED --> CLOSED
    CLOSED --> [*]
```

#### Transition Invariants:

1. Only reports in `APPROVED` or `ACTIVE` states are returned by public search/browse queries.
2. A report cannot be `WITHDRAWN` by a user if there is an active `CLAIM_IN_PROGRESS` without staff intervention.
3. When marked `RETURNED`, both the found report and the matched lost report transition to `RETURNED`, locking further edits or new claims.

### 5.2 Claim Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING: User Submits Claim

    PENDING --> UNDER_REVIEW: Staff Begins Verification
    PENDING --> CANCELLED: Claimant Cancels

    UNDER_REVIEW --> APPROVED: Ownership Evidence Verified
    UNDER_REVIEW --> REJECTED: Inadequate Proof (With Reason)

    APPROVED --> COMPLETED: Handover Executed (Return Record Created)

    REJECTED --> [*]
    CANCELLED --> [*]
    COMPLETED --> [*]
```

#### Transition Invariants:

1. Submitting a claim requires the target Found Report to be in `APPROVED` or `ACTIVE` status.
2. A user cannot claim their own found report.
3. Multiple users can submit claims against the same found report (`PENDING`), but only **one** claim can be `APPROVED` at a time.
4. Marking a claim `COMPLETED` automatically generates an immutable `return_record` and closes the associated reports.

---

## 6. AI-Assisted Matching Engine Architecture

The Matching Engine operates as an asynchronous pipeline triggered whenever a new Lost or Found report is approved by staff.

### 6.1 Multi-Stage Matching Pipeline

```mermaid
flowchart LR
    ReportApproved["Report Approved Event"] --> Filter["Stage 1: Blocking & Filtering"]
    Filter -->|Candidate Pool (Max 100)| Scoring["Stage 2: Multi-Factor Scoring"]
    Scoring --> Rank["Stage 3: Ranking & Thresholding"]
    Rank -->|Score >= 50%| Persist["Stage 4: Store Matches & Notify"]
```

#### Stage 1: Candidate Blocking & Filtering (SQL / Inverted Index)

To prevent $O(N^2)$ cross-product comparisons, candidates are filtered using high-recall heuristics:

- Complementary Type: If target is `LOST`, compare only against `FOUND` (and vice-versa).
- Target Status: Candidate must be `ACTIVE`.
- Category Compatibility: Candidate must belong to the same Category ID.
- Temporal Window: Incident dates must be within $\pm 30$ days of each other ($|date_{lost} - date_{found}| \le 30 \text{ days}$).

#### Stage 2: Multi-Factor Scoring Engine

For each candidate passing Stage 1, a composite score $S \in [0.0, 1.0]$ is computed:

$$S = w_{text} \cdot S_{text} + w_{loc} \cdot S_{loc} + w_{time} \cdot S_{time}$$

Where weights sum to $1.0$:

- $w_{text} = 0.50$ (Title & Public Description text similarity)
- $w_{loc} = 0.30$ (Location / Campus proximity)
- $w_{time} = 0.20$ (Date proximity)

1. **Text Similarity ($S_{text}$):**
   - Combines normalized token overlap (Jaccard / Token Set Ratio with Arabic stemming / normalization) and semantic embedding cosine similarity (e.g., using lightweight multilingual embeddings).
2. **Location Similarity ($S_{loc}$):**
   - Exact building match: $1.0$
   - Same campus / adjacent building: $0.6$
   - Different location / campus: $0.2$
3. **Temporal Decay ($S_{time}$):**
   - Gaussian time decay: $S_{time} = \exp\left(-\frac{\Delta t^2}{2 \sigma^2}\right)$ where $\sigma = 10 \text{ days}$, $\Delta t = |date_{lost} - date_{found}|$.

#### Stage 3: Ranking and Thresholding

- If $S \ge 0.50$ (50%), the pair is persisted in the `matches` table as `SUGGESTED`.
- Detailed scoring metrics are stored in `matches.factors_breakdown` (JSONB) to render human-readable explanations in the UI (e.g., "92% Match: Matching location, identical category, reported 2 days apart").

#### Stage 4: Safety & Advisory Rule

- **The AI Match Score is never proof of ownership.**
- The AI never triggers automated approvals or automated handovers.
- The score serves solely to surface high-priority candidates in staff and user dashboards.

---

## 7. REST API Design & Endpoints Specification

### 7.1 Global API Standards

- **Base URL:** `/api/v1`
- **Format:** JSON (`application/json`)
- **Standard Success Envelope:**

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 142
  }
}
```

- **Standard Error Envelope (RFC 7807 aligned):**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid report payload provided.",
    "details": [
      { "field": "incident_date", "issue": "Date cannot be in the future." }
    ]
  }
}
```

### 7.2 Core Endpoints Routing Table

| Method    | Endpoint                            | Auth Required |  Minimum Role  | Description                                    |
| --------- | ----------------------------------- | :-----------: | :------------: | ---------------------------------------------- |
| **POST**  | `/api/v1/auth/register`             |      No       |     Guest      | Register new user account                      |
| **POST**  | `/api/v1/auth/login`                |      No       |     Guest      | Authenticate credentials & issue JWT           |
| **POST**  | `/api/v1/auth/logout`               |      Yes      |      User      | Invalidate session / clear cookie              |
| **POST**  | `/api/v1/auth/refresh`              |      Yes      |      User      | Refresh access token                           |
| **GET**   | `/api/v1/users/me`                  |      Yes      |      User      | Retrieve current user profile                  |
| **PATCH** | `/api/v1/users/me`                  |      Yes      |      User      | Update personal profile details                |
| **GET**   | `/api/v1/catalog/categories`        |      No       |     Guest      | List active categories                         |
| **GET**   | `/api/v1/catalog/locations`         |      No       |     Guest      | List active campus locations                   |
| **GET**   | `/api/v1/reports`                   |      No       |     Guest      | Search and browse public reports (filtered)    |
| **GET**   | `/api/v1/reports/{id}`              |      No       |     Guest      | Get public report details (public fields only) |
| **POST**  | `/api/v1/reports`                   |      Yes      |      User      | Submit new Lost or Found report                |
| **GET**   | `/api/v1/reports/me`                |      Yes      |      User      | List user's own submitted reports              |
| **GET**   | `/api/v1/reports/{id}/private`      |      Yes      | Creator/Staff  | Get private ownership details                  |
| **PATCH** | `/api/v1/reports/{id}`              |      Yes      | Creator/Staff  | Edit eligible report                           |
| **POST**  | `/api/v1/reports/{id}/withdraw`     |      Yes      | Creator/Staff  | Withdraw own report                            |
| **POST**  | `/api/v1/reports/{id}/images`       |      Yes      | Creator/Staff  | Upload image for report                        |
| **GET**   | `/api/v1/matches`                   |      Yes      |   User/Staff   | List potential matches for user's reports      |
| **GET**   | `/api/v1/matches/{id}`              |      Yes      |   User/Staff   | View match details & breakdown                 |
| **POST**  | `/api/v1/claims`                    |      Yes      |      User      | Submit ownership claim for found report        |
| **GET**   | `/api/v1/claims/me`                 |      Yes      |      User      | List user's submitted claims                   |
| **GET**   | `/api/v1/claims/{id}`               |      Yes      | Claimant/Staff | Get claim status and details                   |
| **GET**   | `/api/v1/notifications`             |      Yes      |      User      | List in-app notifications                      |
| **PATCH** | `/api/v1/notifications/{id}/read`   |      Yes      |      User      | Mark notification as read                      |
| **GET**   | `/api/v1/staff/dashboard`           |      Yes      |     Staff      | Operational overview metrics                   |
| **GET**   | `/api/v1/staff/reports/pending`     |      Yes      |     Staff      | Reports moderation queue                       |
| **POST**  | `/api/v1/staff/reports/{id}/review` |      Yes      |     Staff      | Approve or reject submitted report             |
| **GET**   | `/api/v1/staff/claims/pending`      |      Yes      |     Staff      | Claims review queue                            |
| **POST**  | `/api/v1/staff/claims/{id}/review`  |      Yes      |     Staff      | Approve or reject claim                        |
| **POST**  | `/api/v1/staff/handovers`           |      Yes      |     Staff      | Record physical return & complete claim        |
| **GET**   | `/api/v1/admin/users`               |      Yes      |     Admin      | Search and manage all user accounts            |
| **PATCH** | `/api/v1/admin/users/{id}/status`   |      Yes      |     Admin      | Suspend or restore user account                |
| **PATCH** | `/api/v1/admin/users/{id}/role`     |      Yes      |     Admin      | Assign or revoke roles (RBAC)                  |
| **POST**  | `/api/v1/admin/categories`          |      Yes      |     Admin      | Create/edit/deactivate categories              |
| **POST**  | `/api/v1/admin/locations`           |      Yes      |     Admin      | Create/edit/deactivate locations               |
| **GET**   | `/api/v1/admin/audit-logs`          |      Yes      |     Admin      | Query system audit trails                      |
| **GET**   | `/api/v1/admin/analytics`           |      Yes      |  Staff/Admin   | System analytics & reporting metrics           |

---

## 8. Security, Privacy & Integrity Architecture

### 8.1 Authentication & RBAC Matrix

1. **Password Security:** Hashes computed via `Argon2id` (or `bcrypt` with work factor 12).
2. **Session Model:** Dual-token strategy:
   - Short-lived Access Token (15 mins) transmitted in `Authorization: Bearer <token>` or Secure HTTP-only SameSite cookie.
   - Long-lived Refresh Token (7 days) stored in Secure HTTP-only SameSite cookie.
3. **Role Enforcement:** FastAPI dependency injection (`Depends(require_role(["STAFF", "ADMIN"]))`). Backend checks role authorization on every protected route.

### 8.2 Ownership & IDOR Protection

- When accessing or modifying a resource (e.g. `/api/v1/reports/{id}`), the service layer validates:
  $$\text{IsAdmin} \lor \text{IsStaff} \lor (\text{resource.creator\_id} == \text{current\_user.id})$$
- Unmatched requests immediately return `403 Forbidden` or `404 Not Found` without disclosing record existence.

### 8.3 Data Leak Prevention & Privacy Isolation

- Distinct Pydantic schemas:
  - `ReportPublicOut`: Excludes `creator_id`, phone numbers, and all verification fields.
  - `ReportPrivateDetailsOut`: Accessible **only** by report creator, reviewing staff, or admin.
- API test suites include dedicated assertions checking that public serializers never contain private keys.

### 8.4 File Upload Hardening

1. **File Type Validation:** Verified via binary signature inspection (magic bytes), not client MIME header or file extension alone. Allowed types: `image/jpeg`, `image/png`, `image/webp`.
2. **File Size Limit:** Capped at 5 MB per image; maximum 3 images per report.
3. **Storage Sanitization:** Images are renamed with cryptographically random UUIDs (`{uuid4()}.{ext}`). EXIF metadata (containing GPS coordinates and camera serial numbers) is stripped prior to saving.

---

## 9. Frontend Architecture & Design (Next.js)

### 9.1 Application Directory Layout (App Router)

```
frontend/
├── src/
│   ├── app/
│   │   ├── (public)/                 # Publicly accessible routes
│   │   │   ├── page.tsx              # Homepage (FR-001)
│   │   │   ├── lost/page.tsx         # Lost items catalog
│   │   │   ├── found/page.tsx        # Found items catalog
│   │   │   ├── reports/[id]/page.tsx # Public report detail
│   │   │   ├── how-it-works/page.tsx # Educational guide
│   │   │   └── about/page.tsx        # About Mafqoodi
│   │   ├── (auth)/                   # Authentication flows
│   │   │   ├── login/page.tsx        # Login page
│   │   │   └── register/page.tsx     # Registration page
│   │   ├── (dashboard)/              # Authenticated user spaces
│   │   │   ├── my-reports/page.tsx   # User's reports
│   │   │   ├── report-item/page.tsx  # Create report wizard
│   │   │   ├── my-claims/page.tsx    # User's submitted claims
│   │   │   ├── matches/page.tsx      # User's suggested matches
│   │   │   ├── notifications/page.tsx# In-app notifications
│   │   │   └── profile/page.tsx      # Profile settings
│   │   ├── (staff)/                  # Staff workspaces
│   │   │   ├── staff/dashboard/      # Operational metrics
│   │   │   ├── staff/moderation/     # Pending reports queue
│   │   │   ├── staff/claims/         # Claims verification desk
│   │   │   └── staff/handovers/      # Handover execution
│   │   └── (admin)/                  # Administrative panel
│   │       ├── admin/users/          # User & role administration
│   │       ├── admin/categories/     # Category management
│   │       ├── admin/locations/      # Campus locations
│   │       └── admin/audit-logs/     # Audit trails
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # Base primitives (Button, Modal, Input)
│   │   ├── reports/                  # ReportCard, ReportForm, ImageUpload
│   │   ├── layout/                   # Header, Footer, Sidebar, Navigation
│   │   └── feedback/                 # Alerts, StatusBadge, Toast
│   ├── hooks/                        # Custom React hooks (useAuth, useReports)
│   ├── lib/                          # API clients (Axios/Fetch wrapper), utils
│   └── types/                        # TypeScript domain interfaces
```

### 9.2 Responsive & Bilingual (i18n / RTL) Strategy

- Built with Tailwind CSS supporting logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) instead of hardcoded `left`/`right`.
- Top-level `dir="rtl"` or `dir="ltr"` managed seamlessly based on current locale (Arabic default, English toggle).
- Mobile-first design:
  - Desktop: Multi-column tables, persistent sidebar navigation.
  - Mobile / Tablet: Bottom navigation bar, swipeable cards, responsive filter bottom-sheets.

---

## 10. Repository Layout & Multi-Project Structure

```
mafqoodi-platform/
├── backend/                  # FastAPI Application
│   ├── app/                  # Application source code
│   │   ├── core/
│   │   ├── modules/
│   │   └── main.py
│   ├── tests/                # Pytest unit & integration test suites
│   ├── alembic/              # Database migration scripts
│   ├── alembic.ini           # Alembic configuration
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend container configuration
│   └── .env.example          # Environment variables template
├── frontend/                 # Next.js Application
│   ├── src/                  # Next.js app source code
│   ├── public/               # Static assets & icons
│   ├── package.json          # Node dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.ts    # Tailwind styling configuration
│   ├── Dockerfile            # Frontend container configuration
│   └── .env.example          # Frontend environment template
├── docs/                     # Project Specifications & Design Docs
│   ├── requirements.md       # Software Requirements Specification (SRS)
│   ├── user-flow.md          # Comprehensive user flows
│   └── system-architecture.md# This System Design & Architecture Document
├── docker-compose.yml        # Local development orchestration (DB, MinIO, API, Web)
├── .gitignore                # Global git ignore configuration
└── README.md                 # Project overview and runbook
```

---

## 11. Testing & Quality Assurance Strategy

1. **Backend Unit & Integration Tests (Pytest):**
   - Authentication & JWT token issuance/expiry.
   - RBAC permissions (verifying User cannot access Staff routes).
   - Report creation, status machine transitions, and invalid transition rejection.
   - Absolute privacy tests (verifying public endpoints omit private fields).
   - Matching engine score computation against known benchmark scenarios.
2. **API Contract Verification:**
   - OpenAPI schema automated validation against Pydantic models.
3. **Frontend Integration Tests (Playwright / Vitest):**
   - Critical path: Guest browse -> Register -> Report lost item -> Staff approve -> Match suggested -> Submit claim -> Complete handover.
4. **Static Analysis & Linting:**
   - Backend: `ruff`, `mypy`.
   - Frontend: `eslint`, `prettier`, `tsc --noEmit`.

---

## 12. Deployment & Operational Runbook

```mermaid
flowchart TD
    Client["Client (Browser)"] --> ReverseProxy["Reverse Proxy (Nginx / Caddy)"]
    ReverseProxy -->|/api/*| FastAPIApp["FastAPI Server (Uvicorn / Gunicorn)"]
    ReverseProxy -->|/*| NextJSApp["Next.js Node Server"]
    FastAPIApp --> PG[(PostgreSQL 16)]
    FastAPIApp --> MinIO[("Object Storage (MinIO / S3)")]
```

### Environment Variables Matrix:

- `DATABASE_URL`: Asynchronous PostgreSQL connection string (`postgresql+asyncpg://user:pass@host:5432/mafqoodi`).
- `SECRET_KEY`: Cryptographically random 256-bit key for JWT signing.
- `STORAGE_BACKEND`: `local` or `s3`.
- `STORAGE_BUCKET_NAME`: Target S3 / MinIO bucket for report images.
- `CORS_ORIGINS`: Allowed frontend origins (e.g. `http://localhost:3000`).

---

_This specification serves as the architectural blueprint for Mafqoodi Version 1._
