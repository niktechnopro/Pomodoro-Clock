// Add ready listener to the document.
// I.e., JavaScript, wait until the DOM is fully loaded before proceeding to this code

	console.log("f")
$(document).ready(function(){
	// console.log("Sanity Check!!")




$('#start').click(function(e) {
     $('body').css('background-image', 'url(images/background4.jpg)');
     $('body').css('background-repeat', 'no-repeat');
     $('body').css('background-size', 'cover');
     $('.jumbotron').css('background-image', 'url(images/background3.jpg');
     $('.jumbotron').css('background-repeat', 'no-repeat');
     $('.jumbotron').css('background-size', 'cover');
 });

$('#reset').click(function(e) {
    $('body').css('background', 'url(images/background3.jpg)');
    $('body').css('background-repeat', 'no-repeat');
     $('body').css('background-size', 'cover');
     $('.jumbotron').css('background', 'url(images/background4.jpg');
     $('.jumbotron').css('background-repeat', 'no-repeat');
     $('.jumbotron').css('background-size', 'cover');
 });


});
