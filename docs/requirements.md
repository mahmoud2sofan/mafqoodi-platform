# Mafqoodi - Software Requirements Specification

## 1. Project Overview

Mafqoodi is a web-based lost-and-found platform designed primarily for universities and institutions in Palestine.

The system provides a centralized platform where users can report lost and found items, browse existing reports, search and filter items, receive AI-assisted potential matches, submit claims, and track the return process.

Authorized staff can manage reports, review claims, verify ownership, manage returned items, and monitor lost-and-found activity through a dedicated dashboard.

Administrators can manage users, staff accounts, categories, locations, roles, and system-level settings.

The first version of Mafqoodi will be developed as a responsive web application. The backend will use an API-based architecture so that a mobile application can be developed in the future without replacing the core backend.

---

## 2. Project Goals

The main goals of Mafqoodi are:

1. Centralize lost-and-found reports in one platform.
2. Make reporting lost and found items simple and accessible.
3. Allow users to search and filter existing reports.
4. Help users discover potential matches between lost and found items.
5. Use AI to assist with identifying potential matches.
6. Reduce the manual workload of lost-and-found staff.
7. Provide a structured claim and verification process.
8. Provide staff with a centralized management dashboard.
9. Provide administrators with system management tools.
10. Provide useful statistics about lost-and-found activity.
11. Protect user privacy and sensitive information.
12. Build a scalable architecture that can support additional institutions in the future.

---

## 3. System Scope

### 3.1 Included in Version 1

Version 1 shall include:

- Public homepage
- Public lost-and-found browsing
- Search and filtering
- User registration and authentication
- User profiles
- Lost item reports
- Found item reports
- Report images
- Report management
- AI-assisted matching
- Match suggestions
- Claim requests
- Claim verification
- Item return management
- Notifications
- Staff dashboard
- Report moderation
- Claim management
- User management
- Categories
- Locations
- Basic analytics
- Role-based access control
- Responsive web design
- REST API

### 3.2 Out of Scope for Version 1

The following features are not required for the initial version:

- Native Android application
- Native iOS application
- Direct user-to-user messaging
- Payment processing
- Delivery or shipping
- Real-time GPS tracking
- Facial recognition
- Facial identification
- Training a large AI model from scratch
- Multi-country deployment
- Advanced university system integrations
- Complex recommendation systems

These features may be considered for future versions.

---

## 4. Actors

### 4.1 Guest

A visitor who uses Mafqoodi without authentication.

The guest can:

- View the homepage
- Browse public reports
- Search reports
- Filter reports
- View public report details
- Register
- Log in

The guest cannot:

- Create reports
- Submit claims
- Access private information
- Manage reports
- Access staff or administrator dashboards

### 4.2 Registered User

A registered user who can report lost or found items and manage their own activity.

The user can:

- Log in
- Log out
- Manage their profile
- Create lost reports
- Create found reports
- View their reports
- Edit eligible reports
- Withdraw eligible reports
- View potential matches
- Submit claims
- Track claim status
- View notifications
- View their activity

### 4.3 Lost and Found Staff

A staff member responsible for operating the institution's lost-and-found system.

The staff member can:

- Access the staff dashboard
- Review reports
- Approve reports
- Reject reports
- Edit reports when necessary
- Review claims
- Verify ownership
- Approve claims
- Reject claims
- Mark items as returned
- Manage report statuses
- Review potential matches
- View operational statistics

### 4.4 System Administrator

The administrator manages the overall system.

The administrator can:

- Manage users
- Manage staff accounts
- Manage roles
- Manage reports
- Manage claims
- Manage categories
- Manage locations
- View system analytics
- View activity logs
- Suspend users
- Restore users
- Manage system settings

---

# 5. Functional Requirements

## 5.1 Public Homepage

### FR-001: Public Homepage

The system shall provide a public homepage accessible without authentication.

The homepage shall provide:

