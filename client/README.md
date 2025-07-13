# 🎓 Anyware Software – Full Stack Challenge

A full-stack web application to manage and display **quizzes** and **announcements** for students in the current semester.

---

## 🛠️ Tech Stack

### 🔷 Frontend

- React + Redux Toolkit
- TypeScript
- Material UI (MUI)
- React Router
- i18n-ready (Internationalization)
- React Testing Library (Unit + Integration tests)

## 📸 Demo

🌍 [Live Demo](https://anyware-software.vercel.app)

---

## 📱 Responsive Design

The UI is responsive and adapts to all screen sizes:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

---

## ✨ Main Features

- 🧑‍🏫 Protected Dashboard
- 📰 CRUD for Announcements
- 🧪 CRUD for Quizzes
- 🧩 Reusable UI Components
- 🖱️ Sidebar hover turns background/text white
- 🌍 i18n support for future translations
- 🧪 Unit & Integration Tests using React Testing Library

---

## ⏱️ Development Time

This project was completed in **23 hours**:

### ✅ Backend – 5 hours

- Setup Express.js project structure
- Mongoose schema modeling (Quiz & Announcement)
- REST API implementation (CRUD)
- Input validation using `express-validator`
- Environment config & error handling

### ✅ Frontend – 18 hours

- UI layout & responsive design using MUI
- Dashboard structure and sidebar design
- Login/Logout system with `requireAuth` HOC
- CRUD implementation using RTK Query
- Dialogs & Forms using MUI + React Hook Form + Zod
- Internationalization-ready structure (`i18n`)
- Reusable components: Tables, Modals, Buttons
- Testing: React Testing Library (unit & integration)

---

## 🧪 Testing

- Comprehensive unit and integration testing using **Vitest**
- Testing covers:
  - ✅ UI rendering and user interactions
  - ✅ API mutation and response handling
  - ✅ Authentication logic and protected route redirection
- Test Utilities:
  - `@testing-library/react`
  - `@testing-library/user-event`
  - `vitest` for running and organizing test suites

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/MoSalah07/anyware-software.git
cd anyware-software

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Run the backend
npm run dev

# Run the frontend (in another terminal)
cd ../frontend
npm run dev
```
