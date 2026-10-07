# Mafqoodi | مفقودي

> An AI-powered lost and found platform designed to help people in Palestine report lost and found items and reconnect them with their owners.

## About the Project

**Mafqoodi** is a lost and found platform designed specifically for people in Palestine.

When someone loses an item such as a phone, laptop, wallet, bag, or any other personal belonging, they can create a lost item report with information such as images, description, location, and date.

When someone finds an item, they can create a found item report with the information they have.

The main idea behind Mafqoodi is to automatically connect related lost and found reports.

Instead of requiring users to manually search through hundreds of reports, the system uses an AI-powered matching engine to analyze the information in lost and found reports and estimate how likely they are to refer to the same item.

The result is a **match score** that helps users identify the most relevant potential matches.

---

## The Problem

When someone loses an item, they usually have to search in different places:

* Ask people around them.
* Post in Facebook groups.
* Search through WhatsApp groups.
* Check different pages and communities.
* Wait for someone to post the item they found.

Even if someone finds an item that looks similar, there is still an important question:

**Is this actually the same item?**

The problem becomes even harder when there are many lost and found reports.

Manually comparing every report is time-consuming, and simple keyword searches are not enough to understand similarities between images, descriptions, locations, and other details.

Mafqoodi aims to solve this by organizing the entire process in one platform and using intelligent matching to connect potentially related reports.

---

## How It Works

The basic workflow looks like this:

```text
User loses an item
        |
        v
Create Lost Report
        |
        v
Image + Description + Location + Date
        |
        v
Report is stored
        |
        v
Someone finds an item
        |
        v
Create Found Report
        |
        v
Image + Description + Location + Date
        |
        v
AI Matching Engine
        |
        v
Potential Matches
        |
        v
Match Score
        |
        v
User Reviews Match
        |
        v
Ownership Verification
        |
        v
Item is Returned
```

---

## AI-Powered Matching

The main intelligent component of Mafqoodi is its **AI-powered matching system**.

The purpose of the matching system is to determine how likely a lost item report and a found item report refer to the same physical item.

The system can use different types of information from both reports, including:

* Images.
* Item type.
* Color.
* Brand.
* Model.
* Description.
* Location.
* Date and time.

Instead of relying only on exact keyword matches, the system can compare both visual and textual information to find relationships between reports.

### Matching Process

```text
Lost / Found Reports
          |
          v
    Extract Information
          |
     +----+----+
     |         |
     v         v
Image Analysis  Text Analysis
     |         |
     +----+----+
          |
          v
   Compare Reports
          |
          v
     Match Score
          |
          v
 Rank Potential Matches
          |
          v
     User Review
```

### Match Score

Each potential match receives a score representing how strongly the two reports are related.

For example:

```text
Lost Report
--------------------------------
Black Samsung Galaxy S23
Lost at An-Najah National University
October 5
Photo attached

              +

Found Report
--------------------------------
Black Samsung Galaxy S23
Found at An-Najah National University
October 5
Photo attached

              |

              v

        Match Score: 91%
```

A higher match score means that the two reports have more similarities according to the matching system.

The match score is intended to help users find relevant reports faster. It is **not treated as final proof of ownership**.

### Important Note

The match score and model accuracy are two different things.

A score such as `91%` means that the system considers two reports highly related.

It does not automatically mean that the AI model has `91% accuracy`.

Model performance will be evaluated separately using appropriate test data and evaluation metrics as the project develops.

---

## Core Features

### User

Users can:

* Create an account and log in.
* Report a lost item.
* Report a found item.
* Upload item images.
* Add descriptions and item details.
* Add the location and date.
* Search for reports.
* Filter search results.
* View potential matches.
* View match scores.
* Submit a claim for an item.
* Provide information to verify ownership.
* Receive notifications about potential matches and report updates.

### Lost Item Reports

When reporting a lost item, the user can provide information such as:

* Item category.
* Item name.
* Brand.
* Model.
* Color.
* Description.
* Images.
* Last known location.
* Date and approximate time.
* Additional private ownership details.

The additional private information can later be used during the ownership verification process.

### Found Item Reports

Users who find an item can also create a report.

The report can include:

* Item category.
* Item name.
* Brand.
* Model.
* Color.
* Description.
* Images.
* Found location.
* Found date and time.
* Additional information about where and how the item was found.

The system can then compare the found report with existing lost reports.

---

## Ownership Verification

A high match score does not necessarily mean that the person making the claim is the actual owner.

For this reason, Mafqoodi includes a separate ownership verification process.

When creating a lost item report, the owner can provide a private detail that is not publicly visible.

For example:

> There is a small scratch on the left side of the phone.

If someone claims the item, this information can be used as part of the verification process.

Other verification methods can be added as the project develops.

The goal is to make sure that matching an item and proving ownership are treated as two separate steps.

```text
Potential Match
       |
       v
High Match Score
       |
       v
Ownership Verification
       |
       v
Claim Approved
       |
       v
Item Returned
```

---

## Search and Filtering

Although the matching system is an important part of Mafqoodi, users can also manually search and filter reports.

Possible filters include:

* Item category.
* Location.
* Date.
* Brand.
* Color.
* Report type.
* Status.

This allows users to browse reports directly while the matching system works in the background to identify potentially related cases.

---

## Notifications

Users can receive notifications for important events, such as:

