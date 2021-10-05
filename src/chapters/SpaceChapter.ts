import * as PIXI from 'pixi.js'
import {PixiChapterFactory} from 'src/factories/PixiChapterFactory'
import {SelectState} from 'src/modules/audio/AudioComponent'
import {GetAudio} from 'src/modules/audio/GetAudio'
import {Selector} from 'src/modules/selector/Selector'
import {boardApp} from 'src/pixi/PixiApp'
import {Coordinates} from 'src/utils/particle/Coordinates'
import {Grid, GridOptions} from 'src/utils/particle/Grid'
import {ParticleAttributes} from 'src/utils/particle/Particle'
import {PixiParticleContainer} from 'src/utils/particle/ParticleContainer'
import {PixiParticleRendererFactory} from 'src/utils/particle/PixiParticleRenderer'
import {Chapter, ContainerData} from './base/Chapter'
import {ChapterType} from './base/ChapterType'
import {createFallingStars} from './space/FallingStar'

enum SpaceName {
  START = 'start'
}

enum AudioTag {
  AMBIENCE = 'ambience'
}

const CELL_SIZE = 400
const GRID_LENGTH = 20
const STARS_COUNT = 120
export let velocityDelta = 1

class StarContainer extends PIXI.ParticleContainer {
  readonly xDisplacement: number
  readonly yDisplacement: number
  readonly xyRatio: number
  readonly xOutBoundOffsetY: number
  readonly yOutBoundOffsetX: number

  constructor(xDisplacement: number, yDisplacement: number) {
    super(STARS_COUNT, {tint: false, alpha: true}, STARS_COUNT * 2)
    this.interactiveChildren = false
    this.xDisplacement = xDisplacement
    this.yDisplacement = yDisplacement
    this.xyRatio = this.yDisplacement / this.xDisplacement
    this.yOutBoundOffsetX = CELL_SIZE / this.xyRatio
    this.xOutBoundOffsetY = CELL_SIZE * this.xyRatio
  }
}

export const SpaceChapter = (): Chapter => {
  const audio = GetAudio('src/assets/space/ambient.mp3', true, 0.1)

  const factory = PixiChapterFactory(ChapterType.SPACE, 2000, -6000)
  const container = factory.chapter.root
  factory.addContainer(background(container))
  factory.addAudio(audio, AudioTag.AMBIENCE)
  //factory.appendSelector(chapterSelector(factory.chapter), createFallingStars(container))
  factory.appendSelector(chapterSelector(factory.chapter))

  return factory.chapter
}

const background = (root: PIXI.Container): ContainerData => {
  const container = new PIXI.Container()

  createGalaxies(container)
  //const starContainers = createStars(container)
  createAstronaut(container)
  //createTelescope(container) TODO blender beter leren
  createParticles(container)


  return {
    container,
    name: SpaceName.START,
    //selector: selector(starContainers, root)
  }
}

const createParticles = (background: PIXI.Container) => {
  const particleContainer = new PIXI.Container()
  particleContainer.zIndex = 30
  background.addChild(particleContainer)

  const container = new PixiParticleContainer(particleContainer, new Coordinates(5300, 1400))

  const options: GridOptions = {
    container,
    voxelWidth: 100,
    voxelHeight: 100,
    voxelXLength: 4,
    voxelYLength: 4,
    particlePercentage: 88
  }

  const particleAttributes: ParticleAttributes = {
    factory: PixiParticleRendererFactory(),
    color: {
      red: 0,
      green: 255,
      blue: 100
    },
    diameter: 4,
    //spacing: 5
    spacing: 8
  }

  const grid = Grid.create(options, particleAttributes)

  setTimeout(() => {
    grid.start()
  }, 3000)
}

const createStars = (background: PIXI.Container) => {
  // Get the texture for rope.
  const starTexture = PIXI.Texture.from('src/assets/space/star.png')

  const OFFSET = CELL_SIZE / Math.sqrt(STARS_COUNT)

  const createCell = (containers: StarContainer[]): void => {
    let currentX = 0
    let currentY = 0

    for (let i = 0; i < STARS_COUNT; i++) {
      const starSprite = new PIXI.Sprite(starTexture)
      starSprite.x = Math.random() * OFFSET + currentX
      starSprite.y = Math.random() * OFFSET + currentY

      starSprite.alpha = Math.random()
      const scalePart = (20 + Math.random() * 20)
      starSprite.scale.x = starSprite.scale.x / scalePart
      starSprite.scale.y = starSprite.scale.y / scalePart

      const tintColor = Math.random() * 10
      if (tintColor < 1) {
        starSprite.tint = rgbToHex(randomColor(), 200, 200)
      } else if (tintColor < 2) {
        starSprite.tint = rgbToHex(200, randomColor(), 200)
      } else if (tintColor < 3) {
        starSprite.tint = rgbToHex(200, 200, randomColor())
      }

      if (currentX < CELL_SIZE - OFFSET) {
        currentX += OFFSET
      } else if (currentY < CELL_SIZE - OFFSET) {
        currentY += OFFSET
        currentX = 0
      }

      containers[Math.floor(Math.random() * containers.length)].addChild(starSprite)
    }
  }

  // For each cell add stars to container
  const createGrid = (y: number, starContainers: StarContainer[]): StarContainer[] => {
    const getContainers = (x: number) => {
      const container1 = new StarContainer(0.11, 0.11)
      const container2 = new StarContainer(0.1, 0.1)
      container1.x = x * CELL_SIZE
      container2.x = x * CELL_SIZE
      container1.y = y * CELL_SIZE
      container2.y = y * CELL_SIZE

      return [container1, container2]
    }

    for (let x = 0; x < GRID_LENGTH; x++) {
      const containers = getContainers(x)

      createCell(containers)

      containers.forEach((container) => {
        starContainers.push(container)
        background.addChild(container)
      })
    }

    if (++y < GRID_LENGTH) {
      return createGrid(y, starContainers)
    } else {
      return starContainers
    }
  }

  return createGrid(0, [])
}

