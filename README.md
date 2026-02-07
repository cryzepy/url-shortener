# URL Shortener API

A simple and clean URL Shortener REST API built using **Node.js, Express, and MySQL** with MVC architecture and Service Layer pattern.  
This project includes QR Code generation and click tracking.

---

## Overview

This project allows users to:

- Create short URLs
- Redirect to original URLs
- Track click counts
- Generate QR Codes automatically
- Retrieve all URLs with QR Code
- Validate URL format before saving

The project is structured using **MVC + Service Layer** to demonstrate separation of concerns and clean backend architecture.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- nanoid (short code generator)
- qrcode (QR code generator)
- dotenv (environment configuration)

---

## Project Structure

```
url-shortener/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── urlController.js
│   ├── services/
│   │   └── urlService.js
│   ├── models/
│   │   └── urlModel.js
│   ├── routes/
│   │   └── urlRoutes.js
│   ├── utils/
│   │   ├── generateCode.js
│   │   └── validateUrl.js
│   ├── middlewares/
│   │   └── errorMiddleware.js
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Database Setup

Create the database:

```sql
CREATE DATABASE url_shortener;
USE url_shortener;

CREATE TABLE urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/cryzepy/url-shortener.git
cd url-shortener
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the root directory:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=url_shortener
```

---

## Running the Application

Start the server:

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## API Endpoints

### 1. Create Short URL

**POST** `/shorten`

Request body:

```json
{
  "originalUrl": "https://google.com"
}
```

Response:

```json
{
  "message": "Short URL created",
  "shortUrl": "http://localhost:3000/AbC123",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

---

### 2. Redirect to Original URL

**GET** `/:code`

Example:

```
http://localhost:3000/AbC123
```

This will:
- Increase click count
- Redirect to the original URL

---

### 3. Get All URLs

**GET** `/urls`

Response:

```json
[
  {
    "id": 1,
    "original_url": "https://google.com",
    "short_code": "AbC123",
    "clicks": 3,
    "created_at": "2026-02-07T10:00:00.000Z",
    "shortUrl": "http://localhost:3000/AbC123",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS..."
  }
]
```

---

## Architecture Explanation

### Controller
Handles HTTP request and response only.

### Service
Contains business logic:
- URL validation
- Short code generation
- QR code generation
- Click increment logic

### Model
Handles database queries only.

### Middleware
Global error handling.

---

## Validation

The application validates URLs before saving:
- Only allows `http` and `https`
- Rejects invalid formats
- Prevents unsafe protocols

---

## Example Flow

1. User submits original URL
2. Server validates URL format
3. Generates unique short code
4. Saves data to database
5. Returns short URL and QR code
6. When accessed, increments click count and redirects

---

## Future Improvements

- User authentication (JWT)
- Custom alias
- Expired links
- Pagination
- Rate limiting
- Swagger documentation
- Analytics dashboard

---

## Why This Project?

This project demonstrates:

- REST API development
- Clean MVC architecture
- Service layer separation
- Database integration
- Business logic implementation
- Input validation
- QR code generation
- Click tracking
- Environment configuration

---

## Author

Cryzepy
