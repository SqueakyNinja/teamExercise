class Game {
	constructor() {
		this.player1 = new Player(1)
		this.player2 = new Player(2)
	}
	start() {
		sticks.noOfSticks = 21
		document.getElementById('stick').innerHTML = 21;   

    //let playerOne = prompt('Player 1, what is your name?');
    //let playerTwo = prompt('Player 2, what is your name?');
    

    /*if(playerOne != null) {
    document.getElementById('player1Name').innerHTML = playerOne;
    }
    if(playerTwo != null) {
    document.getElementById('player2Name').innerHTML = playerTwo;
    } */
    
	}

	lostGame() {
		if (sticks.noOfSticks <= 0) {
			alert('You lost the game!');
			document.getElementById('stick').innerHTML = 0;
		}
	} 
	setTotal() {
		event.preventDefault()
		sticks.noOfSticks = document.getElementById("totalInput").value
		document.getElementById('stick').innerHTML = sticks.noOfSticks
	}
}

class Player {
	constructor(id) {
		this.name = null;
		this.id = id;
	}
	setName() {
		event.preventDefault()
		this.name = document.getElementById("name" + this.id).value
		document.getElementById("player" + this.id + "Name").innerHTML = this.name
		document.getElementById("name" + this.id).value = ""
	}
}


class Stick {
	constructor() {
		this.noOfSticks = 21;

	}
	removeSticks(number) {
		sticks.noOfSticks -= number;
		document.getElementById('stick').innerHTML = sticks.noOfSticks;
		game.lostGame();
	}
	setAmountOfSticks() {
		document.getElementById('stick').innerHTML = sticks.noOfSticks;
	}
}

let game = new Game

let sticks = new Stick

sticks.setAmountOfSticks();


function again() {
  location.reload (true)
}
 var switchplayer =function() {
   
 }