<div align="center">

# 🧠 AI Natural Language Analytics Engine

**Ask questions in plain English. Get database answers instantly.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## 📌 Overview

A full-stack application that translates plain English into SQL queries — no database knowledge required. Non-technical users can ask natural language questions and receive real-time results pulled directly from a relational database.

---

## ⚙️ How It Works
```txt
User Input (plain English)
        ↓
  OpenAI API (NL → SQL translation)
        ↓
  Input Validation & Sanitization Layer
        ↓
  PostgreSQL Query Execution
        ↓
  Formatted Results → React Frontend
```

1. User submits a plain English question via the React frontend
2. Node.js backend sends input to the OpenAI API, which generates a SQL query
3. Generated query passes through a multi-layer validation and sanitization pipeline
4. Sanitized query executes securely against the PostgreSQL database
5. Results are returned and rendered in the frontend

---

## ✨ Features

- 🔤 **Natural Language → SQL Pipeline** — Modular translation pipeline built in Node.js converts plain English to executable SQL
- 📊 **Dynamic & Aggregation Query Support** — Handles everything from simple lookups to complex `GROUP BY`, `COUNT`, and `SUM` queries
- 🛡️ **Multi-Layer Input Validation** — Every input is validated and sanitized before hitting the database
- 👥 **Non-Technical Friendly** — No SQL or database knowledge needed

---

## 🔒 Security

| Layer | Implementation |
|---|---|
| Pre-execution validation | Generated SQL is checked against an allowlist of permitted query structures |
| Data sanitization | Inputs are stripped of potentially harmful characters or patterns |
| Restricted DB access | Backend connects via a read-only PostgreSQL role |

---

## 💬 Example Queries

| Plain English | Generated SQL |
|---|---|
| *"How many users signed up last month?"* | `SELECT COUNT(*) FROM users WHERE created_at >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')` |
| *"Show me total revenue by product category"* | `SELECT category, SUM(revenue) FROM orders GROUP BY category` |
| *"Who are the top 5 customers by order value?"* | `SELECT customer_name, SUM(order_total) FROM orders GROUP BY customer_name ORDER BY SUM(order_total) DESC LIMIT 5` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- OpenAI API key

### Installation
```bash
git clone https://github.com/your-username/nl-analytics-engine.git
cd nl-analytics-engine
npm install
```

### Environment Variables

Create a `.env` file in the root:
```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
PORT=3000
```

### Run
```bash
npm run server   # Start backend
npm run client   # Start frontend
```

---

<div align="center">

Made with ❤️ | MIT License

</div>
