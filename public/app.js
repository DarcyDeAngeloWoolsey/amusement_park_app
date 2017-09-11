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


const appState = {
    rides: []
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


    appState.rides = data;

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

            '<h6 class="sectionedList">' + "Amusement Park Name:" + '</h6>',
            '<p>' + data[i].amusementParkName + '</p>',
            '<h6>' + "Ride Name:" + '</h6>',
            '<p>' + data[i].rideName + '</p>',
            '<h6 class="showMore aliceblue">' + "More..." + '</h6>',
            '<h6 class="showLess aliceblue displayNone">' + "Less..." + '</h6>',
            '<div class ="displayNone expandableElement">' +
            '<h6>' + "Wait Time in Minutes:" + '</h6>' +
            '<p>' + data[i].minutesWait + '</p>' +
            '<h6>' + "Type of Ride:" + '</h6>' +
            '<p>' + data[i].typeOfRide + '</p>' +
            '<h6>' + "Thrill Level:" + '</h6>' +
            '<p>' + data[i].thrill + '</p>' +
            '<h6>' + "Give it a Rating:" + '</h6>' +
            '<p>' + data[i].rating + '</p>' +
            '<h6>' + "Say something about this ride:" + '</h6>' +
            '<p>' + data[i].text + '</p>' +
            '<div class="clearfix p50B buttonDiv">' +
            '<button class="btnEdit floatRight" data-id="' + id + '">' + "Edit" + '</button>' +

            '<button class="btnDelete floatRight" data-id="' + id + '">' + "Delete" + '</button>' +
            '</div>' +
            '</div>' +
            '<br style="display:block; margin-top:20px; line-height:30px;"/>'
        );

    }
    $(".showMore").click(function () {
        console.log("showMore clicked");
        $(this).nextUntil($("br")).removeClass("displayNone");
        $(this).next(".showLess").removeClass("displayNone");
        $(this).addClass("displayNone");
    });

    $(".showLess").click(function () {
        console.log("showLess clicked");
        $(this).nextUntil($("br")).addClass("displayNone");
        $(this).prev(".showMore").removeClass("displayNone");
        $(this).addClass("displayNone");
    });

    $(".btnEdit").click(function (event) {
        event.preventDefault();
        $(".modalEdit").show();
        $(".formEdit").attr('data-id', $(this).attr('data-id'));
        let id = $(this).attr('data-id');
        /*let amusement = data[i].amusementParkName;
        console.log(amusement);*/
        const ride = appState.rides.find(r => r.id === id);
        console.log('ride', ride)

        $('.formEdit').append(
            '<label>' + "Amusement Park Name" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="amusementParkNameEdit" placeholder="Disney Hollywood Studios Florida" value="' + ride.amusementParkName + '">',
            '<label>' + "Ride Name" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="rideNameEdit" placeholder="Tower of Terror" value="' + ride.rideName + '">',
            '<label>' + "Wait Time in Minutes" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="minutesWaitEdit" placeholder="120" value="' + ride.minutesWait + '">',
            '<label>' + "Type of Ride" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="typeOfRideEdit" placeholder="Rollercoaster" value="' + ride.typeOfRide + '">',
            '<label>' + "Thrill Level" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="thrillEdit" placeholder="Low, Medium, High" value="' + ride.thrill + '">',
            '<label>' + "Give it a Rating" + '</label>',
            '<input class="displayBlock marginAuto" type="text" name="ratingEdit" placeholder="Enter 1-5" value="' + ride.rating + '">',
            '<label>' + "Say something about this ride" + '</label>',
            '<textarea class="displayBlock marginAuto" name="textEdit" placeholder="Describe in 50 characters" value="' + ride.text + '">' + "" +
            '</textarea>',
            '<br />' +
            '<div class="clearfix">' +
            '<button class="displayBlock floatRight button buttonEditCancel" type="button">' + "Cancel" + '</button>' +
            '<button class="displayBlock floatRight button buttonEditApply" type="submit">' + "Apply" + '</button>' +
            '</div>' +
            '<br />'
        );
        $(".formEdit").children("input").attr('data-id', $(this).attr('data-id'));

        $(".buttonEditApply").attr('data-id', $(this).attr('data-id'));

        $(".buttonEditCancel").click(function (event) {
            console.log("clicking cancel edit");
            event.preventDefault();
            console.log("clicking cancel edit");
            $(".modalEdit").hide();
            $(".formEdit").empty();
            $(".list").show();
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
        let name = $('[name=list]').val();
        let nameTrim = $.trim(name);

        let nameTrimCase = nameTrim.replace(/[^-'\s]+/g, function (word) {
            return word.replace(/^./, function (first) {
                return first.toUpperCase();
            });
        });

        $.get('/rides', {
            amusementParkName: nameTrimCase
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
        let name = $('[name=amusementParkName]').val();
        let nameTrim = $.trim(name);

        let nameTrimCase = nameTrim.replace(/[^-'\s]+/g, function (word) {
            return word.replace(/^./, function (first) {
                return first.toUpperCase();
            });
        });
        $.post('/rides', {
            amusementParkName: nameTrimCase,
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





    $(".formEdit").submit(function (event) {
        event.preventDefault();
        console.log("start edit");
        console.log($(".buttonEditApply"))
        let name = $('[name=amusementParkNameEdit]').val();
        let nameTrim = $.trim(name);

        let nameTrimCase = nameTrim.replace(/[^-'\s]+/g, function (word) {
            return word.replace(/^./, function (first) {
                return first.toUpperCase();
            });
        });
        $.ajax({
            url: '/rides/' + $(".buttonEditApply").attr('data-id'),

            method: 'PUT',
            data: ({
                amusementParkName: nameTrimCase,
                rideName: $('[name=rideNameEdit]').val(),
                minutesWait: $('[name=minutesWaitEdit]').val(),
                typeOfRide: $('[name=typeOfRideEdit]').val(),
                thrill: $('[name=thrillEdit]').val(),
                rating: $('[name=ratingEdit]').val(),
                text: $('[name=textEdit]').val()
            }),
            success: function (data) {

                $(".modalEdit").hide();
                $(".formEdit").empty();
            },



        }).then(function () {
            console.log("edit working");

            getAndDisplayRideUpdates();

        });

    });

});
