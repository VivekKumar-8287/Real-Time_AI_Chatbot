
# AI Stream Chat: Real-Time Streaming Interface

A high-performance, full-stack AI chat application featuring real-time, token-by-token streaming responses. Built with a React frontend and a Node.js/WebSocket backend, this project demonstrates smooth UX patterns for AI interactions, including a buffered "typewriter" effect and persistent chat history.

## 🚀 Tech Stack

**Frontend:**
- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide-React
- **Markdown:** React-Markdown

**Backend:**
- **Runtime:** Node.js
- **Server:** WebSocket (ws)
- **AI Provider:** Groq (Llama-3.3-70b-versatile)
- **Environment:** Dotenv

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- A Groq API Key (Get one for free at [console.groq.com](https://console.groq.com/))

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend

```

2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the `backend/` directory:
```text
GROQ_API_KEY=your_gsk_key_here
PORT=8080

```


4. Start the server:
```bash
npm run dev

```



### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
```bash
cd frontend

```


2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```



---

## 🏗️ Project Structure

```text
root/
├── frontend/          # React + Vite + Tailwind
│   ├── src/hooks/     # WebSocket & Streaming Logic
│   └── src/components/# UI Components (Chat, Input, Theme)
└── backend/           # Node.js + WebSocket Server
    └── server.ts      # AI Stream Relay Logic

```

---

## ✅ Features Implemented

* [x] **Real-time Streaming:** AI responses display token-by-token using WebSocket.
* [x] **Smart Input Lock:** Input field is disabled during "thinking" and "streaming" phases to prevent race conditions.
* [x] **Typewriter Buffer:** Implemented a queue-based buffer for a smooth, readable text-dripping effect.
* [x] **Markdown Support:** Full rendering for bold text, lists, and code blocks in AI responses.
* [x] **Message Persistence:** Chat history is saved to `localStorage` and persists across refreshes.
* [x] **Dark/Light Mode:** Full UI theme toggle using Tailwind CSS.
* [x] **Typing Indicator:** Animated "bouncing dots" while waiting for the first AI token.
* [x] **Clear Chat:** Functionality to wipe history from state and storage.
* [x] **Copy to Clipboard:** One-click copying for AI-generated responses.

---

## ⏱️ Time Spent

* **Backend/API Integration:** 1.5 hours
* **WebSocket & Streaming Logic:** 2 hours
* **UI/UX & Dark Mode:** 1.5 hours
* **Total:** ~5 hours

---

## 📺 Demo

[Link to Demo Video](https://www.google.com/search?q=Your_Link_Here)


