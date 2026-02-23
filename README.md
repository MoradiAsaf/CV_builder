# CV Builder

A full-stack web application for building professional CVs with AI-powered text improvement.

## Technologies

### Client
- React (Vite)
- React Router
- Context API
- Material UI (MUI)
- Axios

### Server
- Express
- OpenAI API
- CORS
- dotenv

## Project Structure

```
CV_builder/
├── client/                # React frontend
│   └── src/
│       ├── components/    # UI components
│       ├── context/       # CVContext (state management)
│       ├── App.jsx        # Routing setup
│       └── main.jsx       # Entry point
└── server/
    ├── server.js          # Express server with API endpoints
    └── .env               # OpenAI API key
```

## Features

- **Editor Page (`/editor`)** - Fill in CV details:
  - Personal details (name, phone, email) with validation
  - Professional summary with AI improvement
  - Education (institution, degree, years)
  - Skills (add/remove with chips)
  - Work experience with AI improvement for role & description
  - Save CV to server

- **Preview Page (`/preview`)** - View saved CV as a clean document (read-only, fetched from server)

- **AI Integration** - OpenAI-powered improvement for:
  - Professional summary
  - Job title and experience description

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cv/save` | Save CV data to server memory |
| GET | `/api/cv` | Get saved CV data |
| POST | `/api/improve-summary` | Improve professional summary with AI |
| POST | `/api/improve-experience` | Improve job title & description with AI |

## Getting Started

### Prerequisites
- Node.js

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

```bash
# Start the server (port 3001)
cd server
npm start

# Start the client (port 5173)
cd ../client
npm run dev
```

Open `http://localhost:5173` in your browser.

### Environment Variables

Create a `.env` file in the `server/` directory:

```
OPENAI_API_KEY=your_openai_api_key
```
