# Taskerly
Taskerly is a simple task management application.

I'm creating it as a sample project to demonstrate my backgrounds in both software engineering and technical documentation. 

To try it out, you can:
 * Follow the local dev instructions outlined below, OR
 * Visit https://taskerly-client-39d59481d499.herokuapp.com/ to create a production account

After creating an account, you can create tasks on the client side or create an API Key to access Taskerly's API programatically.

To view developer documentation, visit [the project's wiki](https://github.com/dianajohnson13/taskerly/wiki). 

> **Note:** Although you can clearly view all of the code in this project, I intentially wrote the wiki as if it were public documentation for a private project. As such,
> * Endpoints that I would not typically expose publicly are not documented in the wiki
> * All examples reference the production server request URL (not localhost)


## Local Server Setup
In the `\server` directory:

### 1. Install Dependencies
```npm install```

### 2. Set up the Database
1. Install and setup your local [postgres](https://www.postgresql.org/)
2. Use the commands defined in [database.sql](./server/database.sql) to create your database and tables
3. Create a `.env` file with the `DB_` environment variables defined (see [Define Environment Variables](#3-define-environment-variables)).

To reference database configuration, check out [./server/db.js](./server/db.js) 

### 3. Define Environment Variables
Create an `.env` file with the environment variables listed below.

**Note:** If you already set up your database ([step 2](#2-set-up-the-database)) you should already have a `.env` with your database variables configured.

```
# Database
DB_DATABASE=exampledb
DB_PASSWORD=<password>
DB_USER=postgres
DB_PORT=5432
DB_HOST=localhost

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

## Endpoints
### Public Endpoints
To view all public API endpoints, visit [API Reference Index](https://github.com/dianajohnson13/taskerly/wiki/*-get-started-with-taskerly's-api-*) page in this project's Wiki.


## Stack
- Javascript
- Node
- Express
- Postgres
- React

Deployed on Heroku at https://taskerly-client-39d59481d499.herokuapp.com/