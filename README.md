# Calendar App
## Built by Krista Triviso

## Project Description

The following application was built for the sole purpose of meeting the requirements for for Spotify's Internship.

![Final Version](https://github.com/ktriviso/calendar)
![Hosted Version]()

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

Optional Specs (Not required; bonus points available for inclusion of one or more features)
- Switch between months
- Week or day view
- Handle events spanning multiple days
- Handle too many events to fit in your box UI on a given day.
- You should be able to update/delete events. How you implement this UX is up to you.
- The UI should have 5 rows of 7 boxes with the correct date on the correct days.

Back End:
- POST /events - should create an event
- GET /events - should return all events

Events (Optional API. Not required; bonus points available)
- DELETE /events/:id - should delete an event
- PUT /events/:id - should update an existing event

## Instructions

-   Download Github repository ![Here](https://github.com/ktriviso/calendar).
-   Run 'yarn dev' from the root directory
-   Open localhost:3000

## Technologies and Additional Libraries / Tools

| Name            | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| Express         | Framework used to build web applications and API's                   |
| Nodemon         | Monitors changes in source code and restarts the server              |
| NPM             | Package manager for Javascript                                       |
| Yarn            | Package manager with fast, reliable and secure dependency management |
| React           | Flexible JavaScript library for building user interfaces             |
| Moment.js       | JavaScript library for manipulating and parsing dates and time       |

Special thanks to TEK Academy Labs. The dynamic built for the calendar UI was built in part with their ![toutorial](https://www.youtube.com/watch?v=9U0uTNfY1UA). 

## Issues and Resolutions

ERROR:

RESOLUTION:
