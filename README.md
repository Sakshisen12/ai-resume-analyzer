# 🎯 RESUME AI | Professional Resume Analyzer

![RESUME AI LANDING](https://github.com/Sakshisen12/ai-resume-analyzer/raw/main/frontend/public/banner.png) <!-- Placeholder, update if you have a banner -->

**Land your dream job with AI-powered analysis.** 

RESUME AI is a state-of-the-art platform that evaluates your resume against industry standards using the Google Gemini 2.0 Flash model. It provides professional scoring, ATS (Applicant Tracking System) optimization, and personalized improvement suggestions.

---

## 🚀 Live Demo
- **Frontend:** [https://ai-resume-analyzer-rust-phi.vercel.app/](https://ai-resume-analyzer-rust-phi.vercel.app/)
- **Backend API:** [https://ai-resume-analyzer-backend-80k8.onrender.com/health](https://ai-resume-analyzer-backend-80k8.onrender.com/health)

---

## ✨ Features

- **AI Scoring:** Get an instant score out of 100 based on your resume's content, structure, and impact.
- **ATS Optimization:** Intelligent parsing to ensure your resume passes through modern recruitment software.
- **Detailed Analytics:** Breakdown of skills, missing keywords, and formatting tips.
- **Job Matching:** (Coming Soon) Match your resume against specific job descriptions.
- **Cyber-Tech UI:** A sleek, high-performance dark-themed dashboard.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Custom Dark Theme)
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **AI Engine:** Google Gemini AI (Generative AI SDK)
- **Deployment:** Render (with optional Redis/BullMQ support)

---

## 💻 Local Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/Sakshisen12/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key
FRONTEND_URL=http://localhost:3000
USE_REDIS=false
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env.local` file in the `frontend` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Run the client:
```bash
npm run dev
```

---

## 📂 Project Structure

```text
├── backend/            # Express server (TS)
│   ├── src/
│   │   ├── config/     # DB & Env configs
│   │   ├── controllers/# Business logic
│   │   ├── models/     # Mongoose schemas
│   │   └── routes/      # API endpoints
├── frontend/           # Next.js app
│   ├── src/
│   │   ├── app/        # Pages & Layouts
│   │   ├── components/ # Shared UI components
│   │   └── services/   # API client
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author
**Sakshisen12** - [GitHub Profile](https://github.com/Sakshisen12)

Give a ⭐ if this project helped you!
