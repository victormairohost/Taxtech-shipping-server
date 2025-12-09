# Shipment

Shipment Management API

A production-ready RESTful API for managing shipments with TypeScript, Express, and MongoDB.

🚀 Quick Start

Prerequisites

- Node.js (v18 or higher)

- MongoDB (local or MongoDB Atlas)

- npm

Installation

1. Clone and setup

# Clone the repository
`git clone <repository-url>`
`cd shipment-service`

# Install dependencies
`npm install`

# Set up environment variables
`cp .env.example .env`


2. Configure environment

Edit .env file:

MONGO_URI=mongodb+srv://victormairohost_db_user:Dly8YEwSF6Smysvw@shipmentsystem.q8uuhti.mongodb.net/shipmentSystem?retryWrites=true&w=majority


3. Run the application

# Development mode (with hot reload)
`npm run dev`

# Production mode
`npm run build`
`npm start`

📚 API Documentation

Base URL - `localhost:4000/api/shipments`

Endpoints

Documentation link

https://team00-6822.postman.co/workspace/dfe9b4a4-f3b2-4862-877c-4f459599b45c/collection/18389386-d9fdadb0-0687-4144-91f8-9352efaf27e1?action=share&source=copy-link&creator=18389386

1. Get All Shipments
GET /api/shipments

2. Get Single Shipment
GET /api/shipments/:id
Path Parameter: Shipment ID (MongoDB ObjectId)
Example: GET /api/shipments/507f1f77bcf86cd799439011

3. Create Shipment
POST /api/shipments

Request Body:
```json
{
"senderName": "benjamin",
"receiverName" : "tola",
"origin": "victoria island",
"destination": "lekki"
}
```

4. Update Shipment
PUT /api/shipments/:id

Request Body (at least one field):
```json
{
  "status": "in_transit",
  "destination": "San Francisco"
}
```

5. Delete Shipment
DELETE /api/shipments/:id


📊 Status Flow

pending → in_transit → delivered
       ↘ cancelled

Business Rules:
- Can't update delivered or cancelled shipments
- Only pending shipments can be deleted

🎯 Example Requests

- Create a Shipment

```bash
{
  curl -X POST http://localhost:4000/api/shipments \
  -H "Content-Type: application/json" \
  -d '{
    "senderName": "Amazon",
    "receiverName": "Customer",
    "origin": "Seattle",
    "destination": "Chicago"
  }'
}

```

- Update Shipment Status

```bash
{
  curl -X PUT http://localhost:3000/api/shipments/<:id> \
  -H "Content-Type: application/json" \
  -d '{"status": "delivered"}'
}
```

🛡️ Error Responses

- Validation Error

```json
{
  {
    "success": false,
    "message": "receiverName is required and cannot be empty"
}
}
```

- Not Found Error

```json
{
    "success": false,
    "message": "Shipment not found"
}
```

src/
├── config/           # Configuration (database)
├── controllers/      # Request handlers
├── interfaces/       # interface
├── middleware/       # Express middleware (error handling)
├── models/          # Database models and interfaces
├── routes/          # API route definitions
├── services/        # Business logic layer
├── utils/           # Utility functions
├── index.ts         # Express app setup


🧪 Testing

Run Tests
 ` npm test`

🚀 Deployment

Production Build
`npm run build`
`npm start`

