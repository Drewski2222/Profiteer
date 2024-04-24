
![Profiteer Logo](https://github.com/Drewski2222/Profiteer/blob/main/mern/client/public/prifiteerreadme.PNG)

## Table of Contents

1. [Project Description](#project-description)
2. [Management](#management)
    - [Code Management](#code-management)
    - [Project Management](#project-management)
    - [Test Plan](#test-plan)
3. [Documentation](#documentation)
    - [Technical Details](#technical-details)
    - [Installation Instructions](#installation-instructions)
    - [Login and Access Instructions](#login-and-access-instructions)
    - [API Keys](#api-keys)
4. [Assessments](#assessments)
    - [Risk Management Plan](#risk-management-plan)
    - [Software Quality Attributes](#software-quality-attributes)
5. [References](#references)
6. [Developers](#developers)
7. [Video Demonstration](#video-demonstration)

## Project Description

Profiteer is a money-saving app designed to show spending trends and educate users about finances. It allows users to set spending limits and track their financial progress over time.

## Management

### Code Management

Our project's source code is hosted on [GitHub](https://github.com/Drewski2222/Profiteer). We utilized branches such as 'frontend' and 'backend' for specific tasks, merging them into the 'end-to-end-registration' branch upon completion. The 'main' branch was used for deployment-ready features. Clear commit messages were used for better collaboration.

### Project Management

We used Jira for agile project management, Discord for communication, and Kanban boards to track tasks and progress.

### Test Plan

Each segment was rigorously tested to ensure new functionality didn't negatively impact the product. Tests included API calls and manual event triggering.

## Documentation

### Technical Details

Profiteer utilizes the MERN stack. MongoDB securely stores user data, while frontend visualizations are powered by libraries like particles.js and D3.js.

### Installation Instructions

To use Profiteer, clone the repository and install dependencies using npm. Copy the following configuration to a `.env` file before filling it out with appropriate values:

```plaintext
# Copy this over to .env before you fill it out!

# Get your Plaid API keys from the dashboard: https://dashboard.plaid.com/account/keys
PLAID_CLIENT_ID=YOUR_CLIENT_ID
PLAID_SECRET=YOUR_SECRET_KEY

# Use 'sandbox' to test with fake credentials in Plaid's Sandbox environment
# Use 'development' to test with real credentials while developing
# Use 'production' to go live with real users
PLAID_ENV=sandbox

# (Optional) A URL for the webhook receiver running on port 5001. In the 
# tutorial, we'll use ngrok to expose this to the outside world.
WEBHOOK_URL=https://www.example.com/server/receive_webhook
```

### Login and Access Instructions

Users can sign up, connect their bank information, and access the dashboard. Detailed instructions are provided within the app.

### API Keys

API keys for Plaid are required to run Profiteer locally.

## Assessments

### Risk Management Plan

We mitigated risks by safeguarding API keys, using trusted services like Plaid, and preventing SQL injection attacks.

### Software Quality Attributes

Profiteer features an appealing frontend, efficient database structure, and secure data handling.

## References

- [D3 Graph Gallery](https://d3-graph-gallery.com/)
- [MERN Stack Development with Axios and Express](https://vishalghai.medium.com/mern-talks-how-to-use-axios-and-express-in-mern-stack-development-27e5a00de194)
- [Particles.js](https://particles.js.org/)
- [Plaid API Documentation](https://plaid.com/docs/link/react-native/)
- [Plaid Transactions API](https://plaid.com/docs/api/products/transactions/)

## Developers

- [Jacob Hoppenstedt](https://www.linkedin.com/in/jacob-hoppenstedt/)
- [Trevor Gross](https://www.linkedin.com/in/trevorjgross/)
- [Drew Reisner](https://www.linkedin.com/in/drew-reisner/)
- Nathaniel Babione

## Video Demonstration

[Link to Video Demonstration](https://youtu.be/VhNXovdPVUU)

