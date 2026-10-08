# Mafqoodi - User Flows

## 1. Browse as Guest

**Actor:** Guest

**Goal:** Browse publicly available lost and found reports without creating an account.

### Preconditions

- User is not authenticated.
- Public reports are available.

### Main Flow

1. Guest opens Mafqoodi.
2. System displays the public homepage.
3. Guest selects Lost Items or Found Items.
4. System displays publicly available reports.
5. Guest can search reports.
6. Guest can apply filters.
7. Guest can sort results.
8. Guest selects a report.
9. System displays the public report details.

### Alternative Flows

**No Results:**

1. Guest performs a search.
2. System finds no matching reports.
3. System displays a "No results found" message.
4. Guest can modify the search or filters.

**Protected Action:**

1. Guest attempts to create a report or submit a claim.
2. System detects that the guest is not authenticated.
3. System redirects the guest to Login or Register.

---

# 2. Register Account

**Actor:** Guest

**Goal:** Create a Mafqoodi account.

### Main Flow

1. Guest selects Register.
2. System displays the registration form.
3. Guest enters their full name.
4. Guest enters their email.
5. Guest enters a password.
6. Guest confirms the password.
7. Guest submits the form.
8. System validates the information.
9. System checks whether the email already exists.
10. System creates the account.
11. System authenticates the user or redirects them to Login.
12. System displays the user dashboard.

### Alternative Flows

**Invalid Email:**

1. User enters an invalid email.
2. System displays a validation error.
3. User corrects the email.

**Email Already Exists:**

1. User submits an already registered email.
2. System displays an account-exists message.
3. User can log in instead.

**Passwords Do Not Match:**

1. User enters different passwords.
2. System displays a password mismatch error.
3. User corrects the passwords.

---

# 3. Login

**Actor:** User / Staff / Administrator

**Goal:** Access the appropriate Mafqoodi interface.

### Main Flow

1. User opens Login.
2. User enters their email.
3. User enters their password.
4. User submits the form.
5. System validates the credentials.
6. System authenticates the user.
7. System identifies the user's role.
8. System redirects the user to the appropriate dashboard or page.

### Alternative Flows

**Invalid Credentials:**

1. User submits incorrect credentials.
2. System rejects the login.
3. System displays an error.
4. User can try again.

**Suspended Account:**

1. User enters valid credentials.
2. System detects that the account is suspended.
3. System prevents access.
4. System displays the account status.

---

# 4. Logout

**Actor:** Authenticated User

### Main Flow

1. User opens the account menu.
2. User selects Logout.
3. System ends the authenticated session.
4. System redirects the user to the public homepage.

---

# 5. Manage Profile

**Actor:** Registered User

### Main Flow

1. User opens their profile.
2. System displays profile information.
3. User selects Edit Profile.
4. User changes permitted information.
5. User submits the changes.
6. System validates the information.
7. System saves the changes.
8. System displays a success message.

---

# 6. Create Lost Item Report

**Actor:** Registered User

**Goal:** Report an item that has been lost.

### Preconditions

- User is authenticated.

### Main Flow

1. User opens the dashboard.
2. User selects Report Lost Item.
3. System displays the lost-item form.
4. User enters the item title.
5. User selects the category.
6. User enters a description.
7. User enters the approximate location.
8. User selects the date the item was lost.
9. User enters additional identifying information.
10. User uploads optional images.
11. User submits the report.
12. System validates the information.
13. System creates the report.
14. System assigns a unique report ID.
15. System sets the report status to Pending Review.
16. System displays a confirmation message.

### Alternative Flows

**Missing Information:**

1. User submits the form.
2. System detects missing required information.
3. System displays validation errors.
4. User corrects the form.
5. User submits again.

**Invalid Image:**

1. User uploads an invalid image.
2. System rejects the image.
3. System displays an error.
4. User uploads a valid image or removes it.

---

# 7. Create Found Item Report

**Actor:** Registered User

**Goal:** Report an item that has been found.

### Preconditions

- User is authenticated.

### Main Flow

1. User opens the dashboard.
2. User selects Report Found Item.
3. System displays the found-item form.
4. User enters the item title.
5. User selects the category.
6. User enters a description.
7. User enters the approximate location.
8. User selects the date the item was found.
9. User enters additional identifying information.
10. User uploads optional images.
11. User submits the report.
12. System validates the information.
13. System creates the report.
14. System assigns a unique report ID.
15. System sets the report status to Pending Review.
16. System displays a confirmation message.

---

# 8. View and Manage My Reports

**Actor:** Registered User

### Main Flow

1. User opens My Reports.
2. System retrieves the user's reports.
3. System displays the reports.
4. User can filter reports by type or status.
5. User selects a report.
6. System displays the report details.
7. If the report is eligible, the user can edit or withdraw it.

