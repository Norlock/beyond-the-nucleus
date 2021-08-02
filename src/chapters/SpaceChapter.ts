import * as PIXI from 'pixi.js'
import { ChapterFactory } from 'src/factories/ChapterFactory'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'
import { Chapter, ContainerData } from './base/Chapter'
import { ChapterType } from './base/ChapterType'

enum SpaceName {
    START = 'start'
}

const CELL_SIZE = 400
const GRID_LENGTH = 20

class StarContainer extends PIXI.Container {
    readonly xDisplacement: number
    readonly yDisplacement: number
    readonly xyRatio: number
    readonly xOutBoundOffsetY: number
    readonly yOutBoundOffsetX: number

    constructor(xDisplacement: number, yDisplacement: number) {
        super()
        this.interactiveChildren = false
        this.xDisplacement = xDisplacement
        this.yDisplacement = yDisplacement
        this.xyRatio = this.yDisplacement / this.xDisplacement
        this.yOutBoundOffsetX = CELL_SIZE / this.xyRatio
        this.xOutBoundOffsetY = CELL_SIZE * this.xyRatio
    }
}

// todo paralax effect with multiple layers so it creates depth effect

export const SpaceChapter = (): Chapter => {
    //const audio = GetAudio('src/assets/ocean/underwater-ambience.wav', true, 0.1)

    const factory = ChapterFactory(ChapterType.SPACE, 2000, -6000)
    factory.addContainer(background(factory.chapter.root))

    return factory.chapter
}

const background = (root: PIXI.Container): ContainerData => {
    const container = new PIXI.Container()

    //const background = new PIXI.Sprite(PIXI.Texture.WHITE)
    //background.width = CELL_SIZE * GRID_LENGTH
    //background.height = CELL_SIZE * GRID_LENGTH
    //background.tint = 0x040404

    container.addChild(container)

    createGalaxies(container)

    const starContainers = createStars(container)

    return {
        container,
        name: SpaceName.START,
        selector: selector(starContainers, root)
    }
}

function createStars(background: PIXI.Container) {
    // Get the texture for rope.
    const starTexture = PIXI.Texture.from('src/assets/space/star.png')

    const STARS_COUNT = 100

    const createCell = (containers: StarContainer[]): void => {
        let offset = 40
        let currentX = 0
        let currentY = 0

        function rgbToHex(r: number, g: number, b: number) {
            const hexString = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
            return parseInt(hexString, 16)
        }

        for (let i = 0; i < STARS_COUNT; i++) {
            const starSprite = new PIXI.Sprite(starTexture)
            starSprite.x = Math.random() * offset + currentX
            starSprite.y = Math.random() * offset + currentY

            starSprite.scale.x = starSprite.scale.x / (20 + Math.random() * 20)
            starSprite.scale.y = starSprite.scale.y / (20 + Math.random() * 20)

            const randomColor = () => {
                return 200 + 55 * Math.random()
            }

            const tintColor = Math.random() * 10
            if (tintColor < 1) {
                starSprite.tint = rgbToHex(randomColor(), 200, 200)
            } else if (tintColor < 2) {
                starSprite.tint = rgbToHex(200, randomColor(), 200)
            } else if (tintColor < 3) {
                starSprite.tint = rgbToHex(200, 200, randomColor())
            }

            if (currentX < CELL_SIZE - offset) {
                currentX += offset
            } else if (currentY < CELL_SIZE - offset) {
                currentY += offset
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

    const moveStars = () => {
        const x = boardApp.stage.x * -1 - root.x
        const y = boardApp.stage.y * -1 - root.y
        const screenX = x + boardApp.screen.width
        const screenY = y + boardApp.screen.height

        for (let container of starContainers) {
            container.x += container.xDisplacement
            container.y += container.yDisplacement

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

// TODO auto generate galaxy
//
// Take 6 dots inside a square
// add displacement filters
// add random circles with colors

const createGalaxies = (container: StarContainer | PIXI.Container) => {
    console.log('create galaxy', container)

    const path = [500, 270, 700, 460, 880, 420, 730, 570, 700, 800, 590, 520]
    const path2 = [400, 200, 650, 340, 820, 220, 630, 470, 600, 700, 490, 420]

    const graphic = new PIXI.Graphics()
    graphic
        .lineStyle(0)
        .beginFill(0x3366dd)
        .drawPolygon(path)
        .endFill() // prettier-ignore
        .beginFill(0x3366ff)
        .drawPolygon(path2)
        .endFill()
        .beginFill(0xeeeeff)
        .drawCircle(650, 500, 70)
        .beginFill(0x0f00ff, 0.6)
        .drawCircle(450, 380, 30)
        .beginFill(0xffffff, 0.6)
        .drawCircle(750, 580, 40)
        .endFill()

    const displacementSprite = PIXI.Sprite.from('src/assets/ocean/displacement.png')
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

    const noiseFilter = new PIXI.filters.NoiseFilter(4, 4)

    displacementFilter.scale.x = 10
    displacementFilter.scale.y = 100
    displacementSprite.anchor.set(0.5)

    const blurFilter = new PIXI.filters.BlurFilter(5)
    const texture = boardApp.renderer.generateTexture(graphic, PIXI.SCALE_MODES.NEAREST, boardApp.renderer.resolution)
    const galaxy = new PIXI.Sprite(texture)
    galaxy.filters = [noiseFilter, blurFilter, displacementFilter]
    galaxy.addChild(displacementSprite)

    //galaxy.width = 400
    //galaxy.height = 400
    galaxy.x = 1600
    galaxy.y = 1000
    galaxy.scale.set(0.5)

    const galaxy2 = new PIXI.Sprite(galaxy.texture.clone())
    galaxy2.angle = 120
    galaxy2.x = 1900
    galaxy2.y = 1200
    galaxy2.filters = [noiseFilter, blurFilter, displacementFilter]
    galaxy2.scale.set(0.15)
    //galaxy.addChild(displacementSprite)

    container.addChild(galaxy, galaxy2)

    const starTexture = PIXI.Texture.from('src/assets/space/star.png')
    for (let i = 0; i < 30; i++) {
        const star = new PIXI.Sprite(starTexture)
        star.scale.set(0.02)
        star.x = galaxy.x + galaxy.width * Math.random()
        star.y = galaxy.y + galaxy.height * Math.random()
        container.addChild(star)
    }
}
