````md
# AI Trip Planner

An AI-powered travel planner that generates personalized trip itineraries based on destination, travel duration, budget, and travel companions, with Google authentication and Firebase trip storage.

## Live Demo

https://travel-planner-ai-five-xi.vercel.app/

## Features

- Generate personalized trips using Gemini AI
- Search destinations with Google Places Autocomplete
- View recommended hotels for your trip
- Get a complete day-wise travel itinerary
- Sign in with your Google account
- Save trips to Firebase Firestore
- View your previously created trips
- Display destination images using the Google Places API
- Responsive interface built with Tailwind CSS

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM

### Backend & Services

- Gemini AI
- Firebase Authentication
- Cloud Firestore
- Google Places API
- Pexels API

## Project Structure

```text
src
├── assets
├── components
│   └── ui
├── constants
├── create-trip
├── lib
├── my-trips
├── service
├── view-trip
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Go to the project directory

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your environment file

Create a file named `.env` in the project root and copy the contents from `.example.env`.

Example:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key

VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key

VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id

VITE_FIREBASE_API_KEY=your_firebase_api_key

VITE_PEXELS_API_KEY=your_pexels_api_key
```

### 5. Configure Firebase

Create a Firebase project and enable:

- Authentication
- Google Sign-In
- Cloud Firestore

Update `firebaseConfig.jsx` with your Firebase configuration if needed.

### 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Preview the Production Build

```bash
npm run preview
```

## Environment Variables

The project uses the following environment variables.

| Variable                     | Description            |
| ---------------------------- | ---------------------- |
| `VITE_GEMINI_API_KEY`        | Gemini AI API key      |
| `VITE_GOOGLE_PLACE_API_KEY`  | Google Places API key  |
| `VITE_GOOGLE_AUTH_CLIENT_ID` | Google OAuth Client ID |
| `VITE_FIREBASE_API_KEY`      | Firebase API key       |
| `VITE_PEXELS_API_KEY`        | Pexels API key         |

A sample configuration is already provided in `.example.env`.

## License

This project is open source and available under the MIT License.
````
