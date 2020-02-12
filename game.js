
class Game {
  constructor () {
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }

    this.bodies = []
    this.bodies = this.bodies.concat(new Player(this, gameSize))
    this.bodies = this.bodies.concat(createEnemy(this))

    const tick = () => {
      this.update()
      this.draw(context, gameSize)
    //   requestAnimationFrame(tick)
    }
    // tick()
  }

  draw (context, gameSize) {
    // context.clearRect(0, 0, gameSize.x, gameSize.y)

    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(context, this.bodies[1])
    }
  }
}

// draw (context, gameSize) {
//     context.clearRect(0, 0, gameSize.x, gameSize.y)

//     for (let i = 0; i < this.bodies.length; i++) {
//         drawRect(context, this.bodies[1])
//     }
// }

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
    // this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    // this.keyboarder = new Keyboarder()
  }

//   update () {
//     if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
//       this.center.x -= 2
//     } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
//       this.center.x += 2
//     }
//   }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }
  }
}

function createEnemy (game) {
  const enemy = []
  for (let i = 0; i < 10; i++) {
    const x = 30 + (i % 8) * 30
    const y = 30 + (i % 3) * 30
    enemy.push(new Enemy(game, { x: x, y: y }))
  }
  return enemy
}

// class Drawing {
//   constructor (canvasId) {
//     this.canvas = document.getElementById(canvasId)
//     this.context = this.canvas.getContext('2d')
//     this.points = []
//   }
// }

function drawRect (context, body) {
  context.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y)
}
// class Enemy {
//   constructor () {
//     this.position = { x: 0, y: 0 }
//   }
// }

// window.addEventListener('load', function () {
//   new Game()
// })

new Game()
new Player()
new Enemy()
