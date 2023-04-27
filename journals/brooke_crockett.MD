## March 28, 2023
Today I worked on:
* Docker yaml file and connected database to Beekeeper Studio

Today we worked as a group on the docker yaml file and connected the database to Beekeeper Studio.


## March 29, 2023
Today I worked on:
* Creating the user-table-migrations

Today we worked together to create our tables. We each were assigned a table to create. When it was my turn I shared my screen and created the user-table-migrations table with the help of my team. We were able to successfully get the table working on BeeKeeper and I created a merge request. I requested that Sofia review my merge request and she approved it. We all assisted each other when creating the tables. When Sofia's table was finished and running on BeeKeeper, she requested that I approve her merge request and I did so. Additionally, I approved Jackie's merge request. Once everyone's merge request was approved we were able to pull the changes successfully and run the application on our own dev branches.


## March 30, 2023
Today I worked on:
* Auth, back-end

Today we decided to work on our backend auth as a team. Jackie did the following and we all assisted her while she shared her screen:
-Implementing authentication file and token
-login / logout endpoints
-created post method for users
-created an account


## April 3, 2023
Today I worked on:
* CREATE goals endpoint

Today we decided to split off into pairs to pair program. Sofia and Terence worked together while Jackie and I worked together. I shared my screen and led the session by starting the create endpoint for our goals. Jackie assisted me while I coded. Ultimately, we weren't able to finish the endpoint because we couldn't get it to run in the API. Terence and Sofia looked over the endpoint as well, however none of us were able to get it to run.


## April 4, 2023
Today I worked on:
* CREATE, GET all, GET one goal endpoints

Today we broke off into pairs to pair program again. Jackie assisted me while I shared my screen and coded. We were able to finish the CREATE endpoint as well as start on the get all and get one goal endpoints. Ultimately, we were able to finish all three endpoints and get them to run in the API as well as Beekeeper. I was able to create a merge request for all three endpoints in Gitlab and Jackie approved/merged them. I was able to close all three issues in Gitlab as well.


## April 5, 2023
Today I worked on:
* Assisting with UPDATE and DELETE goals endpoints

Today we broke off into pairs again to pair program. I worked with Jackie again. This time she shared her screen and I helped assist her with the update and delete goal endpoints. By the end of the day we were able to get both endpoints working in the API and Beekeeper. She created a merge request for both and I approved/merged them both. Together Jackie and I were able to complete all backend endpoints for goals by the end of today so tomorrow we may start on front end auth or the front end login page.


## April 6, 2023
Today I worked on:
* Frontend Auth as a group with my team

Today we decided to work on our frontend auth as a group. First I shared my screen and acted as the driver writing all of the code. We were able to get our login page up and running however we were unable to retrieve the token. While on a break, Terence looked over the code and was able to get it to run on his side so by the end of the day he was able to submit the merge request and we all had it running on our personal dev branches.


## April 7, 2023
Today I worked on:
* Unit test for get one goal

Today I created a unit test to get one goal. I worked on this component individually and was able to successfully complete it on my own. Once finished I created a merge request and Jackie approved it and merged it to main.


## April 17, 2023
* Created the entry front end page

Today I created the entry's front end form. It is the page where a user will create an entry for the day with their mood, activities, and journal entry. I worked on this form individually while everyone else on the team worked on their individual front end components.


## April 18, 2023
Today I worked on:
* Continuing the front end entry form and pair programmed with the team on deployment

During the first half of the day I worked on the EntryForm.js file. I was able to get the mood and journal working however, I was not able to get the activities to show up. I worked on this by myself until lunch. After we came back from lunch we decided to begin deployment as a team. Sofia was the driver and we all assisted her in writing the code. By the end of the day we were able to finish part 3 of deployment.


## April 19, 2023
Today I worked on:
* Continuing part 4 of deployment

Today we decided to finish deployment. I was the driver while everyone else on the team assisted me while I coded. We worked on part 4 and ended up running into some issues. On CapRover, in our service on HTTP settings we got this error: 1107 : Verification Failed. and we were unable to access https://mooditor.dec-pt-4.mod3projects.com/docs. James ended up coming into our room and helped me through the problem. Working on this took us until the end of the day and by the end of the day we had deployment fully finished.


## April 20, 2023
Today I worked on:
* Continuing the front end entry form

Today we decided to work on our individual front end components so I continued to work on my front end entry form. I had my journal and moods working so I just needed to work on getting the activities to show up. When trying to create an entry with more than one activity, I was unable to create the entry and this is the error I get: POST http://localhost:8000/entries 422 (Unprocessable Entity) & Could not create entry, however it did work and post with only one activity. By the end of the day with the help of Terence I was able to get more than one activity to populate and the form was fully functional.


## April 21, 2023
Today I worked on:
* Front end entry form styling and adding buttons for activities

Today I tried to turn the moods and activities into buttons instead of typing them into a text box. By the end of the day I wasn’t able to get the activities into buttons but I was able to get the moods into buttons.


## April 24, 2023
Today I worked on:
* Front end entry form styling and turning the activities into buttons

Today we only had a half day to work because the first half of the day was spent on the practice exam. The moods were fully functional buttons and I continued to work to get the activities into buttons. By the end of the day I was able to turn the activities into fully functional buttons with the help of Terence.


## April 25, 2023
Today I worked on:
* Turning the activity buttons into icons instead of words

Today I tried to get the activity buttons to show up as icons of the activity instead of the word of the activity. I was able to import the icons from font awesome using React however, I was unable to turn them into buttons. Terence took a look at it for me and was able to help turn them into buttons after he pulled from my branch into his and tested it out for a little bit. By the end of the day Terence created a merge request and pushed the working branch with the working logo buttons to main. By the end of today we all had completed the requirements for the project and tomorrow I will begin on the readme.


## April 26, 2023
Today I worked on:
* README

Today I finished the readme by adding in the functionality of our web application and our mission statement. We have met all of the requirements for the project so all we needed to do today was debug some caprover issues since we were getting a 502 error when trying to access http://mooditor.dec-pt-4.mod3projects.com/. James came into our room to help us debug the problem as it was resolved. Additionally, I rewrote the wireframe and schema of our project and put the updated versions in the readme.