- Mafqoodi branding
- Navigation
- Search functionality
- Lost items section
- Found items section
- Information about the platform
- Login option
- Registration option
- Report item call-to-action

### FR-002: Public Navigation

The system shall provide navigation to publicly accessible pages, including:

- Home
- Lost Items
- Found Items
- How It Works
- About
- Login
- Register

---

## 5.2 Guest Browsing

### FR-003: Browse Reports

The system shall allow guests to browse publicly available lost and found reports.

### FR-004: Search Reports

The system shall allow guests to search reports using keywords such as:

- Item title
- Description
- Category
- Location

### FR-005: Filter Reports

The system shall allow guests to filter reports by:

- Report type
- Category
- Location
- Date
- Status

### FR-006: Sort Reports

The system shall allow guests to sort reports by:

- Newest
- Oldest
- Relevance

### FR-007: View Report Details

The system shall allow guests to view public report details.

Public information may include:

- Item title
- Category
- Description
- Approximate location
- Date lost or found
- Images
- Report type
- Current status

Private information shall not be displayed publicly.

---

## 5.3 Registration

### FR-008: Register Account

The system shall allow visitors to create an account.

Registration shall require:

- Full name
- Email address
- Password
- Password confirmation

### FR-009: Validate Registration

The system shall validate all required registration fields.

### FR-010: Unique Email

The system shall prevent multiple accounts from using the same email address.

### FR-011: Password Security

The system shall securely hash user passwords before storing them.

Passwords shall never be stored as plain text.

---

## 5.4 Authentication

### FR-012: Login

The system shall allow registered users to log in using their email and password.

### FR-013: Logout

The system shall allow authenticated users to log out securely.

### FR-014: Authentication State

The system shall maintain the authenticated user's session securely.

### FR-015: Protected Pages

The system shall prevent unauthenticated users from accessing protected pages.

### FR-016: Role-Based Access

The system shall restrict functionality according to the authenticated user's role.

---

## 5.5 User Profile

### FR-017: View Profile

Users shall be able to view their profile information.

### FR-018: Edit Profile

Users shall be able to update permitted profile information.

Editable information may include:

- Full name
- Phone number
- Profile image
- Password

### FR-019: Account Status

The system shall prevent suspended users from performing restricted actions.

---

## 5.6 Lost Item Reports

### FR-020: Create Lost Report

Authenticated users shall be able to create a lost-item report.

The report shall contain:

- Item title
- Category
- Description
- Date lost
- Approximate location
- Images
- Additional identifying information

### FR-021: Validate Lost Report

The system shall validate required fields before submitting a lost report.

### FR-022: Store Lost Report

The system shall store the report and assign it a unique identifier.

### FR-023: Lost Report Status

A lost report may have the following statuses:

- Draft
- Pending Review
- Approved
- Rejected
- Matched
- Claim in Progress
- Returned
- Closed
- Withdrawn

---

## 5.7 Found Item Reports

### FR-024: Create Found Report

Authenticated users shall be able to create a found-item report.

The report shall contain:

- Item title
- Category
- Description
- Date found
- Approximate location
- Images
- Additional identifying information

### FR-025: Validate Found Report

The system shall validate required fields before submitting a found report.

### FR-026: Store Found Report

The system shall store the report and assign it a unique identifier.

### FR-027: Found Report Status

A found report may have the following statuses:

- Draft
- Pending Review
- Approved
- Rejected
- Matched
- Claim in Progress
- Returned
- Closed
- Withdrawn

---

## 5.8 Report Images

### FR-028: Upload Images

Users shall be able to upload images when creating or editing eligible reports.

### FR-029: Validate Images

The system shall validate:

- File type
- File size
- Number of uploaded images

### FR-030: Store Images

The system shall store uploaded images securely using appropriate object or file storage.

Large image files shall not be stored directly inside the relational database.

---

## 5.9 Report Management

