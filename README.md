# Twitter Image Bot Creation Platform (working title)

This project is a web application built for creating simple Twitter bots that periodically post images on a predetermined schedule. There are various accounts on Twitter that post random images from certain pieces of media (TV shows, comics, etc.), and this application was designed to allow people with limited programming knowledge to create such a bot.

The application has been deployed, but I've decided to limit access to avoid rate limiting issues with Twitter's API. I'm currently working on a public demo that does not make use of the image posting functionality. In the meantime, if you'd like access to the full version of the application, email me at tmcdeane@gmail.com.

## Features

- Login via Twitter OAuth
- Uploading and deleting images from the pool of available images
- Ability to update the posting schedule (currently, only periods from 1 to 24 hours are supported)
- Editing of captions posted alongside images

### Additional Features I Plan to Add

- Pagination and filtering - I planned to make use of the Storage API for this, but it's not flexible enough, so I'll end up having to store image metadata in the database
- Configuration for "repeat allowance", or how many images can be posted before a previously posted image is posted again
- Administrative automation - I want to be able to make the application public without having to worry about too many users pushing the API rate limit
- More testing - The backend consisted of a lot of "glue code" that's difficult to test without detailed mocks, which I will consider creating, but I'd like to focus on frontend testing

## APIs and Technology Used

The frontend was created with React, while the backend was created with Express. Some of the notable libraries I used include Material-UI, Passport, Knex, and React-Dropzone. I make use of the Twitter API for posting images, as well as various APIs for interacting with Google's cloud services, by way of the Node.js API clients designed for these services. The main services used are Cloud Scheduler, Cloud Storage, and Cloud Functions, as well as App Engine for deploying the app. The database server for the deployed version of the app lives on a Compute Engine instance.
