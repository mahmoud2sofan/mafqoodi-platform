# Mafqoodi - Software Requirements Specification (SRS)

## 1. Project Overview

Mafqoodi is a responsive, web-based lost-and-found platform designed primarily for universities and institutions in Palestine.

The platform provides a centralized website where users can report lost and found items, browse public reports, search and filter items, receive AI-assisted potential matches, submit claims, and track the return process. Authorized lost-and-found staff can manage reports, review claims, verify ownership, record returned items, and monitor activity through a staff dashboard. Administrators can manage users, roles, categories, locations, and system settings.

**Version 1 is a web application accessed through a web browser.** It will not include a native Android or iOS application. The website will use responsive design to remain usable on desktop computers, laptops, tablets, and mobile browsers.

The backend will expose a REST API independently of the frontend. This allows the web frontend to communicate with the backend through defined API endpoints and leaves open the possibility of additional clients in future versions.

## 2. Project Goals

1. Centralize lost-and-found reports in one platform.
2. Make reporting lost and found items simple and accessible.
3. Allow users to search and filter existing reports.
4. Help users discover potential matches between lost and found items.
5. Use AI-assisted techniques to suggest potential matches.
6. Reduce the manual workload of lost-and-found staff.
7. Provide a structured claim and ownership-verification process.
8. Provide staff with a centralized management dashboard.
9. Provide administrators with system-management tools.
10. Provide useful statistics about lost-and-found activity.
11. Protect user privacy and sensitive ownership information.
12. Establish an architecture that can support additional institutions in future versions.

## 3. System Scope

### 3.1 Included in Version 1

- Public homepage
- Public lost-and-found browsing
- Search, filtering, and sorting
- User registration and authentication
- User profiles
- Lost-item reports
- Found-item reports
- Report image uploads
- Report management
- AI-assisted potential matching
- Match suggestions
- Claim requests
- Claim review and ownership verification
- Item-return management
- In-application notifications
- Staff dashboard
- Report moderation
- Claim management
- User and role management
- Category management
- Location management
- Basic analytics
- Role-based access control
- Responsive web interface
- REST API
- Automated tests for important functionality
- API documentation

### 3.2 Out of Scope for Version 1

- Native Android application
- Native iOS application
- Flutter mobile application
- Direct user-to-user messaging
- Payment processing
- Delivery or shipping
- Real-time GPS tracking
- Facial recognition or facial identification
- Training a large AI model from scratch
- Multi-country deployment
- Advanced university system integrations
- Complex recommendation systems
- QR-code-based item identification
- SMS notifications
- Browser push notifications
- Progressive Web App (PWA) installation features

These features may be considered for future versions. Using a mobile browser to access the responsive website is supported in Version 1 and is not the same as providing a native mobile application.

## 4. Actors and Permissions

### 4.1 Guest

A visitor who uses Mafqoodi without signing in.

A guest can:
- View the homepage
- Browse public reports
- Search and filter reports
- Sort report results
- View public report details
- Register
- Log in

A guest cannot:
- Create reports
- Submit claims
- Access private information
- Manage reports
- Access staff or administrator dashboards
- View private match information or claim-verification details

### 4.2 Registered User

A registered user can:
- Log in and log out
- View and manage permitted profile information
- Create lost-item reports
- Create found-item reports
- View their own reports
- Edit eligible reports
- Withdraw eligible reports
- View potential matches made available to them
- Submit claims for eligible found items
- Track claim status
- View their own notifications
- View their own report and claim activity

A registered user must not access another user's private account information, private reports, or claim-verification details unless explicitly authorized.

### 4.3 Lost-and-Found Staff

A staff member authorized to operate an institution's lost-and-found process can:
- Access the staff dashboard
- Review submitted reports
- Approve or reject reports
- Provide rejection reasons
- Edit reports when authorized and necessary
- Review claims
- Evaluate ownership evidence
- Approve or reject claims
- Record item handovers
- Update eligible report and claim statuses
- Review potential matches
- View operational statistics
- Manage categories and locations when granted the relevant permission

Staff permissions shall be limited to the operations assigned to their role and institutional scope.

### 4.4 System Administrator