### FR-031: View Own Reports

Authenticated users shall be able to view reports they created.

### FR-032: View Report Status

Users shall be able to view the current status of their reports.

### FR-033: Edit Report

Users shall be able to edit their own reports when the current status allows editing.

### FR-034: Withdraw Report

Users shall be able to withdraw eligible reports.

### FR-035: Report History

The system shall maintain important status changes associated with reports.

---

## 5.10 AI-Assisted Matching

### FR-036: Identify Potential Matches

The system shall identify potential matches between approved lost and found reports.

### FR-037: Matching Factors

The matching system may consider:

- Item category
- Item title
- Description
- Keywords
- Item attributes
- Location
- Date
- Image similarity

### FR-038: Match Score

The system shall calculate a similarity or match score for potential matches.

### FR-039: Match Suggestions

The system shall present potential matches to relevant users and authorized staff.

### FR-040: AI Advisory Role

The AI system shall provide suggestions rather than automatically confirming ownership.

Final ownership verification shall be performed through the claim process.

### FR-041: Match Status

A potential match may have the following statuses:

- Suggested
- Under Review
- Confirmed
- Rejected
- Expired

---

## 5.11 Claim Process

### FR-042: Submit Claim

An authenticated user shall be able to submit a claim for an available found item.

### FR-043: Claim Information

The system may require information to help verify ownership.

Examples include:

- Additional item details
- Unique characteristics
- Approximate time the item was lost
- Approximate location
- Proof of ownership when appropriate

### FR-044: Claim Status

A claim may have the following statuses:

- Pending
- Under Review
- Approved
- Rejected
- Cancelled
- Completed

### FR-045: Claim Review

Authorized staff shall be able to review submitted claims.

### FR-046: Claim Decision

Authorized staff shall be able to approve or reject claims.

### FR-047: Claim History

Users shall be able to view the status and history of their claims.

---

## 5.12 Item Return

### FR-048: Mark Item as Returned

Authorized staff shall be able to mark an item as returned after the handover is completed.

### FR-049: Record Return

The system shall record:

- Item
- Related claim
- User
- Staff member
- Return date
- Return status
- Optional notes

### FR-050: Complete Claim

After successful return, the related claim shall be marked as completed.

### FR-051: Close Report

After successful return, the related report shall be updated and closed.

---

## 5.13 Notifications

### FR-052: Generate Notifications

The system shall generate notifications for important events, including:

- Report approved
- Report rejected
- Potential match found
- Claim submitted
- Claim approved
- Claim rejected
- Item returned

### FR-053: View Notifications

Authenticated users shall be able to view their notifications.

### FR-054: Mark Notification as Read

Users shall be able to mark notifications as read.

---

## 5.14 Staff Dashboard

### FR-055: Staff Dashboard

The system shall provide a dedicated dashboard for authorized staff.

### FR-056: Dashboard Overview

The dashboard shall display:

- Total reports
- Pending reports
- Lost reports
- Found reports
- Potential matches
- Pending claims
- Returned items

### FR-057: Review Reports

Staff shall be able to review submitted reports.

### FR-058: Approve Reports

Staff shall be able to approve reports.

### FR-059: Reject Reports

Staff shall be able to reject reports and provide a rejection reason.

### FR-060: Manage Reports

Staff shall be able to:

- Search reports
- Filter reports
- View reports
- Update eligible reports
- Change report status

---

## 5.15 Claim Management

### FR-061: View Claims

Staff shall be able to view claims requiring review.

### FR-062: Inspect Claim

Staff shall be able to inspect:

- Claiming user
- Claimed item
- Claim information
- Related lost report
- Related found report
- Potential match information

### FR-063: Approve Claim

Staff shall be able to approve a claim after successful verification.

### FR-064: Reject Claim

Staff shall be able to reject a claim when ownership cannot be verified.

### FR-065: Record Decision

The system shall record the staff member responsible for the decision and the decision date.

