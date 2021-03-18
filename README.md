# Overview
This repo is used for the frontend part of a booking app. React is used as framwork.  
For a quick start **Create React App** was used to spawn the base of the frontend.  
All infos about Create React App can be found below.  
For this project the functionality is more of a "side effekt".  
It mostly creates a foundation which can be adapted to any use case.  
A GraphQL API is used to get and post data to and from the backend.  
The Backend can be found here: https://github.com/LucWag92/Booking_Backend  

## Deploy Website to GitHub Pages
- npm run deploy  
Quelle: https://medium.com/devcnairobi/deploy-a-react-app-on-github-pages-67503a8ac87a

## Start Project
1. npm install
2. npm start

## Start Debug Modus
1. Frontend:
- Use in VSCode: Create a launch.json file inside of the frontend folder.
-  Create a new Chrome Launch config to this file.
  ```json
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Chrome React WebApp",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/frontend"
    }
  ]
  ```
- Just start the Debug process via the debugging panel in VSCode.




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
