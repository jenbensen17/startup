# DEFCOR Strength

[My Notes](notes.md)

A fitness tracking app that allows users to view eachother's workouts, as well as like and comment on them.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Are you tired of tracking your workouts only to lose your notes? Have you wanted to brag to your friends and family about your rediculously impressive bench press? DEFCOR Strength allows you to effortlessly track your workout of the day and your 1 rep maxes for your favorite lifts. Others can log in and see your most recent workout where they can like and comment on your routine in realtime for all users to see.

### Design

![Design image](./images/fit-tracker.png)

Here is a sequence diagram that shows how users will log, like, and comment on workouts.

```mermaid
sequenceDiagram
    actor You
    actor Joe
    actor Max
    You->>Server: Log workout
    Joe->>Server: Like and Comment on Workout
    Server -->>You: Joe liked and commented
```

### Key features

- Secure login over HTTPS
- Log a workout using exercises from Wger API
- Ability to like and comment on a workout post form another user
- Display your max record for Bench, Squat, and Deadlift
- Workout posts are persistently stored

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three HTML pages. One for login. One for recording workout. One for viewing feed and interacting with posts.
- **CSS** - Application styling to look good on all devices. Friendly color styling. Easy to navigate. 
- **React** - Single page application with content reacting to user actions including likes, comments, sets, and reps.
- **Service** - Backend service with endpoints for:
    - login
    - retrieving exercises from https://wger.de/en/software/api
    - logging a workout
    - retreiving workouts
    - liking and commenting on a workout
- **DB/Login** - Store users, workouts, likes, and comments. Register and login users. Store data securely. Cannot access website unless an account is created.
- **WebSocket** - When likes or comments are posted, all users receive updates.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://defcor-fit.com/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Three HTML pages that represent the ability to login, view, comment, and like workouts, and log new workouts.
- [x] **Proper HTML element usage** - Correctly used HTML tags including BODY, NAV, MAIN, HEADER, FOOTER.
- [x] **Links** - Nav menu that links between all pages. Button on dashboard that links to the log workout page.
- [x] **Text** - Text represents a logged workout and comments from other users.
- [x] **3rd party API placeholder** - The 'Add Exercise' button represents the call to the 3rd party source of exercises.
- [x] **Images** - Included a favicon, main page image, and images next to exercises.
- [x] **Login placeholder** - Form representing a login and register function.
- [x] **DB data placeholder** - The logged workout represents data pulled from the database.
- [x] **WebSocket placeholder** - The comments and likes represent the realtime interaction of other users.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Styled appropiately using flexbox techniques.
- [x] **Navigation elements** - Removed underlines and added a hover effect.
- [x] **Responsive to window resizing** - Added media queries to ensure functionality on all screen sizes.
- [x] **Application elements** - Used contrast and good color palet to style tables and buttons.
- [x] **Application text content** - Changed the font on all pages.
- [x] **Application images** - Styled images and repositioned them to look better. Nav image and dumbell image next to workouts.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Bundled the application using Vite.
- [x] **Components** - Components converted:
    - [x] **login** - login page converted to a react component
    - [x] **dashboard** - dashboard page converted to react component with mock data
    - [x] **workout** - workout page converted to react component without interaction
- [x] **Router** - Routing between home page, dashboard, and workout pages.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** Functionality:
    - [x] - Record workouts and saved to local storage
    - [x] - `setInterval` used to simulate comments and likes from other users
- [x] **Hooks** 
    - `useState` used throughout the application for comments, workouts, likes, etc
    - `useEffect` used throughout the application to load and update data

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Complete
- [x] **Static middleware for frontend** - Completed
- [x] **Calls to third party endpoints** - Search exercises using 3rd party endpoint.
- [x] **Backend service endpoints** - Service endpoints for login, register, logout, like, comment, add workout, get workout.
- [x] **Frontend calls service endpoints** - Frontend calls endpoints to send and receive data from service temporary storage.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **User registration** - Adds user info to databse.
- [x] **User login and logout** - Checks if user exists in database and updates token.
- [x] **Stores data in MongoDB** - Stores workouts, max-lifts, comments, and likes in database.
- [x] **Stores credentials in MongoDB** - User can log in and log out through credentials in MongoDB.
- [x] **Restricts functionality based on authentication** - User cannot interact with website unless logged in.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
