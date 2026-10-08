# Mafqoodi - Software Requirements Specification

## 1. Project Overview

Mafqoodi is a web-based lost-and-found platform designed primarily for universities and institutions in Palestine.

The system provides a centralized platform where users can report lost and found items, browse existing reports, search and filter items, receive AI-assisted potential matches, submit claims, and track the return process.

The system also provides authorized staff with a management dashboard for reviewing reports, handling claims, managing returned items, and monitoring lost-and-found activity.

Administrators can manage users, staff accounts, categories, locations, and system-level settings.

The first version of Mafqoodi will be developed as a responsive web application. The backend will be API-based so that a mobile application can be developed in the future without replacing the core backend.

---

# 2. Project Goals

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
11. Maintain user privacy and protect sensitive information.
12. Build a scalable architecture that can support additional institutions in the future.

---

# 3. System Scope

## 3.1 Included in Version 1

Version 1 shall include:

- Public homepage
- Public report browsing
- Search
- Filtering
- User registration
- User login
- User logout
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

## 3.2 Out of Scope for Version 1

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
- Complex recommendation systems
- Advanced university system integration

These features may be considered for future versions.

---

# 4. Actors

The system contains four primary actors.

## 4.1 Guest

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
- Access private user information
- Manage reports
- Access staff or administrator dashboards

---

## 4.2 Registered User

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
- View activity related to their reports and claims

---

## 4.3 Lost and Found Staff

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
- View potential matches
- View operational statistics

---

## 4.4 System Administrator

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

The system shall provide a public homepage that can be accessed without authentication.

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

The system shall provide navigation to publicly accessible pages.

The navigation may include:

- Home
- Lost Items
- Found Items
- How It Works
- About
- Login
- Register

---

# 6. Guest Browsing

## FR-003: Browse Reports

The system shall allow guests to browse publicly available lost and found reports.

## FR-004: Search Reports

The system shall allow guests to search reports using keywords.

Search may consider:

- Item title
- Description
- Category
- Location

## FR-005: Filter Reports

The system shall allow guests to filter reports by:

- Report type
- Category
- Location
- Date
- Status

## FR-006: Sort Reports

The system shall allow guests to sort reports by:

- Newest
- Oldest
- Relevance

## FR-007: View Report Details

The system shall allow guests to view public report details.

Public information may include:

- Item title
- Item category
- Description
- Approximate location
- Date lost or found
- Images
- Report type
- Current status

Private information shall not be displayed publicly.

---

# 7. User Registration

## FR-008: Register Account

The system shall allow visitors to create a user account.

The registration form shall require:

- Full name
- Email address
- Password
- Password confirmation

## FR-009: Validate Registration

The system shall validate all required registration fields.

## FR-010: Unique Email

The system shall prevent multiple accounts from using the same email address.

## FR-011: Password Security

The system shall securely hash user passwords before storing them.

Passwords shall never be stored as plain text.

---

# 8. Authentication

## FR-012: Login

The system shall allow registered users to log in using their email and password.

## FR-013: Logout

The system shall allow authenticated users to log out securely.

## FR-014: Authentication State

The system shall maintain the authenticated user's session securely.

## FR-015: Protected Pages

The system shall prevent unauthenticated users from accessing protected pages.

## FR-016: Role-Based Access

The system shall restrict system functionality according to the authenticated user's role.

---

# 9. User Profile

## FR-017: View Profile

Users shall be able to view their profile information.

## FR-018: Edit Profile

Users shall be able to update permitted profile information.

Editable information may include:

- Full name
- Phone number
- Profile image
- Password

## FR-019: Account Status

The system shall prevent suspended users from performing restricted actions.

---

# 10. Lost Item Reports

## FR-020: Create Lost Report

Authenticated users shall be able to create a lost-item report.

The report shall contain:

- Item title
- Category
- Description
- Date lost
- Approximate location
- Images
- Additional identifying information

## FR-021: Validate Lost Report

The system shall validate required fields before submitting a lost report.

## FR-022: Store Lost Report

The system shall store the report and assign it a unique identifier.

## FR-023: Lost Report Status

A lost report may have one of the following statuses:

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

# 11. Found Item Reports

## FR-024: Create Found Report

Authenticated users shall be able to create a found-item report.

The report shall contain:

- Item title
- Category
- Description
- Date found
- Approximate location
- Images
- Additional identifying information

## FR-025: Validate Found Report

The system shall validate required fields before submitting a found report.

## FR-026: Store Found Report

The system shall store the report and assign it a unique identifier.

## FR-027: Found Report Status

A found report may have one of the following statuses:

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

# 12. Report Images

## FR-028: Upload Images

Users shall be able to upload images when creating or editing eligible reports.

## FR-029: Validate Images

The system shall validate:

