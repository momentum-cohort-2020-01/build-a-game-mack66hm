class Game {
  constructor () {
    this.score = 0
    this.player = new Player()
  }
}

class Player {
  constructor () {
    this.position = { x: 0, y: 0 }
  }
}
