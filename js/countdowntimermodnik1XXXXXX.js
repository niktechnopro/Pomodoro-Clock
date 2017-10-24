
console.log("test test")
//setting up global variables
var workLength = 25;
var playLength = 5;
// var alarm = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1');
var alarm = new Audio('sound/timesup.mp3')
var loop = 0;
var longRest = 1;
var longBreak = 30;
var jokeInt;
var timeWorked = [];
var timeOnBreak = []; // global variable for jokes
//end of setting up global variables
$('#reset').hide(); //leaves only start button in the beginning
// document.querySelector("#myCard").classList.toggle("flip")
// $("#myCard").click(function(){          //that was a test button for flipping screen
//     $(".flipper").toggleClass("flip");
// });
$('#worktime').hide();
$('#breaktime').hide();
//sliding intructions start
$('.slideTogglebox').hide();
$('#slideToggle').mouseover(function(){
    $(this).css("color","blue")
    $('.slideTogglebox').slideDown();
})
$('#slideToggle').mouseout(function(){
    $(this).css("color","#F0EAD6")
    $('.slideTogglebox').slideUp();
})
//sliding instructions end

//sliding footer
//sliding intructions start
$('#teamTogglebox').hide();
$('#team').mouseover(function(){
    $(this).css("color","blue")
    $('#teamTogglebox').slideDown();
})
$('#team').mouseout(function(){
    $(this).css("color","#F0EAD6")
    $('#teamTogglebox').slideUp();
})
//sliding instructions for footer


////what you see below is for input manipulation////
/// the following are listeners for buttons plus and minus
  $('#work-plus').click(function(){//to add time to work session
    workLength += 5;
    if (workLength > 90){ // logic to limit to 2 digits
        workLength = 95
    }else{
    $('.minutes').html(workLength);
    $('.minutes-interval').text(workLength);// using html and text interchangebly
    }                                       // seems to be no difference
    $('.minutes').html(workLength);
    $('.minutes-interval').html(workLength);
  });


  $('#work-minus').click(function(){//to deduct session time
    workLength -= 5
    if (workLength < 10){
      //logic to prevent going below 5 on time scale.
      workLength = 5;
      $('.minutes').html('0' + workLength); // adds 0 up front before number if below 2 digits
      $('.minutes-interval').html('0' + workLength);
    }else{
      $('.minutes').html(workLength);
    $('.minutes-interval').html(workLength);
    }
  });


  $('#play-plus').click(function(){
    playLength += 5;
    if (playLength > 90){ // logic to limit to 2 digits
      playLength = 95
    }
    $("#playTimer").html(playLength);
  });

  $('#play-minus').click(function(){
    playLength -= 5;
    if (playLength < 10){ //logic to stay with 2 digits
      playLength = 5
      $("#playTimer").html('0' + playLength);
    }else{
      $("#playTimer").html(playLength)
    } 
  });
//end of listeners for buttons plus and minus
////what you see above is for input manipulation////
function startTimer() {    //to start timer
  $('#start').fadeOut();
  $('#reset').fadeIn();
  loop = 0;
  seconds = 0;
  countDown(workLength, seconds, loop);
}

function reset() {         //to reset timer
    clearInterval(countInt);
    workLength = 25;
    playLength = 5;
    longRest = 1;
    loop = 0;
    $('.minutes').html(workLength); //resets minutes and seconds on main timer
    $('.seconds').html('00');
    $('.minutes-interval').html(workLength); //resets minutes on user input
    $("#playTimer").html('0' + playLength); //ads 0 in front of 5
    $('#start').fadeIn();
    $('#reset').fadeOut();
    $('#current-session').html('Work Session');
    jokeInt = setTimeout(getJoke, 50000000); 

    function getSum(total, num) {
    return total + num;
}
      console.log("Total time worked is" + " " + timeWorked.reduce(getSum) + " " + "minutes");
      console.log("Total time spent on break is" + " " + timeOnBreak.reduce(getSum) + " " + "minutes");

    $('#reset').hide();
    $('#start').hide();
    $('#worktime').html("Total time worked is" + " " + timeWorked.reduce(getSum) + " " + "minutes");
    $('#worktime').show();
    document.getElementById("worktime").disabled = true;
    $('#breaktime').show();
    document.getElementById("breaktime").disabled = true;
    $('#breaktime').html("Total time worked is" + " " + timeOnBreak.reduce(getSum) + " " + "minutes");



}

  


function getJoke(){
// var url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="
    console.log('get joke - got called')
    var url='https://api.icndb.com/jokes/random?exclude=[explicit]'
    $.getJSON(url, function(result) {
        $("#chuck-joke").html(result.value.joke);
        console.log("new joke", result)
    });
    jokeInt = setTimeout(getJoke, 5000); 

 //timer to call new joke after 5 seconds delay
  }


function countDown(minutes,seconds) { 
 countInt = setInterval(function(){

    if (minutes == 0 && seconds == 0) { //since minutes are not '0' it skips directly to the timer
        clearInterval(countInt);        
        if (loop == 0) {
            if (longRest % 2 != 0 || longRest == 1){//this checks if this is short break or long break
              time = playLength;
              console.log('keeping short break')
              timeOnBreak.push(playLength);
              console.log(timeOnBreak);
              //displaying message when 4th  (long break is about to come)
              // if (longRest % 3 == 0){
              //  $('#messages').html("long break is after next session");
              // }
              //end of displaying message when long break is over  
            }else{
              time = longBreak //long break
              console.log("keeping long break")
               timeOnBreak.push(longBreak);
              console.log(timeOnBreak);//we are going to use this as a trigger
            } 
              if (time < 10){
                  $("#playTimer").html('0' + time);//adjusting to 2 digits
                }else{
                  $("#playTimer").html(time); //updating play time in initial input field
              }
            if (time == longBreak){ // when long rest starts we need to remove message
                $('.modal').modal('show');
                getJoke();//we can use this trigger for joke
                console.log('calling a joke')
            }else if(time == longBreak && seconds < 5){
                console.log('clearing joke interval')
                clearInterval(jokeInt);
            }
            loop += 1;
            $('#current-session').html('Rest Time');
            $(".flipper").toggleClass("flip");
        } else {
            if (time == longBreak && loop == 1){
              $("#playTimer").html('0'+playLength);
              clearInterval(jokeInt);
              $('.modal').modal('hide');
              console.log('clearing joke interval')
            }
            time = workLength;
            longRest += 1;
            loop -= 1;
            timeWorked.push(workLength);
            $(".flipper").toggleClass("flip");
            $('#current-session').html('Work Session');
            console.log(timeWorked);
        }
          alarm.play();
      // var timeOut = setTimeout(explode, 2000);
      countDown(time,0); // timer, recursive call
      } else if (seconds != 0) {
          seconds -= 1;
      } else if (seconds == 0) {
          seconds = 59;
          minutes -= 1;
      }
      var formattedMinutes = ("0" + minutes).slice(-2);//format m and s to take 2 digits
      var formattedSeconds = ("0" + seconds).slice(-2); 
      $('.minutes').html(formattedMinutes);
      $('.seconds').html(formattedSeconds);
        
    }, 10);
}   
 
// function explode(){
//    $("#current-session").hide( "explode", {pieces: 16 }, 2000 );
//    // clearInterval(timeOut);
//    return
// }