An administrator can:
- Access the administration dashboard
- View and manage user accounts
- Manage staff accounts
- Assign and revoke authorized roles
- Manage reports and claims
- Manage categories and locations
- View system analytics
- View activity logs
- Suspend and restore user accounts
- Manage system-level settings

Administrative actions shall be subject to authorization checks and recorded in activity logs when appropriate.

## 5. Functional Requirements

### 5.1 Public Homepage and Navigation

**FR-001: Public Homepage**  
The system shall provide a public homepage accessible without authentication. It shall include Mafqoodi branding, public navigation, a search entry point, lost-items and found-items sections, information about the platform, login and registration options, and a call-to-action for reporting an item. Actions requiring authentication shall direct guests to the appropriate sign-in or registration page.

**FR-002: Public Navigation**  
The system shall provide navigation to publicly accessible pages, including Home, Lost Items, Found Items, How It Works, About, Login, and Register. Navigation shall adapt to the available screen width.

### 5.2 Guest Browsing

**FR-003: Browse Reports**  The system shall allow guests to browse reports approved for public display.

**FR-004: Search Reports**  The system shall allow guests to search public reports using keywords such as item title, public description, category, and location.

**FR-005: Filter Reports**  The system shall allow guests to filter public reports by report type, category, location, date or date range, and publicly visible status where appropriate.

**FR-006: Sort Reports**  The system shall allow guests to sort report results by newest, oldest, or relevance.

**FR-007: View Report Details**  The system shall allow guests to view public report details, including item title, category, public description, approximate location, date lost or found, approved public images, report type, and an appropriate public status. Private contact details, ownership clues, claim information, internal staff notes, and other sensitive information shall not appear in public pages or public API responses.

### 5.3 Registration

**FR-008: Register Account**  The system shall allow visitors to create an account using full name, email address, password, and password confirmation. Email verification may be added as a separate requirement if selected for Version 1.

**FR-009: Validate Registration**  The system shall validate required registration fields and return clear validation errors when input is missing or invalid.

**FR-010: Unique Email**  The system shall prevent multiple accounts from using the same email address, using a case-normalized comparison where appropriate.

**FR-011: Password Security**  The system shall securely hash passwords using an appropriate password-hashing algorithm. Passwords shall never be stored as plain text or logged.

### 5.4 Authentication and Authorization

**FR-012: Login**  The system shall allow registered users to authenticate using their email address and password.

**FR-013: Logout**  The system shall allow authenticated users to log out and invalidate or clear the applicable authentication state.

**FR-014: Authentication State**  The system shall maintain authentication securely using an approach appropriate to the selected web architecture. Authentication credentials shall not be exposed in URLs or logs.

**FR-015: Protected Pages and Endpoints**  The system shall prevent unauthenticated users from accessing protected web pages and API endpoints.

**FR-016: Role-Based Access Control**  The system shall enforce permissions based on the authenticated user's role. Hiding a button or page in the frontend shall not replace authorization checks on the backend.

### 5.5 User Profile

**FR-017: View Profile**  Authenticated users shall be able to view their own profile information.

**FR-018: Edit Profile**  Users shall be able to update permitted profile information, which may include full name, phone number, profile image if supported, and password. Sensitive account changes shall require appropriate validation and security controls.

**FR-019: Account Status**  The system shall prevent suspended users from performing restricted actions. The restrictions and any permitted read-only access shall be defined by the account-status policy.

### 5.6 Lost-Item Reports

**FR-020: Create Lost Report**  Authenticated users shall be able to submit a lost-item report containing item title, category, public description, date lost, approximate location, optional images, and optional identifying information kept private for ownership verification. The system shall distinguish public description fields from private ownership-verification fields.

**FR-021: Validate Lost Report**  The system shall validate required fields, field lengths, dates, category, location, and uploaded images before accepting a report.

**FR-022: Store Lost Report**  The system shall store each accepted lost report and assign it a unique identifier.

**FR-023: Lost Report Status**  A lost report may use Draft (if draft saving is implemented), Pending Review, Approved, Rejected, Potential Match, Claim in Progress, Returned, Closed, or Withdrawn. The system shall define and enforce valid status transitions. A potential match suggestion alone shall not mark a report as returned or confirm ownership.

