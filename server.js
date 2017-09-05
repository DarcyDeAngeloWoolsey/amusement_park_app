const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
    DATABASE_URL, PORT
} = require('./config');
const {
    RideStatus
} = require('./models');

const app = express();
//express will use files in the static public folder
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



//get the index.html at the root
app.get("/", (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

mongoose.Promise = global.Promise;


//need to figure out how to app.use the functions in app.js

//app.get('/rides', (req, res) => {
//
//    RideStatus
//        .find()
//        .exec()
//        .then(rides => {
//            res.json(rides.map(ride => ride.apiRepr()));
//        })
//        .catch(err => {
//            console.error(err);
//            res.status(500).json({
//                error: 'A 500 error has occured'
//            });
//        });
//});

app.get('/rides', (req, res) => {
    const filters = {};
    const queryableFields = ['amusementParkName', 'rideName'];
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
    });
    RideStatus
        .find(filters)
        .then(rides => {
            res.json(rides.map(ride => ride.apiRepr()))
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            })
        });
});

//add a ride
app.post('/rides', (req, res) => {
    console.log("running post in server", req.body);
    const requiredFields = ['amusementParkName', 'rideName', 'minutesWait', 'typeOfRide', 'thrill', 'rating'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        console.log(field, req.body)
        if (field in req.body) {
            console.log("field in req.body");
        }
        if (!(field in req.body)) {

            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);

        }
    }

    RideStatus
        .create({
            amusementParkName: req.body.amusementParkName,
            rideName: req.body.rideName,
            minutesWait: req.body.minutesWait,
            typeOfRide: req.body.typeOfRide,
            thrill: req.body.thrill,
            rating: req.body.rating,
            text: req.body.text
        })
        .then(
            ride => res.status(201).json(ride.apiRepr()))
        .catch(err => {

            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });

        });
});

app.put('/rides/:id', (req, res) => {
    console.log("app.put started");
    if (!(req.params.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
        console.log("req params");
    }

    const updated = {};
    const updateableFields = ['amusementParkName', 'rideName', 'minutesWait', 'typeOfRide', 'thrill', 'rating', 'text'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }

    });
    RideStatus
        .findByIdAndUpdate(req.params.id, {
            $set: updated
        }, {
            new: true
        })
        .exec()
        .then(ride => res.status(200).json(ride.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({

                message: 'Something went wrong'
            })
        });
});

app.delete('/rides/:id', (req, res) => {
    RideStatus
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            res.status(204).json({
                message: 'success'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
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
