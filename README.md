# Monthly Wage Calculator

Calculate monthly wage for every person based on the multiple CSV working hours files.

## Install packages

Run command in the root directory.

    npm install
    
## Start the project

Run command in the root directory.

    npm start
    
## Run tests

Run command in the root directory. You have to start server side first (npm run start:dev) if you want to pass all the tests.

    npm test
    
## Rest API documentation

    <url>/api
    
## For development purpose - Client side

Start Webpack development server.
   
    npm start

## For development purpose -  Server side

Run the command on the server side when the app.bundle.js file is up to date. Build app.bundle.js file in client side by using npm run build command. By default the application should be running in your localhost's port 3000.

    npm run start:dev

## Build data to dist folder - Client side

Create files to the dist folder.

    npm run build
    
## Server side main technologies

    Node
    Koa
    TypeScript
    Swagger
    Moment
    Winston
    Mocha and Chai
    CSV Parser
    
## Client side main technologies

    React
    Babel
    Webpack
    Sass
    CSS modules

## Jest tips - Client side

- Watch test changes  
    - npm test -- --watch
- Run test coverage    
    - npm test -- --coverage 
- Update snapshots   
    - npm test -- -u
