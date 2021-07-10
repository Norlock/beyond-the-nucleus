import * as PIXI from 'pixi.js'
import { SelectorFactory } from 'src/factories/SelectorFactory'
import { boardApp } from 'src/pixi/PixiApp'
import { Promiser } from 'src/utils/Promiser'
import { Selector, StandardSelectorTag } from '../selector/Selector'
import { Offset, PixiSelector } from './Pixi'

export const ComponentCardSelector = (card: PIXI.Container, offset: Offset): PixiSelector => {
    const selector = SelectorFactory(new Selector(StandardSelectorTag.CARD))
        .setSelect(() => scrollToCard(card, offset))
        .setUnselect(() => hideCard(card))
        .build()

    return { component: card, selector }
}

const scrollToCard = async (card: PIXI.Container, offset: Offset) => {
    card.visible = true

    let xSpeed: number, ySpeed: number, deltaSpeed: number
    let amplify = 10

    const pos = card.getBounds()
    let newX = pos.x - offset.x
    let newY = pos.y - offset.y

    if (Math.abs(newX) > 1000 || Math.abs(newY) > 1000) {
        deltaSpeed = 60
    } else {
        deltaSpeed = 40
    }

    const xMul = newX < 0 ? -1 : 1
    const yMul = newY < 0 ? -1 : 1
    const xyRatio = Math.abs(newX / newY)

    if (xyRatio < 1) {
        xSpeed = deltaSpeed * xyRatio * xMul
        ySpeed = deltaSpeed * yMul
    } else {
        xSpeed = deltaSpeed * xMul
        ySpeed = (deltaSpeed / xyRatio) * yMul
    }

    const absXSpeed = Math.abs(xSpeed)
    const absYSpeed = Math.abs(ySpeed)

    const promiser = Promiser<void>()

    const scrollAnimation = (): void => {
        if (absXSpeed < Math.abs(newX) && absYSpeed < Math.abs(newY)) {
            boardApp.stage.setTransform(boardApp.stage.x - xSpeed, boardApp.stage.y - ySpeed)
            newX -= xSpeed
            newY -= ySpeed

            if (amplify-- > 0) {
                xSpeed = xSpeed * 1.05
                ySpeed = ySpeed * 1.05
            }
        } else {
            boardApp.stage.setTransform(boardApp.stage.x - newX, boardApp.stage.y - newY)
            boardApp.ticker.remove(scrollAnimation)
            promiser.resolve()
        }
    }

    boardApp.ticker.add(scrollAnimation)
    return promiser.promise
}

const hideCard = async (card: PIXI.Container) => {
    // TODO deactivate hide idle nothing
    //if (action === ActionSelector.PREVIOUS) {
    //card.visible = false
    //}
}
