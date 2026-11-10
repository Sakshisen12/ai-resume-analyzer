# 🎯 RESUME AI | Intelligent Resume & Job Match Analyzer

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

**Land your dream job with real-time AI resume analysis, ATS optimization, and role compatibility matching.**

RESUME AI is an enterprise-grade, cyber-themed candidate evaluation platform. It leverages **Google Gemini 2.5 Flash** with automated fallback redundancy to score resumes, identify critical skill gaps, optimize ATS machine-readability, and perform deep semantic matching against real job descriptions.

---

## 🌐 Live Deployments

- **Frontend Application:** [https://ai-resume-analyzer-rust-phi.vercel.app/](https://ai-resume-analyzer-rust-phi.vercel.app/)
- **Backend API:** [https://ai-resume-analyzer-backend-80k8.onrender.com/](https://ai-resume-analyzer-backend-80k8.onrender.com/)
- **API Health Check:** [https://ai-resume-analyzer-backend-80k8.onrender.com/health](https://ai-resume-analyzer-backend-80k8.onrender.com/health)

---

## ✨ Core Features

### ⚡ AI Resume Scoring & Evaluation
- **Overall Impact Score:** Dynamic 0–100 score analyzing structure, experience metrics, and technical depth.
- **ATS Compatibility Engine:** Calculates machine-readability percentage and formatting readiness for Taleo, Workday, and Greenhouse.
- **Skills Extraction & Gap Detection:** Identifies candidate proficiencies and highlights critical missing technologies.
- **Interactive Skills Radar:** Visual representation of technical strength using Recharts polygon mapping.
- **Actionable Suggestions:** Categorized, bullet-by-bullet improvements tailored to boost interview call rates.

### 🎯 Target Job Matcher
- **Job Description Parsing:** Paste any job post to extract hard requirements and primary keywords.
- **Match Compatibility Percentage:** Evaluates how well your resume matches the role.
- **Keyword Gap Analysis:** Highlights mandatory keywords present vs. missing in your profile.
- **Optimization Strategy:** Step-by-step tactical advice on framing existing experience for the target position.

### 📜 Analysis History & Version Control
- **Snapshot Archive:** Saves historical resume scans and target match analyses.
- **Version Tracking:** Track score improvements over iterations.

### 👤 Modern SaaS Architecture & UI
- **Cyber-Tech Aesthetic:** High-performance dark-mode interface with ambient glows and glassmorphism.
- **Interactive Profile Menu:** Real-time online session indicator, verified candidate badge, and fast navigation.
- **Fault-Tolerant AI Engine:** Built-in multi-model fallback chain (`gemini-2.5-flash` → `gemini-2.5-flash-lite` → `gemini-flash-latest`) preventing downtime during Google AI Studio demand spikes.
- **Responsive Navigation:** Seamless mobile bottom navigation drawer, collapsible desktop sidebar, and sticky header.

---

## 🛠️ Tech Stack

### Frontend
- **Framework & Build:** React 19 + Vite 6
- **Language:** JavaScript (ES6+)
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS v4 (Custom dark neon palette with `@theme`)
- **Icons & UI:** Lucide React, Sonner Toast Notifications
- **Charts:** Recharts (Radar, Bar, Line charts)
- **Animations:** Framer Motion & CSS Keyframe Scanners

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4
- **Database:** MongoDB Atlas (Mongoose ODM)
- **AI Integration:** `@google/generative-ai` SDK (Google Gemini 2.5 Flash)
- **Authentication:** JWT (JSON Web Tokens) with salted `bcrypt` password hashing (12 rounds)
- **File Uploads:** Multer with memory/disk validation (PDF mime-type & size limits)
- **PDF Parser:** `pdf-parse` for text extraction
- **Asynchronous Queues:** BullMQ + Redis (optional worker pipeline)

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher, v20+ recommended)
- MongoDB Atlas cluster URI (or local MongoDB)
- Google Gemini API Key ([Get one free from Google AI Studio](https://aistudio.google.com/))

---

### 1. Clone the Repository
```bash
git clone https://github.com/Sakshisen12/ai-resume-analyzer.git
cd ai-resume-analyzer
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resume_ai?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
USE_REDIS=false
```

> **Note on MongoDB URI:** If your MongoDB password has special characters like `@`, `#`, or `$`, ensure they are URL-encoded (e.g., `@` becomes `%40`).

Run the backend development server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

---

### 3. Frontend Setup

Open a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
ai-resume-analyzer/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Environment, and Redis configs
│   │   ├── controllers/     # Auth, Resume, Analysis, and JobMatch controllers
│   │   ├── middleware/      # Auth guard (JWT), file upload (Multer), error handler
│   │   ├── models/          # User, Resume, Analysis, JobMatch (Mongoose)
│   │   ├── routes/          # REST endpoints (/auth, /resumes, /analysis, /job-match)
│   │   ├── services/        # Gemini AI prompt engine & fallback handler
│   │   ├── queues/          # BullMQ queue configurations
│   │   └── workers/         # Background job workers
│   └── uploads/             # Server storage for uploaded PDFs
│
├── frontend/
│   ├── public/              # Hero backgrounds, banners, and favicon
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, BottomNav, UploadZone, UI primitives
│   │   ├── context/         # AuthContext (React Context + JWT session state)
│   │   ├── hooks/           # Custom React hooks (useCountUp)
│   │   ├── lib/             # Navigation items, score utilities, styling helper
│   │   ├── pages/           # LandingPage, LoginPage, SignupPage, DashboardPage,
│   │   │                    # ResultsPage, MatchPage, HistoryPage, AnalyticsPage, SupportPage
│   │   ├── services/        # Axios API client with auth interceptors
│   │   ├── App.jsx          # React Router route definitions & ProtectedRoute guard
│   │   ├── main.jsx         # React DOM root render
│   │   └── index.css        # Tailwind CSS v4 styling & dark neon theme
│   ├── index.html           # Single-page application HTML entrypoint
│   └── vite.config.js       # Vite configuration & path aliases
└── README.md
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Welcome message & server info | No |
| `GET` | `/health` | Server uptime & DB connection status | No |
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT | No |
| `POST` | `/api/resumes/upload` | Upload resume PDF & parse text | Yes |
| `POST` | `/api/analysis/:resumeId` | Trigger Gemini resume analysis | Yes |
| `GET` | `/api/analysis/:id` | Fetch specific analysis results | Yes |
| `GET` | `/api/analysis/history` | List all past analyses for user | Yes |
| `POST` | `/api/job-match` | Analyze resume against a job description | Yes |

---

## 🛡️ Security & Privacy

- **Password Protection:** Passwords are never stored in plain text; they are encrypted using `bcrypt` with 12 salt rounds before hitting the database.
- **Isolated User Workspaces:** Database records use strict `userId` associations, ensuring zero cross-tenant data leakage.
- **Secure File Handling:** Uploaded files are strictly validated for `application/pdf` MIME types with size limits to prevent arbitrary file execution.
- **Protected API Keys:** Gemini and MongoDB keys exist solely on the secure backend server and are never exposed to the client.

---

## 👩‍💻 Author

**Sakshi Sen**
- GitHub: [@Sakshisen12](https://github.com/Sakshisen12)
- Repository: [ai-resume-analyzer](https://github.com/Sakshisen12/ai-resume-analyzer)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
