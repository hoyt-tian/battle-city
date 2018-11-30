import Item, { resource } from './item'
import Tank from './tank'
import { clone } from 'UTIL'
import { AIController } from '../entity/controller'

class Spark extends Item {
  constructor() {
    super({
      x: Math.random() * 100 + 100,
      y: 100 + Math.random() * 100,
      sx: 16 * 16,
      sy: 6 * 16,
    })
  }

  onDestory() {
    const pairs = [
      {sx: 16 * 8, sy: 16 * 5, speed: 6, interval: 200, hp: 60 },
      {sx: 16 * 8, sy: 16 * 7, hp: 100},
      {sx: 16 * 0, sy: 16 * 7, hp: 100},
      {sx: 16 * 8, sy: 16 * 8, hp: 40},
      {sx: 0, sy: 16 * 8, hp: 40},
      {sx: 0, sy: 16 * 5, speed: 6, interval: 200, hp: 60},
    ]
    const p = pairs[Math.floor(Math.random() * pairs.length)]
    return new Tank({
      ...p,
      x: this.x,
      y: this.y,
      controller: new AIController({ interval: p.interval || 400 })
    })
  }

  getSprites() {
    const frame = Math.floor(this.frameCounter / 6)
    const conf = clone(this)
    conf.image = resource
    switch(frame) {
      case 6:
      case 0:
        break
      case 5:
      case 1:
        conf.sx = this.sx + 16
        break
      case 4:
      case 2:
        conf.sx = this.sx + 16 * 2
        break
      case 3:
        conf.sx = this.sx + 16 * 3
        break
      default:
        this.deleted = true
        return null
    }
    return conf
  }
}

export default Spark
