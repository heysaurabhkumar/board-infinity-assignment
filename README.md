# board-infinity-assignment
Assignment given by Board Infinity.

### Deployed on Heroku - 
URL: https://bi-assignment.herokuapp.com/

## There are two endpoints
1. https://bi-assignment.herokuapp.com/add - To add new data
2. https://bi-assignment.herokuapp.com/list - To list all data

## To run it on localhost-
Download this repo and unzip it.

### Steps to run backend server:
  Run the following commands.\
    Step 1: Open this directory in terminal.\
    Step 2: npm install\
    Step 3: npm i nodemon\
    Step 4: nodemon app.js
    
    Go to chrome browser and open localhost:3000

### NPM Modules used in nodejs:
1. express
2. ejs
3. moment
4. mongoose
5. node-cron

### Note: Delete operation runs with a delay of maximum of 1 min (0-60sec).
This is because cron function is running in the interval of one minute. So there's a possibility that the duration of task get expired but it is getting deleted with a delay between 0 sec to 60 sec.

