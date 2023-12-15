# Taskerly
Description coming soon.

## Local Server Setup
In the `\server` directory:

### 1. Install Dependencies
```npm install```

### 2. Set up the Database
1. Install and setup your local [postgres](https://www.postgresql.org/)
2. Use the commands defined in [database.sql](./server/database.sql) to create your database and tables
3. Create a .env file with `DB_PASSWORD=<your-password>` (see [Define Environment Variables](#3-define-environment-variables)).

**Note:** To reference database configuration, check out [./server/db.js](./server/db.js) 

### 3. Define Environment Variables
Create an .env with the environment variables listed below.
**Note:** If you already set up your database ([step 2](#2-set-up-the-database))) you should already have a .env file with your database variables configured.

```
# Database
DB_PASSWORD=<password>

# Authentication
ACCESS_TOKEN_SECRET=<secret>
REFRESH_TOKEN_SECRET=<secret>
```

### 4. Run the server
```npm run start```

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

**Note**: In development, the client uses the local server as a proxy. The server should be [run on port :5000](https://github.com/dianajohnson13/example-apis#4-run-the-server) before starting up the client.

## Endpoints
### Public Endpoints
To view all public API endpoints, visit [API Reference Index](https://github.com/dianajohnson13/example-apis/wiki/API-Reference-Index) page in this project's Wiki.


## Stack
- Javascript
- Node
- Express
- Postgres
- React