const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

class Game {
  constructor () {
    this.score = 0
    this.player = new Player()
    this.bodies = []
    this.bodies = this.bodies.concat(createInvaders(this))
    this.bodies = this.bodies.concat(new Player(this, canvas))
    const tick = () => {
      this.update()
      this.draw(context, canvas)
      requestAnimationFrame(tick)
    }
    tick()
  }
}

class Player {
  constructor (game, canvas) {
    this.game = game
    this.position = { x: 15, y: 15 }
    this.center = { x: canvas.x / 2, y: canvas.y - this.position.y * 2 }
    this.keyboarder = new Keyboarder()
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    }
  }
}

class Drawing {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.context = this.canvas.getContext('2d')
    this.points = []
  }
}

class Enemy {
  constructor () {
    this.position = { x: 0, y: 0 }
  }
}
