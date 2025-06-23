# Shopsphere

**Shopsphere** is a modern, full-stack e-commerce platform. It features a customer-facing storefront, an admin dashboard, and a robust backend API. Shopsphere is designed for scalability, maintainability, and ease of deployment.

---

## Demo

https://github.com/user-attachments/assets/b683f890-cb29-4fe2-8e6e-d544cc9a4bd0

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)

---

## Project Structure

```
Shopsphere/
  admin/    # Admin dashboard (React, JS)
  client/   # Customer storefront (React, TypeScript)
  server/   # Backend API (Node.js, Express, MongoDB)
```

- **admin/**: Admin dashboard for managing products, orders, and users.
- **client/**: Customer-facing web app for browsing and purchasing products.
- **server/**: RESTful API, authentication, order processing, and database integration.

---

## Tech Stack

- **Frontend (client/):**

  - React (TypeScript)
  - Tailwind CSS
  - Vite

- **Admin Dashboard (admin/):**

  - React (JavaScript)
  - Tailwind CSS
  - Vite

- **Backend (server/):**

  - Node.js, Express.js
  - MongoDB (via Mongoose)
  - Cloudinary (image uploads)
  - JWT Authentication
  - Multer (file uploads)

- **Deployment:**
  - Vercel

---

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB instance

### Clone the Repository

```bash
git clone https://github.com/yourusername/Shopsphere.git
cd Shopsphere
```

### 1. Setup the Backend (server/)

```bash
cd server
npm install
# Configure environment variables (e.g., .env for MongoDB URI, JWT secret, Cloudinary keys)
npm start
```

### 2. Setup the Client (client/)

```bash
cd ../client
npm install
npm run dev
```

### 3. Setup the Admin Dashboard (admin/)

```bash
cd ../admin
npm install
npm run dev
```

---

## Usage

- **Client**: Visit `http://localhost:5173` (or as shown in terminal) to browse and shop.
- **Admin**: Visit `http://localhost:5173` (or as shown in terminal) for the admin dashboard (login required).
- **API**: Server runs on `http://localhost:5000` by default.

---

## Deployment

- Vercel configuration files are present in each package for easy deployment.
- Set environment variables in Vercel dashboard for production.

---