- File type
- File size
- Number of uploaded images

## FR-030: Store Images

The system shall store uploaded images securely.

Large image files shall not be stored directly inside the relational database.

---

# 13. Report Management

## FR-031: View Own Reports

Authenticated users shall be able to view reports they created.

## FR-032: View Report Status

Users shall be able to view the current status of their reports.

## FR-033: Edit Report

Users shall be able to edit their own reports when the current status allows editing.

## FR-034: Withdraw Report

Users shall be able to withdraw eligible reports.

## FR-035: Report History

The system shall maintain important status changes associated with reports.

---

# 14. AI-Assisted Matching

## FR-036: Identify Potential Matches

The system shall identify potential matches between approved lost and found reports.

## FR-037: Matching Factors

The matching system may consider:

- Item category
- Item title
- Description
- Keywords
- Item attributes
- Location
- Date
- Image similarity

## FR-038: Match Score

The system shall calculate a match or similarity score for potential matches.

## FR-039: Match Suggestions

The system shall present potential matches to relevant users and authorized staff.

## FR-040: AI Advisory Role

The AI system shall provide potential matches rather than automatically confirming ownership.

The final decision shall be made through the claim verification process.

## FR-041: Match Status

A potential match may have a status such as:

- Suggested
- Under Review
- Confirmed
- Rejected
- Expired

---

# 15. Claim Process

## FR-042: Submit Claim

An authenticated user shall be able to submit a claim for an available found item.

## FR-043: Claim Information

The system may require information to help verify ownership.

Examples include:

- Additional item details
- Unique characteristics
- Approximate time the item was lost
- Approximate location
- Proof of ownership when appropriate

## FR-044: Claim Status

A claim may have the following statuses:

- Pending
- Under Review
- Approved
- Rejected
- Cancelled
- Completed

## FR-045: Claim Review

Authorized staff shall be able to review submitted claims.

## FR-046: Claim Decision

Authorized staff shall be able to approve or reject claims.

## FR-047: Claim History

Users shall be able to view the status of their claims.

---

# 16. Item Return Process

## FR-048: Mark Item as Returned

Authorized staff shall be able to mark an item as returned after the handover is completed.

## FR-049: Record Return

The system shall record:

- Item
- Related claim
- User
- Staff member
- Return date
- Return status
- Optional notes

## FR-050: Complete Claim

After successful return, the related claim shall be marked as completed.

## FR-051: Close Report

After successful return, the related report shall be updated and closed.

---

# 17. Notifications

## FR-052: Generate Notifications

The system shall generate notifications for important events.

Examples include:

- Report approved
- Report rejected
- Potential match found
- Claim submitted
- Claim approved
- Claim rejected
- Item returned

## FR-053: View Notifications

Authenticated users shall be able to view their notifications.

## FR-054: Mark Notification as Read

Users shall be able to mark notifications as read.

---

# 18. Staff Dashboard

## FR-055: Staff Dashboard

The system shall provide a dedicated dashboard for authorized staff.

## FR-056: Dashboard Overview

The dashboard shall display relevant operational information including:

- Total reports
- Pending reports
- Lost reports
- Found reports
- Potential matches
- Pending claims
- Returned items

## FR-057: Review Reports

Staff shall be able to review submitted reports.

## FR-058: Approve Reports

Staff shall be able to approve reports.

## FR-059: Reject Reports

Staff shall be able to reject reports.

Staff should be able to provide a rejection reason.

## FR-060: Manage Reports

Staff shall be able to:

- Search reports
- Filter reports
- View reports
- Update eligible reports
- Change report status

---

# 19. Claim Management

## FR-061: View Claims

Staff shall be able to view claims requiring review.

## FR-062: Inspect Claim

Staff shall be able to inspect:

- Claiming user
- Claimed item
- Claim information
- Related lost report
- Related found report
- Potential match information

## FR-063: Approve Claim

Staff shall be able to approve a claim after successful verification.

## FR-064: Reject Claim

Staff shall be able to reject a claim when ownership cannot be verified.

## FR-065: Record Decision

The system shall record the staff member responsible for the decision and the decision date.

---

# 20. User Management

## FR-066: View Users

Administrators shall be able to view registered users.

## FR-067: Search Users

Administrators shall be able to search users.

## FR-068: View User Details

Administrators shall be able to view relevant account information.

## FR-069: Suspend User

Administrators shall be able to suspend user accounts.

## FR-070: Restore User

Administrators shall be able to restore suspended accounts.

## FR-071: Manage Roles

Administrators shall be able to assign authorized roles.

---

# 21. Category Management

## FR-072: Manage Categories

Authorized staff or administrators shall be able to manage item categories.

They shall be able to:

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

# 22. Location Management

## FR-073: Manage Locations

