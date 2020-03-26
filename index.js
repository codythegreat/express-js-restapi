// joi is used for error handling on POST requests to the API
// joi returns a class, hence capitallized
const Joi = require('joi');

// Express is the lightweight web framework that will host our API
const express = require('express');

// create our express application
const app = express();

// middleware 
app.use(express.json());

/*
port that our app will listen/respond to
if there isn't a env variable we'll just 
use 3000.
use `export PORT=XXXX` to assign
*/
const PORT = process.env.PORT || 3000;

// for our examples we'll use this array of data
const cats = [
    { id: 1, name: 'Joey'},
    { id: 2, name: 'Pheebs'},
    { id: 3, name: 'Dwight'},
];

/*
We have a few methods with our app object:
These respond to HTTP request methods

app.get()
app.post()
app.put()
app.delete()
*/

/* 
Here we'll begin with our get request
first parameter is the path (url) of the site.

second is the functions that will be called when
we have an http get request at this URL

Notice that we have two arguments for the function,
a request, and a response
*/

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*
And here is a very simple example of what serving
data as an API might look like. We'll return all
of the cats in our array of cats
*/

app.get('/api/cats', (req, res) => {
    res.send(cats);
});

/*
Here we'll get the object by parameter (in this case
we simply called our param id.) Notice that we use the
`:` symbol to designate these in our URL string, and 
we use the req's params to access these.
*/

/*
Notice here that we have a simple look up for our cat
by ID (using the request's parameters) from there if we
don't have a cat at that id, we'll send a 404 response
with an option message, otherwise we'll send the cat obj
*/

app.get('/api/cats/:id', (req, res) => {
    const cat = cats.find(c => c.id === parseInt(req.params.id));
    if (!cat) return res.status(404).send(
        `The cat at ID ${req.params.id} was not found`
    );
    res.send(cat);
});

// and here we have multiple params

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

/*
Sometimes we may have optional params in our URL. 
These are called Query String Parameters. They are
optional. They provide addtional data to backend 
services. so for .../comments?minLen=255 we will get
a key/value pair of 'minLen' and '255'
*/

app.get('/api/comments', (req, res) => {
    res.send(req.query); 
});

/*
In order to create a new cat we'll need to use the 
app.post() method. It is typically best practice to send
back the new object in the response.
*/

/*
The first if statement adds error handling that checks 
that a name was given in the body and that it meets our
requirements.
*/

/*
The second block is how we can do error handling using
the joi NPM package. Here we've called a function that
will check a schema against the request's body. If errors
exits, error will be true (exists), and we can send back
a 400 status and the error to the user.

Note that we've derefferenced the error from the return
of the function as that is all we'll need to know if we
should proceed.
*/

app.post('/api/cats', (req, res) => {
    // if (!req.body.name || req.body.name.length<3) {
    //     res.status(400).send("Name is required with a minimum of three characters");
    //     return;
    // }

    const { error } = validateCat(req.body);

    // first detail's message will have our error in it
    if (error) return res.status(400).send(
        error.details[0].message
    );

    const cat = {
        id: cats.length + 1,
        name: req.body.name, 
    };
    cats.push(cats);
    res.send(cat);
});

app.put('/api/cats/:id', (req, res) => {
    // Look up the course
    // if not exist, return 404
    const cat = cats.find(c => c.id === parseInt(req.params.id));
    if (!cat) res.status(404).send(
        `The cat at ID ${req.params.id} was not found`
    );

    // Validate
    // If invalid, return 400 - Bad Request
    const { error } = validateCat(req.body);

    // first detail's message will have our error in it
    if (error) return res.status(400).send(
        error.details[0].message
    );

    // Update cat
    cat.name = req.body.name;
    // return the updated cat
    res.send(cat);
});

app.delete('/api/cats/:id', (req, res) => {
    // Look up cat
    // if not exist, return 404
    const cat = cats.find(c => c.id === parseInt(req.params.id));
    if (!cat) return res.status(404).send(
        `The cat at ID ${req.params.id} was not found`
    );

    // delete
    const index = cats.indexOf(cat);
    cats.splice(index, 1);

    // return the same course
    res.send(cat); 
})

// validates that name is string with >= 3 chars
const validateCat = (cat) => {
    return Joi.validate(cat, { name: Joi.string().min(3).required() });
};

/*
To activate the server we call the 'listen' method
listen takes two arguments, the port, and an 
optional function. Here we've logged the port to the
console.
*/

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));