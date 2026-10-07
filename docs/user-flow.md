# Mafqoodi - User Flows

## 1. Browse as Guest

**Actor:** Guest

**Goal:** Browse publicly available lost and found reports without creating an account.

**Preconditions:**
- User is not authenticated.
- Public reports are available.

### Main Flow

1. Guest opens Mafqoodi.
2. System displays the public home page.
3. Guest opens the lost and found reports.
4. System displays publicly available reports.
5. Guest can search and filter reports.
6. Guest opens a report.
7. System displays the public information of the report.
8. System hides private ownership information.
9. Guest can choose to register or log in if they want to perform an action that requires authentication.

### Restricted Actions

A guest cannot:

- Create a lost report.
- Create a found report.
- Submit a claim.
- Add private ownership information.
- Manage reports.
- Receive authenticated notifications.

### Result

The guest can browse publicly available information without creating an account.

---

## 2. User Registration

**Actor:** Guest

**Goal:** Create a new Mafqoodi account.

**Preconditions:**
- User is not authenticated.
- User has the required registration information.

### Main Flow

1. User opens the registration page.
2. System displays the registration form.
3. User enters the required information.
4. User submits the form.
5. System validates the submitted information.
6. System checks whether the account already exists.
7. System creates the user account.
8. System confirms successful registration.
9. User is redirected to the login page or authenticated automatically.

### Alternative Flows

#### Account Already Exists

1. System detects that the account already exists.
2. System informs the user.
3. User can log in or use different information.

### Error Cases

- Required information is missing.
- Submitted information is invalid.
- Account information is already registered.

### Result

A new user account is created.

---

## 3. User Login

**Actor:** Registered User / Administrator

**Goal:** Access the Mafqoodi account.

**Preconditions:**
- User has an existing account.
- Account is allowed to log in.

### Main Flow

1. User opens the login page.
2. User enters their credentials.
3. User submits the form.
4. System validates the credentials.
5. System authenticates the user.
6. System creates an authenticated session.
7. User is redirected to the appropriate application area.

### Alternative Flows

#### Invalid Credentials

1. System detects invalid credentials.
2. System displays an error message.
3. User can try again.

#### Suspended or Banned Account

1. System detects that the account is not active.
2. System prevents login.
3. System informs the user.

### Result

The user is authenticated and can access authorized features.

---

# User Reports

## 4. Report a Lost Item

**Actor:** Registered User

**Goal:** Report an item that the user has lost.

**Preconditions:**
- User is authenticated.
- User has information about the lost item.

### Main Flow

1. User opens **Report Lost Item**.
2. System displays the lost item form.
3. User enters item information.
4. User uploads one or more images if available.
5. User enters the lost location.
6. User enters the lost date and approximate time.
7. User adds private ownership information.
8. User reviews the report.
9. User submits the report.
10. System validates the submitted information.
11. System creates the lost report.
12. System stores the uploaded images.
13. System makes the report available for searching.
14. System starts the matching process.
15. System confirms successful report creation.

### Alternative Flows

#### No Image

1. User submits the report without an image.
2. System checks whether an image is required.
3. If images are optional, the system accepts the report.
4. System creates the report.

#### Potential Match Found

1. System identifies one or more potential matches.
2. System stores the matches.
3. System notifies the user.

### Error Cases

- Required information is missing.
- Uploaded image is invalid.
- Uploaded image exceeds the allowed size.
- Report cannot be saved.

### Result

A lost item report is created and becomes available for searching and matching.

---

## 5. Report a Found Item

**Actor:** Registered User

**Goal:** Report an item that the user has found.

**Preconditions:**
- User is authenticated.
- User has information about the found item.

### Main Flow

1. User opens **Report Found Item**.
2. System displays the found item form.
3. User enters item information.
4. User uploads one or more images if available.
5. User enters the found location.
6. User enters the found date and approximate time.
7. User adds additional information.
8. User reviews the report.
9. User submits the report.
10. System validates the submitted information.
11. System creates the found report.
12. System stores the uploaded images.
13. System makes the report available for searching.
14. System starts the matching process.
15. System confirms successful report creation.

