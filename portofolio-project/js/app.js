// @Create a list that holds all of your cards
let cards = Array.from(document.getElementsByClassName("card"));

// deck of all cards in game
const deck = document.querySelector('.deck');

// @array for opened cards
let openedCards = [];

// @initianilize moves and rank
let moves = 0;
let rank = 3;

// @declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// @On open load start game function
document.body.onload = startGame();

// @Start game function
function startGame() {
	started = false;
	// @shuffle deck
	cards = shuffle(cards)
};

// @remove all exisiting classes from each card
for (var i = 0; i < cards.length; i++) {
	[].forEach.call(cards, function (item) {
		deck.innerHTML = "";
		[].forEach.call(cards, function (item) {
			deck.appendChild(item);

		});
	});
	stars(); // @Load star function
	// @initialize cards removing all classes
	cards[i].classList.remove("show", "open", "match", "unmatched");
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

// @toggles open, show and selected class to displaed cards
let displayCard = function () {
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("selected");
};

// @Add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
	openedCards.push(this);
	let number = openedCards.length;
	number === 2 ? //@ check if opened cards are macked on no 
		openedCards[0].innerHTML === openedCards[1].innerHTML ?
		matched() : //@ call mached function
		unmatched() : //@ call unmached function
		"";
};

// Function match
function matched() {
	//@ add selected and match classes
	openedCards[0].classList.add("selected", "match");
	openedCards[1].classList.add("selected", "match");
	//@ remove show, open and no event classes
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
	moves++; //@indexing moves
	stars(); // @call stars function
	// @Game over,open modal and spot timer
	matchedCard.length === 16 ? openModal() || stop() : "";
}

// @Unmatched function
function unmatched() {
	// @add sunmatched classe
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	// @remove show, open, no event and selected classes
	openedCards[0].classList.remove("show", "open", "no-event", "selected");
	openedCards[1].classList.remove("show", "open", "no-event", "selected");
	// temporary dissable cadr cliks
	disable();
	// @delay for 500 ms card close
	setTimeout(function () {
		openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
		// enable card clicks
		enable();
		// @emplty opendes card array
		openedCards = [];
	}, 500);
	moves++; //@indexing moves
	stars(); // @call stars function
}

// @loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", startTimer);
};

// @card click disable function 
function disable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.add('no-events');
	});
}

// @card click enable function 
function enable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.remove('no-events');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("no-events");
		}
	});
}

// @manage stars in game
function stars() {
	document.querySelector(".moves").textContent = `${moves}`; //@index modal with number of moves
	if (moves < 25) { //@for moves less than 25 disply 3 stars
		document.querySelector(".star1").classList.add("fas", "fa-star");
		document.querySelector(".star2").classList.add("fas", "fa-star");
		document.querySelector(".star3").classList.add("fas", "fa-star");
	} else if (moves === 25) {
		--rank; // after 25 moves decrement a star
	} else if (moves === 26) { //@for moves les than 26 disply 2 stars
		document.querySelector(".star3").classList.remove("fas", "fa-star");
		document.querySelector(".star3").classList.add("far", "fa-star");
	} else if (moves === 44) {
		--rank; //@ after 34 moves decrement a star
	} else if (moves === 45) { //@for moves les than 35 disply 1 star
		document.querySelector(".star2").classList.remove("fas", "fa-star");
		document.querySelector(".star2").classList.add("far", "fa-star");
	}
};

//@Modal function

function openModal() {
	// @Get the modal
	const modal = document.getElementById('myModal');
	document.getElementById("moves").textContent = `You finished the game in ${moves} moves`
	document.getElementById("time").textContent = `Your time was ${h4.textContent} minutes`
	document.getElementById("ranking").textContent = `Your ranking is ${rank} ${rank===1? "star":"stars"}`;

	// @Get the button that opens the modal
	const btn = document.getElementById("myBtn");

	// @Get the <span> element that closes the modal
	const span = document.getElementsByClassName("close")[0];

	// @When the user clicks the button, open the modal 
	modal.style.display = "block";

	// @When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	}

	// @When the user clicks anywhere outside of the modal, close it
	window.addEventListener("click", closed);
	function closed(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

// @Timer script
var h4 = document.getElementsByTagName('h4')[0],
	seconds = 0,
	minutes = 0,
	t; // initialize time on html
// @ function start timer
function startTimer() { 
	Array.prototype.filter.call(cards, function (card) { // remove event listener starttimer for each card
			card.removeEventListener('click', startTimer);

		});
	function add() {
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
		}

		h4.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
		timer();

	}

	function timer() {
		t = setTimeout(add, 1000);
	}

	timer();
}


// Stop timer function
function stop() {
	clearTimeout(t);
}