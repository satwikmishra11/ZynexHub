# ZynexHub

ZynexHub is a full-stack social networking platform where users can connect, share, and communicate in real time. Designed with secure user authentication, profile management, and live chat, ZynexHub includes essential features for a modern social media application.

## Features

- **User Authentication**: Secure registration and login using JWT tokens.
- **User Profiles**: Users can create and personalize profiles with bios and profile pictures.
- **Posting and Interaction**: Post content, like, comment, and share with other users.
- **Real-Time Chat**: Engage in live, one-on-one messaging through Socket.io.
- **Feed System**: See a personalized feed with posts from followed users.
- **Security**: Built with bcrypt password encryption, HTTPS, and secure coding practices.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB (or PostgreSQL if relational data is preferred)
- **Real-Time Communication**: Socket.io for live messaging
- **Authentication**: JSON Web Tokens (JWT)

## Project Structure

- **/backend**: API for handling user authentication, post management, and chat services.
- **/frontend**: React-based components for login, profile, feed, and chat interfaces.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) (or PostgreSQL)
- [Socket.io](https://socket.io/)

### Installation

 1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zynexhub.git
   cd zynexhub
   ```
 2.Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
 3.Install frontend dependencies:
   ```  bash
   cd ../frontend
   npm install
   ```   
Set up environment variables: Create a .env file in the /backend folder and add:
 ```bash
MONGODB_URI=<your_mongo_database_url>
JWT_SECRET=<your_jwt_secret_key>
 ```
Start the backend server:
 ```bash
cd ../backend
npm start
 ```
Start the frontend server:
 ```bash
cd ../frontend
npm start
 ```
Usage
Once both servers are running, navigate to http://localhost:3000 to access the ZynexHub frontend.

Contributing
Contributions are welcome! Feel free to submit issues and pull requests to help improve ZynexHub.

License
This project is licensed under the MIT License.

Contact
For any inquiries, please reach out to Satwik Mishra.
