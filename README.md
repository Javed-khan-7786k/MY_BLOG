# 📝 MY BLOG — Full Stack MERN Web Application

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.2_Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> A modern, responsive, full-stack blogging platform built with the **MERN** stack (**M**ongoDB, **E**xpress, **R**eact, **N**ode.js), **TypeScript**, **Tailwind CSS**, and **Vite**. Features complete CRUD operations for blog posts, real-time article upvoting/downvoting, interactive comment threads, Joi data validation, and clean MVC architecture.

---

## ✨ Features

- 📰 **Dynamic Article Feed**: Browse articles with clean card views, rich metadata, read times, and tags.
- ✍️ **Article Publishing & Management**: Create, view, update, and manage full blog posts with Formik & Yup validated forms.
- 👍 **Upvote & Downvote System**: Express interest in articles with interactive voting counters.
- 💬 **Interactive Commenting System**: Add, edit, and delete comments on articles in real time.
- 🛡️ **Schema Validation**: Server-side data validation using **Joi** and client-side form validation with **Formik & Yup**.
- 🎨 **Modern & Responsive UI**: Designed with **Tailwind CSS v4** for optimal layout on mobile, tablet, and desktop screens.
- ⚡ **Fast & Type-Safe**: High-performance frontend powered by **Vite** and fully typed with **TypeScript**.
- 🌐 **Clean REST API**: Well-structured Express 5 API with CORS configuration, global error handling, and health check endpoints.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Form Handling**: Formik & Yup
- **Icons**: React Icons

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ORM (v9)
- **Transpiler**: Babel (ES Modules support)
- **Validation**: Joi Schema Validation
- **Middleware**: CORS, Dotenv, Custom Error Handler

---

## 📁 Repository Structure

```
MY_BLOG/
├── backend/                  # Express.js REST API Server
│   ├── src/
│   │   ├── config/           # Database connection setup (Mongoose)
│   │   ├── controllers/      # Business logic & request handlers
│   │   ├── middleware/       # Custom middleware (Validation, Error handling)
│   │   ├── models/           # Mongoose schemas (Article, Blog)
│   │   ├── routes/           # Express API endpoints
│   │   ├── validations/      # Joi schema definitions
│   │   └── server.js         # Express server entry point
│   ├── .env.example          # Environment variables template
│   ├── .babelrc              # Babel configuration
│   └── package.json          # Backend dependencies & scripts
│
├── frontend/                 # React + TypeScript + Vite Client App
│   ├── src/
│   │   ├── assets/           # Static images & graphics
│   │   ├── components/       # Reusable UI components (NavBar, Cards, Comments, Forms)
│   │   ├── pages/            # Page views (HomePage, ArticlePage, AboutPage, etc.)
│   │   ├── config/           # API client configuration
│   │   ├── App.tsx           # Main App component & routes
│   │   └── main.tsx          # React DOM entry point
│   ├── index.html            # HTML entry point
│   ├── vite.config.ts        # Vite configuration
│   ├── .env.example          # Environment variables template
│   └── package.json          # Frontend dependencies & scripts
│
├── .gitignore                # Git ignore rules for root & subdirectories
└── README.md                 # Project documentation
```

---

## 📡 API Endpoints Summary

### **Articles API (`/api`)**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/articles` | Get list of all articles content |
| `GET` | `/api/articles/:name` | Get single article by slug name |
| `POST` | `/api/articles/:name/upvote` | Upvote an article |
| `POST` | `/api/articles/:name/downvote` | Downvote an article |
| `POST` | `/api/articles/:name/add-comment` | Add a new comment to an article |
| `PUT` | `/api/articles/:name/edit-comment` | Edit an existing comment |
| `DELETE` | `/api/articles/:name/Delete/:username/:msg` | Delete a comment from an article |

### **Blogs API (`/api`)**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/blogs` | Get all blog entries |
| `POST` | `/api/Article/Add/blogs` | Create a new blog post |
| `PUT` | `/api/blogs/:id` | Update an existing blog post by ID |
| `DELETE` | `/api/blogs/:id` | Delete a blog post by ID |

### **System**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend healthcheck status |

---

## ⚙️ Environment Variables

### **Backend (`backend/.env`)**

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=my-blog
CORS_ORIGIN=http://localhost:5173
```

### **Frontend (`frontend/.env`)**

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js**: `v18+` installed
- **MongoDB**: Local MongoDB instance running or MongoDB Atlas connection string
- **Git**: Installed on your machine

---

### **1. Clone the Repository**

```bash
git clone https://github.com/Javed-khan-7786k/MY_BLOG.git
cd MY_BLOG
```

---

### **2. Setup & Run Backend**

```bash
# Navigate to backend folder
cd backend

# Install backend dependencies
npm install

# Create .env file from .env.example
cp .env.example .env

# (Optional) Seed the database with sample articles and comments
npm run seed

# Start backend development server
npm run dev
```

The Express API server will start on `http://localhost:8000`.

---

### **3. Setup & Run Frontend**

```bash
# Navigate to frontend folder (from repository root)
cd frontend

# Install frontend dependencies
npm install

# Create .env file from .env.example
cp .env.example .env

# Start frontend development server
npm run dev
```

The Vite dev server will start on `http://localhost:5173`. Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

### **Backend**

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `npx nodemon --exec npx babel-node src/server.js` | Runs backend in watch mode |
| `npm run seed` | `npx babel-node src/seed.js` | Seeds MongoDB database with initial sample data |
| `npm run build` | `npx babel src -d dist` | Transpiles backend source code to ES5/CommonJS |
| `npm start` | `node dist/server.js` | Starts production server from `dist/` |

### **Frontend**

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts Vite development server |
| `npm run build` | `tsc -b && vite build` | Type-checks and builds production bundle |
| `npm run preview` | `vite preview` | Previews production build locally |
| `npm run lint` | `eslint .` | Runs ESLint checks |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [Issues page](https://github.com/Javed-khan-7786k/MY_BLOG/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

<p center>
Developed with ❤️ by <a href="https://github.com/Javed-khan-7786k">Javed Khan</a>
</p>
