ChatSync - Real-Time Chat Application

 

🚀 Live Demo

🔗 https://chatsync-pqe6.onrender.com/

📌 Overview

ChatSync is a real-time chat application built with modern web technologies, allowing users to send text, images, and videos instantly. It features real-time messaging, media uploads, and a seamless UI for an engaging chat experience.

🛠 Tech Stack

Frontend:

⚡ React (with Vite for fast builds)

🎨 Tailwind CSS (for styling)

🔄 Zustand (for state management)

🔗 Axios (for API requests)

Backend:

🏗 Node.js & Express (for server-side logic)

📦 MongoDB (for database storage)

🔌 Socket.io (for real-time communication)

☁ Cloudinary (for image & video storage)

Deployment:

🚀 Render (for hosting backend & frontend)

🎯 Features

✅ Real-time messaging with Socket.io

✅ Media uploads (images & videos via Cloudinary)

✅ State management with Zustand

✅ Secure API with Express & MongoDB

✅ Responsive UI with Tailwind CSS

✅ Deployed on Render for live access


🖥️ Installation & Setup

1️⃣ Clone the Repository

https://github.com/KalashThakare/Chat-Application.git 

2️⃣ Setup Backend

cd backend

npm install

npm start  # Runs on port 4000 by default

3️⃣ Setup Frontend

cd frontend

npm install

npm run dev  # Runs on port 5173 by default

4️⃣ Environment Variables

Create a .env file in the backend/ directory and add:

MONGO_URI=your-mongodb-uri

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name

CLOUDINARY_API_KEY=your-cloudinary-api-key

CLOUDINARY_API_SECRET=your-cloudinary-api-secret

JWT_SECRET=your-jwt-secret


🚀 Deployment

Deploying on Render

Push your code to a GitHub repository

Connect Render with your repo

Deploy backend & frontend separately on Render

 

🤝 Contributing

Fork the repository

Create a new branch: git checkout -b feature-branch

Commit your changes: git commit -m 'Add new feature'

Push to the branch: git push origin feature-branch

Open a Pull Request