Authorized staff or administrators shall be able to manage institution locations.

Examples include:

- Buildings
- Classrooms
- Library
- Cafeteria
- Parking areas
- Campus entrances

---

# 23. Search and Filtering

## FR-074: Keyword Search

The system shall allow users to search reports using keywords.

## FR-075: Filter by Type

The system shall allow users to filter between:

- Lost
- Found

## FR-076: Filter by Category

The system shall allow users to filter reports by item category.

## FR-077: Filter by Location

The system shall allow users to filter reports by location.

## FR-078: Filter by Date

The system shall allow users to filter reports by date or date range.

## FR-079: Filter by Status

Authorized users shall be able to filter reports by status where appropriate.

## FR-080: Sort Results

The system shall support sorting by:

- Newest
- Oldest
- Relevance

---

# 24. Administration

## FR-081: Admin Dashboard

Administrators shall have access to a system administration dashboard.

## FR-082: System Overview

The dashboard shall provide an overview of:

- Total users
- Total reports
- Lost reports
- Found reports
- Total claims
- Pending claims
- Returned items

## FR-083: Activity Monitoring

The system shall maintain important administrative activity records.

---

# 25. Analytics

## FR-084: Reports Analytics

Authorized staff shall be able to view report statistics.

Possible statistics include:

- Lost reports over time
- Found reports over time
- Reports by category
- Reports by location
- Successful returns
- Pending reports

## FR-085: Claim Analytics

Authorized staff shall be able to view claim statistics.

Possible statistics include:

- Total claims
- Approved claims
- Rejected claims
- Pending claims
- Average claim processing time

## FR-086: Matching Analytics

The system may provide statistics related to AI-assisted matching.

Possible statistics include:

- Potential matches generated
- Confirmed matches
- Rejected matches
- Successful returns resulting from matches

---

# 26. Non-Functional Requirements

## 26.1 Performance

### NFR-001

The system shall provide acceptable response times for normal operations.

### NFR-002

The system shall use pagination when retrieving large numbers of reports.

### NFR-003

The system shall optimize image loading.

### NFR-004

The system shall avoid unnecessary API requests.

---

# 27. Security Requirements

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

### NFR-012

Authentication credentials shall not be exposed to the frontend unnecessarily.

---

# 28. Privacy Requirements

### NFR-013

The system shall minimize personal information displayed publicly.

### NFR-014

Private user information shall only be accessible to authorized users and staff.

### NFR-015

Claim verification information shall not be publicly visible.

### NFR-016

The system shall not expose sensitive ownership information through public match suggestions.

---

# 29. Availability and Reliability

### NFR-017

The production system should be available continuously.

### NFR-018

The system shall handle temporary service failures gracefully.

### NFR-019

The system shall provide meaningful error messages when an operation fails.

### NFR-020

Important data shall be backed up according to the deployment environment.

---

# 30. Usability

### NFR-021

The interface shall be simple enough for users with limited technical experience.

### NFR-022

The system shall provide clear feedback after important actions.

Examples:

- Report submitted successfully
- Report approved
- Report rejected
- Claim submitted
- Claim approved
- Profile updated

### NFR-023

Validation errors shall clearly explain what the user needs to correct.

### NFR-024

The system shall use consistent navigation and terminology.

---

# 31. Responsive Design

### NFR-025

The web application shall be responsive.

It shall support:

- Desktop
- Laptop
- Tablet
- Mobile browser

### NFR-026

Core functionality shall remain usable on small screens.

### NFR-027

Forms shall be usable on mobile browsers.

---

# 32. Accessibility

### NFR-028

The interface should follow basic accessibility practices.

The system should provide:

- Clear form labels
- Keyboard navigation
- Appropriate color contrast
- Alternative text for meaningful images
- Clear error messages
- Visible focus states

---

# 33. Maintainability

### NFR-029

The system shall use a modular architecture.

### NFR-030

Frontend and backend responsibilities shall remain separated.

### NFR-031

Business logic shall not be tightly coupled to the user interface.

### NFR-032

The API shall be documented.

### NFR-033

The codebase shall follow consistent naming and project structure conventions.

---

# 34. Scalability

### NFR-034

The backend architecture shall support increasing numbers of users and reports.

### NFR-035

The database design shall allow the system to support multiple institutions in future versions.

### NFR-036

The API architecture shall allow future clients such as mobile applications to use the same backend.

---

# 35. Web Application Architecture Requirements

The system shall follow a client-server architecture.

```text
                    Mafqoodi Web Application
                              |
                +-------------+-------------+
                |                           |
             Frontend                   Backend API
          Next.js / React                 FastAPI
                |                           |
                |              +------------+------------+
                |              |            |            |
                |          PostgreSQL    AI Module   Object Storage
                |
           Web Browser
