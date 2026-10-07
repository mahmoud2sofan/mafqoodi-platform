# Mafqoodi - Software Requirements Specification

## 1. Project Overview

Mafqoodi is a lost and found platform designed for users in Palestine.

The system allows users to report lost and found items, search existing reports, discover potential matches using an AI-powered matching system, and manage the process of claiming and returning items.

The platform also provides an administration system for moderation, user management, report management, and claim handling.

---

# 2. Actors

The system has three primary actors:

### 2.1 Guest

A user who has not authenticated.

A guest can:

- View public information about the platform.
- Register for an account.
- Log in.
- Browse publicly available reports if allowed by the system.

### 2.2 Registered User

An authenticated user who can interact with the platform.

A registered user can:

- Manage their account.
- Create lost reports.
- Create found reports.
- Search and filter reports.
- View potential matches.
- Submit claims.
- Participate in ownership verification.
- Receive notifications.
- Manage their reports.

### 2.3 Administrator

An authorized administrator responsible for managing and moderating the platform.

An administrator can:

- Manage users.
- Review reports.
- Review claims.
- Handle reported content.
- Handle suspicious activity.
- Manage return cases.
- Monitor system activity.

---

# 3. Functional Requirements

## 3.1 Authentication and Account Management

### FR-001 - User Registration

The system shall allow users to create an account.

The registration process shall collect the required information defined by the system.

### FR-002 - User Login

The system shall allow registered users to authenticate using their credentials.

### FR-003 - User Logout

The system shall allow authenticated users to log out.

### FR-004 - Password Security

The system shall securely store user passwords using an appropriate password hashing mechanism.

Passwords shall never be stored in plain text.

### FR-005 - User Profile

The system shall allow users to view and update their profile information.

### FR-006 - Account Status

The system shall support account statuses such as:

- Active
- Suspended
- Banned

Administrators shall be able to change account status according to their permissions.

---

# 4. Lost Item Reports

## FR-007 - Create Lost Report

The system shall allow authenticated users to create a lost item report.

A lost report may contain:

- Item category
- Item name
- Brand
- Model
- Color
- Description
- Images
- Lost location
- Lost date
- Approximate lost time
- Private ownership information

### FR-008 - Edit Lost Report

The system shall allow the owner of a lost report to edit its information.

### FR-009 - Delete Lost Report

The system shall allow the owner of a lost report to remove or deactivate the report.

### FR-010 - View Lost Report

The system shall allow users to view the publicly available information of a lost report.

Private ownership information shall not be publicly displayed.

### FR-011 - Lost Report Status

A lost report shall have a status.

Possible statuses may include:

- Active
- Potential Match
- Claimed
- Resolved
- Closed

---

# 5. Found Item Reports

## FR-012 - Create Found Report

The system shall allow authenticated users to create a found item report.

A found report may contain:

- Item category
- Item name
- Brand
- Model
- Color
- Description
- Images
- Found location
- Found date
- Approximate found time
- Additional information

### FR-013 - Edit Found Report

The system shall allow the creator of a found report to edit its information.

### FR-014 - Delete Found Report

The system shall allow the creator of a found report to remove or deactivate the report.

### FR-015 - View Found Report

The system shall allow users to view publicly available information about a found report.

### FR-016 - Found Report Status

A found report shall have a status.

Possible statuses may include:

- Active
- Potential Match
- Claimed
- Returned
- Closed

---

# 6. Image and File Management

## FR-017 - Upload Images

The system shall allow users to upload images when creating or editing reports.

### FR-018 - Image Validation

The system shall validate uploaded files before storing them.

Validation may include:

- File type
- File size
- File format
- Maximum number of images

### FR-019 - Image Storage

Uploaded images shall be stored separately from the main application database using an appropriate object storage system.

### FR-020 - Image Access

The system shall control access to uploaded images according to the report and user permissions.

---

# 7. Search and Filtering

## FR-021 - Search Reports

The system shall allow users to search lost and found reports.

Search may consider information such as:

- Item name
- Description
- Brand
- Model
- Location

### FR-022 - Filter Reports

The system shall allow users to filter reports using available attributes.

Possible filters include:

- Report type
- Category
- Location
- Date
- Brand
- Color
- Status

### FR-023 - Sort Reports

The system shall allow reports to be sorted according to relevant criteria.

Examples include:

- Most recent
- Location
- Relevance

---

# 8. AI Matching System

## FR-024 - Identify Potential Matches

The system shall analyze active lost and found reports to identify potentially related reports.

### FR-025 - Matching Signals

The matching system may use multiple signals, including:

- Image similarity
- Text similarity
- Item category
- Color
- Brand
- Model
- Location
- Date and time

### FR-026 - Generate Match Score

The matching system shall generate a score representing how strongly two reports are related.

