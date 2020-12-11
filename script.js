class Game {
  constructor() {
    this.playersArray = [];
    this.idCounter = 1;
    this.createFirstPlayers('Player 1', 1);
    this.createFirstPlayers('Player 2', 2);
    this.activeNumber = Math.floor(Math.random() * 2);
    this.activePlayerNumber = this.playersArray[this.activeNumber].position;
    this.lastPlayer = document.getElementById(
      'player' + this.activePlayerNumber + 'Name'
    );
    this.currentPlayer = document.getElementById(
      'player' + this.activePlayerNumber + 'Name'
    );
    this.setActivePlayer();
  }
  createFirstPlayers(name, position) {
    let player = new Player(name, this.idCounter, position);
    this.playersArray.push(player);
    this.idCounter++;
  }
  createMorePlayers(number) {
    event.preventDefault();
    let player = new Player('', this.idCounter, number);
    player.name = document.getElementById('name' + number).value;
    document.getElementById('player' + player.position + 'Name').innerHTML =
      player.name;
    document.getElementById('name' + player.position).value = '';
    this.idCounter++;
    this.playersArray.splice(number - 1, 1, player);
    this.playAgain();
  }
  playAgain() {
    sticks.createSticks();
    sticks.noOfSticks = 21;
    sticks.removeCounter = sticks.noOfSticks;
    document.getElementById('take1Button').disabled = false;
    document.getElementById('take2Button').disabled = false;
    document.getElementById('take3Button').disabled = false;
    sticks.createSticks();
    this.setActivePlayer();
    this.testCPU();
  }

  setActivePlayer() {
    this.lastPlayer = document.getElementById(
      'player' + this.activePlayerNumber + 'Name'
    );
    this.activeNumber = (this.activeNumber + 1) % this.playersArray.length;
    this.activePlayerNumber = this.playersArray[this.activeNumber].position;
    this.currentPlayer = document.getElementById(
      'player' + this.activePlayerNumber + 'Name'
    );
    this.lastPlayer.classList.remove('active');
    this.currentPlayer.classList.add('active');
  }
  testCPU() {
    let currentCPU = document.getElementById('cpu' + (this.activeNumber + 1));
    if (currentCPU.value === 'CPU' && sticks.noOfSticks > 0) {
      setTimeout(
        () => sticks.removeSticks(Math.floor(Math.random() * 3) + 1),
        500
      );
    }
  }

  lostGame() {
    if (sticks.noOfSticks <= 0) {
      alert(this.currentPlayer.innerHTML + ' lost the game!');
    }
  }
  setTotal() {
    event.preventDefault();
    sticks.noOfSticks = document.getElementById('totalInput').value;
    sticks.removeCounter = sticks.noOfSticks;
    sticks.createSticks();
  }
}

class Player {
  constructor(name, id, position) {
    this.name = name;
    this.id = id;
    this.points = 0;
    this.position = position;
  }
}

class Stick {
  constructor() {
    this.noOfSticks = 21;
    this.removeCounter = this.noOfSticks;
    this.activeDiv = 0;
    this.createSticks();
  }