### 5.7 Found-Item Reports

**FR-024: Create Found Report**  Authenticated users shall be able to submit a found-item report containing item title, category, public description, date found, approximate location, optional images, and optional identifying information kept private for ownership verification.

**FR-025: Validate Found Report**  The system shall validate required fields, field lengths, dates, category, location, and uploaded images before accepting a report.

**FR-026: Store Found Report**  The system shall store each accepted found report and assign it a unique identifier.

**FR-027: Found Report Status**  A found report may use Draft (if draft saving is implemented), Pending Review, Approved, Rejected, Potential Match, Claim in Progress, Returned, Closed, or Withdrawn. The system shall enforce valid status transitions and prevent incompatible operations, such as accepting a new claim for an item that is no longer available.

### 5.8 Report Images

**FR-028: Upload Images**  Users shall be able to upload images when creating or editing eligible reports through the web interface.

**FR-029: Validate Images**  The system shall validate allowed file types, maximum file size, maximum number of images per report, and file content rather than trusting the filename or declared MIME type alone.

**FR-030: Store Images**  The system shall store report images using appropriate file or object storage. Large image binaries shall not be stored directly in the relational database; the database may store metadata and storage references. Unauthorized access to private images shall be prevented, and only images approved for public viewing shall be displayed publicly.

### 5.9 Report Management

**FR-031: View Own Reports**  Authenticated users shall be able to view reports they created.

**FR-032: View Report Status**  Users shall be able to view the current status of their own reports and any user-appropriate status explanation.

**FR-033: Edit Report**  Users shall be able to edit their own reports only when the current status and policy allow editing. Important edits may require staff re-review.

**FR-034: Withdraw Report**  Users shall be able to withdraw eligible reports. The system shall prevent withdrawal when it would violate an active claim or return process, unless an authorized staff member resolves the situation.

**FR-035: Report History**  The system shall maintain important report status changes, including previous status, new status, timestamp, and responsible actor where applicable.

### 5.10 AI-Assisted Matching

**FR-036: Identify Potential Matches**  The system shall identify potential matches between eligible, approved lost and found reports.

**FR-037: Matching Factors**  The matching process may consider item category, title, public description, keywords, item attributes, approximate location, date lost or found, and image similarity if implemented. Private ownership-verification information shall not be exposed through matching results. Any internal use of private information must be justified and access-controlled.

**FR-038: Match Score**  The system shall calculate a similarity or match score for candidate matches when supported by the selected approach. A match score represents a ranking or similarity estimate, not a calibrated probability of ownership unless separately validated.

**FR-039: Match Suggestions**  The system shall present relevant potential matches to authorized staff and, where appropriate, to involved users. Each user shall only see information they are authorized to access.

**FR-040: AI Advisory Role**  The matching system shall provide suggestions and shall not independently confirm ownership or authorize an item handover. Ownership shall be assessed through the claim-verification process by authorized staff.

**FR-041: Match Status**  A potential match may use Suggested, Under Review, Confirmed as a Useful Match, Rejected, or Expired. A confirmed match does not by itself prove the claimant owns the item.

### 5.11 Claim Process

**FR-042: Submit Claim**  An authenticated user shall be able to submit a claim for an eligible found item or a match-related item according to the claim policy.

**FR-043: Claim Information**  The system may request additional item details, unique characteristics, approximate time lost, approximate location, and proof of ownership when appropriate. Claim-verification details shall be private and visible only to the claimant and authorized staff.

**FR-044: Claim Status**  A claim may use Pending, Under Review, Approved, Rejected, Cancelled, or Completed. The system shall enforce valid transitions between claim statuses.

**FR-045: Claim Review**  Authorized staff shall be able to review submitted claims and the information necessary to evaluate them.

**FR-046: Claim Decision**  Authorized staff shall be able to approve or reject claims after reviewing the available evidence. A decision shall not be based solely on an AI match score.

**FR-047: Claim History**  Users shall be able to view the status and status history of their own claims without seeing internal staff notes or another user's private information.

