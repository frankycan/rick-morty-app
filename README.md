# Introduction
This is a simple application to browse all the Rick & Morty's characters, by consuming the API at https://rickandmortyapi.com/

It's developed with React in the frontend and NodeJS (express) in the backend. The database is a MongoDB. Everything is built over Docker containers.

## Features
- Register a new user
- Login with a registered user
- Logout the current user
- While logged-in, the `/characters` route will list all the characters with pagination. The current page is maintained on refresh.
- While logged-in, the `/characters/:id` route displays the detailed information of this specific character. Users can add characters to their favorites list.
- Favorited characters will have a hearth icon in the `/characters` view.

# Installation
All the required commands to run and manage the application are available in the Makefile. The two main commands are `make run` and `make destroy`. Anyway, here is a list of all the available commands: 
## Commands
- **make run**: executes the application by calling `docker-compose build` and `docker-compose up -d`
- **destroy**: removes the application by calling `docker-compose down` and `docker-compose rm` for both app and test containers
- **front-logs**: displays the real-time logs of the frontend container by executing `docker logs -f frontend`
- **back-logs**: displays real-time logs of the backend container by executing `docker logs -f backend`
- **access-front**: creates a shell into the frontend container
- **access-back**: creates a shell into the backend container
- **test**: restarts the application and run the testing containers

# Dependencies
These are all the dependencies used in both the backend and the frontend, and a little explanation on what they do.

## Backend
- **bcryptjs**: used to encrypt the user password in the database
- **cookie-session**: used to maintain the user session after refreshing the application
- **dotenv**: used to have all the environment variables in `.env` file
- **jest**: used for automatic tests
- **jsonwebtoken**: used to share the user session details between the backend and the front
- **mongoose**: library to manage the MongoDB database
- **nodemon**: library for development phase
- **rickmortyapi**: API to retrieve the characters information
- **supertest**: library for testing the backend API endpoints
- **uuid**: used for having our own database ID, so we can switch to another database at any moment

## Frontend
- **axios**: library to request the backend from the front
- **puppeteer**: library to test the frontend
- **react-dom**: used to render the application in specific DOM elements
- **react-hook-form**: React's library to manage forms
- **reduxjs/toolkit** and *react-redux*: libraries to handle the app state
- **react-router-dom**: used for managing the routes

# Testing
It's using `supertest` for testing the backend API routes and `puppeteer` for testing the frontend with E2E tests.
In order to run the test, run the command `make test`

# Improvements
Even this is a very simple application, here is a list of possible improvements or features:
- Logging system
- Add CSRF validation to register and login forms
- More testing on the frontend
- Add more validations in backend endpoints
- Improve page transitions and styles
