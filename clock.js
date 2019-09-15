/*********************** THE CLOCK ****************************/
function time() {
  var date = new Date();
  var month = date.getMonth();
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var meridian = "AM";

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (hours >= 12) {
    meridian = "PM";
    if (hours > 12) {
      hours = hours - 12;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
  }

  if (hours == 0) {
    hours = 12;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  $(".got-date").html(month + "/" + day + "/" + year);
  $(".got-time").html(hours + ":" + minutes + ":" + seconds + " " + meridian);

}

setInterval(time, 1000);

/**************************** THE Alarm *******************************/
// required globally available variables
var setAlarm = $("#submit"),
  alarmOn = false,
  alarmHour, alarmMinutes, alarmMeridian,
  checkCompare, alarmDisplay, myAlarm, currentTime;

var beepBeep = new Audio("sounds/alarm.wav");

// retrieve selected values
$("#hours").change(function() {
  alarmHour = $(this).val();
});
$("#minutes").change(function() {
  alarmMinutes = $(this).val();
});
$("#meridian").change(function() {
  alarmMeridian = $(this).val();
  alarmOn = true;
});

// display selected alarm time in heading element
setAlarm.click(function() {
  if (alarmOn == true) {
    alarmDisplay = $(".my-alarm");
    alarmDisplay.html("<h4>" + "Your alarm is set for " + "<br>" + alarmHour + ":" + alarmMinutes + " " + alarmMeridian + "</h4>");
    $(".my-alarm").slideDown(1000);
    $(".alarm-box").slideUp(1000);

    // compare selected alarm time with current time
    checkCompare = setInterval(function() {

      var timeCompare = new Date();
      var hoursCompare = timeCompare.getHours();
      var minutesCompare = timeCompare.getMinutes();
      var meridianCompare = "AM";

      if (hoursCompare >= 12) {
        meridianCompare = "PM";
        if (hoursCompare > 12) {
          hoursCompare = hoursCompare - 12;
        }
        if (hoursCompare < 10) {
          hoursCompare = "0" + hoursCompare;
        }
      }

      if (minutesCompare < 10) {
        minutesCompare = "0" + minutesCompare;
      }

      currentTime = hoursCompare + ":" + minutesCompare + " " + meridianCompare;

      myAlarm = alarmHour + ":" + alarmMinutes + " " + alarmMeridian;

      if (currentTime >= myAlarm) {
        beepBeep.play();
      }
    }, 1000);
    setAlarm.prop('disabled', true);
  }

});

// Reset alarm
$("#clear").click(function() {
  beepBeep.pause();
  clearInterval(checkCompare);
  $(".my-alarm").fadeOut(1000);
  $(".alarm-box").fadeIn(1000);
  $("#hours").prop("selectedIndex", 0);
  $("#minutes").prop("selectedIndex", 0);
  $("#meridian").prop("selectedIndex", 0);
  setAlarm.prop('disabled', false);
  alarmHour = undefined;
  alarmMinutes = undefined;
  alarmMeridian = undefined;
  alarmOn = false;
});
