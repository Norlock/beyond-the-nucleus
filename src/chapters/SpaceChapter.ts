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

    const STARS_COUNT = 150

    const OFFSET = CELL_SIZE / Math.sqrt(STARS_COUNT)

    const createCell = (containers: StarContainer[]): void => {
        let currentX = 0
        let currentY = 0

        for (let i = 0; i < STARS_COUNT; i++) {
            const starSprite = new PIXI.Sprite(starTexture)
            starSprite.x = Math.random() * OFFSET + currentX
            starSprite.y = Math.random() * OFFSET + currentY

            starSprite.alpha = Math.random()
            starSprite.scale.x = starSprite.scale.x / (20 + Math.random() * 20)
            starSprite.scale.y = starSprite.scale.y / (20 + Math.random() * 20)

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

    const moveStars = (delta: number) => {
        const x = boardApp.stage.x * -1 - root.x
        const y = boardApp.stage.y * -1 - root.y
        const screenX = x + boardApp.screen.width
        const screenY = y + boardApp.screen.height
        count += 0.01 * delta

        for (let container of starContainers) {
            container.x += container.xDisplacement
            container.y += container.yDisplacement

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

const createGalaxies = (container: PIXI.Container) => {
    createGalaxy(container, 500, 2000, 800)
}

const createGalaxy = (container: PIXI.Container, x: number, y: number, radius: number) => {
    const polygonCount = 9

    const create = () => {
        const path: number[] = []

        for (let i = 0; i < polygonCount; i++) {
            let pathX = Math.random() * radius + x
            let pathY = Math.random() * radius + y
            path.push(pathX, pathY)
        }

        const graphic = new PIXI.Graphics()
        for (let i = 0; i < 3; i++) {
            let circleX = Math.random() * radius + x
            let circleY = Math.random() * radius + y

            graphic
                .lineStyle(0)
                .beginFill(0xeeeeff)
                .drawCircle(circleX, circleY, Math.random() * 80)
        }

        graphic
          .lineStyle(0)
          .beginFill(rgbToHex(100 + Math.random() * 50, 20, randomColor()))
          .drawPolygon(path)
          .endFill() // prettier-ignore

        const displacementSprite = PIXI.Sprite.from('src/assets/ocean/displacement.png')
        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

        const noiseFilter = new PIXI.filters.NoiseFilter(4, 4)

        displacementFilter.scale.x = 10
        displacementFilter.scale.y = 100
        displacementSprite.anchor.set(Math.random())

        const blurFilter = new PIXI.filters.BlurFilter(5)
        const blurFilter2 = new PIXI.filters.BlurFilter(1)

        const texture = boardApp.renderer.generateTexture(
            graphic,
            PIXI.SCALE_MODES.NEAREST,
            boardApp.renderer.resolution
        )
        const galaxy = new PIXI.Sprite(texture)
        galaxy.filters = [noiseFilter, blurFilter, displacementFilter, blurFilter2]
        galaxy.addChild(displacementSprite)

        galaxy.x = x
        galaxy.y = y
        return galaxy
    }

    const total = new PIXI.Container()

    for (let i = 0; i < polygonCount; i++) {
        const galaxy = create()
        galaxy.scale.set(1 / polygonCount)
        galaxy.angle = Math.random() * 360
        if (i % 3 === 0) {
            galaxy.tint = rgbToHex(randomColor(), 100, 100)
        } else {
            galaxy.tint = rgbToHex(100, 100, randomColor())
        }

        total.addChild(galaxy)
    }

    container.addChild(total)
}

const randomColor = () => {
    return 200 + 55 * Math.random()
}

const rgbToHex = (r: number, g: number, b: number) => {
    const hexString = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    return parseInt(hexString, 16)
}
