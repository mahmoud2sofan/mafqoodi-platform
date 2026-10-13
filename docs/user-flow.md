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
5. System redirects the
