import React from 'react'
import 'babel-polyfill'
import Screen from '../../component/atom/screen'
import Tank from '../../entity/tank'
import Bullet from '../../entity/bullet'
import { push } from 'UTIL'
import { KeyboardController } from '../../entity/controller'
import './app.less'

class App extends React.Component {
  constructor(props, context, updater) {
    super(props, context, updater)

    this.state = {
      width: 400,
      height: 300,
      items: [
        new Tank({
          angle: 45,
          speed: 4,
          y: 300 - 48 - 5,
          controller: new KeyboardController()
        }),
        ...Tank.createTanks(2),
      ],
      sprites: [],
      texts: [],
    }
    this.run = this.run.bind(this)
  }

  blockDetect(items) {
    const bullets = items.filter(i => i instanceof Bullet)
    bullets.forEach(b => {
      items.forEach(i => {
        if (i !== b && i.deleted !== true && i !== b.source && this.hasCollision(i, b)) {
          b.shoot(i)
        }
      })
    })
  }

  hasCollision(a, b) {
    const intersection = {
      left: Math.max(a.x, b.x),
      right: Math.min(a.x + a.width, b.x + b.width),
      top: Math.max(a.y, b.y),
      bottom: Math.min(a.y + a.height, b.y + b.height),
    }
    return (intersection.left <= intersection.right) && (intersection.top <= intersection.bottom)
  }

  outOfBoundary(item, width, height) {
    if ( (item.x + item.width < 0) || item.x > width || (item.y + item.height < 0) || item.y > height) {
      return true
    }
    return false
  }

  collectItems() {
    const { items = [], width, height } = this.state
    const remain =  items.filter(i => i.deleted !== true && this.outOfBoundary(i, width, height) !== true )
    const created = []
    remain.forEach(i => {
      const r = i.getItems()
      if (r) {
        push(created, r)
      }
    })
    return remain.concat(created)
  }

  collectSprites() {
    const sprites = []
    const { items = [] } = this.state
    items.forEach(item => {
      if (item.getSprites) {
        const s = item.getSprites()
        push(sprites, s)
      }
    })
    return sprites
  }

  collectTexts() {
    const texts = []
    const { items = [] } = this.state
    items.forEach(item => {
      if (item.getTexts) {
        const s = item.getTexts()
        push(texts, s)
      }
    })
    return texts;
  }

  destoryItems() {
    const { items = [], width, height } = this.state
    const destory = items.filter(i => this.outOfBoundary(i, width, height))
    destory.forEach(d => {
      d.deleted = true
      if (d.onDestory) {
        d.onDestory()
      }
    })
  }

  nextFrame(items = []) {
    items.forEach(item => {
      if (item.next) {
        item.next()
      }
    })
  }

  run() {
    const items = this.collectItems()
    const sprites = this.collectSprites(items)
    const texts = this.collectTexts(items)
    this.blockDetect(items)
    this.destoryItems()
    this.setState({
      items,
      sprites,
      texts,
    }, () => {
      this.nextFrame(items)
      requestAnimationFrame(this.run)
    })
  }

  componentDidMount() {
    requestAnimationFrame(this.run)
  }

  render() {
    const { sprites = [], texts = [], width = 400, height = 300 } = this.state
    return <section className="app">
      <Screen sprites={sprites} texts={texts} width={width} height={height}/>
      <section>
        <h6>说明</h6>
        <p>上下左右: WSAD</p>
        <p>普通攻击：J</p>
        <p>影分身：K，分身状态下移动速度加倍，5秒后回到分身所在位置</p>
        <p>标记弹：L，被标记的单位将在5秒后回到标记位置</p>
        <p>恢复弹：;，被恢复弹标记的单位，5秒后hp回复至中弹状态时的hp，若单位已经死亡则无效</p>
      </section>
    </section>
  }
}

export default App