---

## 5.16 User Management

### FR-066: View Users

Administrators shall be able to view registered users.

### FR-067: Search Users

Administrators shall be able to search users.

### FR-068: View User Details

Administrators shall be able to view permitted account information.

### FR-069: Suspend User

Administrators shall be able to suspend user accounts.

### FR-070: Restore User

Administrators shall be able to restore suspended accounts.

### FR-071: Manage Roles

Administrators shall be able to assign authorized roles.

---

## 5.17 Category Management

### FR-072: Manage Categories

Authorized staff or administrators shall be able to:

- Create categories
- Edit categories
- Deactivate categories

Example categories include:

- Electronics
- Documents
- Clothing
- Accessories
- Keys
- Bags
- Books
- Other

---

## 5.18 Location Management

### FR-073: Manage Locations

Authorized staff or administrators shall be able to:

- Create locations
- Edit locations
- Deactivate locations

Examples include:

- Buildings
- Classrooms
- Library
- Cafeteria
- Parking areas
- Campus entrances

---

## 5.19 Search and Filtering

### FR-074: Keyword Search

The system shall allow users to search reports using keywords.

### FR-075: Filter by Type

The system shall allow users to filter between:

- Lost
- Found

### FR-076: Filter by Category

The system shall allow users to filter reports by category.

### FR-077: Filter by Location

The system shall allow users to filter reports by location.

### FR-078: Filter by Date

The system shall allow users to filter reports by date or date range.

### FR-079: Filter by Status

Authorized users shall be able to filter reports by status where appropriate.

### FR-080: Sort Results

The system shall support sorting by:

- Newest
- Oldest
- Relevance

---

## 5.20 Administration

### FR-081: Admin Dashboard

Administrators shall have access to a system administration dashboard.

### FR-082: System Overview

The dashboard shall provide:

- Total users
- Total reports
- Lost reports
- Found reports
- Total claims
- Pending claims
- Returned items

### FR-083: Activity Monitoring

The system shall maintain important administrative activity records.

---

## 5.21 Analytics

### FR-084: Report Analytics

Authorized staff shall be able to view:

- Lost reports over time
- Found reports over time
- Reports by category
- Reports by location
- Successful returns
- Pending reports

### FR-085: Claim Analytics

Authorized staff shall be able to view:

- Total claims
- Approved claims
- Rejected claims
- Pending claims
- Average claim processing time

### FR-086: Matching Analytics

The system may provide:

- Potential matches generated
- Confirmed matches
- Rejected matches
- Successful returns resulting from matches

---

# 6. Non-Functional Requirements

## 6.1 Performance

### NFR-001

The system shall provide acceptable response times for normal operations.

### NFR-002

The system shall use pagination when retrieving large numbers of reports.

### NFR-003

The system shall optimize image loading.

### NFR-004

The system shall avoid unnecessary API requests.

---

## 6.2 Security

### NFR-005

Passwords shall be securely hashed.

### NFR-006

Protected API endpoints shall require authentication.

### NFR-007

The system shall enforce role-based authorization.

### NFR-008

Users shall only be able to access resources they are authorized to access.

### NFR-009

The system shall validate and sanitize user input.

### NFR-010

The system shall protect against common web vulnerabilities, including:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Broken access control
- Malicious file uploads

### NFR-011

Sensitive information shall not be exposed through public reports or API responses.

---

## 6.3 Privacy

### NFR-012

The system shall minimize personal information displayed publicly.

### NFR-013

Private user information shall only be accessible to authorized users and staff.

### NFR-014

Claim verification information shall not be publicly visible.

### NFR-015

The system shall not expose sensitive ownership information through public match suggestions.

---

## 6.4 Availability and Reliability

### NFR-016

The production system should be available continuously.

### NFR-017

The system shall handle temporary service failures gracefully.

### NFR-018

The system shall provide meaningful error messages when an operation fails.