---

# 9. Search Reports

**Actor:** Guest / User / Staff / Administrator

### Main Flow

1. User opens the reports page.
2. User enters a search keyword.
3. User submits the search.
4. System searches relevant report information.
5. System displays matching reports.
6. User can open a report.

### Alternative Flow

1. System finds no matching reports.
2. System displays a "No results found" message.
3. User can modify the search.

---

# 10. Filter Reports

**Actor:** Guest / User / Staff / Administrator

### Main Flow

1. User opens the reports page.
2. User selects one or more filters.
3. System applies the filters.
4. System updates the displayed reports.

Possible filters:

- Lost / Found
- Category
- Location
- Date
- Status

---

# 11. View Report Details

**Actor:** Guest / User / Staff / Administrator

### Main Flow

1. User selects a report.
2. System retrieves the report.
3. System checks the user's permissions.
4. System displays the information allowed for that user.

---

# 12. AI Match Detection

**Actor:** System

**Goal:** Identify potential matches between lost and found reports.

### Preconditions

- Relevant reports are approved.
- Reports contain sufficient information.

### Main Flow

1. A new report is approved.
2. System identifies compatible reports.
3. AI matching analyzes available information.
4. System compares relevant matching factors.
5. System calculates similarity scores.
6. System identifies potential matches.
7. System stores the potential matches.
8. System notifies relevant users and staff.

### Matching Factors

The system may consider:

- Category
- Item title
- Description
- Keywords
- Item attributes
- Location
- Date
- Images

### Important Rule

AI suggestions do not automatically confirm ownership.

Final ownership verification must occur through the claim process.

---

# 13. View Potential Match

**Actor:** Registered User / Staff

### Main Flow

1. User receives a potential-match notification.
2. User opens the notification.
3. System displays the potential match.
4. System displays relevant report information.
5. User reviews the information.
6. User may proceed to submit a claim.

Staff can additionally review and manage the potential match.

---

# 14. Submit Claim

**Actor:** Registered User

**Goal:** Claim a found item believed to belong to the user.

### Preconditions

- User is authenticated.
- Found item is eligible for claiming.

### Main Flow

1. User opens a found-item report.
2. User selects Claim Item.
3. System displays the claim form.
4. User provides ownership-related information.
5. User submits the claim.
6. System validates the information.
7. System creates the claim.
8. System sets the claim status to Pending.
9. System notifies staff.
10. System displays the claim status to the user.

### Alternative Flows

**Item Unavailable:**

1. User attempts to claim an unavailable item.
2. System prevents the claim.
3. System explains that the item is no longer available.

**Incomplete Claim:**

1. User submits incomplete information.
2. System displays validation errors.
3. User completes the missing information.
4. User submits again.

---

# 15. Review Claim

**Actor:** Lost and Found Staff

**Goal:** Verify whether a claim is legitimate.

### Preconditions

- Staff member is authenticated.
- A pending claim exists.

### Main Flow

1. Staff opens the staff dashboard.
2. Staff opens Pending Claims.
3. Staff selects a claim.
4. System displays the claim details.
5. Staff reviews the claimant information.
6. Staff reviews the related reports.
7. Staff evaluates ownership information.
8. Staff decides whether the claim is valid.
9. Staff approves or rejects the claim.
10. System records the decision.
11. System updates the claim status.
12. System notifies the user.

---

# 16. Approve Claim

**Actor:** Lost and Found Staff

### Main Flow

1. Staff opens a pending claim.
2. Staff verifies ownership.
3. Staff selects Approve.
4. System updates the claim status.
5. System updates the related report.
6. System notifies the user.
7. Staff proceeds with the return process.

---

# 17. Reject Claim

**Actor:** Lost and Found Staff

### Main Flow

1. Staff opens a pending claim.
2. Staff reviews the claim.
3. Staff selects Reject.
4. Staff provides an optional reason.
5. System records the rejection.
6. System changes the claim status to Rejected.
7. System notifies the user.

---

# 18. Return Item

**Actor:** Lost and Found Staff

**Goal:** Record the successful return of an item.

### Preconditions

- Claim has been approved.
- Item is available for return.

### Main Flow

1. Staff opens the approved claim.
2. Staff confirms the handover.
3. Staff selects Mark as Returned.
4. System displays a confirmation.
5. Staff confirms the return.
6. System records the return date.
7. System records the responsible staff member.
8. System marks the claim as Completed.
9. System marks the related report as Returned or Closed.
10. System notifies the user.

---

# 19. Review Report

**Actor:** Lost and Found Staff

**Goal:** Review a submitted report before making it publicly available.

### Main Flow

