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


//create button that says "hey I want to see the info" for the function below.. follow all the user stories for UI..

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
        $('main').append(

            '<p>' + data.rideStatus[index].amusementParkName + '</p>',
            '<p>' + data.rideStatus[index].rideName + '</p>',
            '<p>' + data.rideStatus[index].minutesWait + '</p>',
            '<p>' + data.rideStatus[index].thrill + '</p>',
            '<p>' + data.rideStatus[index].rating + '</p>',
            '<p>' + data.rideStatus[index].text + '</p>',
            '<button class="btnEdit">' + "Edit" + '</button>',
            '<button class="btnDelete">' + "Delete" + '</button>',

            '</main>'
        );
    }
    $(".btnEdit").click(function (event) {
        event.preventDefault();
        $(".modalEdit").show();
    });

    $(".btnDelete").click(function (event) {
        event.preventDefault();
        $(".modalDelete").show();
    });
}

//$(".btnDelete").on('click', function (event) {
//    event.preventDefault();
//    $(".modalDelete").show();
//});


/*Short version:
function displayRideUpdates(data) {
    data.rideStatus.forEach(function (ride) {
        Object.keys(ride).forEach(function (key) {
            console.log(ride[key])
            if (key !== 'id') {
                $('body').append('<p>' + ride[key] + '</p>' + ' ');
            }
        })

    });
}*/

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
$(document).ready(function () {
    $(".modalAdd").hide();
    $(".modalDelete").hide();
    $(".modalEdit").hide();
    $(".list").hide();

    $(".formList").submit(function () {
        event.preventDefault();
        $(".list").show();

    });

    $(".buttonNew").click(function () {
        event.preventDefault();
        $(".modalAdd").show();

    });

    $(".formAdd").submit(function () {
        event.preventDefault();
        $(".modalAdd").hide();
        $(".list").show();

    });


    $(".buttonDeleteYes").click(function () {
        event.preventDefault();
        $(".modalDelete").hide();
        $(".list").show();
    });

    $(".buttonDeleteNo").click(function () {
        event.preventDefault();
        $(".modalDelete").hide();
        $(".list").show();
    });

    $(".formEdit").submit(function () {
        event.preventDefault();
        $(".modalEdit").hide();
        $(".list").show();
    });

    $(".buttonEditCancel").click(function () {
        event.preventDefault();
        $(".modalEdit").hide();
        $(".list").show();
    });

});