### NFR-019

Important data shall be backed up according to the deployment environment.

---

## 6.5 Usability

### NFR-020

The interface shall be simple enough for users with limited technical experience.

### NFR-021

The system shall provide clear feedback after important actions.

### NFR-022

Validation errors shall clearly explain what the user needs to correct.

### NFR-023

The system shall use consistent navigation and terminology.

---

## 6.6 Responsive Design

### NFR-024

The web application shall be responsive.

It shall support:

- Desktop
- Laptop
- Tablet
- Mobile browser

### NFR-025

Core functionality shall remain usable on small screens.

### NFR-026

Forms shall be usable on mobile browsers.

---

## 6.7 Accessibility

### NFR-027

The interface should follow basic accessibility practices.

The system should provide:

- Clear form labels
- Keyboard navigation
- Appropriate color contrast
- Alternative text for meaningful images
- Clear error messages
- Visible focus states

---

## 6.8 Maintainability

### NFR-028

The system shall use a modular architecture.

### NFR-029

Frontend and backend responsibilities shall remain separated.

### NFR-030

Business logic shall not be tightly coupled to the user interface.

### NFR-031

The API shall be documented.

### NFR-032

The codebase shall follow consistent naming and project structure conventions.

---

## 6.9 Scalability

### NFR-033

The backend architecture shall support increasing numbers of users and reports.

### NFR-034

The database design shall allow the system to support multiple institutions in future versions.

### NFR-035

The API architecture shall allow future clients such as mobile applications to use the same backend.

---

# 7. Core Data Entities

## 7.1 User

- ID
- Full name
- Email
- Password hash
- Phone number
- Role
- Account status
- Created date
- Updated date

## 7.2 Report

- ID
- User ID
- Report type
- Title
- Description
- Category ID
- Location ID
- Date lost/found
- Status
- Created date
- Updated date

## 7.3 Category

- ID
- Name
- Description
- Status

## 7.4 Location

- ID
- Name
- Description
- Status

## 7.5 Image

- ID
- Report ID
- File URL
- File type
- Created date

## 7.6 Match

- ID
- Lost report ID
- Found report ID
- Match score
- Match status
- Created date

## 7.7 Claim

- ID
- Report ID
- User ID
- Claim information
- Status
- Reviewed by
- Review date
- Created date

## 7.8 Notification

- ID
- User ID
- Type
- Message
- Read status
- Created date

## 7.9 Return Record

- ID
- Claim ID
- Staff ID
- Return date
- Status
- Notes

## 7.10 Activity Log

- ID
- User ID
- Action
- Entity type
- Entity ID
- Timestamp

---

# 8. Report Lifecycle

A typical report lifecycle is:

Draft → Submitted → Pending Review → Approved → Searching/Matching → Potential Match → Claim Submitted → Under Verification → Approved Claim → Item Returned → Closed

A report may also be rejected during review or withdrawn by its owner when permitted.

---

# 9. Claim Lifecycle

A typical claim lifecycle is:

Claim Submitted → Under Review → Approved → Return Process → Completed

A claim may also be rejected if ownership cannot be verified.

---

# 10. Access Control Matrix

| Feature | Guest | User | Staff | Admin |
|---|:---:|:---:|:---:|:---:|
| Browse reports | Yes | Yes | Yes | Yes |
| Search reports | Yes | Yes | Yes | Yes |
| Filter reports | Yes | Yes | Yes | Yes |
| View public details | Yes | Yes | Yes | Yes |
| Create reports | No | Yes | Yes | Yes |
| Manage own reports | No | Yes | Yes | Yes |
| Submit claims | No | Yes | Yes | Yes |
| View own claims | No | Yes | Yes | Yes |
| View notifications | No | Yes | Yes | Yes |
| Review reports | No | No | Yes | Yes |
| Approve/reject reports | No | No | Yes | Yes |
| Review claims | No | No | Yes | Yes |
| Approve/reject claims | No | No | Yes | Yes |
| Mark items returned | No | No | Yes | Yes |
| View staff dashboard | No | No | Yes | Yes |
| Manage users | No | No | No | Yes |
| Manage roles | No | No | No | Yes |
| Manage categories | No | No | Yes | Yes |
| Manage locations | No | No | Yes | Yes |
| View analytics | No | No | Yes | Yes |
| Manage system settings | No | No | No | Yes |

