# 🚀 Online Coding & Quiz Platform (MERN Stack)

A full-featured MERN stack application for conducting online coding contests and quizzes. This platform enables users to register, participate in real-time quizzes and programming contests, and view their rankings instantly.

---

## 📌 Features

- 📝 **User Authentication** (Login/Register)
- 🧪 **MCQ Quizzes** with auto-evaluation
- 💻 **Live Coding Contests** with custom test cases
- 📊 **Leaderboard and Scoreboard**
- 🧑‍🏫 **Admin Panel** for creating quizzes and contests
- 🗃️ **Question Bank** for storing MCQs and coding questions
- 🕒 **Timer for quizzes and contests**
- 📥 **Code Execution API Integration**
- 📑 **Detailed Reports & Results**

---

## 🧰 Tech Stack

### 💻 Frontend
- React.js
- React Router
- Tailwind CSS / Bootstrap
- Axios

### 🖥️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### 🌐 Others
- JWT for Authentication
- Bcrypt for Password Hashing
- Code Execution via [Judge0 API](https://judge0.com/) or similar
- CORS, Dotenv, Helmet for security & environment management

---

## 📁 Project Structure

/client → React frontend
/server → Express backend
/models → MongoDB schemas
/routes → API endpoints
/controllers → Business logic
/middleware → Auth and other middlewares
/utils → Helper functions

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/online-coding-quiz-platform.git
cd online-coding-quiz-platform
2. Setup Backend
bash
Copy
Edit
cd server
npm install
cp .env.example .env
# Add your MongoDB URI and JWT_SECRET
npm run dev
3. Setup Frontend
bash
Copy
Edit
cd ../client
npm install
npm start
The app will run on: http://localhost:3000

🧪 Sample .env File
env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=your_jwt_secret_key
PORT=5000
🧑‍💻 Admin Features
Create/edit/delete quizzes and contests

Set start/end time

Add MCQs and coding problems

Enable/disable leaderboard visibility

👥 User Features
Register and login securely

Join ongoing quizzes and contests

Submit MCQ answers and code

Get live score updates (optional)

View results and feedback

🧮 Scoring Logic
MCQ: +1 for correct, 0 for incorrect

Coding:

10 pts per passed test case

Time and memory usage considered

📊 Leaderboard
Sorted by total score and submission time

Real-time updates via polling or sockets (optional)