* A potential match being found.
* A new claim on their item.
* A claim being accepted or rejected.
* Changes to their report.
* Updates related to the return process.

---

## Handling False Reports

One of the challenges of a lost and found platform is dealing with false reports and incorrect claims.

Mafqoodi is designed to support:

* Report review.
* Claim review.
* Reporting suspicious reports.
* Reporting suspicious accounts.
* Administrative review of questionable cases.
* Keeping relevant information required for verification.

The goal is to make the process of returning an item more organized and secure.

---

## Admin Dashboard

The platform will include an administration dashboard for managing the system.

Administrators can manage:

* Users.
* Lost reports.
* Found reports.
* Claims.
* Reported content.
* Suspicious accounts.
* Item return cases.

The dashboard can also be used to review cases that require manual intervention.

---

## Architecture

The project will initially follow a **Modular Monolith** architecture instead of starting with Microservices.

The goal is to keep the system organized and maintainable without introducing unnecessary complexity during the early stages.

```text
                         Flutter App
                              |
                            HTTPS
                              |
                              v
                       FastAPI Backend
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
        PostgreSQL         Storage       Matching Service
                                              |
                                              v
                                      AI Matching Engine
                                        /           \
                                       /             \
                                      v               v
                              Image Analysis     Text Analysis
                                       \             /
                                        \           /
                                         v         v
                                         Match Score
```

---

## Main Components

### Flutter App

The mobile application used by users to:

* Create lost and found reports.
* Upload images.
* Search for reports.
* View potential matches.
* Submit claims.
* Manage their account.

### FastAPI Backend

The backend handles:

* Authentication.
* Users.
* Reports.
* Claims.
* Notifications.
* API requests.
* Communication between the application, database, storage, and matching system.

### PostgreSQL

PostgreSQL is used to store structured application data, including:

* Users.
* Reports.
* Claims.
* Locations.
* Report status.
* Matching results.
* Other system information.

### Storage

Storage is used for:

* Item images.
* User-uploaded files.
* Other media associated with reports.

### Matching Service

The Matching Service manages the process of finding and comparing potentially related lost and found reports.

It communicates with the backend and the matching engine.

### AI Matching Engine

The AI Matching Engine is responsible for analyzing information from reports and generating matching results.

Depending on the final implementation, it may use image and text representations to compare reports and produce a match score.

---

## Tech Stack

The current planned technology stack includes:

* **Mobile:** Flutter
* **Backend:** FastAPI
* **Database:** PostgreSQL
* **Storage:** Object Storage
* **AI / Matching:** Image and text-based matching system
* **Authentication:** User authentication and account management
* **API Communication:** REST API

The technology stack may evolve as development progresses.

---

## Project Structure

The project will be organized into separate components to make development and maintenance easier.

```text
mafqoodi/
│
├── mobile/
│   └── Flutter application
│
├── backend/
│   └── FastAPI application
│
├── matching/
│   └── Matching service
│
├── docs/
│   └── Project documentation
│
└── README.md
```

The exact structure may change as new features and components are added.

---

## Why Mafqoodi?

The goal is not simply to create another application for listing lost items.

Mafqoodi is designed around the local context in Palestine, where people often rely on Facebook groups, WhatsApp groups, and personal networks when they lose something.

Lost and found reports are often scattered across different platforms, making it difficult to search for an item or determine whether a found item belongs to someone.

Mafqoodi aims to bring this process into one organized platform.

The platform can eventually be expanded to support:

* Universities.
* Schools.
* Public transportation.
* Public places.
* Companies and organizations.
* Events.
* Different cities and areas across Palestine.

---

## Development Roadmap

Development will start with the core functionality and gradually expand.

### Phase 1: Core Platform

* User registration.
* Login.
* User profiles.
* Lost item reports.
* Found item reports.
* Image uploads.
* Report details.
* Basic search and filtering.

### Phase 2: Matching System

* Matching service.
* Image analysis.
* Text analysis.
* Report comparison.
* Match scores.
* Potential match ranking.

### Phase 3: Claims and Verification

* Claim system.
* Private ownership details.
* Ownership verification.
* Claim approval and rejection.
* Notifications.

### Phase 4: Administration

* Admin dashboard.
* Report moderation.
* Claim management.
* Suspicious account handling.
* Report management.
* System analytics.

### Phase 5: Improvements

* Improve matching performance.
* Improve user experience.
* Improve search and filtering.
* Expand support for universities and organizations.
* Evaluate and improve the matching model using collected data.

---

## Future Improvements

As the platform develops, additional features may include:

* Location-based matching.
* More advanced image analysis.
* Improved text understanding.
* Better ranking of potential matches.
* University-specific communities.
* Organization accounts.
* QR-based item identification.
* More advanced ownership verification.
* Improved notification system.
* Analytics for administrators.
* Model evaluation and continuous improvement.

---

## Project Status

Mafqoodi is currently under development.

The architecture, features, matching system, and documentation will continue to evolve as the project progresses.

---

## Goal

The long-term goal of **Mafqoodi** is to provide one organized place where people in Palestine can report lost items, report items they have found, discover potential matches, and safely reconnect items with their owners.

The platform combines a practical lost and found system with an AI-powered matching engine that helps users find relevant reports without having to manually search through everything.

The final goal is simple:

**Make it easier to lose something without losing hope of finding it.**
