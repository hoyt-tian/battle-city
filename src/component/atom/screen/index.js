import React from 'react'

const compareObject = (a, b, keys = []) => {
  for(let i = 0; i < keys.length; i++) {
    const k = keys[i]
    if (a[k] !== b[k]) return false
  }
  return true;
}

class Screen extends React.Component {
  constructor(props, context, updater) {
    super(props, context, updater)
    this.canvasRef = React.createRef()
  }

  shouldComponentRedraw(sprites) {
    if (sprites !== this.props.sprites || sprites.length !== this.props.sprites.length) return true
    
    for(let i = 0; i < sprites.length; i++) {
      const s = this.props.sprites[i]
      const _s = sprites[i]
      if (s !== _s) return true
      if (compareObject(s, _s, ['x', 'y', 'image', 'flipX', 'flipY']) === true) {
        continue
      } else {
        return true
      }
    }
    return false
  }

  componentDidMount() {
    this.redraw()
  }

  drawBg(ctx, width, height, fillStyle) {
    ctx.clearRect(0, 0, width, height)

    ctx.save()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = fillStyle
    ctx.fill()
    ctx.restore()
  }

  drawSprites(ctx, sprites) {
    sprites.forEach(s => {
      ctx.save()
      const { image, sx, sy, sWidth, sHeight, x, y, width, height, flipX, flipY, angle, ...rest } = s
      Object.assign(ctx, rest)
      ctx.drawImage(
        image,
        sx, 
        sy, 
        sWidth, 
        sHeight, 
        flipX ? -x : x, 
        flipY ? -y : y, 
        width, 
        height
      )
      ctx.restore()
    })
  }

  drawTexts(ctx, texts) {
    texts.forEach(t => {
      ctx.save()
      const { content, x, y, ...rest } = t
      Object.assign(ctx, rest)
      ctx.fillText(content, x, y)
      ctx.restore()
    })
  }

  redraw() {
    const { current: canvas } = this.canvasRef
    const ctx = canvas.getContext('2d')
    const { width, height, sprites = [], texts = [] } = this.props

    this.drawBg(ctx, width, height, '#000')
     
    this.drawSprites(ctx, sprites)

    this.drawTexts(ctx, texts)

  }

  shouldComponentUpdate(nextProps) {
    const props = this.props
    const { width, height, sprites = [] } = nextProps

    if (width === props.width && height === props.height) {
      if (this.shouldComponentRedraw(sprites)) {
        this.redraw()
      }
      return false
    } 
    return true
  }

  render() {
    const { width = 800, height = 600 } = this.props
    return <canvas width={width} height={height} ref={this.canvasRef} />
  }
}

export default Screen
