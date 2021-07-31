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

export const SpaceChapter = (): Chapter => {
    //const audio = GetAudio('src/assets/ocean/underwater-ambience.wav', true, 0.1)

    const factory = ChapterFactory(ChapterType.SPACE, 2000, -6000)
    factory.addContainer(background(factory.chapter.root))

    return factory.chapter
}

const background = (root: PIXI.Container): ContainerData => {
    const container = new PIXI.Container()

    //const background = new PIXI.Sprite(PIXI.Texture.WHITE)
    //background.width = 4000
    //background.height = 4000
    //background.tint = 0x040404

    //container.addChild(background)

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

    const createCell = (): PIXI.Sprite[] => {
        let offset = 40
        let currentX = 0
        let currentY = 0
        const stars: PIXI.Sprite[] = []

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
            starSprite.tint = rgbToHex(220, 220, 220 + Math.random() * 35)
            stars.push(starSprite)

            if (currentX < CELL_SIZE - offset) {
                currentX += offset
            } else if (currentY < CELL_SIZE - offset) {
                currentY += offset
                currentX = 0
            }
        }

        return stars
    }

    // For each cell add stars to container
    const createGrid = (y: number, starContainers: PIXI.Container[]): PIXI.Container[] => {
        for (let i = 0; i < GRID_LENGTH; i++) {
            const container = new PIXI.Container()
            const cellStars = createCell()
            cellStars.forEach((star) => container.addChild(star))
            starContainers.push(container)
        }

        if (++y < GRID_LENGTH) {
            return createGrid(y, starContainers)
        } else {
            return starContainers
        }
    }

    const starContainers = createGrid(0, [])
    let currentX = 0
    let currentY = 0
    for (let container of starContainers) {
        container.x += currentX * CELL_SIZE
        container.y += currentY * CELL_SIZE
        background.addChild(container)

        if (currentX < GRID_LENGTH - 1) {
            currentX++
        } else {
            currentY++
            currentX = 0
        }
    }

    return starContainers
}

const selector = (starContainers: PIXI.Container[], root: PIXI.Container) => {
    // Max container size add extra cell_size for margin out of scope
    const MAX_SIZE = GRID_LENGTH * CELL_SIZE
    const X_DISPLACEMENT = 0.1
    const Y_DISPLACEMENT = 0.1

    const moveStars = () => {
        const x = boardApp.stage.x * -1 - root.x
        const y = boardApp.stage.y * -1 - root.y
        const screenX = x + boardApp.screen.width
        const screenY = y + boardApp.screen.height

        for (let container of starContainers) {
            container.x += X_DISPLACEMENT
            container.y += Y_DISPLACEMENT

            const insideTopLeft = () => {
                return x - CELL_SIZE * 2 < container.x && y - CELL_SIZE * 2 < container.y
            }

            const insideBottomRight = () => {
                return container.x < screenX + CELL_SIZE && container.y < screenY + CELL_SIZE
            }

            const moveIfOutOfScope = () => {
                if (MAX_SIZE < container.x) {
                    container.x = 0
                    container.y -= CELL_SIZE
                } else if (MAX_SIZE < container.y) {
                    container.y = 0
                    container.x -= CELL_SIZE
                }
            }

            container.visible = insideTopLeft() && insideBottomRight()
            moveIfOutOfScope()
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