### 5.12 Item Return

**FR-048: Mark Item as Returned**  Authorized staff shall be able to mark an item as returned after the handover has been completed and required verification steps have been satisfied.

**FR-049: Record Return**  The system shall record the item or report, related claim, claimant or recipient, responsible staff member, return date, return status, and optional internal notes. Internal notes shall not be exposed to unauthorized users.

**FR-050: Complete Claim**  After a successful handover is recorded, the related claim shall be marked Completed.

**FR-051: Close Report**  After a successful handover, the related report or reports shall be updated and closed according to the report lifecycle rules. Related reports shall remain linked for traceability.

### 5.13 In-Application Notifications

**FR-052: Generate Notifications**  The system shall generate in-application notifications for important events, including report approval or rejection, potential match availability, claim submission, claim status changes, and item return. Notifications shall not include sensitive evidence or information the recipient is not authorized to see.

**FR-053: View Notifications**  Authenticated users shall be able to view their own notifications through the web application.

**FR-054: Mark Notification as Read**  Users shall be able to mark their own notifications as read. Email, SMS, and browser push notifications are outside Version 1 unless explicitly added later.

### 5.14 Staff Dashboard

**FR-055: Staff Dashboard**  The system shall provide a dedicated web dashboard for authorized staff.

**FR-056: Dashboard Overview**  The dashboard shall display operational summaries, which may include total reports, pending reports, lost reports, found reports, potential matches, pending claims, and returned items. Data shall be restricted to the staff member's authorized scope.

**FR-057: Review Reports**  Staff shall be able to view and review reports awaiting moderation.

**FR-058: Approve Reports**  Staff shall be able to approve reports that satisfy the institution's reporting rules.

**FR-059: Reject Reports**  Staff shall be able to reject reports and provide a reason that can be shown to the report owner when appropriate.

**FR-060: Manage Reports**  Authorized staff shall be able to search, filter, view, update eligible reports, and change report statuses according to their permissions.

### 5.15 Claim Management

**FR-061: View Claims**  Staff shall be able to view claims requiring review and other claims within their authorized scope.

**FR-062: Inspect Claim**  Authorized staff shall be able to inspect the claimant information necessary for review, claimed item, claim information, related lost report when available, related found report, potential match information, and relevant claim history.

**FR-063: Approve Claim**  Staff shall be able to approve a claim after completing the required ownership verification.

**FR-064: Reject Claim**  Staff shall be able to reject a claim when available evidence is insufficient or inconsistent with the ownership-verification policy. A reason shall be recorded.

**FR-065: Record Decision**  The system shall record the staff member responsible for a claim decision, decision date, outcome, and appropriate reason.

### 5.16 User and Role Management

**FR-066: View Users**  Administrators shall be able to view registered users within their authorized administrative scope.

**FR-067: Search Users**  Administrators shall be able to search users using permitted account fields.

**FR-068: View User Details**  Administrators shall be able to view account information required for administration, while access to sensitive information remains restricted.

**FR-069: Suspend User**  Administrators shall be able to suspend user accounts.

**FR-070: Restore User**  Administrators shall be able to restore suspended accounts.

**FR-071: Manage Roles**  Administrators shall be able to assign and revoke authorized roles. The system shall prevent unauthorized role escalation.

### 5.17 Category Management

**FR-072: Manage Categories**  Authorized staff or administrators shall be able to create, edit, and deactivate categories. Example categories include Electronics, Documents, Clothing, Accessories, Keys, Bags, Books, and Other. Deactivated categories shall not be selectable for new reports, while historical data shall be preserved.

### 5.18 Location Management

**FR-073: Manage Locations**  Authorized staff or administrators shall be able to create, edit, and deactivate locations. Examples include buildings, classrooms, library, cafeteria, parking areas, and campus entrances. The initial version may use institution-defined locations rather than real-time GPS coordinates.

### 5.19 Search and Filtering

**FR-074: Keyword Search**  The system shall allow users to search reports using keywords supported by public or authorized fields.

**FR-075: Filter by Type**  The system shall allow users to filter reports by Lost or Found.

**FR-076: Filter by Category**  The system shall allow users to filter reports by category.

