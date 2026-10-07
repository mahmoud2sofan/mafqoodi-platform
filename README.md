# Mafqoodi | مفقودي

An AI-powered lost and found platform designed for Palestine.

Mafqoodi helps people report lost and found items, discover potential matches, and safely reconnect items with their owners.

## The Problem

When people lose something in Palestine, they often search through Facebook groups, WhatsApp groups, university communities, and different local pages.

This information is scattered across different platforms, making it difficult to:

- Find relevant reports
- Compare lost and found items
- Know whether a found item belongs to you
- Verify ownership safely

## The Solution

Mafqoodi brings the lost and found process into one platform.

Users can create lost or found reports containing information such as images, descriptions, item details, location, and date.

The system then uses an AI-powered matching engine to identify potentially related reports.

    Lost Report ───────┐
                       ├──> AI Matching ──> Potential Matches
    Found Report ──────┘                         │
                                                v
                                          Match Score
                                                │
                                                v
                                      Ownership Verification
                                                │
                                                v
                                           Item Returned

## Key Features

- Create lost item reports
- Create found item reports
- Upload item images
- Search and filter reports
- AI-powered lost/found matching
- Match scores for potential matches
- Private ownership information for verification
- Claim and verification system
- Notifications for potential matches and claims
- Admin dashboard for moderation and case management

## AI Matching

The main intelligent component of Mafqoodi is its matching engine.

It compares information from lost and found reports, potentially including:

- Images
- Item category
- Color
- Brand
- Model
- Description
- Location
- Date and time

The system combines these signals to estimate how strongly two reports are related and ranks potential matches accordingly.

### Match Score vs Model Accuracy

A **Match Score** represents how strongly two reports appear to be related.

For example:

    Lost Report + Found Report
              |
              v
       Matching Engine
              |
              v
       Match Score: 91%

A `91% Match Score` does **not** mean that the AI model has `91% accuracy`.

Model performance will be evaluated separately using appropriate test data and evaluation metrics.

## Ownership Verification

Matching an item is different from proving ownership.

When creating a lost report, users can provide private information that is not publicly displayed.

For example:

> Small scratch on the left side of the phone.

If another user claims the item, this information can be used during the verification process.

    Potential Match
          |
          v
    Ownership Verification
          |
          v
      Claim Approved
          |
          v
       Item Returned

## Architecture

Mafqoodi will initially use a **Modular Monolith** architecture to keep the system maintainable without introducing unnecessary microservice complexity.

    Flutter App
         |
       HTTPS
         |
         v
    FastAPI Backend
         |
    +----+----------------+----------------+
    |                     |                |
    v                     v                v
    PostgreSQL       Object Storage   Matching Service
                                         |
                                         v
                                  AI Matching Engine
                                    /           \
                                   v             v
                             Image Analysis  Text Analysis
                                   \             /
                                    \           /
                                     v         v
                                     Match Score

## Tech Stack

| Component | Technology |
|---|---|
| Mobile | Flutter |
| Backend | FastAPI |
| Database | PostgreSQL |
| Storage | Object Storage |
| API | REST API |
| AI | Image & Text Matching |
| Architecture | Modular Monolith |

## Project Structure

    mafqoodi/
    │
    ├── mobile/          # Flutter application
    ├── backend/         # FastAPI backend
    ├── matching/        # AI matching system
    ├── docs/            # Project documentation
    │
    └── README.md

## Roadmap

### Phase 1: Core Platform

- [ ] User authentication
- [ ] User profiles
- [ ] Lost reports
- [ ] Found reports
- [ ] Image uploads
- [ ] Search and filtering

### Phase 2: AI Matching

- [ ] Matching service
- [ ] Image analysis
- [ ] Text analysis
- [ ] Report comparison
- [ ] Match scoring
- [ ] Match ranking

### Phase 3: Claims & Verification

- [ ] Claim system
- [ ] Private ownership details
- [ ] Ownership verification
- [ ] Claim approval/rejection
- [ ] Notifications

### Phase 4: Administration

- [ ] Admin dashboard
- [ ] Report moderation
- [ ] Claim management
- [ ] Suspicious account handling
- [ ] System analytics

## Future Plans

Potential future improvements include:

- Location-based matching
- Improved image and text understanding
- University and organization accounts
- QR-based item identification
- More advanced ownership verification
- Improved matching performance through model evaluation and new data

## Project Status

**Mafqoodi is currently under development.**

The architecture, AI matching approach, and features may evolve as development progresses.

## Goal

Mafqoodi aims to make lost and found reporting more organized and accessible in Palestine by bringing scattered reports into one platform and using intelligent matching to help connect lost items with the people who found them.
