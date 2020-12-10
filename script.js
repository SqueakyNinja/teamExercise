class Game {
  constructor() {
    this.player1 = new Player("Player 1", 1);
    this.player2 = new Player("Player 2", 2);
    this.playersArray = [this.player1, this.player2];
    this.activeNumber = Math.floor(Math.random() * 2);
    this.activePlayerNumber = this.playersArray[this.activeNumber].id;
    this.lastPlayer = document.getElementById(
      "player" + this.activePlayerNumber + "Name"
    );
    this.currentPlayer = document.getElementById(
      "player" + this.activePlayerNumber + "Name"
    );
    this.setActivePlayer();
  }

  playAgain() {
    sticks.createSticks();
    sticks.noOfSticks = 21;
    sticks.removeCounter = sticks.noOfSticks;
    document.getElementById("take1Button").disabled = false;
    document.getElementById("take2Button").disabled = false;
    document.getElementById("take3Button").disabled = false;
    sticks.createSticks();
  }

  setActivePlayer() {
    this.lastPlayer = document.getElementById(
      "player" + this.activePlayerNumber + "Name"
    );
    this.activeNumber = (this.activeNumber + 1) % this.playersArray.length;
    this.activePlayerNumber = this.playersArray[this.activeNumber].id;
    this.currentPlayer = document.getElementById(
      "player" + this.activePlayerNumber + "Name"
    );
    this.lastPlayer.classList.remove("active");
    this.currentPlayer.classList.add("active");
  }

  lostGame() {
    if (sticks.noOfSticks <= 0) {
      alert(this.currentPlayer.innerHTML + " lost the game!");
    }
  }
  setTotal() {
    event.preventDefault();
    sticks.noOfSticks = document.getElementById("totalInput").value;
    sticks.removeCounter = sticks.noOfSticks;
    sticks.createSticks();
  }
}

class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.points = 0;
  }
  setName() {
    event.preventDefault();
    this.name = document.getElementById("name" + this.id).value;
    document.getElementById("player" + this.id + "Name").innerHTML = this.name;
    document.getElementById("name" + this.id).value = "";
    game.setActivePlayer();
    game.playAgain();
  }
}

class Stick {
  constructor() {
    this.noOfSticks = 1;
    this.removeCounter = this.noOfSticks;
    this.activeDiv = 0;
    this.createSticks();
  }
  createSticks() {
    let sticksDiv = document.getElementById("sticksDiv");
    while (sticksDiv.firstChild) {
      sticksDiv.removeChild(sticksDiv.firstChild);
    }

    // Counter is to set id on each stick
    let counter = 1;

    // sticksPerRow is to set the limit of how many sticks can be created on each row
    let sticksPerRow = 1;
    // kinda self-explanatory
    let sticksTotal = this.noOfSticks;
    // counts how many sticks have been added
    let sticksAdded = 0;
    // dont know if this will be needed
    // let array = [];

    // do this while not all sticks has been added
    while (sticksAdded < sticksTotal) {
      // create a div with the temporary name newDiv
      let newDiv = document.createElement("div");
      newDiv.id = "sticksDiv" + sticksPerRow;
      newDiv.classList.add("sticksRow");
      // appendChild sets the created element in the "parent" element selected with in this example getElementById
      document.getElementById("sticksDiv").appendChild(newDiv);

      // number that is required for removing sticks later
      this.activeDiv = sticksPerRow;

      // for the amount of sticks per row, create new sticks
      for (let i = 0; i < sticksPerRow; i++) {
        // same procedure as above
        let newImg = document.createElement("img");
        newImg.src = "tandsticka.png";
        newImg.id = counter;
        // if the parent element  is hard to understand, check id of the elements in inspect in browser
        document.getElementById("sticksDiv" + sticksPerRow).appendChild(newImg);
        counter++;

        // if all the sticks has been created, stop the creation of more sticks
        if (counter > sticksTotal) {
          break;
        }
      }

      //sticksAdded is increased with the amount of sticks in the row
      sticksAdded += sticksPerRow;
      // each row should include one more stick than the one before
      sticksPerRow++;

      // and if there was an uncompleted row of sticks, set sticksAdded to the correct amount
      // (not sure if this is gonna be needed, but just to sure)
      if (sticksAdded > sticksTotal) {
        sticksAdded = sticksTotal;
      }

      // dont know if this will be needed
      // array.push(sticksAdded);
    }
  }

  removeSticks(number) {
    let currentSticksDiv = document.getElementById(
      "sticksDiv" + this.activeDiv
    );
    for (let i = 0; i < number; i++) {
      if (currentSticksDiv) {
        if (currentSticksDiv.childElementCount <= 0) {
          this.activeDiv--;
          currentSticksDiv = document.getElementById(
            "sticksDiv" + this.activeDiv
          );
        }
      }
      let currentStick = document.getElementById(this.removeCounter);
      if (currentSticksDiv) {
        currentSticksDiv.removeChild(currentStick);
      }
      this.removeCounter--;
      sticks.noOfSticks--;
    }

    game.lostGame();
    game.setActivePlayer();
    if (this.noOfSticks <= 0) {
      document.getElementById("take1Button").disabled = true;
      document.getElementById("take2Button").disabled = true;
      document.getElementById("take3Button").disabled = true;
      game.playersArray[game.activeNumber].points += 2;

      if (!highscoreArray.includes(game.playersArray[game.activeNumber])) {
        highscoreArray.push(game.playersArray[game.activeNumber]);
        console.log(highscoreArray);
        let highscoreTable = document.getElementById("highscoreTable");
        let row = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdPoints = document.createElement("td");
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            tdName.id = "name";
            tdName.innerHTML = game.playersArray[game.activeNumber].name;
            row.appendChild(tdName);
          } else if (i === 1) {
            tdPoints.id = game.playersArray[game.activeNumber].name + "points";
            tdPoints.points = 2;
            tdPoints.innerHTML = tdPoints.points;
            row.appendChild(tdPoints);
          }
        }
        highscoreTable.appendChild(row);
      } else if (
        highscoreArray.includes(game.playersArray[game.activeNumber])
      ) {
        let currentName = document.getElementById(
          game.playersArray[game.activeNumber].name + "points"
        );
        currentName.points += 2;
        currentName.innerHTML = currentName.points;
      }
    }
  }
}

let game = new Game();

let sticks = new Stick();

let highscoreArray = [];
