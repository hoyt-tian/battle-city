import blob from './battle-city.png'
import { merge } from 'UTIL'
let id = 0
class Item {
  constructor({
    x = 0,
    y = 0,
    sx = 0,
    sy = 0,
    sWidth = 16,
    sHeight = 16,
    width = 48,
    height = 48,
    angle = 0,
    flipX = false,
    flipY = false,
    controller = null,
    ...rest,
  }) {
    this.frameCounter = 0
    this.id = id++
    this.x = x
    this.y = y
    this.angle = angle
    this.width = width
    this.height = height
    this.sWidth = sWidth
    this.sHeight = sHeight
    this.sx = sx
    this.sy = sy
    this.flipX = flipX
    this.flipY = flipY
    this.controller = controller
    if (controller) controller.item = this
    merge(this, rest)
  }

  getItems() {
    return null
  }

  getSprites() {
    return null
  }

  getTexts() {
    return null
  }

  next() {
    this.frameCounter++
  }
}

export const resource = new Image()
resource.src = blob

export default Item
