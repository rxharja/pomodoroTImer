var incShort = document.getElementById("incrementShort");
var decShort = document.getElementById("decreaseShort");
var incLong = document.getElementById("incrementLong");
var decLong = document.getElementById("decreaseLong");
var startBut = document.getElementById('start');
var btShort = document.getElementById("breakTimerShort");
var btLong = document.getElementById("breakTimerLong");
var top = document.getElementById('study');
var bottom = document.getElementById('break');
var zeroDot = document.getElementById('zeroDot');
var timeShort = parseInt(btShort.innerHTML);
var timeLong = parseInt(btLong.innerHTML);
var startBool = false;
var breakBool = false;
var breakCounter = 0;
var minStudy, secStudy;
var red = 50
var green = 200;
minStudy=25;
secStudy=0;
var totalMins = minStudy; 
var totalSecs = secStudy;

function changeColor(){
  if (minStudy == 0 && secStudy == 0){
    green = 200;
    red = 50;
  }
  var total = 256/((totalMins*60)+totalSecs);
  red += total; 
  green -= total;
  start.style.background = 'rgb('+red+', '+green+', 0)';
}

function updateDom(){
  changeColor();
  if (breakBool && startBool){
    if (breakCounter == 3){
      console.log(timeLong);
      if (secStudy < 10){
        study.innerHTML = "Break!<br>"+minStudy+":0"+secStudy;
      }
      else
        study.innerHTML = "Break!<br>"+minStudy+":"+secStudy;
      bottom.innerHTML = "Next Break:<br>"+timeLong+" minutes";
    }
    else{
      if (secStudy < 10){
        study.innerHTML = "Break!<br>"+minStudy+":0"+secStudy;
      }
      else
        study.innerHTML = "Break!<br>"+minStudy+":"+secStudy;
      bottom.innerHTML = "Next Break:<br>"+timeShort+" minutes";
    }
  }
  else if (!breakBool && startBool)
    if (breakCounter == 3){
      if (secStudy < 10){
         study.innerHTML = "Study!<br>"+minStudy+":0"+secStudy;
      }
      else
        study.innerHTML = "Study!<br>"+minStudy+":"+secStudy;
      bottom.innerHTML = "Next Break:<br>"+timeLong+" minutes";
    }
    else{
      if (secStudy < 10){
        study.innerHTML="Study!<br>"+minStudy+":0"+secStudy;
      }
      else
        study.innerHTML="Study!<br>"+minStudy+":"+secStudy;
      bottom.innerHTML="Next Break:<br>"+timeShort+" minutes";
    }
  else
    if (secStudy < 10){
      study.innerHTML="Pause!<br>"+minStudy+":0"+secStudy;
    }
    else
      study.innerHTML="Pause!<br>"+minStudy+":"+secStudy;
  }
//countdown timer
function studyTime(){
  if(minStudy == 0 && secStudy == 0){
    breakBool = !breakBool;
    if (breakBool){
      breakCounter++;
      console.log(breakCounter);
      if(breakCounter == 4){
        minStudy = timeLong;
        secStudy = 0;
        totalMins = minStudy
      }
      else{
        minStudy = timeShort;
        secStudy = 0;
        totalMins = minStudy
      }
    }
    else{
      minStudy = 25;
      secStudy = 0;
      totalMins = minStudy
    }
    studyTime();
  }
  else{
    if (startBool){
      if(secStudy == 0){
          secStudy = 59;
          minStudy--;
        }
      else{
        secStudy--;
      }
      setTimeout(studyTime,1000);
    }
  }
  updateDom();
}

//Initialize break buttons
incShort.addEventListener('click', function(){
  if (timeShort < 5){
    timeShort++
  }
  btShort.innerHTML = timeShort;
  bottom.innerHTML = "Next Break:<br>"+timeShort+" minutes";
});

decShort.addEventListener('click', function(){
  if (timeShort > 2){
    timeShort--
  }
  btShort.innerHTML = timeShort;
  bottom.innerHTML = "Next Break:<br>"+timeShort+" minutes";
});

incLong.addEventListener('click', function(){
  if (timeLong < 30){
    timeLong++
  }
  btLong.innerHTML = timeLong;
});

decLong.addEventListener('click', function(){
  if (timeLong > 20){
    timeLong--
  }
  btLong.innerHTML = timeLong;
});

//start button
start.addEventListener('click', function(){
  start.classList.toggle("activate");
  startBool = !startBool
  if (startBool){secStudy++}
  studyTime();
});