# Coscape-Api
#Web Application API
This is a Node.js and Express API for managing users and other activities.

#Getting Started
To run this API on your local machine, follow these steps:

Clone this repository to your local machine:

`git clone https://github.com/Dia-Souci/Coscape-Api`
Navigate to the project directory:

Install dependencies:

`npm install`
Start the server:

`npm start`
The server will start running at http://localhost:5000.

#Routes
#Authentication
`/api/Auth` : and its sub routes
#Users
`/api/users` :  and its sub routes
#SubMembers
`/api/AddMember`
#Teams
`/api/teams`
#Exams
`/api/exams`
#Dependencies
Express.js: A web application framework for Node.js.

mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
dotenv: Loads environment variables from a .env file into process.env.
#Environment Variables
Create a .env file in the root directory of your project with the following variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database

