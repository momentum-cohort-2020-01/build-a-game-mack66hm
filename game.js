
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
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    const notHittingAnything = (b1) => {
      return this.bodies.filter(function (b2) { return hitting(b1, b2) }).length === 0
    }
    this.bodies = this.bodies.filter(notHittingAnything)

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  draw (context, gameSize) {
    context.clearRect(0, 0, gameSize.x, gameSize.y)

    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(context, this.bodies[i])
    }
  }

  enemyBelow (enemy) {
    return this.bodies.filter(function (b) {
      return b instanceof Enemy && Math.abs(enemy.center.x - b.center.x) < b.size.x && b.center.y > enemy.center.y
    }).length > 0
  }

  addBody (body) {
    this.bodies.push(body)
  }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }

    this.patrolX = 0
    this.speedX = 0.3
  }

  update () {
    if (this.patrolX < 0 || this.patrolX > 30) {
      this.speedX = -this.speedX
    }
    this.center.x += this.speedX
    this.patrolX += this.speedX
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

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    }
  }
}

function drawRect (context, body) {
  context.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y)
}

function hitting (b1, b2) {
  return !(
    b1 === b2 ||
            b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
            b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
  )
}

window.addEventListener('load', function () {
  new Game()
})