---

# 11. API Architecture

The backend shall expose RESTful API endpoints.

Example endpoints include:

GET /api/reports
GET /api/reports/{id}
POST /api/reports
PATCH /api/reports/{id}
DELETE /api/reports/{id}

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

GET /api/users/me
PATCH /api/users/me

GET /api/matches
GET /api/matches/{id}

POST /api/claims
GET /api/claims
GET /api/claims/{id}
PATCH /api/claims/{id}

GET /api/notifications
PATCH /api/notifications/{id}

GET /api/admin/reports
GET /api/admin/users
GET /api/admin/analytics

The API shall remain independent from the frontend so that future clients, such as a Flutter mobile application, can use the same backend.

---

# 12. Technical Architecture Direction

The system should follow a client-server architecture.

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:
- Python
- FastAPI
- Pydantic
- SQLAlchemy

Database:
- PostgreSQL

AI:
- Python-based matching module
- Machine learning and/or similarity techniques as appropriate

Storage:
- Object storage for report images

Development and Deployment:
- Git
- GitHub
- Docker
- Automated testing
- Production deployment

The exact technology choices may be adjusted during implementation if project requirements change.

---

# 13. Development Priority

## Phase 1: Foundation

- Repository setup
- Frontend setup
- Backend setup
- Database setup
- API structure
- Environment configuration

## Phase 2: Authentication

- Registration
- Login
- Logout
- Authentication
- Authorization
- Roles
- User profile

## Phase 3: Reports

- Create lost report
- Create found report
- Browse reports
- Search
- Filtering
- Report details
- Image uploads
- Report management

## Phase 4: Staff Operations

- Staff dashboard
- Report moderation
- Approve reports
- Reject reports
- Claim management
- Return management

## Phase 5: AI Matching

- Match candidate generation
- Similarity calculation
- Match score
- Match suggestions
- Match management

## Phase 6: Notifications

- Report notifications
- Match notifications
- Claim notifications
- Return notifications

## Phase 7: Analytics

- Report statistics
- Claim statistics
- Return statistics
- Matching statistics

## Phase 8: Testing and Deployment

- Backend testing
- Frontend testing
- API testing
- Security testing
- Responsive testing
- Deployment
- Monitoring

---

# 14. Version 1 Definition of Done

Mafqoodi Version 1 shall be considered complete when:

- A guest can access the website without an account.
- A guest can browse public lost and found reports.
- A guest can search and filter reports.
- A user can register.
- A user can log in and log out.
- A user can manage their profile.
- A user can create lost reports.
- A user can create found reports.
- A user can upload item images.
- A user can manage their own reports.
- The system can identify potential matches.
- A user can submit a claim.
- Staff can review reports.
- Staff can approve or reject reports.
- Staff can review claims.
- Staff can approve or reject claims.
- Staff can mark items as returned.
- Users receive important notifications.
- Administrators can manage users.
- Role-based access control works correctly.
- The application is responsive.
- The API is documented.
- The system has appropriate tests.
- The application can be deployed to a production environment.

---

# 15. Future Features

Possible future features include:

- Flutter mobile application
- Progressive Web App (PWA)
- Push notifications
- Email notifications
- SMS notifications
- QR codes
- Advanced image similarity
- Improved AI matching
- Multi-institution support
- Institution-specific dashboards
- University authentication / SSO
- University system integrations
- Automated item categorization
- Public API
- Advanced analytics
