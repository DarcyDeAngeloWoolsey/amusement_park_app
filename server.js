const express = require('express');
const mongoose = require('mongoose');

const {
    DATABASE_URL, PORT
} = require('./config');
const {
    RideStatus
} = require('./models');

const app = express();
//express will use files in the static public folder
app.use(express.static('public'));



//get the index.html at the root
app.get("/", (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

mongoose.Promise = global.Promise;


//need to figure out how to app.use the functions in app.js

app.get('/rides', (req, res) => {
    consol.log('yep');
    RideStatus
        .find()
        .exec()
        .then(rides => {
            res.json(rides.map(rides => ride.apiRepr()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'A 500 error has occured'
            });
        });
});

//changing from running on local to running on mlab/heroku.
// both runServer and closeServer need to access the same server object, so we declare `server` here, and then when runServer runs, it assigns a value.

let server;

// this function starts our server and returns a Promise. In our test code, we need a way of asynchronously starting our server, since we'll be dealing with promises there.
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = {
    runServer, app, closeServer
};

// Model, schema
// 1st - add some ride

// 1. GET /rides - list everything
// 2. POST /rides - add a new ride
// PUT /rides/:id - update a ride (with given id)
// GET /riders/:id - get a single ride
// DELETE /riders/:id
// 1. GET /riders?search=something
