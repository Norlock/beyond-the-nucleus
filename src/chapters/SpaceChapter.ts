import * as PIXI from 'pixi.js'
import { ChapterFactory } from 'src/factories/ChapterFactory'
import { boardApp } from 'src/pixi/PixiApp'
import { Chapter, ContainerData } from './base/Chapter'
import { ChapterType } from './base/ChapterType'

enum SpaceName {
    START = 'start'
}

export const SpaceChapter = (): Chapter => {
    //const audio = GetAudio('src/assets/ocean/underwater-ambience.wav', true, 0.1)

    const factory = ChapterFactory(ChapterType.SPACE, 2000, -6000).addContainer(background())

    return factory.chapter
}

const CONTAINER_SIZE = 5000

const background = (): ContainerData => {
    const container = new PIXI.Container()

    const background = new PIXI.Container()
    //background.width = CONTAINER_SIZE
    //background.height = CONTAINER_SIZE
    //background.tint = 0x040404
    container.addChild(background)
    createStars(background)

    console.log('background', background)
    return {
        container,
        name: SpaceName.START
    }
}

function createStars(background: PIXI.Container) {
    // Get the texture for rope.
    const starTexture = PIXI.Texture.from('src/assets/space/star.png')

    const CELL_SIZE = 50
    const GRID_LENGTH = 100
    const STARS_COUNT = 10

    const createCell = (): PIXI.Sprite[] => {
        let offset = 5
        let currentX = 0
        let currentY = 0
        const stars: PIXI.Sprite[] = []

        for (let i = 0; i < STARS_COUNT; i++) {
            const starSprite = new PIXI.Sprite(starTexture)
            starSprite.x = Math.random() * offset + currentX
            starSprite.y = Math.random() * offset + currentY
            starSprite.scale.x = starSprite.scale.x / 50
            starSprite.scale.y = starSprite.scale.y / 50
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

    const createGrid = (y: number, stars: PIXI.Sprite[][]): PIXI.Sprite[][] => {
        for (let i = 0; i < GRID_LENGTH; i++) {
            stars.push(createCell())
        }

        if (++y < GRID_LENGTH) {
            return createGrid(y, stars)
        } else {
            return stars
        }
    }

    const stars = createGrid(0, [])

    console.log('stars', stars)
    let currentX = 0
    let currentY = 0
    for (let starArray of stars) {
        for (let star of starArray) {
            star.x += currentX * CELL_SIZE
            star.y += currentY * CELL_SIZE
            background.addChild(star)
        }

        if (currentX < GRID_LENGTH - 1) {
            currentX++
        } else {
            currentY++
            currentX = 0
        }
    }
}
