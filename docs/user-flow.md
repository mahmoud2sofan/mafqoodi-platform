# Mafqoodi - User Flows

## 1. Document Purpose and Scope

This document describes the main user journeys for Mafqoodi Version 1.

Mafqoodi Version 1 is a **responsive web application** accessed through a web browser. It supports desktop computers, laptops, tablets, and mobile browsers. A native Android, iOS, or Flutter application is not part of Version 1.

The frontend communicates with the backend through a REST API. The backend is responsible for authentication, authorization, validation, business rules, status transitions, data access, and privacy enforcement.

### Shared Rules

- Guests may browse only reports approved for public display and the public fields of those reports.
- Users must be authenticated to create reports, submit claims, manage their reports, or access private account information.
- Users may manage only their own reports and claims, except where staff or administrator permissions explicitly allow otherwise.
- Staff and administrators may perform only actions authorized by their roles and institutional scope.
- Backend authorization is required for every protected operation. Hiding a frontend control is not sufficient.
- Private ownership-verification details, internal notes, and sensitive personal information must not be exposed in public report pages or public API responses.
- AI-generated match scores are similarity or ranking signals. They do not prove ownership and must not independently approve claims or trigger item handovers.
- Status changes must follow valid transitions enforced by the backend.
- Important status changes and administrative decisions must be recorded for traceability.
- Version 1 includes in-application notifications. Email, SMS, and browser push notifications are future options unless the project scope changes.
- Exact data fields, API endpoints, and technical implementation details are defined in the Software Requirements Specification (SRS) and API contract.

---

## 2. Browse as Guest

**Actor:** Guest

**Goal:** Browse publicly available lost and found reports without creating an account.

### Preconditions

- The visitor is not authenticated.
- Public reports may or may not be available.

### Main Flow

1. Guest opens Mafqoodi in a web browser.
2. System displays the public homepage.
3. Guest selects Lost Items or Found Items.
4. System displays reports approved for public display.
5. Guest may search reports.
6. Guest may apply filters.
7. Guest may sort results.
8. Guest selects a report.
9. System displays only the report details permitted for public viewing.

### Alternative Flows

**No Results**

1. Guest searches or applies filters.
2. System finds no matching public reports.
3. System displays a "No results found" message.
4. Guest may change the search or filters.

**Protected Action**

1. Guest attempts to create a report or submit a claim.
2. System explains that authentication is required.
3. System directs the guest to Login or Register.
4. After successful authentication, the user returns to the intended page when appropriate.

**Report Not Publicly Available**

1. Guest attempts to open a report that is pending, rejected, withdrawn, or otherwise unavailable for public viewing.
2. System does not reveal protected report details.
3. System displays an appropriate unavailable message or redirects the guest to the public reports page.

---

## 3. Register Account

**Actor:** Guest

**Goal:** Create a Mafqoodi account.

### Main Flow

1. Guest selects Register.
2. System displays the registration form.
3. Guest enters their full name.
4. Guest enters their email address.
5. Guest enters a password.
6. Guest confirms the password.
7. Guest submits the form.
8. System validates the required fields.
9. System checks whether the email is already registered.
10. System securely hashes the password.
11. System creates the account with the default Registered User role and an active account status.
12. System either authenticates the user or redirects them to Login, according to the configured registration flow.
13. System displays the appropriate user page.

### Alternative Flows

**Invalid Input**

1. Guest submits incomplete or invalid information.
2. System displays validation errors.
3. Guest corrects the information and submits again.

**Email Already Exists**

1. Guest submits an email already associated with an account.
2. System displays an account-exists message.
3. Guest may proceed to Login.

**Passwords Do Not Match**

1. Guest enters different passwords.
2. System displays a password-mismatch error.
3. Guest corrects the passwords.

**Registration Failure**

1. Account creation fails.
2. System displays a safe error message.
3. System does not leave a partially created account.

---

## 4. Login

**Actor:** Registered User / Lost-and-Found Staff / Administrator

**Goal:** Authenticate and access the pages permitted for the account.

### Main Flow

1. User opens Login.
2. User enters their email address.
3. User enters their password.
4. User submits the form.
5. System validates the credentials.
6. System checks the account status.
7. System establishes an authenticated session using the configured secure web-authentication approach.
8. System identifies the user's role and permissions.
9. System redirects the user to the intended page or an appropriate landing page.

### Alternative Flows

**Invalid Credentials**

1. User submits incorrect credentials.
2. System rejects the login.
3. System displays a generic authentication error.
4. User may try again.

**Suspended Account**

1. User submits valid credentials.
2. System detects that the account is suspended.
3. System denies access to restricted functionality.
4. System displays an appropriate account-status message.

**Insufficient Permissions**

1. User logs in successfully.
2. User attempts to access a staff or administrator page without the required permission.
3. System denies access.
4. System directs the user to an authorized page.

---

## 5. Logout

**Actor:** Authenticated User

### Main Flow

1. User opens the account menu.
2. User selects Logout.
3. System invalidates or ends the authenticated session.
4. System clears the relevant client-side authentication state.
5. System redirects the user to the public homepage or login screen.

---

## 6. Create Lost Report

**Actor:** Authenticated User

**Goal:** Report an item lost by the user.

### Main Flow

1. User navigates to Report Lost Item.
2. System displays the lost report submission form.
3. User enters title, category, approximate location, date lost, and public description.
4. User optionally enters private ownership verification details (e.g., unique scratch, serial number, internal markings).
5. User optionally uploads up to 3 clear photos of the item.
6. User submits the report.
7. System validates all required fields, date constraints, and image payloads.
8. System stores the report in `PENDING_REVIEW` status and records private verification details in isolated storage.
9. System notifies lost-and-found staff of the new pending submission.
10. System redirects the user to their reports dashboard with a confirmation message.

