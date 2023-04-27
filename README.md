# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [ ] Wire-frame diagrams
* [ ] API documentation
* [ ] Project is deployed to Render.com/GitLab-pages
* [ ] GitLab issue board is setup and in use
* [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

* `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
* `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
* `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

* make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
* remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

* add these GitLab CI/CD variables:
  * PUBLIC_URL : this is your gitlab pages URL
  * SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

* create account on render.com
* one person create a group and invite all other members
* create a new "Web Service"
  * authenticate with GitLab and choose your project
  * Enter fields:
    * Name: name of your service
    * Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    * Environment: Docker
    * Plan Type: Free
  * click the "Create Web Service" button to create it
  * the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  * click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.




# MOODITOR

## Software Developers:

- Sofia Uribe
- Jackie Liu
- Terence Wong
- Brooke Crokett

## Theme

Mooditor is a platform for individuals to keep track of their daily mood, goals, and activities.

## Design

### Wireframe
- ![Wireframe](/uploads/01a3815cdbc12de899837eb4ea62b090/wireframe.png)

### Schemas
- ![Schemas](/uploads/724f27cadd3c6711a099e44a1c7f8630/Schema.png)

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
