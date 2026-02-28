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
- [Python 3](https://www.python.org/) (optional, for running E2E tests)

## Getting Started

### 1. Clone the repository
```bash
cd <repository-directory>
```

### 2. Setup the Backend
```bash
cd backend
npm install
# The database will be automatically created on the first run
npm start
```
The server will start on `http://localhost:5001`.

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

## Testing the Application

### Automated End-to-End Testing (Recommended)
The project includes a comprehensive Playwright script that tests the entire user flow: registration, posting, logging out, liking as another user, and following.

1. **Ensure both servers (Backend & Frontend) are running.**
2. **Install Playwright dependencies:**
   ```bash
   pip install playwright
   playwright install chromium
   ```
3. **Run the verification script:**
   ```bash
   python3 verify_full.py
   ```
   *Note: Ensure the script path matches where it is stored in your environment.*

### Manual Testing Steps
1. **Register**: Go to `http://localhost:3000/register` and create an account.
2. **Post**: On the home feed, write a message and click "Post".
3. **Logout**: Click the logout icon in the navbar.
4. **Interact**: Register a second account, and try clicking the Heart icon on the post you made earlier.
5. **Follow**: Click on the username of the first user to go to their profile, then click "Follow".

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React, React Router
- **Backend**: Node.js, Express, Sequelize ORM, SQLite, JWT, Bcrypt
