class Game {
    constructor() {
        this.player1 = new Player("göran", 1)
        this.player2 = new Player("Sven-Erik", 1)
    }
}

class Player {
  constructor(name, id) {
    this.name = name; 
    this.id = id;
  }
}

class Stick {
  constructor() {
      this.sticks = 21;
    //   this.noOfSticks?
  }
  removeSticks(number) {
    sticks.sticks -= number;
    document.getElementById('stick').textContent = sticks.sticks;
  }
  setAmountOfSticks() {
    document.getElementById('stick').textContent = sticks.sticks;
  }
}

let sticks = new Stick

sticks.setAmountOfSticks();
