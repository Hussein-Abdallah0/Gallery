📸 Electron Image Manager
A powerful desktop application built with Electron.js, React, and Laravel, enabling users to securely upload, edit, and manage pictures locally. Includes image editing tools, secure JWT login with IP and geolocation tracking, and a real-time group chat powered by WebSockets.

🧰 Tech Stack
Frontend: React, Electron.js

Backend API: Laravel

Database: MySQL (gallerydb)

Authentication: JWT (HS256)

Session Management: Database

Real-Time Messaging: Node.js + WebSockets

CI/CD: GitHub Actions with Laravel's built-in testing tools

✨ Features
🔐 Authentication
JWT-based login using Laravel Sanctum/JWTAuth.

Each login is logged with:

IP Address

Geolocation (lat/lng)

🖼️ Local Image Management
Upload pictures from your device.

Delete pictures anytime.

No cloud involved — images are managed and stored locally.

🛠️ Image Editing Tools
Crop images ✂️

Rotate images ↻

Add watermark text 🖋️

Convert to black & white 🌓

All features are labeled and intuitive.

🗨️ Real-Time Group Chat
Forum-style live chat.

Messages are visible to all app users.

Implemented using Node.js + WebSockets.

📂 Project Structure
bash
Copy
Edit
/frontend           # Electron + React
/backend            # Laravel backend (API)
/chat-server        # Node.js WebSocket server
🛠️ Installation & Setup
🔧 Laravel API
bash
Copy
Edit
git clone https://github.com/Hussein-Abdallah0/Gallery.git
cd electron-image-manager/backend

composer install
cp .env.example .env
# .env already preconfigured with:
# DB: gallerydb | User: root | No password
# JWT_SECRET, SESSION_DRIVER, etc.

php artisan key:generate
php artisan migrate
php artisan serve
🖥️ Electron + React
bash
Copy
Edit
cd ../frontend
npm install
npm run electron-dev
💬 Real-Time WebSocket Server
bash
Copy
Edit
cd ../chat-server
npm install
node index.js
🔄 Environment Configuration Highlights (.env)
env
Copy
Edit
APP_URL=http://localhost
DB_CONNECTION=mysql
DB_DATABASE=gallerydb
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database

JWT_SECRET=pJrp4ESHr8mTpBYsQbo2gcTpyu7ZSE3rsTKw4PMvPSA7dQK9DmFHpHc0BvGITYoT
JWT_ALGO=HS256
🧪 Testing & CI/CD
Laravel testing tools are integrated and CI/CD can be triggered on GitHub via workflows.

Run Tests Locally
bash
Copy
Edit
php artisan test
CI Pipeline runs:

Code linting

Database migrations

Laravel's built-in test suite

🔐 Security Notes
IP and location are logged at login for analytics and auditing.

JWT is signed using HS256 with a secure secret.

Sessions are stored in the database.

Files remain fully local for privacy.

