# Calendar App
## Built by Krista Triviso

## Project Description

The following application was built for the sole purpose of meeting the requirements for Spotify's Internship.

![Final Version](https://github.com/ktriviso/calendar)

![Hosted Version](https://spotify-internship.herokuapp.com/)

## Developer Instructions

- Download Github repository ![Here](https://github.com/ktriviso/calendar).
- Using SQL create a database called 'calendar'
- CD into db folder, run psql -d calendar -f schema.sql
- From root, run yarn dev (both servers will start)
- Open localhost:3000

## User Instructions

- Sign into calendar with any username
- Click '+' icon on day to add a new event
- Toggle months by clicking on the month at the top of the page
- Click on event to view, edit or delete
- Toggle check list by clicking on 'click me' on the top, left-hand of page

## Technical Requirements

Front End:
- The UI should have one month hard coded view (Pick any month)
- Ignore users/login, just have one hardcoded user
- Click on a day box, and be able to create a new event on that day which gets sent to the backend on clicking - submit.
- The form should have start time, end time, description and submit.
- Once submit is clicked the form should disappear.
- Event should now appear in that day’s box.
- Events cannot span multiple days. Must start and end the same day.
- Show all events the user has on their calendar.
- The UI should have 4 rows of 7 boxes (simple case of a 28 day month).
- The application should communicate with an API backend using JSON. Don’t spend a lot of time on the UI - making it look beautiful; just make it functional.
- Switch between months
- Day view
- Handle too many events to fit in your box UI on a given day.
- You should be able to update/delete events. How you implement this UX is up to you.
- The UI should have 5 rows of 7 boxes with the correct date on the correct days.

Back End:
- POST /events - should create an event
- GET /events - should return all events

Events (Optional API. Not required; bonus points available)
- DELETE /events/:id - should delete an event
- PUT /events/:id - should update an existing event


## Technologies and Additional Libraries / Tools

| Name            | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| Express         | Framework used to build web applications and API's                   |
| Nodemon         | Monitors changes in source code and restarts the server              |
| NPM             | Package manager for Javascript                                       |
| Yarn            | Package manager with fast, reliable and secure dependency management |
| React           | Flexible JavaScript library for building user interfaces             |
| Moment.js       | JavaScript library for manipulating and parsing dates and time       |
| FontAwesome     | Font and icon toolkit based on CSS and LESS                          |
| Heroku          | cloud platform as a service supporting several programming languages |

## Issues and Resolutions

ERROR: Could not get the parents component to re-render when an event was updated

RESOLUTION: window.location.href = window.location.href
not best practice but it forces the window to reload
when using window.reload this error happened : window.reload is not a function