**FR-077: Filter by Location**  The system shall allow users to filter reports by location.

**FR-078: Filter by Date**  The system shall allow users to filter reports by date or date range.

**FR-079: Filter by Status**  Authorized users shall be able to filter reports by statuses appropriate to their role. Guests shall only see public statuses.

**FR-080: Sort Results**  The system shall support sorting by newest, oldest, and relevance. Search and filtering shall respect authorization and privacy rules.

### 5.20 Administration

**FR-081: Admin Dashboard**  Administrators shall have access to a dedicated web-based administration dashboard.

**FR-082: System Overview**  The dashboard shall provide system-level summaries, including total users, total reports, lost reports, found reports, total claims, pending claims, and returned items.

**FR-083: Activity Monitoring**  The system shall maintain important administrative and security-related activity records. Access to logs shall be restricted to authorized roles.

### 5.21 Analytics

**FR-084: Report Analytics**  Authorized staff shall be able to view report analytics, including lost reports over time, found reports over time, reports by category, reports by location, successful returns, and pending reports.

**FR-085: Claim Analytics**  Authorized staff shall be able to view claim analytics, including total claims, approved claims, rejected claims, pending claims, and average claim-processing time.

**FR-086: Matching Analytics**  The system may provide analytics for potential matches generated, matches accepted for review, matches rejected, and successful returns associated with matches. Analytics shall not expose private claim evidence or unnecessary personal information.

## 6. Non-Functional Requirements

### 6.1 Performance

**NFR-001** The system shall provide acceptable response times for normal operations under the expected workload.  
**NFR-002** The system shall use pagination when retrieving large numbers of reports, claims, users, or other collections.  
**NFR-003** The system shall optimize image delivery, including appropriate image sizes and loading behavior.  
**NFR-004** The frontend shall avoid unnecessary API requests, and the backend shall avoid unnecessary database queries where practical.

### 6.2 Security

**NFR-005** Passwords shall be securely hashed using an appropriate password-hashing algorithm.  
**NFR-006** Protected API endpoints shall require authentication.  
**NFR-007** The backend shall enforce role-based authorization for protected operations.  
**NFR-008** Users shall only access resources and perform actions they are authorized to access or perform.  
**NFR-009** The backend shall validate user input regardless of frontend validation.  
**NFR-010** The system shall use appropriate protections against common web vulnerabilities, including SQL injection, cross-site scripting (XSS), cross-site request forgery (CSRF) where applicable, broken access control, malicious file uploads, credential exposure, and insecure direct object references.  
**NFR-011** Sensitive information shall not be exposed through public pages, API responses, URLs, application logs, or error messages.

### 6.3 Privacy

**NFR-012** The system shall minimize personal information displayed publicly.  
**NFR-013** Private user information shall only be accessible to the user and authorized personnel who need it for their responsibilities.  
**NFR-014** Claim-verification information shall not be publicly visible.  
**NFR-015** The system shall not expose sensitive ownership information through public reports or match suggestions.

### 6.4 Availability and Reliability

**NFR-016** The production system should be available continuously, subject to the chosen hosting environment and planned maintenance.  
**NFR-017** The system shall handle temporary service failures gracefully and avoid exposing internal implementation details in error responses.  
**NFR-018** The system shall provide meaningful, user-appropriate error messages when an operation fails.  
**NFR-019** Important data shall be backed up according to the deployment environment, with a documented restoration procedure before production use.

### 6.5 Usability

**NFR-020** The interface shall be understandable to users with limited technical experience.  
**NFR-021** The system shall provide clear feedback after important actions.  
**NFR-022** Validation errors shall clearly explain what needs to be corrected without exposing sensitive implementation details.  
**NFR-023** The system shall use consistent navigation, labels, statuses, and terminology across public pages, user pages, and dashboards.

### 6.6 Responsive Web Design

**NFR-024** The web application shall adapt to desktop, laptop, tablet, and mobile-browser screen sizes.  
**NFR-025** Core functionality shall remain usable on small screens without requiring a native mobile application.  
**NFR-026** Forms, report lists, report details, and dashboards shall remain usable on supported mobile browsers. Dense staff tables may use responsive layouts or horizontal scrolling where necessary.

