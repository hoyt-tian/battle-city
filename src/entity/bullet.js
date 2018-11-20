import Item, { resource } from './item'
import Tank from './tank';

class Bullet extends Item {
  constructor(conf) {
    const nconf = {
      damage: -10,
    }
    Object.assign(nconf, conf, {
      sx: 20 * 16,
      sy: 16 * 6 + 4,
      sWidth: 8,
      sHeight: 8,
      width: 8,
      height: 8,
    })
    super(nconf)
    this.onAttack = this.onAttack.bind(this)
  }

  shoot(item) {
    if (item instanceof Bullet) {
      item.deleted = true
      item.source.cooldown = false
    } else if (item instanceof Tank && item !== this.source) {
      if (this.onAttack) {
        this.onAttack(item)
      }
    }
    this.source.cooldown = false
    this.deleted = true
  }

  onDestory() {
    const { source = null } = this
    if (source) {
      source.cooldown = false
    }
  }

  next() {
    const { speed = 1 } = this
    switch(this.angle) {
      case 0:
        this.y -= speed
        break
      case 90:
        this.x += speed
        break
      case 180:
        this.y += speed
        break
      case 270:
        this.x -= speed
        break
      default:
        break
    }
  }

  getSprites() {
    const { controller, ...rest } = this
    const sprite = rest
    switch (rest.angle) {
      case 90:
        sprite.sx = rest.sx + 8 * 3
        break
      case 180:
        sprite.sx = rest.sx + 8 * 2
        break
      case 270:
        sprite.sx = rest.sx + 8
      default:
        break
    }
    sprite.image = resource
    return sprite
  }
}

export default Bullet
