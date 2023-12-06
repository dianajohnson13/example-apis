# Example APIs
Description coming soon.

## Local Server Setup
In the `\server` directory:

### 1. Install dependencies
```npm install```

### 2. Set up the Database
Coming soon... 
For now, see db.js and database.sql

### 3. Define Environment Variables
Add .env with the following environment variables:
```
# Database
DB_PASSWORD=<password>

# Authentication
ACCESS_TOKEN_SECRET=<secret>
REFRESH_TOKEN_SECRET=<secret>
```

### 4. Run the server
```npm run start``
or
```npm run dev``` to run with [nodemon](https://www.npmjs.com/package/nodemon)


Server runs on http://localhost:5000

## Local Client Setup
In the `\client` directory:

### 1. Install dependencies
```npm install```

### 2. Run the client
```npm run client```

Client runs on http://localhost:3000

**Note**: In development, the client uses the local server as a proxy. The server should be started up on port :5000 before starting up the client on :3000.

## Endpoints
### Public Endpoints
To view all public API endpoints, visit [API Reference Index](https://github.com/dianajohnson13/example-apis/wiki/API-Reference-Index) page in this project's Wiki.


## Stack
- Javascript
- Node
- Express
- Postgres
- React