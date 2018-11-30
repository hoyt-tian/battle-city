import { EventListener, P1Keys, merge } from 'UTIL'
import movement from './movement'
import db from '../service/db'

class Controller {

  constructor(conf = {}) {
    merge(this, conf)
    this.keyDown = this.keyDown.bind(this)
  }

  keyDown(key) {
    const { item = null } = this
    if (item === null) return
    let offX = 0
    let offY = 0
    const distance = item.speed || 2
    switch(key) {
      case 'w':
        offY = -distance
        item.angle = 0
        break
      case 's':
        offY = distance
        item.angle = 180
        break
      case 'a':
        offX = -distance
        item.angle = 270
        break
      case 'd':
        offX = distance
        item.angle = 90
        break
      case 'A':
        item.shoot = 1
        break
      case 'B':
        if (item.fake) break
        item.fake = {
          angle: item.angle,
          x: item.x,
          y: item.y,
        }
        item.speed = item.speed << 1
        break
      case 'C':
        item.shoot = 2
        break
      case 'D':
        item.shoot = 3
        break
    }

    switch(key) {
      case 'w':
      case 's':
      case 'a':
      case 'd':
        item.x += offX
        item.y += offY
        db.insert('movement', movement({
          offX,
          offY,
          targetId: item.id,
          x: item.x,
          y: item.y
        }))
        break
      default:
        break
    }

  }

}

class KeyboardController extends Controller {
  constructor(conf = {}) {
    super(conf)
    const { keyMap = P1Keys } = conf
    EventListener.listen(document, 'keydown', (event) => {
      const key = keyMap[event.keyCode]
      if (key) this.keyDown(key)
    });
  }

}

const actions = ['w', 'w', 'w', 'a', 'a', 'd', 'd', 's', 'A', 'B']

class AIController extends Controller {
  constructor(conf) {
    super(conf)
    const { interval = 400 } = conf
    this.play = this.play.bind(this)
    this.interval = setInterval(this.play, interval)
  }

  play() {
    const { item = null } = this
    if (item === null) return
    const val = Math.round(Math.random() * actions.length)
    this.keyDown(actions[val])
  }

  onDestory() {
    clearInterval(this.interval)
  }
}

export default Controller

export { KeyboardController, AIController }