### Alternative Flows

#### Potential Match Found

1. System identifies one or more potential lost reports.
2. System stores the matches.
3. System notifies the relevant users.

### Error Cases

- Required information is missing.
- Uploaded image is invalid.
- Uploaded image exceeds the allowed size.
- Report cannot be saved.

### Result

A found item report is created and becomes available for searching and matching.

---

## 6. Manage a Report

**Actor:** Report Owner

**Goal:** Update or deactivate their own report.

**Preconditions:**
- User is authenticated.
- User owns the report.

### Main Flow

1. User opens their report.
2. System displays available management options.
3. User chooses to edit or deactivate the report.
4. User updates the information if editing.
5. System validates the changes.
6. System saves the changes.
7. System updates the report status if necessary.
8. System determines whether matching needs to be performed again.

### Alternative Flows

#### Report Already Resolved

1. User opens a resolved report.
2. System restricts actions that are no longer allowed.
3. User can view the report history if available.

### Result

The report is updated or deactivated.

---

# Search and Discovery

## 7. Search and Filter Reports

**Actor:** Guest / Registered User

**Goal:** Find relevant lost or found reports.

**Preconditions:**
- Reports are available in the system.

### Main Flow

1. User opens the search page.
2. System displays available reports.
3. User enters a search term or selects filters.
4. System processes the search criteria.
5. System displays matching reports.
6. User can sort the results.
7. User opens a report to view its public information.

### Possible Filters

- Report type
- Category
- Location
- Date
- Brand
- Color
- Status

### Alternative Flows

#### No Results

1. System finds no matching reports.
2. System informs the user.
3. User can modify the search criteria.

### Result

The user receives a list of relevant reports.

---

## 8. View a Report

**Actor:** Guest / Registered User

**Goal:** View information about a lost or found item.

### Main Flow

1. User selects a report.
2. System displays the report.
3. System displays publicly available information.
4. System displays available images.
5. System hides private ownership information.
6. User can return to the search results or continue with an available action.

### Result

The user can view public information without accessing private information.

---

# AI Matching

## 9. Potential Match Detection

**Actor:** System

**Goal:** Identify lost and found reports that may refer to the same item.

**Preconditions:**
- A new or updated report exists.
- The report is active.

### Main Flow

1. A new report is created or an active report is updated.
2. System identifies relevant opposite-type reports.
3. System compares available information.
4. System analyzes matching signals.
5. System calculates a match score.
6. System ranks potential matches.
7. System stores the potential matches.
8. System makes relevant matches available to users.
9. System sends notifications when appropriate.

### Matching Signals

- Image similarity
- Text similarity
- Item category
- Color
- Brand
- Model
- Location
- Date and time

### Important Rule

> A match score represents how strongly two reports are related. It is **not model accuracy** and does not prove ownership.

### Result

Potential matches are generated and ranked for review.

---

## 10. Review a Potential Match

**Actor:** Registered User

**Goal:** Determine whether a potential match may be their lost or found item.

**Preconditions:**
- A potential match exists.

### Main Flow

1. User receives a potential match notification.
2. User opens the potential match.
3. System displays relevant public information.
4. System displays the match score.
5. System may display reasons for the match.
6. User reviews the information.
7. User decides whether to continue with the claim process.

### Alternative Flows

#### Not a Match

1. User rejects or dismisses the potential match.
2. System records the decision if required.
3. The match is dismissed for that user.

### Result

The user decides whether to continue with the claim process.

---

# Claims and Ownership Verification

## 11. Submit a Claim

**Actor:** Registered User

**Goal:** Claim a found item that the user believes belongs to them.

**Preconditions:**
- User is authenticated.
- A relevant found report exists.
- Item has not already been successfully returned.

### Main Flow