---

## 7. Create Found Report

**Actor:** Authenticated User

**Goal:** Report an item found by the user to help locate the owner.

### Main Flow

1. User navigates to Report Found Item.
2. System displays the found report submission form.
3. User enters title, category, approximate campus location, date found, and public description.
4. User optionally enters private item marks kept secret from public view to test claimant legitimacy.
5. User optionally uploads photos of the found item.
6. User submits the report.
7. System validates inputs and uploads photos securely.
8. System saves the report with status `PENDING_REVIEW`.
9. System notifies staff for moderation.
10. System displays a confirmation page instructing user on physical item handover to campus lost-and-found office if required.

---

## 8. Review & Moderate Reports

**Actor:** Lost-and-Found Staff

**Goal:** Verify and approve/reject reports before they become public.

### Main Flow

1. Staff opens the Staff Dashboard and navigates to Pending Reports.
2. System displays the queue of unapproved submissions.
3. Staff selects a report to review details, images, and description.
4. **Approval:**
   - Staff confirms the report meets community standards.
   - Staff clicks "Approve".
   - System updates status to `APPROVED` / `ACTIVE`, making it publicly searchable.
   - System triggers the background AI matching engine to evaluate potential matches.
   - System notifies the report creator that their report is live.
5. **Rejection:**
   - Staff determines the report violates guidelines (e.g. spam, inappropriate image, duplicate).
   - Staff clicks "Reject" and provides a mandatory reason.
   - System updates status to `REJECTED`.
   - System notifies the user with the rejection rationale.

---

## 9. AI Matching & Match Review

**Actor:** Authenticated User / Lost-and-Found Staff

**Goal:** Discover and evaluate potential pairings between lost and found items.

### Main Flow

1. Background AI Matching worker calculates composite similarity scores ($S \ge 50\%$) for newly approved reports.
2. System creates records in the `matches` table with factor breakdowns (category, location, temporal proximity, text similarity).
3. System dispatches in-app match notifications to involved users and staff.
4. User or staff navigates to Potential Matches.
5. System displays candidate pairs side-by-side with match scores and contributing factors.
6. User or staff reviews public details. Private ownership clues remain masked.
7. If the item appears to be theirs, the user initiates a Claim.

---

## 10. Submit Claim

**Actor:** Authenticated User (Claimant)

**Goal:** Claim ownership of an active found item.

### Preconditions

- User is logged in.
- Target found item report has status `APPROVED` or `ACTIVE`.
- Claimant is not the creator of the found report.

### Main Flow

1. User views the found item details or match suggestion and clicks "Claim Item".
2. System displays the claim form.
3. User enters private ownership evidence (e.g. detailed contents, passcode lock type, identifying marks, purchase receipt notes).
4. User optionally uploads supporting proof images.
5. User submits the claim.
6. System validates the input, transitions report status to `CLAIM_IN_PROGRESS` if appropriate, and creates a `PENDING` claim.
7. System notifies institutional staff of the incoming claim.
8. System confirms submission to the claimant.

---

## 11. Review Claim & Ownership Verification

**Actor:** Lost-and-Found Staff

**Goal:** Authenticate the claimant's proof of ownership before releasing an item.

### Main Flow

1. Staff accesses Pending Claims from the staff dashboard.
2. Staff selects a claim to inspect claimant information, target found report, claimant's evidence, and private details submitted by the finder.
3. Staff evaluates evidence consistency:
   - Compares claimant's secret description against the physical item or finder's private notes.
4. **Decision:**
   - **Approve Claim:** Evidence matches. Staff approves claim, transitioning status to `APPROVED`. System notifies claimant with handover instructions.
   - **Reject Claim:** Evidence does not match or is fraudulent. Staff enters a rejection explanation and clicks "Reject". System marks claim `REJECTED`, returns report status to `ACTIVE` (allowing other claims), and notifies claimant.

---

## 12. Record Physical Item Return (Handover)

**Actor:** Lost-and-Found Staff

**Goal:** Formally hand over the item and record final completion.

### Preconditions

- Claim has been `APPROVED`.
- Claimant is physically present at the lost-and-found office with verified government/student ID.

### Main Flow

1. Staff opens the approved claim record.
2. Staff confirms claimant identity in person.
3. Staff executes physical handover and selects "Mark as Returned".
4. Staff enters verification method (e.g., "Student ID checked and unique lock pattern verified").
5. System creates an immutable `return_record`.
6. System updates claim status to `COMPLETED`.
7. System updates related found report (and linked lost report, if any) to `RETURNED` / `CLOSED`.
8. System dispatches completion notifications and writes to the audit log.

---

## 13. Administration & Governance

**Actor:** System Administrator

### Main Flow

1. Administrator logs into the Admin Dashboard.
2. **User Management:** Admin views all accounts, searches by name/email, assigns/revokes `STAFF` or `ADMIN` roles, or suspends/restores accounts.
3. **Category & Location Management:** Admin creates, updates, or deactivates campus locations and item categories.
4. **Audit & Analytics:** Admin inspects system audit logs (actor, action, timestamp, entity diffs) and monitors institutional metrics (return rate, resolution time, volume over time).

---

## 14. Core Mafqoodi Lifecycle Flow

$$\text{Browse} \longrightarrow \text{Report} \longrightarrow \text{Staff Moderation} \longrightarrow \text{AI Matching} \longrightarrow \text{Claim} \longrightarrow \text{Verification} \longrightarrow \text{Handover} \longrightarrow \text{Closure}$$

The AI matching engine assists in candidate discovery and ranking, while authorized staff strictly control claim approvals, privacy protection, and physical item handovers.

