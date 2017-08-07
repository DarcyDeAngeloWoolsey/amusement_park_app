var MOCK_RIDE_UPDATES = {
    "ride status": [
        {
            "id": "1111111",
            “amusementParkName”: “Disney World Hollywood Studios”,
            “rideName”: “Tower of Terror”,
            “minutes”: 45,
            “typeOfRide”: “Drop”,
            “thrill”: “High”,
            “rating”: 5,
            "text": "Whoooo!",
        }
    ]
}
};

// create a function that passes the callbackFn as the argument and sets a timeout function whose purpose is to pass the mock Json object as its argument, and wait a short time in doing so.

function getRecentRideUpdates(callbackFn) {
    setTimeout(function () {
        callbackFn(MOCK_RIDE_UPDATES)
    }, 100);
}

// this function stays the same when we connect
// to real API later
//create a function that has data passed as its argument. And for each index in the data that is in the Json Object named statusUpdates, append that index to the paragraph element. For instance, id is index 0, text is index 1…
function displayRideUpdates(data) {
    for (index in data.statusUpdates) {
        $('body').append(
            '<p>' + data.statusUpdates[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
//create a function whose purpose is to get and display the updates by passing the above functions as the argument
function getAndDisplayStatusUpdates() {
    getRecentStatusUpdates(displayStatusUpdates);
}

//create a JQuery function whose purpose is to run the above function

$(function () {
            getAndDisplayStatusUpdates();
