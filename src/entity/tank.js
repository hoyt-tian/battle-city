import Item, { resource } from './item'
import { clone } from 'UTIL'
import Bullet from './bullet'
import hp from './hp'
import db from '../service/db'
import Boom from './boom'
import { AIController } from './controller'

class Tank extends Item {
  constructor(conf) {
    super(conf)
    this.speed = conf.speed || 4
    this.hp = conf.hp || 100
    this.maxHp = this.hp
    this.level = conf.level || 0
  }

  onDestory() {
    if (this.controller instanceof AIController) {
      this.controller.onDestory()
    }
    return new Boom({ x: this.x, y: this.y })
  }

  effectHP(val) {
    this.hp += val
    if (this.hp <= 0) {
      this.boom = true
      return
    }
    const h = hp({
      targetId: this.id,
      offset: val,
      val: this.hp,
    })
    db.insert('hp', h)
  }

  getItems() {
    if (this.shoot && this.cooldown !== true) {
      const bconf = {
        angle: this.angle,
        speed: 5,
        source: this
      }
      switch (this.shoot) {
        case 1:
          bconf.onAttack = function(tank) { 
            tank.effectHP(this.damage) 
          } 
          break
        case 2:
          bconf.onAttack = function(tank) {
            tank.controller.keyDown('B')
          }
          break
        case 3:
          bconf.onAttack = function(tank) {
            if (tank.recover) return
            setTimeout(() => {
              const now = Date.now()
              const hps = db.query('hp', h => h.targetId === tank.id && (now - h.gmtCreate < 5000))
              console.log(`find hps from ${now}`)
              console.log(hps)
              hps.forEach(h => {
                tank.effectHP(-h.offset)
              })
              tank.recover = null
            }, 5000)
            tank.recover = true
          }
          break
      }
      this.shoot = 0
      this.cooldown = true
      const bullet = new Bullet(bconf)
      switch (this.angle) {
        case 0:
          bullet.x = this.x + this.width / 2 - 4
          bullet.y = this.y
          break
        case 90:
          bullet.x = this.x + 5
          bullet.y = this.y + this.height / 2 - 4
          break
        case 180:
          bullet.x = this.x + this.width / 2 - 4
          bullet.y = this.y + this.height / 2
          break
        case 270:
          bullet.x = this.x - 5
          bullet.y = this.y + this.height / 2 - 4
          break
        default:
          throw new Error(`illegal angle ${this.angle}`)
          break
      }
      return bullet
    }

    if (this.boom === true) {
      this.deleted = true
    }
  }

  getSprites() {
    const frame = this.frameCounter % 4
    const { controller, ...rest } = this
    const sprite = rest
    switch (rest.angle) {
      case 90:
        sprite.sx = rest.sx + 32 * 3
        break
      case 180:
        sprite.sx = rest.sx + 32 * 2
        break
      case 270:
        sprite.sx = rest.sx + 32
      default:
        break
    }
    sprite.image = resource
    if (frame > 1) {
       sprite.sx += 16
    }
    if (this.fake) {
      if (!this.fake.timer) {
        this.fake.timer = setTimeout(() => {
          if (this.fake) {
            this.x = this.fake.x
            this.y = this.fake.y
            this.speed = this.speed >> 1
            this.fake = null
          }
        }, 5000)
      }
      const { image , fake, ...srest } = sprite
      const phantom = clone(srest)
      phantom.globalAlpha = 0.5
      phantom.image = image
      phantom.x = fake.x
      phantom.y = fake.y
      phantom.angle = fake.angle
      return [ sprite, phantom ]
    }
    return sprite
  }

  getTexts() {
    return {
      x: this.x + 5,
      y: this.y + this.height + 5,
      content: `${this.hp}/${this.maxHp}${this.recover ? '⭐️' : ''}`,
      fillStyle: '#FFF',
    }
  }
}

export default Tank
