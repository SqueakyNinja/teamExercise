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
  constructor(sticks = 21) {
      this.sticks = sticks;
    //   this.noOfSticks?
  }
  removeSticks() {

  }
  setAmountOfSticks() {
    document.getElementById('stick').textContent = sticks;
  }
}













