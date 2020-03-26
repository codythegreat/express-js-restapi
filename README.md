# Express JS RestAPI

### Installation

clone the repo to your machine. You'll need to have Node JS and NPM installed.

This repo uses Express JS and Nodemon. Express JS is a lightweight web framework, and Nodemon (Node Monitor) will auto refresh the server when any *.js files change.

Run the following command to start the server:

```
nodemon index.js
```

Alternatively you could use `node` in place of `nodemon`

The port is either based off of your environment variable, or defaults to 3000. For our examples we'll use 3000

### Usage

Using either a web browser or an application like Postman you can make GET, POST, PUT and DELETE requests to the API. See the following examples:

+ GET request at localhost:3000/api/cats will return an array of 3 cat objects, each with an `id` and `name` attributes
+ POST request at localhost:3000/api/cats with a body `{"name":"Kingsley"}` will save a new cat object with a unique ID and the name Kingsley. The new object will be the response.