1. User opens the relevant found report.
2. User selects **Claim Item**.
3. System displays the claim form.
4. User provides information supporting ownership.
5. User submits the claim.
6. System validates the claim.
7. System creates the claim.
8. Claim status is set to `Pending`.
9. Relevant user or administrator is notified.
10. Claim enters the verification process.

### Alternative Flows

#### Multiple Claims

1. Another user has already submitted a claim.
2. System allows another claim if the item is still eligible.
3. System keeps the claims separate.
4. Each claim is reviewed independently.

### Error Cases

- Item is no longer available for claims.
- User has already submitted a claim for the item.
- Required claim information is missing.

### Result

A claim is created and enters the ownership verification process.

---

## 12. Ownership Verification

**Actor:** Authorized User / Administrator

**Goal:** Determine whether the claimant is the legitimate owner.

**Preconditions:**
- A claim has been submitted.
- Ownership verification is required.

### Main Flow

1. System provides the claim information to the authorized reviewer.
2. Reviewer examines the claimant's information.
3. Reviewer compares it with private ownership information.
4. Reviewer evaluates the available evidence.
5. Reviewer decides the verification result.
6. System records the result.
7. System updates the claim status.
8. System notifies the relevant users.

### Verification Results

- `Verified`
- `Not Verified`
- `Requires Further Review`

### Important Rule

> A high AI match score does not automatically verify ownership.

### Result

The claim is verified, rejected, or sent for further review.

---

## 13. Approve or Reject a Claim

**Actor:** Authorized User / Administrator

**Goal:** Make a final decision about a submitted claim.

**Preconditions:**
- Claim has completed the required verification process.

### Main Flow

1. Reviewer opens the claim.
2. Reviewer examines the available information.
3. Reviewer reviews the verification result.
4. Reviewer approves or rejects the claim.
5. System updates the claim status.
6. System notifies the relevant users.

### Alternative Flows

#### Requires Further Review

1. Reviewer determines that the available information is insufficient.
2. Claim status is changed to `Requires Further Review`.
3. Additional information may be requested.
4. Claim is reviewed again.

### Result

The claim receives an official decision.

---

## 14. Confirm Item Return

**Actor:** Authorized User / Administrator

**Goal:** Record that the item has been successfully returned.

**Preconditions:**
- A claim has been approved.
- The return process can proceed.

### Main Flow

1. System changes the case to `Return Pending`.
2. Relevant users are notified.
3. The item is returned.
4. Authorized user confirms the return.
5. System records the return.
6. System updates the report status.
7. System marks the claim as completed.
8. System closes the case.
9. System stops unnecessary future matching for the resolved reports.

### Alternative Flows

#### Return Does Not Occur

1. The return is not completed.
2. Case remains open.
3. Relevant users or administrator can continue managing the case.

### Result

The item is recorded as returned and the case is closed.

---

# Notifications and Moderation

## 15. Receive Notifications

**Actor:** Registered User

**Goal:** Receive important updates related to reports, matches, claims, and cases.

### Notification Events

The user may receive notifications when:

- A potential match is found.
- Someone submits a claim.
- Claim status changes.
- Report status changes.
- Additional information is required.
- Return process is updated.

### Main Flow

1. System detects an event requiring notification.
2. System creates a notification.
3. User receives the notification.
4. User opens the notification.
5. System redirects the user to the relevant report, claim, or case.

### Result

The user is informed about important activity.

---

## 16. Report Suspicious Content

**Actor:** Registered User

**Goal:** Report suspicious or inappropriate content.

### Main Flow

1. User opens a report or relevant content.
2. User selects **Report**.
3. System displays the reporting form.
4. User selects a reason.
5. User optionally provides additional information.
6. User submits the report.
7. System records the report.
8. Content is added to the moderation queue.
9. Administrator can review it.

### Result

The reported content enters the moderation process.

---

# Administration

## 17. Admin Login

**Actor:** Administrator

**Goal:** Access the administration system.

**Preconditions:**
- Administrator has an authorized account.

### Main Flow