### 6.7 Accessibility

**NFR-027** The interface should follow basic accessibility practices, including clear form labels, keyboard navigation, appropriate color contrast, alternative text for meaningful images, clear error messages, visible focus states, and semantic page structure.

### 6.8 Maintainability

**NFR-028** The system shall use a modular architecture with clear responsibilities.  
**NFR-029** Frontend and backend responsibilities shall remain separated.  
**NFR-030** Business logic shall not be tightly coupled to the frontend or HTTP request-handling layer.  
**NFR-031** The REST API shall be documented, including request schemas, response schemas, authentication requirements, and error responses.  
**NFR-032** The codebase shall follow consistent naming, formatting, and project-structure conventions.  
**NFR-033** Important business rules and security-sensitive behavior shall be covered by automated tests.

### 6.9 Scalability and Extensibility

**NFR-034** The backend architecture shall support growth in users and reports without requiring a complete redesign.  
**NFR-035** The data model should allow support for multiple institutions in a future version, even if Version 1 initially serves one institution or a limited pilot.  
**NFR-036** The API shall remain independent of the web frontend so future clients may reuse the backend without replacing its core business logic.

## 7. Core Data Entities

These are conceptual entities, not a finalized database schema. Their fields, relationships, constraints, and lifecycle rules shall be refined during database design.

### 7.1 User
- ID
- Full name
- Email
- Password hash
- Phone number, optional
- Role or role assignments
- Account status
- Created date
- Updated date

### 7.2 Report
- ID
- Creator user ID
- Report type: Lost or Found
- Title
- Public description
- Category ID
- Location ID
- Date lost or found
- Status
- Created date
- Updated date

Private ownership-verification details shall be stored separately or otherwise protected by explicit access controls.

### 7.3 Category
- ID
- Name
- Description
- Status

### 7.4 Location
- ID
- Name
- Description
- Status
- Institution ID, if multi-institution support is implemented

### 7.5 Image
- ID
- Report ID
- Storage reference or URL
- File type
- Created date

### 7.6 Match
- ID
- Lost report ID
- Found report ID
- Match score
- Match status
- Created date
- Updated date, if needed

### 7.7 Claim
- ID
- Related found report ID
- Claimant user ID
- Claim information
- Status
- Reviewed by staff ID, when reviewed
- Review date, when reviewed
- Created date
- Updated date

The relationship between a claim, a lost report, and a found report shall be clarified during domain and database design.

### 7.8 Notification
- ID
- Recipient user ID
- Type
- Message or structured notification data
- Read status
- Created date

### 7.9 Return Record
- ID
- Related claim ID
- Responsible staff ID
- Return date
- Status
- Internal notes, optional

### 7.10 Activity Log
- ID
- Actor user ID, when applicable
- Action
- Entity type
- Entity ID
- Timestamp
- Relevant metadata, excluding secrets and unnecessary sensitive information

### 7.11 Ownership Verification Details

Private verification details may include additional item characteristics or evidence supplied during a claim. Access shall be restricted to the claimant and authorized staff. These details shall not be included in public report responses.

## 8. Report Lifecycle

A typical report lifecycle is:

**Draft (optional) → Pending Review → Approved → Active / Matching → Claim in Progress → Returned → Closed**

A report may also be Rejected during review or Withdrawn by its owner when permitted.

Additional rules:
- Draft is only required if draft saving is implemented.
- A report becomes publicly discoverable only when it is approved and marked for public display.
- A potential match is a relationship or suggestion between reports, not necessarily a report status by itself.
- A match suggestion shall not automatically confirm ownership or trigger a return.
- Valid status transitions shall be defined and enforced by the backend.
- The system shall preserve status history for important transitions.

## 9. Claim Lifecycle

A typical claim lifecycle is:

**Pending → Under Review → Approved → Return in Progress → Completed**

A claim may also be Rejected or Cancelled when permitted.

Additional rules:
- Approval means the claim has passed the required ownership-verification review; it does not necessarily mean the item has already been handed over.
- A claim becomes Completed after the return is recorded.
- Only authorized staff may make final verification decisions and record a completed handover.
- Valid claim-status transitions shall be enforced by the backend.

