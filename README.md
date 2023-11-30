# Example APIs
Description coming soon.

## Local Setup
 ### Install dependencies
 ```npm install```

### Run the server
```npm run server```

Server runs on http://localhost:5000

### Database Setup
Coming soon... 
For now, see db.js and database.sql

## Endpoints
| Method | Endpoint  | Description |
| ------------- | ------------- |-------------|
| POST | `/api/users`      | Registers a new user     |
| POST | `/api/auth/login`      | Authenticates an existing user    |
| GET | `/api/auth/refresh_token`      | Authenticates an existing user using a refresh token    |
| DELETE | `/api/auth/refresh_token`      | Logs a user out by deleting their refresh token    |


## Stack
- Javascript
- Node
- Express
- Postgres