### FR-027 - Rank Matches

The system shall rank potential matches according to their matching scores.

### FR-028 - Match Explanation

Where possible, the system should provide useful information explaining why two reports were considered similar.

For example:

- Same item category
- Similar color
- Similar image
- Same brand
- Nearby location
- Similar date

### FR-029 - Match Review

The system shall allow users to review potential matches before taking further action.

### FR-030 - Match Score Definition

The system shall clearly distinguish between a match score and model evaluation metrics.

A match score shall not be presented as model accuracy.

---

# 9. Notifications

## FR-031 - Potential Match Notification

The system shall notify users when a relevant potential match is identified.

### FR-032 - Claim Notification

The system shall notify the relevant user when someone submits a claim.

### FR-033 - Claim Status Notification

The system shall notify users when the status of their claim changes.

### FR-034 - Report Notifications

The system may notify users about important changes to their reports.

---

# 10. Claims

## FR-035 - Submit Claim

The system shall allow an authenticated user to submit a claim for a found item.

### FR-036 - Claim Information

A claim may require the claimant to provide information supporting their ownership.

### FR-037 - Claim Status

Claims shall have a status.

Possible statuses include:

- Pending
- Under Review
- Approved
- Rejected
- Cancelled

### FR-038 - Multiple Claims

The system shall support multiple claims for the same found item when necessary.

### FR-039 - Claim Review

The system shall provide a mechanism for reviewing claims.

### FR-040 - Claim Decision

An authorized user or administrator shall be able to approve or reject a claim according to the verification process.

---

# 11. Ownership Verification

## FR-041 - Private Ownership Information

The system shall allow users creating lost reports to provide private information that can help prove ownership.

Examples include:

- Unique scratches
- Device details
- Personal markings
- Unique accessories
- Other private identifying characteristics

### FR-042 - Private Information Protection

Private ownership information shall not be publicly visible.

### FR-043 - Ownership Verification

The system shall support an ownership verification process before an item is considered successfully returned.

### FR-044 - Verification Result

The verification process shall produce a result such as:

- Verified
- Not Verified
- Requires Further Review

### FR-045 - Match Does Not Prove Ownership

A high AI match score shall not automatically approve ownership.

---

# 12. Item Return Process

## FR-046 - Return Status

The system shall track the state of the return process.

Possible states include:

- Match Found
- Claim Submitted
- Verification
- Approved
- Return Pending
- Returned
- Disputed
- Closed

### FR-047 - Return Confirmation

The system shall allow authorized parties to confirm that an item has been returned.

### FR-048 - Case Closure

The system shall allow a resolved case to be closed.

---

# 13. Reports and Moderation

## FR-049 - Report Content

Users shall be able to report suspicious or inappropriate content.

### FR-050 - Report Review

Administrators shall be able to review reported content.

### FR-051 - Report Action

Administrators shall be able to take appropriate actions on reported content.

Possible actions include:

- No action
- Remove content
- Restrict content
- Suspend account
- Ban account

---

# 14. Suspicious Activity

## FR-052 - Suspicious Activity Detection

The system should support identifying potentially suspicious behavior.

Examples may include:

- Multiple suspicious claims
- Repeated false reports
- Unusual account activity
- Repeated attempts to claim unrelated items

### FR-053 - Administrative Review

Administrators shall be able to review suspicious activity.

---

# 15. Administration

## FR-054 - Admin Dashboard

The system shall provide an administrative dashboard.

### FR-055 - User Management

Administrators shall be able to:

- View users
- Search users
- Change account status
- Review user activity

### FR-056 - Report Management

Administrators shall be able to:

- View reports
- Search reports
- Review reports
- Change report status when necessary

### FR-057 - Claim Management

Administrators shall be able to review and manage claims.

### FR-058 - Case Management

Administrators shall be able to review cases that require manual intervention.

### FR-059 - System Statistics

The administration system should provide basic statistics such as:

- Number of users
- Number of lost reports
- Number of found reports
- Number of potential matches
- Number of claims
- Number of successfully returned items

---

# 16. Permissions and Authorization

## FR-060 - Role-Based Access Control

The system shall implement role-based access control.

Possible roles include:

- User
- Administrator

### FR-061 - Resource Ownership

Users shall only be able to modify resources they are authorized to modify.

For example, a user shall not be able to edit another user's report.

### FR-062 - Administrative Access

Administrative functions shall only be accessible to authorized administrators.

---

# 17. Audit and Activity Tracking

## FR-063 - Important Actions

The system should record important actions performed by users and administrators.

Examples include:

- Creating reports
- Updating reports
- Submitting claims
- Approving claims
- Rejecting claims
- Suspending users
- Closing cases

### FR-064 - Audit Records

Audit records should contain sufficient information to determine:

