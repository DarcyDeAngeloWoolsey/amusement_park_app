var MOCK_RIDE_UPDATES = {
    "rideStatus": [
        {
            "id": "1111111",
            "amusementParkName": "Disney World Hollywood Studios",
            "rideName": "Tower of Terror",
            "minutesWait": 45,
            "typeOfRide": "Drop",
            "thrill": "High",
            "rating": 5,
            "text": "Whoooo!",
        },

        {
            "id": "2222222",
            "amusementParkName": "Disney World Hollywood Studios",
            "rideName": "Rock and Roll Rollercoaster",
            "minutesWait": 90,
            "typeOfRide": "Rollercoaster",
            "thrill": "High",
            "rating": 5,
            "text": "Sweet!",
        }
    ]
};

// create a function that passes the callbackFn as the argument and sets a timeout function whose purpose is to pass the mock Json object as its argument, and wait a short time in doing so.

function getRecentRideUpdates(callbackFn) {
    setTimeout(function () {
        callbackFn(MOCK_RIDE_UPDATES)
    }, 100);
}

// this function stays the same when we connect
// to real API later
//create a function that has data passed as its argument. And for each index in the data that is in the Json Object named rideStatus, append that index to the paragraph element.
function displayRideUpdates(data) {
    for (index in data.rideStatus) {
        $('body').append('<p>' + data.rideStatus[index].amusementParkName + '</p>',
            '</br>', '<p>' + data.rideStatus[index].rideName + '</p>',
            '</br>', '<p>' + data.rideStatus[index].minutesWait + '</p>',
            '</br>', '<p>' + data.rideStatus[index].typeOfRide + '</p>',
            '</br>', '<p>' + data.rideStatus[index].thrill + '</p>',
            '</br>', '<p>' + data.rideStatus[index].rating + '</p>',
            '</br>',
            '<p>' + data.rideStatus[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
//create a function whose purpose is to get and display the updates by passing the above functions as the argument
function getAndDisplayRideUpdates() {
    getRecentRideUpdates(displayRideUpdates);
}

//create a JQuery function whose purpose is to run the above function

$(function () {
    getAndDisplayRideUpdates();
})