1. Administrator opens the admin login page.
2. Administrator enters credentials.
3. System validates the credentials.
4. System verifies administrator permissions.
5. System authenticates the administrator.
6. Administrator is redirected to the admin dashboard.

### Result

Administrator gains access to authorized administrative functions.

---

## 18. Admin Manage Users

**Actor:** Administrator

**Goal:** Manage user accounts and review user activity.

### Main Flow

1. Administrator opens the user management section.
2. System displays user accounts.
3. Administrator searches or filters users.
4. Administrator opens a user profile.
5. System displays permitted account information.
6. Administrator may change the account status.
7. System records the administrative action.
8. System updates the account.

### Possible Actions

- View user
- Search user
- Suspend account
- Ban account
- Restore account
- Review activity

### Result

The user account is managed according to administrative permissions.

---

## 19. Admin Review Reports

**Actor:** Administrator

**Goal:** Moderate lost and found reports.

### Main Flow

1. Administrator opens the report management section.
2. System displays reports.
3. Administrator searches or filters reports.
4. Administrator opens a report.
5. Administrator reviews the report.
6. Administrator takes an appropriate action.
7. System records the action.
8. System updates the report if necessary.

### Possible Actions

- Review
- Remove inappropriate content
- Restrict content
- Change report status
- Leave unchanged

### Result

The report is reviewed and appropriate action is taken.

---

## 20. Admin Review Claims

**Actor:** Administrator

**Goal:** Review claims that require administrative intervention.

### Main Flow

1. Administrator opens the claims section.
2. System displays pending or flagged claims.
3. Administrator selects a claim.
4. System displays the relevant claim information.
5. Administrator reviews the available evidence.
6. Administrator checks the verification information.
7. Administrator approves, rejects, or requests further review.
8. System updates the claim.
9. System notifies the relevant users.

### Result

The claim receives an administrative decision.

---

## 21. Admin Handle Dispute

**Actor:** Administrator

**Goal:** Resolve a disputed or suspicious lost-and-found case.

**Preconditions:**
- A case requires administrative intervention.

### Main Flow

1. Administrator opens the disputed case.
2. System displays the relevant reports, claims, users, and case history.
3. Administrator reviews the available information.
4. Administrator may request additional information.
5. Administrator evaluates the evidence.
6. Administrator makes a decision.
7. System records the decision.
8. System updates the case status.
9. Relevant users are notified.

### Result

The dispute is resolved or moved to further review.

---

## 22. Suspicious Activity Review

**Actor:** Administrator

**Goal:** Review potentially suspicious user activity.

### Possible Triggers

- Multiple suspicious claims.
- Repeated false reports.
- Unusual account activity.
- Repeated attempts to claim unrelated items.
- Other suspicious behavior detected by the system.

### Main Flow

1. System identifies potentially suspicious activity.
2. System creates a review item.
3. Administrator opens the suspicious activity record.
4. System displays relevant activity and history.
5. Administrator investigates the activity.
6. Administrator decides whether action is required.
7. System records the decision.
8. Administrator may restrict, suspend, or ban the account.

### Result

The suspicious activity is reviewed and an appropriate action is taken.

---

## 23. User Logout

**Actor:** Registered User / Administrator

**Goal:** End the current authenticated session.

### Main Flow

1. User selects **Logout**.
2. System terminates the authenticated session.
3. System invalidates the authentication credentials or session.
4. User is redirected to the public part of the application.

### Result

The user is logged out.

---

# Core Lost-and-Found Journey

```text
User Registers
      |
      v
    Login
      |
      +----------------------+
      |                      |
      v                      v
Lost Item Report       Found Item Report
      |                      |
      +----------+-----------+
                 |
                 v
          Matching System
                 |
                 v
          Potential Match
                 |
                 v
            User Review
                 |
                 v
               Claim
                 |
                 v
      Ownership Verification
                 |
          +------+------+
          |             |
          v             v
      Verified      Not Verified
          |
          v
     Claim Approved
          |
          v
     Return Pending
          |
          v
      Item Returned
          |
          v
       Case Closed
