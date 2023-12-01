# Example APIs
Description coming soon.

## Local Setup
 ### Install dependencies
 ```npm install```

### Database Setup
Coming soon... 
For now, see db.js and database.sql

### Environment Variables
Add .env with the following environment variables:
```
# Database
DB_PASSWORD=<password>

# Authentication
ACCESS_TOKEN_SECRET=<secret>
REFRESH_TOKEN_SECRET=<secret>
```

### Run the server
```npm run server```

Server runs on http://localhost:5000

## Endpoints
| Method | Endpoint  | Description |
| ------------- | ------------- |-------------|
| POST | `/api/users`      | Registers a new user     |
| POST | `/api/auth/login`      | Authenticates an existing user    |
| GET | `/api/auth/refresh_token`      | Authenticates an existing user using a refresh token    |
| DELETE | `/api/auth/refresh_token`      | Logs a user out by deleting their refresh token    |
| GET | `/api/whoami`      | Returns authenticated user |


## Stack
- Javascript
- Node
- Express
- Postgres