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
        let id = data[i].id;
        /*$('.btnDelete').data("id", id);*/
        /*$(".btnDelete").data({
            "id": id
        }).data();*/
        console.log(id);
        //        $('.btnDelete').attr("data-id", id);
        console.log("data-id", id);
        $('main').append(
            '<p class="sectionedList">' +
            '</p>',
            '<lable>' + "Amusement Park Name" + '</lable>',
            '<p>' + data[i].amusementParkName + '</p>',
            '<label>' + "Ride Name" + '</label>',
            '<p>' + data[i].rideName + '</p>',
            '<label>' + "Wait Time in Minutes" + '</label>',
            '<p>' + data[i].minutesWait + '</p>',
            '<label>' + "Type of Ride" + '</label>',
            '<p>' + data[i].typeOfRide + '</p>',
            '<label>' + "Thrill Level" + '</label>',
            '<p>' + data[i].thrill + '</p>',
            '<label>' + "Give it a Rating" + '</label>',
            '<p>' + data[i].rating + '</p>',
            '<lable>' + "Say something about this ride" + '</lable>',
            '<p>' + data[i].text + '</p>',
            '<br />',
            '<button class="btnEdit" data-id="' + id + '">' + "Edit" + '</button>',
            /*string concat in data-id*/
            '<button class="btnDelete" data-id="' + id + '">' + "Delete" + '</button>',
            '<br/>'
        );

    }


    $(".btnEdit").click(function (event) {
        event.preventDefault();
        $(".modalEdit").show();
        $(".formEdit").attr('data-id', $(this).attr('data-id'));
        let id = $(this).attr('data-id');
        /*let amusement = data[i].amusementParkName;
        console.log(amusement);*/
        $('.formEdit').append(
            '<lable>' + "Amusement Park Name" + '</lable>',
            '<input class="displayBlock marginAuto" type="text" name="amusementParkNameEdit" placeholder="Disney Hollywood Studios Florida" value="">',
            '<label>' + "Ride Name" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="rideNameEdit" placeholder="Tower of Terror">',
            '<label>' + "Wait Time in Minutes" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="minutesWaitEdit" placeholder="120">',
            '<label>' + "Type of Ride" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="typeOfRideEdit" placeholder="Rollercoaster">',
            '<label>' + "Thrill Level" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="thrillEdit" placeholder="Low, Medium, High">',
            '<label>' + "Give it a Rating" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="ratingEdit" placeholder="Enter 1-5">',
            '<lable>' + "Say something about this ride" + '</lable>',
            '<textarea class="displayBlock marginAuto" name="textEdit" placeholder="Describe in 50 characters">' + "" +
            '</textarea>',
            '<br />',
            '<button class="displayBlock floatRight button buttonEditApply" type="submit">' + "Apply" + '</button>',
            '<br />'
        );
        $(".formEdit").children("input").attr('data-id', $(this).attr('data-id'));

        $(".buttonEditApply").attr('data-id', $(this).attr('data-id'));
        $(".formEdit").submit(function (event) {
            event.preventDefault();
            console.log("start edit");
            $.ajax({
                url: '/rides/' + $(".buttonEditApply").attr('data-id'),

                method: 'PUT',
                data: ({
                    amusementParkName: $('[name=amusementParkNameEdit]').val(),
                    rideName: $('[name=rideNameEdit]').val(),
                    minutesWait: $('[name=minutesWaitEdit]').val(),
                    typeOfRide: $('[name=typeOfRideEdit]').val(),
                    thrill: $('[name=thrillEdit]').val(),
                    rating: $('[name=ratingEdit]').val(),
                    text: $('[name=textEdit]').val()
                }),
                success: function (data) {
                    alert('Load was performed.');
                },



            }).then(function () {
                console.log("edit working");

                getAndDisplayRideUpdates();

            });
            $(".modalEdit").hide();
            $(".formEdit").empty();
        });
        $(".formEdit")[0].reset();
    });

    $(".btnDelete").click(function (event) {
        event.preventDefault();
        $(".modalDelete").show();
        $(".buttonDeleteYes").attr('data-id', $(this).attr('data-id'));
        $(".buttonDeleteYes").click(function () {
            event.preventDefault();
            $.ajax({
                url: '/rides/' + $(this).attr('data-id'),
                method: 'DELETE'
            }).then(function () {
                getAndDisplayRideUpdates()
            });
        });
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
    $.get('/rides', {
        amusementParkName: $('[name=list]').val()
    }, function (data) {
        $(".list").empty();
        $(".list").show();
        console.log("getRecent working");
        displayRideUpdates(data);
    });
}

//create a JQuery function whose purpose is to run the above function

$(function () {

    $(".modalAdd").hide();
    $(".modalDelete").hide();
    $(".modalEdit").hide();
    $(".list").hide();

    getAndDisplayRideUpdates();

    //add ability to get list from database instead
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
            //            displayRideUpdates(data);
            $(".modalAdd").hide();
            getAndDisplayRideUpdates();
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



    $(".buttonEditCancel").click(function () {
        event.preventDefault();
        $(".modalEdit").hide();
        $(".list").show();
    });

});