const selector = (starContainers: StarContainer[], root: PIXI.Container) => {
  // Max container size add extra cell_size for margin out of scope
  const MAX_SIZE = GRID_LENGTH * CELL_SIZE

  let count = 0
  let angle = 0.05
  let astronautDelta = 0
  let astronautAngle = astronaut.angle

  const moveStars = (delta: number) => {
    galaxy.x += 0.03
    galaxy.y += 0.03

    const x = boardApp.stage.x * -1 - root.x
    const y = boardApp.stage.y * -1 - root.y
    const screenX = x + boardApp.screen.width
    const screenY = y + boardApp.screen.height
    count += 0.0002 * delta

    for (let container of starContainers) {
      container.x += container.xDisplacement * velocityDelta
      container.y += container.yDisplacement * velocityDelta

      let stars = container.children
      for (let i = 0; i < stars.length; i++) {
        stars[i].alpha = Math.sin(count + i)
      }

      const insideTopLeft = () => {
        return x - CELL_SIZE * 2 < container.x && y - CELL_SIZE * 2 < container.y
      }

      const insideBottomRight = () => {
        return container.x < screenX + CELL_SIZE && container.y < screenY + CELL_SIZE
      }

      if (MAX_SIZE < container.x) {
        container.x = 0
        container.y -= container.xOutBoundOffsetY
      } else if (MAX_SIZE < container.y) {
        container.y = 0
        container.x -= container.yOutBoundOffsetX
      }

      container.visible = insideTopLeft() && insideBottomRight()
    }

    const moveAstronaut = () => {
      if (astronaut.angle > astronautAngle + 10) {
        angle = -0.05 // invert angle
      } else if (astronaut.angle < astronautAngle - 10) {
        angle = 0.05
      }

      astronaut.angle += angle
      astronaut.y = astronaut.y + Math.sin((astronautDelta += 0.02)) / 2
    }
    moveAstronaut()
  }

  const selector = new Selector('Move stars')
  selector.activate = async () => {
    boardApp.ticker.add(moveStars)
  }

  selector.deactivate = async () => {
    boardApp.ticker.remove(moveStars)
  }

  return selector
}

let galaxy: PIXI.Sprite
let astronaut: PIXI.Sprite

const createGalaxies = (container: PIXI.Container) => {
  //createGalaxy(container, 500, 2000, 800)
  galaxy = PIXI.Sprite.from('src/assets/space/galaxy.png')
  galaxy.x = 1800
  galaxy.y = 600
  galaxy.scale.set(0.7)
  galaxy.alpha = 1
  galaxy.angle = 45

  const filter = new PIXI.filters.FXAAFilter()
  filter.enabled = true

  galaxy.filters = [filter]
  container.addChild(galaxy)
}

const createAstronaut = (container: PIXI.Container) => {
  const background = new PIXI.Graphics().lineStyle(8, 0x778899).beginFill(0x000000).drawCircle(0, 0, 300).endFill()
  background.x = 1700
  background.y = 800 + 150

  astronaut = PIXI.Sprite.from('src/assets/space/astronaut.png')
  astronaut.anchor.set(0.5)
  astronaut.y -= 40
  astronaut.x += 20
  astronaut.angle = -34

  background.addChild(astronaut)
  container.addChild(background)
}

const chapterSelector = (self: Chapter): Selector => {
  const selector = new Selector('Chapter audio')
  selector.activate = async () => {
    setTimeout(() => {
      self.audio.select(AudioTag.AMBIENCE, SelectState.fadeIn)
    }, 200)
  }

  selector.deactivate = async () => {
    self.audio.selected.fadeOut()
  }

  return selector
}

const randomColor = () => {
  return 200 + 55 * Math.random()
}

const rgbToHex = (r: number, g: number, b: number) => {
  const hexString = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return parseInt(hexString, 16)
}
