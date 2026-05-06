# AI Customer Support Agent

A customer support platform that helps support teams manage customer queries more efficiently using OpenAI-powered summarization, categorization, and response generation.

The platform allows agents to view incoming customer issues, analyze risk and sentiment, generate AI summaries, and create draft responses directly from the dashboard.

---

<img width="959" height="680" alt="Screenshot 2026-05-06 at 3 25 45 pm" src="https://github.com/user-attachments/assets/348ef5ad-1dfc-492a-8d7f-bc5390008c32" />
<img width="1098" height="718" alt="Screenshot 2026-05-06 at 3 31 11 pm" src="https://github.com/user-attachments/assets/21ff4c3f-40df-4999-bb9e-c0a58acdae40" />


# Tech Stack

## Frontend
- Next.js
- React
- Tailwind CSS

## Backend
- Python
- FastAPI
- OpenAI API

## Database
- PostgreSQL

---

# Features

## AI-Powered Ticket Analysis
The backend processes customer support queries using the OpenAI API and automatically extracts:

- Issue Type
- Risk Level
- Customer Sentiment
- AI Summary
- Draft AI Response

---

## Smart Categorization
Customer issues are automatically categorized into different support groups such as:

- Billing
- Technical Issues
- Account Access
- Subscription Problems
- Product Feedback
- Refund Requests

---

## Risk Detection
The system identifies potentially high-risk customer conversations including:

- Escalation threats
- Refund demands
- Negative customer sentiment
- Urgent support cases

Risk levels include:
- Low
- Medium
- High

---

## Sentiment Analysis
The platform analyzes customer tone and classifies sentiment as:

- Positive
- Neutral
- Negative

This helps support agents prioritize critical conversations faster.

---

## AI Summary Generation
Support agents can click on **Generate Summary** to instantly create a concise overview of the customer issue using OpenAI.

Example:
- Main problem
- Customer frustration points
- Requested resolution
- Timeline of issue

<img width="889" height="344" alt="Screenshot 2026-05-06 at 3 26 54 pm" src="https://github.com/user-attachments/assets/a032c597-b324-4a42-8bd9-a443f291a387" />


---

## AI Draft Response Generation
Agents can also click **Generate Draft Response** to automatically create a professional customer response powered by OpenAI.

The generated response helps:
- Reduce response time
- Maintain professional communication
- Improve support efficiency


<img width="844" height="220" alt="Screenshot 2026-05-06 at 3 31 28 pm" src="https://github.com/user-attachments/assets/6f2c66c3-3c41-46e6-83d2-0a2d59089291" />

---

# System Architecture

## Frontend
The frontend is built using Next.js and React and provides:

- Customer ticket dashboard
- AI summary generation buttons
- Draft response generation
- Ticket filtering and categorization
- Risk and sentiment indicators

---

## Backend
The FastAPI backend handles:

- API routing
- OpenAI API integration
- Ticket processing
- Categorization logic
- Sentiment analysis
- AI-generated summaries and responses

---

# API Workflow

1. Customer query is submitted
2. Backend sends request to OpenAI API
3. AI processes the message
4. Backend extracts:
   - Summary
   - Sentiment
   - Risk
   - Issue Type
   - Draft Response
5. Frontend displays AI-generated results to support agents

---

# Example Workflow

## Customer Message
"My payment was charged twice and I still cannot access premium features."

## AI Output
- Category: Billing
- Sentiment: Negative
- Risk: Medium
- Summary: Customer was double charged and cannot access premium account benefits.
- Draft Response: Professional AI-generated customer support response.

---

# Future Improvements

- Gmail integration for automatic ticket syncing
- Real-time notifications
- Multi-agent collaboration
- Analytics dashboard
- Vector database for semantic ticket search
- RAG-based customer knowledge retrieval
- Fine-tuned support models

---




