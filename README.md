# WTWR - Sprint 13 & 14 & 15 (What to Wear?): Backend Description

This back-end project is focused on creating a server for the WTWR application. This project displays a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization with deployment on google cloud (Sprint 14 & 15). Some difficulties arose with testing the project, however, now the error handeling is standardized and all research has been concluded into all error messages.

## Tech Stack

-Postman
-Mongo DB
-Node.js
-Java Script
-Express
-Google Cloud - VM
-AI was used sparing to help research error messages and middleware issues.

## Pitch Video (recorded on Loom): => ([Shared Link](https://drive.google.com/file/d/1UugoRMd1f4ChOqeoWVyZEP-7YAroCi1F/view?usp=drive_link))

##Deployment -https://www.wtwrepk3.serverpit.com

-This webpage is deployed on Google Cloud [front-end project on Github] => ([link](https://github.com/epkolodziejiii/se_project_react.git))

## Interacting with the Project

`Sign Up` — to register an account
`Log In Button` — to log in using a username and password
`+Add Clothes` - to add items that will be filtered based on current weather

### Testing

`Crash Tested`

router.get('/crash-test', () => {
setTimeout(() => {
throw new Error('Server will crash now');
}, 0);
});
