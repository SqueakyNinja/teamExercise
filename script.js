class Game {
	constructor() {
		this.player1 = new Player("Player 1", 1)
		this.player2 = new Player("Player 2", 2)
		this.playersArray = [this.player1, this.player2]
		this.activeNumber = Math.floor(Math.random() * 2)
		this.activePlayerNumber = this.playersArray[this.activeNumber].id
		this.lastPlayer = document.getElementById("player" + this.activePlayerNumber + "Name")
		this.currentPlayer = document.getElementById("player" + this.activePlayerNumber + "Name")
		this.setActivePlayer();
	}
	start() {
		sticks.noOfSticks = 21
		document.getElementById('stick').innerHTML = 21;
		document.getElementById("take1Button").disabled = false
		document.getElementById("take2Button").disabled = false
		document.getElementById("take3Button").disabled = false

    /*
		let playerOne = prompt('Player 1, what is your name?');
		let playerTwo = prompt('Player 2, what is your name?');


    if(playerOne != null) {
    document.getElementById('player1Name').innerHTML = playerOne;
    }
    if(playerTwo != null) {
    document.getElementById('player2Name').innerHTML = playerTwo;
    } */

	}
	setActivePlayer() {
		this.lastPlayer = document.getElementById("player" + this.activePlayerNumber + "Name")
		this.activeNumber = (this.activeNumber + 1) % this.playersArray.length;
		this.activePlayerNumber = this.playersArray[this.activeNumber].id
		this.currentPlayer = document.getElementById("player" + this.activePlayerNumber + "Name")
		this.lastPlayer.classList.remove("active")
		this.currentPlayer.classList.add("active")
	}

	lostGame() {
		if (sticks.noOfSticks <= 0) {
			alert(this.currentPlayer.innerHTML + ' lost the game!');
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
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.points = 0;
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
		this.createSticks();
	}
	createSticks() {
		let amountOfSticksPerRow = 1;
		let j = this.noOfSticks
		for (let i = 0; i < j; i++) {

			if (i === amountOfSticksPerRow) {
			//	console.log(amountOfSticksPerRow, i)
			//	j -= amountOfSticksPerRow
			//	a
			//	i = 0
			}

			let img = document.createElement("img")
			img.src = "tandsticka.png"
			document.getElementById("sticksDiv").appendChild(img)
		}
	}

	removeSticks(number) {
		sticks.noOfSticks -= number;
		document.getElementById('stick').innerHTML = sticks.noOfSticks;

		game.lostGame();
		game.setActivePlayer();
		if (this.noOfSticks <= 0) {
			document.getElementById("take1Button").disabled = true
			document.getElementById("take2Button").disabled = true
			document.getElementById("take3Button").disabled = true
		}
	}
	setAmountOfSticks() {
		document.getElementById('stick').innerHTML = sticks.noOfSticks;
	}
}

let game = new Game




let sticks = new Stick

sticks.setAmountOfSticks();


function again() {
	location.reload(true)
}

function switchPlayer() {
	if (currentPlayer === 'p1') {
		player = 'p2';
	} else {
		player = 'p1';
	}
}