# Socially - Full-Stack Social Media Application

A modern, responsive social media application built with React, Node.js, and SQLite.

## Features

- **Authentication**: Secure sign-up and login using JWT and bcrypt.
- **Home Feed**: Create posts, view a real-time feed of all users.
- **Interactions**: Like and comment on posts.
- **Profiles**: View user profiles with their stats (posts, followers, following) and post history.
- **Social Graph**: Follow and unfollow other users.
- **Responsive Design**: Polished UI built with Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Setup the Backend
```bash
cd backend
npm install
# The database will be automatically created on the first run
npm start
```
The server will start on `http://localhost:5000`.

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

## Testing

To run the automated end-to-end tests (requires Playwright):
```bash
# Ensure both servers are running first
python3 /path/to/verify_full.py
```

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React, React Router
- **Backend**: Node.js, Express, Sequelize ORM, SQLite, JWT, Bcrypt
