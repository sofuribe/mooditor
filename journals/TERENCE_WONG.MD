## March 29, 2023

Today, I worked on:

- Creating a table for activities model.

Had to do some research on how to use ENUM with SQL. Added a new migrations file for the
activities table. Had to create a type as ENUM so all activities have their own value.
The table then consist of an id, entries_id (from entries table), and the name of activities.
Was able to complete the table, create a merge request, and push my branch into the main branch
after testing the table with Beekeeper ensuring it was working properly.

## March 30, 2023

Today, I worked on:

- Pair Programming with team on backend authentication.

## April 3, 2023

- Queries and Routers

Sofia and I collaborated on pair programming to develop the query and router functionalities for
the "entries" feature. I created base models for the endpoint and implemented a "create" function for
the entry endpoint. In the router file, I defined a function to handle the POST method for creating entries.
The endpoint was tested on Swagger and is fully functional.

## April 4, 2023

- GET endpoints

Pair programming with Sofia on GET endpoint for entries. Successfully implemented a GET function
that allows you to retrieve all entries. Endpoint was tested on swagger and is fully functional.

## April 5, 2023

- GET endpoints

Fixed GET endpoint for all entries; filtered the entries by user. A user should only be able to
access their entries. Paired programmed with Sofia to work on her endpoint: GET entry by id

## April 6, 2023

- Frontend Auth

As a group, we integrated the login/signup form with the frontend, establishing a connection to the
backend to obtain the access token. Also, worked on Sofia’s last couple endpoint: GET and PUT.

## April 7, 2023

- Unit Test

Worked on creating a test for the entry POST method. Paired programmed with Sofia and got all her
endpoints up and running.

## April 12, 2023

- Unit Test

Created a unit test for creating an entry. Test pass.

## April 14, 2023

- Calendar Component

Worked on the calendar component. Researched libraries for a calendar and how to load data from
the database into the corresponding dates

## April 17, 2023

- Calendar Component

Continued to work on the calendar component. The calendar renders on the front end and if there
is an entry on the date selected the entry renders on the right side of the calendar. The date also
has a colored dot corresponding to the mood the user selected for that day.

## April 18, 2023

- CI/CD

Worked as a group on deployment. Parts 1-3 on deployment were done. Pipeline was failing because of
flake 8.

## April 19, 2023

- CI/CD

Continued on the rest of deployment

## April 20, 2023

- CI/CD

Had some bugs with deployment. Had assistance from James with debugging. Deployment is up
and running

## April 24, 2023

- Entry Form

Paired programmed with Brooke to create an entry form.

## April 25, 2023

- Entry Form

Replaced entry form with functionally icon buttons to represent each mood and activity

## April 26, 2023

- Bug Fixes

Fixed migration error on caprover. Deleted database and created a new one due to changes
in our tables.