## 10. Access Control Matrix

The following matrix describes baseline permissions. All actions remain subject to resource ownership, institutional scope, account status, and backend authorization rules.

| Feature | Guest | User | Staff | Admin |
|---|:---:|:---:|:---:|:---:|
| Browse public reports | Yes | Yes | Yes | Yes |
| Search public reports | Yes | Yes | Yes | Yes |
| Filter public reports | Yes | Yes | Yes | Yes |
| View public report details | Yes | Yes | Yes | Yes |
| Create reports | No | Yes | Yes, if permitted | Yes, if permitted |
| Manage own reports | No | Yes | Yes, if permitted | Yes, if permitted |
| Submit claims | No | Yes | Yes, if acting as a claimant and permitted | Yes, if acting as a claimant and permitted |
| View own claims | No | Yes | Yes | Yes |
| View own notifications | No | Yes | Yes | Yes |
| Review reports | No | No | Yes | Yes |
| Approve/reject reports | No | No | Yes | Yes |
| Review claims | No | No | Yes | Yes |
| Approve/reject claims | No | No | Yes | Yes |
| Record item returns | No | No | Yes | Yes |
| View staff dashboard | No | No | Yes | Yes |
| Manage users | No | No | No, unless explicitly delegated | Yes |
| Manage roles | No | No | No | Yes |
| Manage categories | No | No | Yes, if permitted | Yes |
| Manage locations | No | No | Yes, if permitted | Yes |
| View operational analytics | No | No | Yes | Yes |
| Manage system settings | No | No | No | Yes |

## 11. API Architecture

The backend shall expose a REST API implemented with FastAPI. The API shall be independent of the frontend and shall use consistent request validation, response formats, status codes, and error handling.

Example endpoint directions include:

```http
GET    /api/reports
GET    /api/reports/{report_id}
POST   /api/reports
PATCH  /api/reports/{report_id}
DELETE /api/reports/{report_id}
```

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

```http
GET    /api/users/me
PATCH  /api/users/me
```

```http
GET    /api/matches
GET    /api/matches/{match_id}
```

```http
POST   /api/claims
GET    /api/claims
GET    /api/claims/{claim_id}
PATCH  /api/claims/{claim_id}
```

```http
GET    /api/notifications
PATCH  /api/notifications/{notification_id}
```

```http
GET    /api/staff/reports
GET    /api/staff/claims
GET    /api/admin/users
GET    /api/admin/analytics
```

These are illustrative endpoint examples, not a final API contract. Exact routes, methods, permissions, request schemas, response schemas, and status codes shall be established during implementation. The API shall not expose private ownership-verification fields through public report endpoints. Endpoints that change statuses or perform staff actions shall enforce permissions on the backend.

## 12. Technical Architecture Direction

The system shall follow a client-server architecture and use a modular monolith for the initial version unless a documented technical reason supports a different approach.

### 12.1 Frontend

Planned technologies:
- Next.js
- React
- TypeScript
- Tailwind CSS

The frontend shall provide the public website, authenticated user pages, staff dashboard, and administration dashboard. It shall communicate with the backend through the REST API and shall not directly access the database.

### 12.2 Backend

Planned technologies:
- Python
- FastAPI
- Pydantic for request and response validation
- SQLAlchemy for database access

The backend shall contain API routes, business logic, authorization rules, data-access components, and integration points for image storage and matching functionality. Business rules shall be kept separate from frontend code.

### 12.3 Database

Planned database: **PostgreSQL**.

The final schema, relationships, constraints, indexes, and migration approach shall be designed after the main domain rules are reviewed.

### 12.4 AI-Assisted Matching

The initial matching implementation shall use manageable Python-based techniques appropriate to the available data and project scope. It may begin with rule-based or text-similarity methods before adding more advanced machine-learning or image-similarity methods.

The project does not require training a large model from scratch. Match scores shall be treated as decision-support signals rather than proof of ownership.

### 12.5 Image Storage

