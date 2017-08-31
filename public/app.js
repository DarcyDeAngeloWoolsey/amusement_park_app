/*var MOCK_RIDE_UPDATES = {
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
};*/


//create button that says "hey I want to see the info" for the function below.. follow all the user stories for UI..

// create a function that passes the callbackFn as the argument and sets a timeout function whose purpose is to pass the mock Json object as its argument, and wait a short time in doing so.

/*function getRecentRideUpdates(callbackFn) {
    setTimeout(function () {
        callbackFn(MOCK_RIDE_UPDATES)
    }, 100);
}*/

//does the about callback, but with real data from .get

function getRecentRideUpdates(data) {
    setTimeout(function () {
        //        $.ajax({ method: 'get' })
        //        $.post

    }, 100);
}

// this function stays the same when we connect
// to real API later
//create a function that has data passed as its argument. And for each index in the data that is in the Json Object named rideStatus, append that index to the paragraph element.
function displayRideUpdates(data) {
    console.log("displayRideUpdates working");

    if (data.length == 0) {
        console.log("no data");
        $('main').append(
            '<p>' + "Sorry there are no matches" + '</p>',
            '<br />'
        );
    }
    /*for (index in data ) */

    // forEach
    //     data.forEach(ride => {
    //        $('main').append(
    //            '<p>' + ride.amusementParkName + '</p>',
    //            '<p>' + ride.rideName + '</p>',
    //            '<p>' + ride.minutesWait + '</p>',
    //            '<p>' + ride.typeOfRide + '</p>',
    //            '<p>' + ride.thrill + '</p>',
    //            '<p>' + ride.rating + '</p>',
    //            '<p>' + ride.text + '</p>',
    //            '<br />',
    //            '<button class="btnEdit">' + "Edit" + '</button>',
    //            '<button class="btnDelete">' + "Delete" + '</button>',
    //            '<br />',
    //            '</main>'
    //        );
    //    });


    for (i = 0; i < data.length; i++) {
        console.log("index working");
        let id = data[i].id;
        $('.btnDelete').data("id", id);

        $('main').append(
            '<p>' + data[i].amusementParkName + '</p>',
            '<p>' + data[i].rideName + '</p>',
            '<p>' + data[i].minutesWait + '</p>',
            '<p>' + data[i].typeOfRide + '</p>',
            '<p>' + data[i].thrill + '</p>',
            '<p>' + data[i].rating + '</p>',
            '<p>' + data[i].text + '</p>',
            '<br />',
            '<button class="btnEdit">' + "Edit" + '</button>',
            /*data attribute with id from database*/
            '<button class="btnDelete" data-id=id>' +
            data[i].id + '</button>',
            '<br />'
        );


    }
    $('.btnDelete').click(function () {
    alert($(this).data("id"));
    /* $(".deleteBtnDiv").append(
            '<button class="button buttonDeleteYes type="button">' + "Yes" + '</button>',
            '<button class="button buttonDeleteNo" type="button">' + "No" + '</button>'
        )*/
    /*$(".buttonDeleteYes").data("id", id);*/
    $(".modalDelete").show();
    /*$('.buttonDeleteYes').click(function () {
            alert($('.buttonDeleteYes').data("id"));
        });*/
});
    /*alert($('.btnDelete').data("id"));*/

    $(".btnEdit").click(function (event) {
        event.preventDefault();
        $(".modalEdit").show();
    });

    $(".btnDelete").click(function (event) {
        event.preventDefault();
        /*$(this).siblings(function (data) {

                $.get('/rides', {
                    amusementParkName: $('[name=list]').val()
                }, function (data) {
                    console.log("running get rides in delete button");
                });
                });*/

        $(".modalDelete").show();
    });
    //$(".btnDelete").on('click', function (event) {
    //    event.preventDefault();
    //    $(".modalDelete").show();
    //});
}

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

    //add ability to get list from database instead
    $(function () {

        $(".formList").submit(function () {
            event.preventDefault();
            $.get('/rides', {
                amusementParkName: $('[name=list]').val()
            }, function (data) {
                console.log("getRecent working");
                displayRideUpdates(data);

            });
            $(".list").empty();
            $(".list").show();
            $(".formList")[0].reset();
        });
    });

    $(".buttonNew").click(function () {
        event.preventDefault();
        $(".modalAdd").show();

    });

    $(".formAdd").submit(function () {
        event.preventDefault();
        console.log("running formadd in app");
        $.post('/rides', {
            amusementParkName: $('[name=amusementParkName]').val(),
            rideName: $('[name=rideName]').val(),
            minutesWait: $('[name=minutesWait]').val(),
            typeOfRide: $('[name=typeOfRide]').val(),
            thrill: $('[name=thrill]').val(),
            rating: $('[name=rating]').val(),
            text: $('[name=text]').val()
        }, function (data) {
            console.log("postRides working");
            displayRideUpdates(data);
            $(".modalAdd").hide();
        });
        $(".list").empty();
        $(".list").show();
        $(".formAdd")[0].reset();

    });

    $(".buttonCloseModal").click(function () {
        event.preventDefault();

        $(".modalAdd").hide();
        $(".list").show();
    });

    /*$(".buttonDeleteYes").click(function () {
        event.preventDefault();
        console.log("running buttonDeleteYes in app");

        //need to figure out how to get the id of this data that we want to delete.

        $.delete('/rides/:id', function (data) {
            console.log("postRides working");
            displayRideUpdates(data);
            $(".modalDelete").hide();
        });
        (".list").empty();
        $(".list").show();
    });*/

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
