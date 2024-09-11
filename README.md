# Shram Assignment React Game App

## Project Overview

## Live Demo

[Check out the live app here!](https://shram-assignment-react-game-app.vercel.app/)

This is a simple MERN stack number guessing game. The game allows users to play, track their scores, and save their progress with user authentication and high score tracking. A confetti celebration animation is triggered whenever a new high score is reached.

### Features:
1. **Game Functionality**:  
   - Users can guess a number and accumulate scores based on performance.
   - The game displays real-time score updates during gameplay.
   - After each session, users can see their score and have the option to play again.
   
2. **High Score Feature**:  
   - Stores and displays the user's highest score.
   - Confetti animation triggers when the user breaks their high score.
   
3. **User Data Storage (Backend Integration)**:  
   - Backend stores user information such as username, past scores, and high scores using Node.js, Express, and MongoDB.
   
4. **User Authentication**:  
   - Users can register and log in to keep track of their game data.
   
5. **Data Fetching**:  
   - Past scores and the high score are fetched and displayed upon login.
     
6. **Leaderboard**:  
   - Displays the top 10 users based on high scores.

7. **Animations**:  
   - Special effects and animations when the user is nearing their high score to enhance the gaming experience.
   
8. **Clean Code Architecture**:  
   - The project follows clean code principles, using separation of concerns and modularity to improve the structure and maintainability of the code.     
   
9. **Deployment**:  
   - The frontend is deployed on Vercel, and the backend can be deployed on services like Railway.

---

## Technologies Used:
- Frontend: React.js, Tailwind CSS, React Router, Axios, React Confetti
- Backend: Node.js, Express, MongoDB, JWT Authentication
- Deployment: Vercel (Frontend), Railway (Backend)

---

## Setup Instructions

### Prerequisites:
- Node.js (v16 or later)
- MongoDB (Local or MongoDB Atlas)
- A Vercel or similar hosting account for frontend deployment.
- A Railway account for backend deployment.

### Steps to Run the Application Locally:
## Setting Up a React Game App

**1. Clone the Repository**

```bash
git clone https://github.com/RishabJha134/Shram-Assignment-React-Game-App.git
```

**2. Set Up the Backend**

```bash
cd Shram-Assignment-React-Game-App/server
npm install
```

Create a `.env` file in the `server` directory with the following content:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

Replace placeholders with your actual values.

```bash
npm run start
```

**3. Set Up the Frontend**

```bash
cd ../client
npm install
npm run dev
```

This will start the frontend development server on `http://localhost:5173`.

## Setting Up a React Game App

**1. Clone the Repository**

```bash
git clone https://github.com/RishabJha134/Shram-Assignment-React-Game-App.git
```

**2. Set Up the Backend**

```bash
cd Shram-Assignment-React-Game-App/server
npm install
```

Create a `.env` file in the `server` directory with the following content:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

Replace placeholders with your actual values.

```bash
npm run start
```

**3. Set Up the Frontend**

```bash
cd ../client
npm install
npm run dev
```

This will start the frontend development server on `http://localhost:5173`.

## API Endpoints

The backend provides the following routes:

* **POST /api/auth/register:** Register a new user.
* **POST /api/auth/login:** Log in an existing user.
* **GET /api/game/highscore:** Fetch the current user's high score.
* **GET /api/game/user-data:** Fetch the current user's past scores.
* **POST /api/game/highscore:** Update the user's high score.

## Deployment

* **Frontend:** Deployed on Vercel.
* **Backend:** Hosted on a server with MongoDB Atlas for data storage.

## GitHub Repo

[Shram Assignment React Game Repo]

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the app.

##License

This project is open source and available under the MIT License.