1. Staff logs in.
2. Staff opens the staff dashboard.
3. Staff opens Pending Reports.
4. Staff selects a report.
5. System displays the report details.
6. Staff reviews the information.
7. Staff approves or rejects the report.

### Approval

1. Staff approves the report.
2. System changes the status to Approved.
3. System makes the report publicly available.
4. System starts or schedules matching.

### Rejection

1. Staff rejects the report.
2. Staff provides a rejection reason.
3. System changes the status to Rejected.
4. System notifies the report owner.

---

# 20. Staff Dashboard

**Actor:** Lost and Found Staff

### Main Flow

1. Staff logs in.
2. System verifies the staff role.
3. System displays the staff dashboard.
4. Dashboard displays operational statistics.
5. Staff can navigate to:

- Reports
- Claims
- Potential Matches
- Returned Items
- Notifications
- Analytics

---

# 21. Manage Users

**Actor:** Administrator

### Main Flow

1. Administrator logs in.
2. Administrator opens the admin dashboard.
3. Administrator selects Users.
4. System displays registered users.
5. Administrator can search users.
6. Administrator selects a user.
7. System displays permitted user information.
8. Administrator can suspend or restore the account.

---

# 22. Suspend User

**Actor:** Administrator

### Main Flow

1. Administrator opens User Management.
2. Administrator selects a user.
3. Administrator selects Suspend User.
4. System requests confirmation.
5. Administrator confirms.
6. System changes the account status.
7. System prevents the user from performing restricted actions.

---

# 23. Restore User

**Actor:** Administrator

### Main Flow

1. Administrator opens User Management.
2. Administrator selects a suspended user.
3. Administrator selects Restore User.
4. System requests confirmation.
5. Administrator confirms.
6. System restores the account.
7. User can access the system again.

---

# 24. Manage Categories

**Actor:** Staff / Administrator

### Main Flow

1. Authorized user opens Category Management.
2. System displays existing categories.
3. User can create a category.
4. User can edit a category.
5. User can deactivate a category.
6. System saves the changes.

---

# 25. Manage Locations

**Actor:** Staff / Administrator

### Main Flow

1. Authorized user opens Location Management.
2. System displays available locations.
3. User can create a location.
4. User can edit a location.
5. User can deactivate a location.
6. System saves the changes.

---

# 26. View Notifications

**Actor:** User / Staff / Administrator

### Main Flow

1. User opens the notification area.
2. System retrieves the user's notifications.
3. System displays unread and read notifications.
4. User selects a notification.
5. System opens the related information.
6. System marks the notification as read when appropriate.

---

# 27. View Analytics

**Actor:** Staff / Administrator

### Main Flow

1. Authorized user opens the dashboard.
2. User selects Analytics.
3. System retrieves relevant statistics.
4. System displays charts and summaries.

Possible statistics include:

- Lost reports
- Found reports
- Reports by category
- Reports by location
- Claims
- Successful returns
- Average claim processing time
- AI matching statistics

---

# 28. Access Control Flow

**Actor:** Any User

### Main Flow

1. User requests a protected resource.
2. System checks whether the user is authenticated.
3. If the user is not authenticated, access is denied.
4. If authenticated, system identifies the user's role.
5. System checks whether the role has permission.
6. If permission exists, the requested operation is allowed.
7. If permission does not exist, access is denied.

---

# 29. Complete Lost Item Flow

User → Register/Login → Create Lost Report → Submit Report → Pending Review → Staff Review → Approved → Public Report → AI Matching → Potential Match → User Reviews Match → Claim Submitted → Staff Verification → Claim Approved → Return Process → Item Returned → Claim Completed → Report Closed

---

# 30. Complete Found Item Flow

User → Register/Login → Create Found Report → Submit Report → Pending Review → Staff Review → Approved → Public Found Report → AI Matching → Potential Lost Report Match → Claim Submitted → Staff Verification → Claim Approved → Item Returned → Report Closed

---

# 31. Complete Guest Flow

Guest → Homepage → Lost Items / Found Items → Search / Filter → View Report → Continue Browsing

If the guest wants to report or claim an item:

Guest → Register / Login → Authenticated User Flow

---

# 32. Complete Staff Flow

Staff → Login → Staff Dashboard → Review Reports / Review Claims / Review Matches / Analytics → Approve or Reject → Manage Return → Close Report

---

# 33. Complete Administrator Flow

Administrator → Login → Admin Dashboard → Manage Users / Roles / Reports / Claims / Categories / Locations / Settings / Analytics / Activity Logs

---

# 34. Core Mafqoodi Flow

Browse → Discover → Report → Review → Match → Claim → Verify → Return → Close

The AI matching system assists the Match stage, while authorized staff remain responsible for verification and final decisions.