  createSticks() {
    let sticksDiv = document.getElementById('sticksDiv');
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

    // do this while not all sticks has been added
    while (sticksAdded < sticksTotal) {
      // create a div with the temporary name newDiv
      let newDiv = document.createElement('div');
      newDiv.id = 'sticksDiv' + sticksPerRow;
      newDiv.classList.add('sticksRow');
      // appendChild sets the created element in the "parent" element selected with in this example getElementById
      document.getElementById('sticksDiv').appendChild(newDiv);

      // number that is required for removing sticks later
      this.activeDiv = sticksPerRow;

      // for the amount of sticks per row, create new sticks
      for (let i = 0; i < sticksPerRow; i++) {
        // same procedure as above
        let newImg = document.createElement('img');
        newImg.src = 'tandsticka.png';
        newImg.id = counter;
        // if the parent element  is hard to understand, check id of the elements in inspect in browser
        document.getElementById('sticksDiv' + sticksPerRow).appendChild(newImg);
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
    }
  }

  removeSticks(number) {
    let currentSticksDiv = document.getElementById(
      'sticksDiv' + this.activeDiv
    );
    for (let i = 0; i < number; i++) {
      if (currentSticksDiv) {
        if (currentSticksDiv.childElementCount <= 0) {
          this.activeDiv--;
          currentSticksDiv = document.getElementById(
            'sticksDiv' + this.activeDiv
          );
        }
      }
      let currentStick = document.getElementById(this.removeCounter);
      if (currentSticksDiv) {
        currentSticksDiv.removeChild(currentStick);
      }
      this.removeCounter--;
      this.noOfSticks--;
    }

    game.lostGame();
    game.setActivePlayer();
    game.testCPU();
    if (this.noOfSticks <= 0) {
      // disable buttons so you can't press the after the game has ended.
      document.getElementById('take1Button').disabled = true;
      document.getElementById('take2Button').disabled = true;
      document.getElementById('take3Button').disabled = true;
      // give the player who won 2 points
      game.playersArray[game.activeNumber].points += 2;

      // if the current player is not already in the highscoreArray, add the player to it
      if (
        !highscoreArray
          .map((x) => x.name)
          .includes(game.playersArray[game.activeNumber].name)
      ) {
        highscoreArray.push(game.playersArray[game.activeNumber]);
      }

      // Sort list based on points
      highscoreArray.sort((a, b) => b.points - a.points);

      // Creation and recreation of highscore

      //Remove all items in highscore
      let highscoreDiv = document.getElementById('highscore');
      while (highscoreDiv.firstChild) {
        highscoreDiv.removeChild(highscoreDiv.firstChild);
      }

      // Create all items in highscore with the already sorted array
      // For each player in highscoreArray, add a div and 2 spans with name and points,
      // and then add the div to highscore
      for (let i = 0; i < highscoreArray.length; i++) {
        const element = highscoreArray[i];

        let newDiv = document.createElement('div');
        newDiv.id = 'highscore' + (i + 1);
        newDiv.classList.add('playerHighscore');

        let nameSpan = document.createElement('span');
        nameSpan.innerHTML = element.name;
        newDiv.appendChild(nameSpan);

        let pointsSpan = document.createElement('span');
        pointsSpan.innerHTML = element.points;
        newDiv.appendChild(pointsSpan);

        document.getElementById('highscore').appendChild(newDiv);
      }
    }
  }
}
function highscorePage(usrName, usrScore) {
  clearContent();
  if (typeof usrScore !== 'undefined') {
    highScores.push({ Name: usrName, Score: usrScore });
    scoreSorter();
    storeScores();
    usrScore = 'undefined';
  }

  $('#topContent').html('<h1>Highscores:</h1>');

  var tmp =
    "<ul class='list-group text-center' style='display:block;margin: 0 auto;max-width:300px;'>";
  for (var x = 0; x < highScores.length; x++) {
    if (x % 2 == 0) {
      tmp +=
        "<li class='list-group-item'><div style='text-align:left'>" +
        highScores[x].Name +
        "<span style='float:right'>" +
        highScores[x].Score +
        '</span></div></li>';
    } else {
      tmp +=
        "<li class='list-group-item list-group-item-success'><div style='text-align:left'>" +
        highScores[x].Name +
        "<span style='float:right'>" +
        highScores[x].Score +
        '</span></div></li>';
    }
  }
  tmp += '</ul>';
  $('#middleContent').html(tmp);

  $('#bottomContent').html(
    "<button type='button' class='btn btn-info' id='clearHighscores'>Clear</button><button type='button' class='btn btn-primary' id='backBtn'>Back</button>"
  );

  $('#backBtn').on('click', function () {
    playAgain();
  });

  $('#clearHighscores').on('click', function () {
    clearScores();
    return;
  });
}

let sticks = new Stick();
let game = new Game();

let highscoreArray = [];
