
# BMW M Series Website

## 🚀 Overview

The BMW M Series Website is designed like a polished digital showroom, giving visitors a crisp, immersive look at the entire M lineup. Built with the MERN stack, it features real-time availability checks, secure owner login, and lightning-fast image delivery through ImageKit.io. And when a model steals someone’s attention, the site makes it easy to book it right away — no extra steps, just a clean glide from browsing to confirming. 🚗✨

<img width="1895" height="948" alt="Screenshot 2025-11-29 113351" src="https://github.com/user-attachments/assets/aca6ab4f-7cbb-490b-943c-0f4e769f56df" />

## 🌟 Key Features

- Immersive Showcase
- Secure Authentication
- Car Listing Management
- Real-Time Availability
- Owner Dashboard


## 🛠️ Tech Stack

**Frontend (Client)** 
- React & Vite
- React Router
- TailwindCSS
- Axios

**Backend (Server)** 
- Node.js & Express
- MongoDB & Mongoose
- JWT & Bcrypt.js
- Multer & ImageKit Node.js SDK


## 📦 Project Structure

```bash
.
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Loader, Card)
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Global state, authentication, and token sync
│   │   ├── pages/              # Main view components (Home, Cars, Dashboard)
│   │   └── App.jsx             # Main router
├── server/                     # Node.js/Express Backend
│   ├── configs/
│   │   ├── db.js               # MongoDB connection setup
│   │   └── imageKit.js         # ImageKit client initialization
│   ├── models/                 # Mongoose Schemas (User, Car, Booking)
│   ├── middleware/             # Express Middlewares (auth.js, multer.js)
│   ├── controllers/            # Business logic (userController, bookingController, ownerController)
│   └── routes/                 # API Endpoints (userRoutes, ownerRoutes, bookingRoutes)
└── package.json
```


## 🚀 Getting Started

**Prerequisites**

- Node.js (v18+)
- MongoDB instance (Local or Atlas)
- ImageKit.io Account

**1. Setup Environment Variables**

Create a ```.env``` file in the root directory (```/server```) and another one in the client directory (```/client```) with the following keys:

**Server** ```.env```

```bash
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DBNAME>?retryWrites=true&w=majority

JWT_SECRET="Your_Secret_Key_For_Tokens"
 
IMAGEKIT_PUBLIC_KEY="public_..."
IMAGEKIT_PRIVATE_KEY="private_..."
IMAGEKIT_ENDPOINT_URL="[https://ik.imagekit.io/](https://ik.imagekit.io/)<your_id>/"
```
**Client** ```.env``` (in ```/client```)

```base 
# URL of your running backend server
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=₹
```
**2. Install Dependencies**

```bash
cd "server"
npm install

cd "../client"
npm install
```

**3. Run the Application**

Run Frontend and Backend server in seperate Terminals.

```bash
cd "server"
npm run server

cd "client"
npm run dev
```
The application will be accessible at the address (http://localhost:5173).
## 🗺️ API Endpoints

All endpoints are prefixed with /api.

| Function | Endpoint | Method | Access | Description |
| :-------- | :------- | :------------------------- | :----------|  :------- |
| **User Auth** | `/api/users/register` | `POST` | Public | Register new user. |
| **User Auth** | `/api/users/login` | `POST` | Public | Login and receive JWT. |
| **User Data** | `/api/users/data` | `GET` | Protected | Fetch authenticated user profile. |
| **Car List** | `/api/users/login` | `GET` | Public | Fetch all available car listings. |
| **Bookings** | `/api/bookings/check-availability` | `POST` | Public | Check car availability for a date range. |
| **Bookings** | `/api/bookings/create` | `POST` | Protected | Create a new booking reservation. |
| **Owner** | `/api/owner/add-car` | `POST` | Protected (Owner) | Create a new car listing with image upload. |
| **Owner** | `/api/owner/cars` | `GET` | Protected (Owner) | View all cars owned by the user. |

and more endpoints...
