//I'm having trouble getting this to interact with Firebase at all. The realtime database's data doesn't update with any of the variables I attempt to update and I can't seem to troubleshoot its link as the problem. With that, I'm having trouble testing it, too. I'm going to come back and keep working on this over the weekend but I'm also confident after my successful experience with our Firebase activity earlier this week. I'm sure the problem is minor and easily fixable and the rest will fall (relatively easily) into place. How is Firebase undefined?

var config = {
    apiKey: "AIzaSyB8_OAo-9EAaYrAYMUNWPJqC0Hhj5ULaMw",
    authDomain: "myawesometrains.firebaseapp.com",
    databaseURL: "https://myawesometrains.firebaseio.com",
    projectId: "myawesometrains",
    storageBucket: "myawesometrains.appspot.com",
    messagingSenderId: "475333809124"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#go").on("click", function (event) {

    var title = $("train-input").val().trim();
    var frontier = $("#frontier-input").val().trim();
    var startDate = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTitle = {
        name: title,
        location: frontier,
        time: startDate,
        frequency: frequency
    };

    database.ref().push(newTitle);

    ("#form-control").val("");
    event.preventDefault();
})

database.ref().on("child_added"), function (childSnapshot) {

    var childTitle = childSnapshot.val().name;
    var childFrontier = childSnapshot.val().location;
    var childDate = childSnapshot.val().time;
    var childFrequency = childSnapshot.val().frequency;


    var currentFrequency = childFrequency;

    // Converts time from unix time back to wall clock (military) time
    var firstTimeConverted = moment(trainTime, "X");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minutes Until Train
    var tMinutesTillTrain = currentFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Calculate the next train time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + nextTrain);

    var addRow = $("<tr>").append(
    $("<td>").text(childTitle),
    $("<td>").text(childFrontier),
    $("<td>").text(childDate),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
    );

 $("#title-table > tbody").append(addRow);
} 