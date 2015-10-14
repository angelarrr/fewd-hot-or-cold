$(document).ready(function(){
	
	// generate random number when document loaded
	randomNumGen();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	// global variables
  	var randomNum;
  	var counter = 7;
  	var userInput;

	// generate a random number
	function randomNumGen() {
		randomNum = Math.floor((Math.random()*100)+1);
		console.log("generated number: "+ randomNum);
		return randomNum;
	};

	// start a new game function
	function newGame() {
		//generate a random number
		randomNumGen();
		//reset counter
		counter = 7;
		//reset counter text
		gCount(counter);
		//remove guesses
		$('ul#guessList li').remove();
		// feedback text
		gFeedback("Make your Guess!");
		// show guess button
		$('#guessButton').show();
	};

	// test if number enter is valid
	function checkInput() {
		if (isNaN(userInput) || userInput < 0 || userInput > 100 || userInput%1 != 0) {
			return false;
		} else {
			return true;
		}
	};

	// guess button functionality and check input
	$("#guessButton").on('click', function(e){
		e.preventDefault();
		userInput = parseInt($('#userGuess').val(), 10);
		console.log("user guess:"+ userInput);

		if (checkInput()) {
			feedback();
			counter--;
			gCount(counter);
			$("ul#guessList").append("<li>" + userInput + "</li>");
		} else {
			gFeedback("Please enter only numbers between 0 and 100");
		}
  		
		$('#userGuess').val("");

		if (counter == 0) {
			alert("Sorry, you lose! No more guesses!");
			$('#guessButton').hide();
		}
	});	

	// compare numbers and provide feedback
	function feedback() {

		var difference = Math.abs(randomNum - userInput);

		if (difference == 0) {
			gFeedback("You guessed it!");
			$('#guessButton').hide();
		} else if (difference <= 5) {
			gFeedback("On fire!");
		} else if (difference <= 10) {
			gFeedback("Getting hotter");
		} else if (difference <= 25) {
			gFeedback("Pretty warm");
		} else if (difference <= 40) {
			gFeedback("Getting cold");
		} else if (difference <= 75) {
			gFeedback("Getting colder!");
		} else {
			gFeedback("Freezing!");
		}
	};

	// start new game on click
	$('.new').click(function() {
		newGame();
	});

	// display feedback on guess
	function gFeedback(feedback) {
		$('#feedback').text(feedback);
	};

	// guess counter
	function gCount(count) {
		$('#count').text(counter);
	};
});