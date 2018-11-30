import Item, { resource } from './item'
import { clone } from 'UTIL'
import Spark from './spark'
import binary from './boom.ogg'
import Tank from './tank'

const audio = new Audio()
audio.src = binary

class Boom extends Item {
  constructor({ x, y }) {
    super({
      x,
      y,
      sx: 16 * 16,
      sy: 16 * 8,
    })
    audio.play()
  }

  onDestory({
    items
  }) {
    const tanks = items.filter(i => (i instanceof Tank && !i.deleted) || (i instanceof Spark))
    if (tanks.length > 5) return null 
    const r = []
    const s = Math.ceil(Math.random() * 2)
    for(let i = 0; i < s; i++) {
      r.push(new Spark())
    }
    return r
  }

  getSprites() {
    const frame = Math.floor(this.frameCounter / 8)
    const conf = clone(this)
    conf.image = resource
    switch(frame) {
      case 0:
        break
      case 1:
        conf.sx = this.sx + 16
        break
      case 2:
        conf.sx = this.sx + 16 * 2
        break
      default:
        this.deleted = true
        return null
    }
    return conf
  }
}

export default Boom
