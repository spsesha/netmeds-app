# Description
The app is used to connect and make users and doctor chat with each other.

It logs all the chats of the user with the doctors so that they can revisit the entire chat. 

This repo contains two projects `chat-frontend` and `backend`. run `npm install` on each of the folder to install the dependencies

# Installation

Please run the below commands on the root folder

```sh
cd ../chat-frontend
npm install
cd backend
npm install

# run the backend project as it already contains the angular build files

npm start
```

# Working

The app has a login screen where the user can choose whether they are a normal user to doctor. Based on their choice, different screen will be displayed.

## User Screens

### Home screen

Home screen will have a button to chat with a doctor and a list of card that contains the link for previous chat history

### Chat screen

This screen will contain the chat window which displays previous chat history or the current chat with the doctor

## Doctor Screens

### Home screen

Home screen contains list of active requests from the users and doctors can accept/reject the request based on their availability

### Chat screen

Once the request has been accepted, the chat screen will open where the doctor will be connected with the user and the chat session continues till one of the party closes the session.