Report images shall be stored in appropriate file or object storage. The database shall store references and metadata rather than large image binaries. The storage approach shall be selected before implementing uploads.

### 12.6 Development and Deployment

Planned engineering practices and tools include:
- Git and GitHub for version control
- Environment variables for configuration and secrets
- Docker for reproducible development or deployment where appropriate
- Automated tests
- API documentation
- Production deployment
- Basic application logging and monitoring

Secrets, credentials, local environment files, and private uploaded data shall not be committed to the public repository.

### 12.7 Architecture Boundaries

Version 1 is a web application. The backend API shall not depend on the frontend's internal implementation. A future mobile application may reuse the API, but mobile-specific implementation is not part of Version 1.

The exact technology choices may be revisited if a documented project requirement or constraint justifies a change.

## 13. Development Priority

Development shall proceed in small, verifiable steps. The following phases describe the intended order, not a requirement to implement every feature at once.

### Phase 1: Foundation
- Review and finalize requirements and user flows
- Confirm repository structure and development conventions
- Set up the backend project with FastAPI
- Set up the frontend project
- Configure environment variables
- Establish database connectivity and migrations
- Define API error-handling conventions
- Add basic automated tests

### Phase 2: Authentication and Profiles
- Registration
- Login and logout
- Authentication state
- Authorization and roles
- User profile viewing and editing
- Account-status restrictions

### Phase 3: Reports
- Create lost reports
- Create found reports
- Browse approved reports
- Search and filtering
- Report details
- Image uploads
- Edit and withdraw reports
- Report moderation and status history

### Phase 4: Staff Operations and Claims
- Staff dashboard
- Report review and moderation
- Claim submission
- Claim review and ownership verification
- Claim status history
- Item-return recording
- Report closure after return

### Phase 5: AI-Assisted Matching
- Candidate generation
- Initial similarity calculation
- Match score and explanation where feasible
- Match suggestions
- Staff review of suggested matches
- Tests for matching behavior and edge cases

### Phase 6: Notifications
- In-application notifications for report events
- Match notifications
- Claim notifications
- Return notifications
- Mark notifications as read

### Phase 7: Administration and Analytics
- User and role administration
- Category management
- Location management
- Administrative activity logs
- Report statistics
- Claim and return statistics
- Matching statistics where meaningful

### Phase 8: Testing and Deployment
- Backend unit and integration tests
- Frontend tests for critical flows
- API tests
- Authorization and privacy tests
- File-upload security tests
- Responsive testing across supported browsers and screen sizes
- Deployment configuration
- Backup and restoration checks
- Basic monitoring and operational documentation

## 14. Version 1 Definition of Done

Mafqoodi Version 1 shall be considered complete when:

- Guests can access the website without an account.
- Guests can browse, search, and filter public lost-and-found reports.
- Visitors can register, log in, and log out.
- Users can manage permitted profile information.
- Users can create lost and found reports.
- Users can upload valid report images.
- Users can view and manage their own reports according to status rules.
- The system can generate potential lost-and-found matches.
- Match scores are not treated as proof of ownership.
- Users can submit claims for eligible items.
- Authorized staff can review, approve, or reject reports.
- Authorized staff can review claims and record verification decisions.
- Authorized staff can record completed item returns.
- Users can view relevant in-application notifications.
- Administrators can manage users and roles.
- Authorized staff or administrators can manage categories and locations.
- Role-based access control is enforced by the backend.
- Private ownership information is protected.
- The website is responsive and usable on desktop and mobile browsers.
- The REST API is documented.
- Important business rules and security-sensitive operations have automated tests.
- The application can be configured and deployed to a production environment.
- Deployment and configuration secrets are not committed to the repository.

## 15. Future Features

Possible future features include:
- Native Flutter mobile application for Android and iOS
- Progressive Web App (PWA) capabilities
- Browser push notifications
- Email and SMS notifications
- QR-code-based item identification
- More advanced image similarity
- Improved AI-assisted matching
- Multi-institution support and institution-specific dashboards
- University authentication or single sign-on (SSO)
- University system integrations
- Automated item categorization
- Public API access for approved integrations
- Advanced analytics

These features are not part of Version 1 unless the scope is formally revised.