- Who performed the action
- What action was performed
- When it occurred
- Which resource was affected

---

# 18. Non-Functional Requirements

## 18.1 Security

### NFR-001

The system shall securely authenticate users.

### NFR-002

Passwords shall be securely hashed.

### NFR-003

Sensitive configuration and secrets shall not be stored directly in source code.

### NFR-004

Private ownership information shall not be exposed through public APIs.

### NFR-005

The backend shall validate and sanitize user input.

### NFR-006

Uploaded files shall be validated before being stored or processed.

### NFR-007

The system shall enforce authorization checks for protected resources.

---

## 18.2 Performance

### NFR-008

The API should respond within an acceptable time under normal system load.

### NFR-009

The matching system should process reports asynchronously when matching operations are computationally expensive.

### NFR-010

The system should avoid unnecessary repeated AI processing.

---

## 18.3 Reliability

### NFR-011

The system should handle failures without corrupting stored data.

### NFR-012

Database operations involving multiple related changes should maintain data consistency.

### NFR-013

The system should provide appropriate error handling and meaningful API responses.

---

## 18.4 Scalability

### NFR-014

The architecture should allow individual components to be improved or extracted into separate services if the system grows.

### NFR-015

The matching system should be designed so that more advanced AI models can be introduced without rewriting the entire backend.

---

## 18.5 Maintainability

### NFR-016

The backend shall follow a modular architecture.

### NFR-017

The codebase shall follow consistent coding and naming conventions.

### NFR-018

The project shall use automated testing for critical functionality.

### NFR-019

Database schema changes shall be managed using migrations.

### NFR-020

The project shall maintain technical documentation for major architectural decisions.

---

## 18.6 Deployment

### NFR-021

The application environment shall be reproducible using Docker.

### NFR-022

Application configuration shall be managed through environment variables.

### NFR-023

The system should support separate development and production environments.

### NFR-024

The project should use CI/CD to automatically validate changes before deployment.

---

# 19. Core Business Rules

## BR-001

Only authenticated users can create reports.

## BR-002

Only the owner of a report can modify or deactivate it unless an administrator intervenes.

## BR-003

Private ownership information must never be publicly displayed.

## BR-004

A high match score does not automatically prove ownership.

## BR-005

A claim must go through the defined verification process before an item is marked as successfully returned.

## BR-006

A user cannot claim their own found report as a lost item match.

## BR-007

Multiple claims may exist for the same item.

## BR-008

Only authorized users can approve or reject claims.

## BR-009

Administrators can intervene in disputed or suspicious cases.

## BR-010

A resolved report should not continue generating unnecessary potential matches.

---

# 20. Main User Flows

## Lost Item Flow

    Register / Login
          |
          v
    Create Lost Report
          |
          v
    Add Item Information
          |
          v
    Add Images
          |
          v
    Add Location and Date
          |
          v
    Add Private Ownership Details
          |
          v
    Submit Report
          |
          v
    System Searches for Matches
          |
          v
    Potential Match Found
          |
          v
    User Reviews Match
          |
          v
    Claim / Verification
          |
          v
    Item Returned

## Found Item Flow

    Register / Login
          |
          v
    Create Found Report
          |
          v
    Add Item Information
          |
          v
    Add Images
          |
          v
    Add Location and Date
          |
          v
    Submit Report
          |
          v
    System Searches for Lost Reports
          |
          v
    Potential Match Found
          |
          v
    Owner May Submit Claim
          |
          v
    Ownership Verification
          |
          v
    Item Returned

## Admin Flow

    Admin Login
          |
          v
    Admin Dashboard
          |
     +----+----+
     |    |    |
     v    v    v
   Users Reports Claims
     |    |    |
     +----+----+
          |
          v
    Review / Action
          |
          v
      Case Resolved

---

# 21. Initial Project Scope

The first version of Mafqoodi will focus on the core lost and found workflow.

### Included in Initial Scope

- User authentication
- User profiles
- Lost reports
- Found reports
- Image uploads
- Search and filtering
- Basic notifications
- Claims
- Ownership verification
- Basic AI matching
- Admin management

### Potentially Deferred

The following features may be implemented after the core system is stable:

- Advanced recommendation systems
- Organization accounts
- University-specific communities
- QR-based identification
- Advanced analytics
- Advanced fraud detection
- Real-time chat
- Advanced location intelligence
- More sophisticated AI models

---

# 22. Success Criteria

The initial version of Mafqoodi will be considered successful when a user can:

1. Create an account.
2. Report a lost item.
3. Report a found item.
4. Search existing reports.
5. Receive potential matches.
6. Review the match information.
7. Submit a claim.
8. Complete the ownership verification process.
9. Resolve the case and record the item as returned.

The system should also allow administrators to monitor and manage the complete process.
