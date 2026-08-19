# Blooger

A full-stack blogging platform built with the MERN stack, featuring Markdown-based writing, live preview, authentication, public blog reading, user profiles, and blog management.

## Features

- User registration and login
- JWT-based authentication
- HTTP-only refresh-token cookies
- Protected routes
- Markdown blog editor
- Live Markdown preview
- Publish and read blogs
- Author information
- User profile and blog management
- Delete blogs
- Responsive dark UI

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- React Markdown
- Remark GFM
- Rehype Highlight
- Highlight.js
- React Modal

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS

## Project Structure

```text
blooger/
├── blooger-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx
│   │   │   ├── Mainlayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Preview.jsx
│   │   ├── context/
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Profile.jsx
│   │       ├── Writeblog.jsx
│   │       └── BlogReader.jsx
│   ├── package.json
│   └── vercel.json
│
└── blooger-backend/
    ├── src/
    ├── package.json
    └── .env 
```

## Api Routes

# Authentication

POST /api/auth/register

POST /api/auth/login

GET  /api/auth/refresh-token

# Blogs
GET    /api/blog/blogs

GET    /api/blog/:id

GET    /api/blog/myblogs

POST   /api/blog/postblog

DELETE /api/blog/delete/:id

## Running locally

# Frontend

cd blooger-frontend

npm install

npm run dev


# Backend

cd blooger-backend

npm install

npm run dev


