# MedNotes.AI

## Project Description

MedNotes.AI is a full-stack educational application designed to automate the creation of study materials for dental students. Leveraging the Google Gemini 2.5 Flash model, the application processes inputs ranging from raw text topics to uploaded PDFs and anatomical images. It synthesizes this data into structured, exam-oriented notes containing definitions, classifications, clinical features, treatments, mnemonics, and viva questions. The system includes a persistent library for data storage and a specialized Quiz Mode for active recall practice.

## Architecture

The application follows a client-server architecture using the MERN stack (MongoDB, Express.js, React, Node.js).

1. **Client:** The React frontend (built with Vite) captures user input (text, files) and renders the structured JSON response. It handles state management for the note library and interactive quiz interface.
2. **Server:** The Node.js/Express backend acts as an intermediary. It sanitizes requests, communicates with the Google Generative AI API to generate content, and interfaces with MongoDB to persist user data.
3. **AI Integration:** The backend utilizes the `@google/generative-ai` SDK to interact with the Gemini 2.5 Flash model, enforcing strict JSON output schemas for consistent data parsing.

## Key Features

* **Multimodal Content Generation:** Generates notes from textual topics, PDF documents, and image inputs.
* **Structured Output:** Automatically formats content into standardized medical note sections (Etiology, Clinical Features, Treatment, Prognosis).
* **Automated Viva Generation:** Produces 10-15 viva-voce questions per topic.
* **Interactive Quiz Mode:** transforms extracted questions from the library into a flashcard-style assessment interface.
* **Digital Library:** Provides persistent storage (CRUD operations) for generated notes using MongoDB.
* **Mobile-First Design:** Responsive user interface optimized for mobile devices.

## Tech Stack

**Frontend**

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Icons:** Lucide-React
* **Notifications:** React Hot Toast

**Backend**

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **AI Service:** Google Gemini API (Model: `gemini-2.5-flash`)
* **Utilities:** Dotenv, Cors, Multer (implied for file handling)

## Prerequisites

Ensure the following tools are installed before setup:

* Node.js (v18.0.0 or higher)
* npm (v9.0.0 or higher)
* MongoDB Atlas URI (or local MongoDB instance)
* Google Gemini API Key (obtained from Google AI Studio)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Apoorv479/MedNotes.AI.git
cd MedNotes.AI

```

### 2. Backend Setup

Navigate to the server directory, install dependencies, and configure environment variables.

```bash
cd server
npm install

```

Create a `.env` file in the `server` directory with the following content:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_ai_studio_api_key

```

### 3. Frontend Setup

Navigate to the client directory, install dependencies, and configure environment variables.

```bash
cd ../client
npm install

```

Create a `.env` file in the `client` directory with the following content:

```env
VITE_API_URL=http://localhost:5000/api

```

*Note: If testing on a mobile device on the same network, replace `localhost` with your machine's local IP address (e.g., `http://192.168.1.5:5000/api`).*

## Usage

### Development Mode

To run the application locally, you must start both the backend and frontend servers.

**Start Backend:**
Open a terminal in the `server` directory:

```bash
npm run dev

```

*The server will start on port 5000.*

**Start Frontend:**
Open a new terminal in the `client` directory:

```bash
npm run dev

```

*The client will start on the port provided by Vite (usually 5173).*

Access the application at `http://localhost:5173`.

### Production Build

To build the frontend for deployment:

```bash
cd client
npm run build

```

This generates static files in the `client/dist` directory.

## Project Structure

```text
MedNotes.AI/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # Axios instance and API calls
│   │   ├── components/     # Reusable UI components (GenerateForm, NotesView, QuizMode)
│   │   ├── pages/          # Main page views (HomePage)
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Frontend environment variables
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Backend Node.js Application
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic (AI service integration)
│   ├── server.js           # Express app entry point
│   ├── .env                # Backend environment variables
│   └── package.json        # Backend dependencies
├── .gitignore              # Git ignore rules
└── package.json            # Root configuration (optional for monorepo scripts)

```

## API Endpoints

The backend exposes the following RESTful endpoints via the `/api` prefix.

| Method | Endpoint | Description | Request Body |
| --- | --- | --- | --- |
| **POST** | `/api/notes/generate` | Generates notes using AI | `{ subject, topic, mode, baseText/image }` |
| **GET** | `/api/notes` | Retrieves all saved notes | N/A |
| **DELETE** | `/api/notes/:id` | Deletes a note by ID | N/A |
