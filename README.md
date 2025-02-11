# Expense Tracker API

## Overview
This is a RESTful API for managing user expenses. The API allows users to:
* Add a new expense
* Retrieve a user's total expenses
* Generate monthly reports
* View project contributors

The project is developed using Node.js, Express.js, and MongoDB, and is deployed on Render.

## Features
* **User Management:** Retrieve user details including first name, last name, and total expenses.
* **Expense Tracking:** Add expense items categorized into food, health, housing, sport, or education.
* **Monthly Reports:** Fetch expense reports filtered by user ID, year, and month.
* **Developer Team Info:** View project contributors via the `/api/about` endpoint.
* **Testing Suite:** API endpoints are tested using Jest and Supertest.

## Installation & Setup

### Prerequisites
* Node.js (v16+)
* MongoDB (local or cloud instance)
* Render account (for deployment)

### Steps
Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker-api.git
cd expense-tracker-api
```

Install dependencies:

```bash
npm install
```

Set up environment variables:
Create a `.env` file and define:

```env
MONGO_URI=your-mongodb-connection-string
PORT=3000
```

Run the server locally:

```bash
npm start
```

Run tests:

```bash
npm test
```

## API Endpoints

### 1. Get User Details
**URL:** `GET /api/users/:id`

**Response:**
```json
{
  "first_name": "Mosh",
  "last_name": "Israeli",
  "id": 123123,
  "total": 250
}
```

### 2. Add Expense Item
**URL:** `POST /api/add`

**Payload:**
```json
{
  "userid": 123123,
  "description": "Milk",
  "category": "food",
  "sum": 10
}
```

### 3. Get Monthly Report
**URL:** `GET /api/report/?id=123123&year=2025&month=2`

**Response:**
```json
{
  "userid": "123123",
  "year": 2025,
  "month": 2,
  "costs": [
    {
      "food": [
        {
          "sum": 10,
          "description": "Milk",
          "day": 6
        }]
    }]
}
```

### 4. Get Developers Team Info
**URL:** `GET /api/about`

**Response:**
```json
[
  {"first_name": "Alice", "last_name": "Smith"},
  {"first_name": "Bob", "last_name": "Johnson"}
]
```

## Testing

### Unit Tests
The project includes comprehensive unit tests using Jest. The test suite covers all major API endpoints and utility functions.

Key test files:
- `test.js`: Main test suite covering API endpoints and business logic

Run the test suite:

```bash
npm test
```

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set up environment variables (`MONGO_URI` and `PORT`)
4. Define the start command:

```bash
node server.js
```

5. Deploy and obtain the live API URL

## Testing the API
A sample Python script (`test.py`) is provided for testing API responses. Run it after setting up the API:

```bash
python test.py
```

## Contributors
* Eliran Haber
* Lucille Grozdanov

## License
This project is licensed under the MIT License.
