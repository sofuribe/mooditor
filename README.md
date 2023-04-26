# MOODITOR

## Software Developers:

- Sofia Uribe
- Jackie Liu
- Terence Wong
- Brooke Crokett

## Who we are 

Mooditor is a user-friendly platform for individuals to keep track of their daily mood, goals, and activities. Our mission is to empower individuals to take control of their mental health by providing them with a platform to track and monitor their emotional well-being. Our goal is to make mental health management accessible, convenient, and stigma-free. We aim to help our users develop a deeper understanding of their mental health, identify patterns and make informed decisions about their daily wellbeing. Ultimately, our vision is to help people lead happier, healthier, and more fulfilling lives. 

## Design

### Wireframe
![wireframe_](/uploads/841bf09b793606157a54fef7489b9eb8/wireframe_.png)

### Schemas
![Schemas](/uploads/724f27cadd3c6711a099e44a1c7f8630/Schema.png)



## Requirements
1. Python 3
2. Docker Desktop
3. VS Code
4. FastAPI
5. A database compatible with PostgresSQL databases (Beekeeper Studio)

## Getting Started

Please have Docker Desktop downloaded before continuing with the following directions listed below.

### Cloning the Repository

Inside your terminal, change to a directory that you would like to clone this project into
In your terminal, type: ```git clone https://gitlab.com/mooditor/mooditor.git```
Switch into the project directory:

### Firing up Docker

In your project directory, type and press enter after each command listed below:

1. Create the volume: ```docker volume create postgres-data```
2. Build the container and image: ```docker-compose build```
3. Run the container: ```docker-compose up```
4. If using an apple computer with a M1 or M2 chip use the following command instead of docker-compose build:
```DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build```

![Successful Docker Containers](/uploads/df253454852f9f24e11feac3946e1206/docker.png)

## Navigating the Front-End
To navigate the server, type ```http://localhost:3000```, this will take you to the Home Page.

## Functionality
- Signup/Login: Once at the home page, the user will select "create an account" where they will be directed to signup and login. 
- Main Page: After logging in, the user will be redirected to the main page where they can choose to set their goals for the day or select "create entry".
- Goals: The user is able to input all the goals they want to accomplish for the day and check them off once completed. 
- Entry Form: After selecting "create entry" the user will be redirected to their daily entry form where they can choose their mood for the day, select which activities they performed to boost their wellbeing, and write in a daily journal about how their day went.
- Calendar: After submitting the daily entry form, the user will be redirected to the main page where they will see their daily entry populate on the calendar with a color that correlates with their mood for that day. The user will be able to look back at previous months, select a past entry, and reflect on what they did that enhanced or diminished their mood that day. 

## FastAPI Endpoints

### Users

<details>
  <summary markdown="span">POST: Create User | http://localhost:8000/api/users</summary>
  This action creates a user account tied to a specific user and stores it within the database.
  <br>
  <br>
  Request Body:

  `{
    "username": "string",
    "password": "string",
    "email": "string"
  }`
  <br>
  <br>
  Returns (Status Code 200):

  `{
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": 0,
      "username": "string",
      "email": "string"
    }
  }`
  <br>
  <br>

</details>

### Authentication

<details>
  <summary markdown="span">POST: Login | http://localhost:8000/token</summary>
  This action logs an existing user into the application.
  <br>
  <br>
  Request Body:

  `{
    "username": "string",
    "password": "string"
  }`
  <br>
  <br>
  Returns (Status Code 200):

  `{
    "access_token": "string",
    "token_type": "Bearer"
  }`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">DELETE: Logout | http://localhost:8000/token</summary>
  This action logs an existing user out of the application.
  <br>
  <br>

  Returns (Status Code 200):

  `true`
  <br>
  <br>

</details>

### Entries
<details>
  <summary markdown="span">POST: Create Entries | http://localhost:8000/entries</summary>
  This action creates an entry tied to the existing user and stores it within the database.
  <br>
  <br>
  Request Body:

  `{
    "activity_name": [
      "Walking", "Snowboarding"
    ],
    "mood": "great",
    "journal": "had a great day",
    "created": "2023-04-25"
  }`
  <br>
  <br>
  Returns (Status Code 200):

  `{
    "id": 1,
    "user_id": 2,
    "mood": "great",
    "journal": "had a great day",
    "created": "2023-04-25"
  }`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">GET: Get All Entries | http://localhost:8000/entries</summary>
  This action gets all entries stored within the database.
  <br>
  <br>

  Returns (Status Code 200):

  `[
    {
      "id": 1,
      "user_id": 2,
      "activity_name": [
        "Walking",
        "Snowboarding"
      ],
      "mood": "great",
      "journal": "had a great day",
      "created": "2023-04-25"
    }
  ]`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">GET: Get One Entry | http://localhost:8000/entry/{id}</summary>
  This action gets the single entry tied to the input id.
  <br>
  <br>

  Returns (Status Code 200):

  `{
    "id": 1,
    "user_id": 2,
    "activity_name": [
      "Walking",
      "Snowboarding"
    ],
    "mood": "great",
    "journal": "had a great day",
    "created": "2023-04-25"
  }`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">PUT: Update Entry| http://localhost:8000/entry/{id}</summary>
  This action updates the single entry tied to the input id.
  <br>
  <br>
  Request Body:

  `{
    "mood": "good",
    "journal": "i had fun",
    "created": "2023-04-25"
  }`
  <br>
  <br>
  Returns (Status Code 200):

  `{
    "id": 1,
    "mood": "good",
    "journal": "i had fun",
    "created": "2023-04-25"
  }`
  <br>
  <br>

</details>

### Goals
<details>
  <summary markdown="span">POST: Create Goals | http://localhost:8000/goals</summary>
  This action creates a goal tied to the existing user and stores it within the database.
  <br>
  <br>
  Request Body:

  `{
    "user_id": 0,
    "goal": "string",
    "created_on": "2023-04-24",
    "is_completed": false
  }`
  <br>
  <br>
  Returns (Status Code 200):

  `{
    "id": 66,
    "user_id": 2,
    "goal": "string",
    "created_on": "2023-04-24",
    "is_completed": false
  }`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">GET: Get All Goals | http://localhost:8000/goals</summary>
  This action gets all goals stored within the database.
  <br>
  <br>

  Returns (Status Code 200):

  `[
    {
      "id": 9,
      "user_id": 2,
      "goal": "string",
      "created_on": "2023-04-25",
      "is_completed": false
    }
  ]`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">GET: Get One Goal | http://localhost:8000/goal/{id}</summary>
  This action gets the single goal tied to the input id.
  <br>
  <br>

  Returns (Status Code 200):

  `{
    "id": 9,
    "user_id": 2,
    "goal": "string",
    "created_on": "2023-04-25",
    "is_completed": false
  }`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">PUT: Update Goal | http://localhost:8000/goal/{id}</summary>
  This action updates the single goal tied to the input id.
  <br>
  <br>
  Request Body:

  `{
    "user_id": 0,
    "goal": "study for final",
    "created_on": "2023-04-25",
    "is_completed": true
  }`
  <br>
  <br>
  Returns (Status Code 200):

  `{
    "id": 9,
    "user_id": 0,
    "goal": "study for final",
    "created_on": "2023-04-25",
    "is_completed": true
  }`
  <br>
  <br>

</details>
<details>
  <summary markdown="span">DELETE: Delete Goal | http://localhost:8000/goal/{id}</summary>
  This action deletes the single goal tied to the input id.
  <br>
  <br>

  Returns (Status Code 200):

  `true`
  <br>
  <br>

</details>
