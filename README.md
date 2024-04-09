# Teebay
# Teebay - Demo Marketplace for Buying, Selling, and Renting Products

Welcome to **Teebay**, your one-stop online marketplace for all your buying, selling, and renting needs. Teebay is built using a modern tech stack, including ***React, Vite, Tailwind CSS, Apollo Client, Redux*** in the frontend, and ***Express.js, GraphQL, Apollo Server, Prisma, and PostgreSQL*** in the backend. It also utilizes ***JWT*** for user authentication.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Features](#features)
3.  [Tech Stack](#tech-stack)
4.  [Getting Started](#getting-started)
5.  [Project Structure](#project-structure)
6.  [Authentication](#authentication)
7.  [Database](#database)
8.  [API Endpoints](#api-endpoints)


## [Introduction](#introduction)

Teebay is a versatile e-commerce platform designed to facilitate the buying, selling, and renting of a wide range of products. With its modern and intuitive user interface, Teebay offers a seamless shopping experience for both buyers and sellers. Users can create accounts, list products, search for items, and engage in secure transactions.

## [Features](#features)

-   User Registration
-	Login
-	Authentication using JWT
-	Product Listing 
-	Multicategory Assign
-	Update product 
-	Delete Product
-	Buy Product
-	Sell Product
-	Rent product 
-	View Counts
(Upcoming Features - Search and Filtering, Payment Processing, User Profile Management, User reviews and Ratings, Real-time notification)

## [Tech Stack](#tech-stack)

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Apollo Client
-   Redux
-   JWT for Authentication

### Backend

-   Express.js
-   GraphQL
-   Apollo Server
-   Prisma
-   PostgreSQL
-   JWT for Authentication

## [Getting Started](#getting-started)

Follow these steps to get the Teebay project up and running locally:


# You can Run the project in two ways - 
## Locally in your machine 

**Running In Local Machine**
To run the Teebay project locally on your machine, you'll need to install a few dependencies and tools. Here's a list of things you need to have installed:

-> Node.js(v20) and npm(v9)
-> Git    
-> PostgreSQL

1. Clone the repository using git:
    `https://github.com/Kakon-1603114/Teebay` 
2. Navigate to the project directory
`cd Teebay`
3. Install backend dependencies
	- Open another terminal in the project directory -> visit backend directory by `cd teebay_be`
	 - Go to backend directory 
	 ``` bash
	  cd teebay_be
	  npm install 
	  ```
	 - Create a `.env` file in the project directory by following `.env.sample`.  *(Make sure your database creds are correct)*
	 - As you are starting with a new database, you have to migrate all the schema. To do that 
	 ``` bash
	 npx prisma generate
	 npx prisma migrate dev --name "Database migration"
	 ```
	 thats all. 
	 - Run the project `npm run dev` 
	 *(It will run the project in the specified port that you have mentioned in .env file. If you choose PORT 4000 it will run the backend in `http://localhost:4000` port. Later on, while creating `.env` file in frontend, please change `VITE_BASE_URL` to  `http://localhost:4000` )*
	 
4. Install frontend dependencies
	- Go to the root project directory and then visit frontend directory `root -> teebay_fe`
	 ``` bash
	  cd teebay_fe
	  npm install 
	  ``` 
	- Create a `.env` file in the project directory and 
	- Run the project `npm run dev`
8.  Access the application in your web browser at `http://localhost:8080`.


## Using Docker

**Running In Docker** 

To run the project using docker, you must have docker installed on your machine. 

1. Clone the repository using git:
    `https://github.com/Kakon-1603114/Teebay` 
2. Navigate to project directory
`cd Teebay`
3. Run `sudo docker compose up --build`
This will take a few minutes after that you will see the project is running in `http://localhost:8080`


## [Project Structure](project-structure)

The project is structured as follows:
```
Teebay/
├── teebay_be/
│   ├── src/
│   │   ├── graphql/
│   │   ├── prisma/
│   │   ├── db/
│   │   └── server.js
│   ├── package.json
│   ├── ...
├── teebay_fe/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── apollo.js
│   │   └── ...
│   ├── package.json
│   ├── ...
├── README.md
├── .gitignore
├── ...
```

## Authentication

Teebay uses JSON Web Tokens (JWT) for user authentication. When a user registers or logs in, they receive a JWT token that they include in their subsequent requests to authenticate themselves. The backend validates these tokens to secure the application's routes.

## Database

Teebay uses PostgreSQL as its database and Prisma as the ORM. You can configure your database connection in the `.env` file in the `backend` directory. Prisma provides an easy way to manage the database schema and perform database operations.

## API Endpoints

The API endpoints are defined using GraphQL. You can explore and test the API by accessing `http://localhost:4000/graphql` when the backend server is running.
