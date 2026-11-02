# Cafe Menu & Order Management System

A full-stack Cafe Menu and Order Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Customer Features
- View cafe menu items.
- Search menu items by name.
- Filter items by category.
- Sort items by price.
- Add items to cart.
- Increase or decrease item quantity.
- Remove items from cart.
- Automatically calculate total amount.
- Place orders using customer name and phone number.
- QR code for accessing the menu.

### Admin / Backend Features
- Add new menu items.
- View all menu items.
- Update menu items.
- Delete menu items.
- Place customer orders.
- Retrieve all orders.
- Update order status.
- API documentation using Swagger.
- Input validation and error handling.

## Technology Stack

**Frontend**
- React.js
- JavaScript
- HTML
- CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- REST API
- Mongoose

**Database**
- MongoDB Atlas

**Tools**
- Visual Studio Code
- Postman
- Swagger UI
- Git and GitHub

## Project Structure

```text
cafe-menu-order/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd cafe-menu-order
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Start backend:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## API Endpoints

### Menu APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/menu` | Get all menu items |
| POST | `/api/menu` | Add a menu item |
| PUT | `/api/menu/:id` | Update a menu item |
| DELETE | `/api/menu/:id` | Delete a menu item |

### Order APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders` | Get all orders |
| PUT | `/api/orders/:id/status` | Update order status |

## API Documentation

Swagger documentation is available at:

`http://localhost:5000/api/docs`

## Database

MongoDB Atlas is used to store menu items and customer orders.

## Author

Developed as a Cafe Menu & Order Management System project using the MERN Stack.

## Application Screenshots
!cafe-delight.jpg
!menu.jpg
!scan.jpg
!menu-filter-view.jpg
!checkout.jpg
!search-menu.jpg
!success.jpg