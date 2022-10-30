//updates time
function updateTime() {
    let today = moment();
    $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));

    //changes colour of time time block
    //grey:past, red:present, green:future
    var now = moment().format("kk");
    for (var i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");

        if (now > scheduleElArray[i].data("hour")) {
            scheduleElArray[i].addClass("past");

        } else if (now === scheduleElArray[i].attr("data-hour")) {
            scheduleElArray[i].addClass("present");

        } else {

            scheduleElArray[i].addClass("future");
        }
    }
}

//text area elements
var schedule9am = $("#9AM");
var schedule10am = $("#10AM");
var schedule11am = $("#11AM");
var schedule12pm = $("#12PM");
var schedule1pm = $("#1PM");
var schedule2pm = $("#2PM");
var schedule3pm = $("#3PM");
var schedule4pm = $("#4PM");
var schedule5pm = $("#5PM");

var scheduleElArray = [
    schedule9am,
    schedule10am,
    schedule11am,
    schedule12pm,
    schedule1pm,
    schedule2pm,
    schedule3pm,
    schedule4pm,
    schedule5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000); 

//local storage
function renderLastRegistered() {
    for (var el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));

    }
}

//function for handling clicks
function handleFormSubmit(event) {
    event.preventDefault();

    var btnClicked = $(event.currentTarget);

    var targetText = btnClicked.siblings("textarea");
 
    var targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " +  targetTimeBlock, targetText.val());
}

//save button
var saveBttn = $(".save-icon");
saveBttn.on("click", handleFormSubmit);