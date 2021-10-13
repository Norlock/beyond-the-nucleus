import * as PIXI from 'pixi.js'
import {Promiser} from 'src/utils/Promiser'

export const boardApp = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resizeTo: window,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})

export let pixiResources: resourceNames

interface resourceNames {
  oceanStart: PIXI.Texture
  oceanTurtle: PIXI.Texture
  oceanBubble: PIXI.Texture
  oceanAnthozoa: PIXI.Texture
  zendoCard: PIXI.Texture
}

export const preload = (): Promise<void> => {
  boardApp.loader.baseUrl = 'src/assets'
  boardApp.loader
    .add('oceanStart', 'ocean/ocean.jpg')
    .add('oceanTurtle', 'ocean/ocean-turtle.jpg')
    .add('oceanBubble', 'ocean/bubble.png')
    .add('oceanAnthozoa', 'ocean/Anthozoa.jpg')
    .add('zendoCard', 'zendo/card-background.jpg')

  boardApp.loader.onError.add((err: any) => console.error(err))

  const promiser = Promiser<void>()
  boardApp.loader.load((_loader, res) => {
    pixiResources = {
      oceanBubble: res.oceanBubble.texture,
      oceanStart: res.oceanStart.texture,
      oceanTurtle: res.oceanTurtle.texture,
      oceanAnthozoa: res.oceanAnthozoa.texture,
      zendoCard: res.zendoCard.texture
    }
    promiser.resolve()
  })
  return promiser.promise
}

let input = ''

export const boardScroll = (direction: string) => {
  input = direction
}

boardApp.ticker.add(() => {
  switch (input) {
    case 'left':
      boardApp.stage.x += 20
      break
    case 'right':
      boardApp.stage.x -= 20
      break
    case 'up':
      boardApp.stage.y += 20
      break
    case 'down':
      boardApp.stage.y -= 20
      break
  }
})
