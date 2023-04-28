## 4/27/23 Thursday
Today, I worked on:

* adding an if statement to the list of daily goals - if goals.length is zero, return "No goals for today"
* using localStorage to get the value of isCompleted for checkmark to show after refreshing page

For front end purpose, it didn't look really look when the list of daily goals has no goals and only had a title and a "add goal" button, so I added a if statement that if the goals.length is zero, it would show "No goals for today" otherwise show the list of goals
I learned to use localStorage to store teh value of isCompleted, so then the checkmark stay on the page after refreshing the page.

## 4/26/23 Wednesday
Today, I worked on:

* adding the create goal form onto the list of daily goals as a pop-up form
* adding an edit button on the list of daily goals for user to update their goals
* creating the edit goal form
* the edit button opens up the update goal form as a pop-up form

I was able to have the create goal form pop up from the main page by clicking "Add Goal" button.
I created a update goal form. Users are able to click on the "edit" button on the list of daily goals and the update form would pop up for them to edit their goal.

## 4/25/23 Tuesday
Today, I worked on:

* working on ReadMe

I added images for the Wireframe, Schemas, and Docker containers.
Added all endpoints for the FastAPI.The image didn't show up properly on GitLab, and I tried to add them directly into the ReadMe by replacing it.
It ended up breaking the file since the image file was too big.
I hit the delete button and accidentally deleted the entire ReadMe.
Deleting the ReadMe directly from GitLab was basically deleting the file from main branch.
I was having a hard time with the merge conflict since the ReadMe was missing.
Good thing I was able to add it back in GitLab and resolve the merge conflict.

## 4/24/23 Monday
Today, I worked on:

* styling the list of daily goals
* adding toastify to create goal form
* working on ReadMe

I added some simple styling to the list of daily goals. It doesn't look very good at this point but it is functional.
I have pushed the code to merge with main so Sofia can pull them down to add on the main page since it is one of the components that goes onto the main page.
I will go back to work on the styling after Sofia has finish her part.
I added toastify to create goal form that shows a message after the user has created a goal, letting user know that they have successfully added a goal.
I have started working on the ReadMe for our project by adding the wireframe and schemas to the document.

## 4/23/23 Sunday
Today, I worked on:

* styling the create goal form

I used tailwind to add some styling to the create goal form.

## 4/21/23 Friday
Today, I worked on:

* fixing bug for goal list checkbox

The checkbox is finally working properly.
User can check off a goal that they have completed and that would change the "is_completed" to "True" in the database.
I learned that we can use to methods in the same component.
I had to use the 'GET' method to get the gold with the matching id, then use the 'PUT' method to update the goal.

## 4/20/23 Thursday
Today, I worked on:

* continue working on the list for the daily goals

I continued to work on the list for the daily goals.
Although the list has been showing the goal properly, but the checkbox that updates the "is_completed" property in the database still doesn't work.
When the box is checked, it replaces the goal (a string) with the goal's id which is not what I want.

## 4/19/23 Wednesday
Today, I worked on:

* finishing deployment
* working on the list for daily goals

It basically took us the whole day but we are happy that we were able to finish deployment with the help from James.
I started working on the list that shows all the authenticator user created. It has been set to show goals that are created on the current date.

## 4/18/23 Tuesday
Today, I worked on:

* working on the CI/CD deployment

As a group, we finished setting up Caprover.
We had to fix some bugs in order for the lint-test to pass.
We found out that each person in the group needs to validate their account on GitLab in order for the tests to run for the feature branches.

## 4/17/23 Monday
Today, I worked on:

* completing the create a goal form (front end)

I created the create a goal form for the front end.
I tested it out with FastAPI and the data was stored in the database as expected.
I learned that it is okay to go back to make changes in the migration table.
I had to delete all containers/images in docker then rebuilt, but it fixed the bug.

## 4/14/23 Friday (Spring Break)
Today, I worked on:

* fixing the delete goal function

I fixed a bug in the delete goal function.
Unauthorized user was able to delete a goal without having to log in.
The delete method now has been fixed and unauthorized user is no longer able to delete a goal and would get an error message.

## 4/7/23 Friday
Today, I worked on:

* writing unit test for create goal endpoint

I wrote the unit test for create goal endpoint with the 3 "A"s: Arrange, Act, Assert using pytest.
The key takeaways is dependency overrides - it allows us to utilize the class we identified (EmptyGoalQueries) instead of using the actual data.

## 4/6/23 Thursday
Today, I worked on:

* coding with group: completed front-end authorization, signup and signup form.

As a group, we were stuck on the front-end auth for hours.
And later learned that we must keep "`${process.env.REACT_APP_USER_SERVICE_API_HOST}` as it is.
We can't change the user to something that match with our project name.
We were also able to get the front-end signin/signup form working.

## 4/5/23 Wednesday

Today, I worked on:

* coding with partner - Brooke
* added the update goal endpoint
* added the delete goal endpoint

With my partner, we added an inner join for the get_one_goal and get_all_goals endpoint since we need to filter out each goal that has been created by different users.
I created the update goal and delete goal endpoints.
I need to be more careful with the , and ; for the SQL tables, otherwise might take up some time to debug.

## 4/4/23 Tuesday
Today, I worked on:

* coding with partner - Brooke
* added a new property to the goals table

I added a new property, created_on, for the goals table and updated migrations.
We were able to complete the create goal endpoint with bugs fixed and added on the new property.
We also completed the get_all and get_one goal endpoints.

## 4/3/23 Monday
Today, I worked on:

* coding with partner - Brooke

Brooke and I created the create goal endpoint.
We were stuck on getting a 200 response for hours.
We later figured out that we didn't reference the variable name that we created in the goals table correctly.

## 3/30/23 Thursday
Today, I worked on:

* creating authentication file and token
* creating the users.py in Routers and Queries folder
* creating login / logout endpoint on FastAPI
* creating a user account

I implemented the authentication file and token for users to log in / sign up.
I added user classes in the users.py files in Routers and Queries folder.
I integrated the jwtdown library for the user account and log in / log out end points.
As a group, we were able to see those end points on the FastAPI page.

## 3/29/23 Wednesday

Today, I worked on:

* merging and pulling from main branch
* creating a goals table for migration using PostgresSQL
* creating a merge request and closing an issue ticket that I completed

As a group, we finished setting up the docker-compose file and successfully connected to Beekeeper.
We all merged and pulled from main branch and merged the merge conflicts.
We found out that, we must rebuild the docker volume after pulling down a migration file.

I completed the goals table with a foreign key referencing the id from the users table.
I was able to test it out on Beekeeper.
I created a merge request in GitLab and assigned it to my coding pair.
We approved the merge request and as a group we were able to merge and pull from main with everyone's migrations.

## 3/38/23 Tuesday

Today, I worked on:

* setting up the docker-compose file
* connecting Beekeeper to our project

I worked on the docker-compose file following the project setup instruction provided on Learn.
I found out that we only need the rational-data files if we plan to have multiple databases.

As a group, we were having trouble connecting to Beekeeper.
We later found out that we need to build our docker containers with "DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build" since our MacBooks have a M1 chip. After building the docker containers, we were able to connect to Beekeeper and see the sample table.


## 3/27/23 Monday

Today, I worked on:

* practicing our first standup
* adding user stories to issue tickets on GitLab

As a group, we practiced our first standup, which provided updates on what we have worked on so far and if we have any blockers.

I added user stories to the issue tickets that I created last week on GitLab.

## 3/24/23 Friday

Today, I worked on:

* creating issue tickets and assigning them on GitLab

I created issue tickets and assigned them to myself on GitLab.