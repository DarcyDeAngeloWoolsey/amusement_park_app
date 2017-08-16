const mongoose = require('mongoose');

// this is our schema
/*String possibly presented as drop down/selection: Amusement Park Name
String: Name of Ride
    Output: Name of ride (textuppercase?)
Num: Length of time in minutes until seated
    Output: Number in minutes
String possibly presented as drop down/selection: Type of Ride
    Output: Image of type of ride or string for roller coaster, spin ride, 3/4D ride, dark ride, high ride.
String possible presented as drop down/selection: Type of Thrill
    Output: High, Medium, Low
Num:1-10 rating or String: Y or N Recommend to a Friend
    Output: Number, Stars, Yes/No
String: Describe in one word
    Output: Word in quotes*/

const rideSchema = mongoose.Schema({
    amusementParkName: {
        type: String,
        required: true
    },
    rideName: {
        type: String,
        required: true
    },
    typeOfRide: {
        type: String,
        required: true
    },
    thrill: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    minutesWait: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }

});



// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
rideSchema.methods.apiRepr = function () {

    return {
        id: this._id,
        amusementParkName: this.amusementParkName,
        rideName: this.rideName,
        typeOfRide: this.typeOfRide,
        thrill: this.thrill,
        text: this.text,
        minutesWait: this.minutesWait,
        rating: this.rating,
        created: this.created
    };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const RideStatus = mongoose.model('RideStatus', rideSchema, 'rides');

module.exports = {
    RideStatus
};
