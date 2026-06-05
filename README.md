# ⚙️ Productivity Dashboard – Backend (TypeScript)

A **production-ready backend API** built with **Node.js, Express, and TypeScript**.  
It powers a Productivity Dashboard application with features like authentication, project management, goals, todos, and notes.

---

## 🚀 Features

- 🔐 JWT Authentication (Login/Register)
- 📧 Email verification system
- 📁 Project management APIs
- 🎯 Goals tracking (CRUD + status workflow)
- ✅ Todo management system
- 📝 Notes module
- 🛡️ Protected routes with middleware
- 🗄️ PostgreSQL database integration
- 🔒 Password hashing using bcrypt
- 📦 Modular architecture (controllers, services, models)
- ⚡ Type-safe backend using TypeScript

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT (Authentication)
- Bcrypt
- Nodemailer
- dotenv
- Joi (Validation)

---

## 📁 Project Structure

```bash
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middleware/
├── validators/
├── types/
├── config/
├── errors/
├── utils/
├── app.ts
└── server.ts
```

## ⚙️ Setup & Installation

### 1. Clone repository

```bash
git clone https://github.com/arunajain/productivity-dashboard-backend.git
cd productivity-dashboard-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000

POSTGRES_URI=postgresql://username:password@localhost:5432/productivity_dashboard

JWT_SECRET_KEY=your_jwt_secret
REFRESH_TOKEN_SECRET_KEY=your_refresh_secret

EMAIL_USER=example@example.com
EMAIL_PASS=example_password
```

---

### 4. Create database

```bash
createdb productivity_dashboard
```

---

### 5. Run database schema

```bash
psql -d productivity_dashboard -f db/schema.sql
```

---

### 6. Run development server

```bash
npm run dev
```

---

### 7. Build project

```bash
npm run build
```

---

### 8. Run production server

```bash
npm start
```

---

## 🚀 Done

Backend will now be running at:

```
http://localhost:5000
```
