http://35.180.247.200:8000/
# Picture Management Desktop Application

A desktop application built with Electron.js and React for managing, editing, and sharing pictures, with a Laravel backend and real-time chat functionality.

## Features

### Core Features
- 📁 **Image Management**
  - Upload pictures to local storage
  - Delete pictures from the application
- 🖼️ **Image Editing Tools**
  - Crop images
  - Add watermarks
  - Rotate images
  - Convert to black and white
- 🔐 **User Authentication**
  - Secure login system
  - Login event tracking (IP address and geolocation)

### Additional Features
- 💬 **Real-time Chat**
  - Forum-style group chat using Node.js and WebSockets
  - Visible to all application users
- 🚀 **CI/CD Pipeline**
  - Automated testing and deployment for Laravel backend
  - Includes Laravel's testing tools

## Technologies Used

- **Frontend**: Electron.js, React
- **Backend**: Laravel
- **Real-time Communication**: Node.js, WebSockets
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Environment Setup

### Requirements
- Node.js (v16+ recommended)
- PHP (v8.0+)
- Composer
- MySQL
- Redis (for queue and cache)

### Configuration

1. Clone the repository:git clone https://github.com/Hussein-Abdallah0/Gallery.git
2. Install dependencies:
   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   composer install
Create a .env file in the server directory with the following content (adjust as needed):

Copy
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:is6+MYrgQUF/HKcfu8sqDJCubWLNA8Sv994+VIVFQh8=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gallerydb
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=pJrp4ESHr8mTpBYsQbo2gcTpyu7ZSE3rsTKw4PMvPSA7dQK9DmFHpHc0BvGITYoT
JWT_ALGO=HS256

Generate application key:

php artisan key:generate

Run database migrations:

php artisan migrate
Running the Application
Development Mode

Start the Laravel backend:

cd server
php artisan serve

Start the Electron app:

cd client
npm start

Start the WebSocket server (for chat):

cd websocket-server
node server.js
Production Build

To create a production build of the Electron app:

cd client
npm run build
CI/CD Pipeline

The project includes a GitHub Actions workflow for:

Running PHPUnit tests

Static code analysis

Automated deployment (configured in .github/workflows/laravel.yml)

Testing
Run Laravel tests with:

php artisan test
