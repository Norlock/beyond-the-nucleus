import * as PIXI from 'pixi.js'
import { PixiComponent } from 'src/components/base/PixiComponent'
import { boardApp } from 'src/pixi/PixiApp'
import { Selector, StandardSelectorTag } from '../selector/Selector'
import { PixiSelector } from './Pixi'
import { Dimensions } from './PixiShapes'

export const ComponentLineSelector = (previous: PixiComponent, dimensions: Dimensions, color: number): PixiSelector => {
    let count = 0
    const curve = new PIXI.Graphics()

    const centerStart = getCenter(dimensions)
    const centerEnd = getCenter(previous.card)

    const endX = centerEnd.x - centerStart.x
    const endY = centerEnd.y - centerStart.y

    curve.position.set(centerStart.x, centerStart.y)
    curve.visible = false

    // TODO create scale
    // The bigger the distance the bigger the offset can be
    const curveX1 = (): number => {
        return endX / 2 + 50 + 50 * Math.sin(count)
    }

    const curveY1 = (): number => {
        return endY / 2 + 50 + 50 * Math.sin(count)
    }

    const animate = (delta: number) => {
        count += 0.02 * delta
        curve
            .clear()
            .lineTextureStyle({
                width: 4,
                color
            })
            .quadraticCurveTo(curveX1(), curveY1(), endX, endY)
    }

    const selector = new Selector(StandardSelectorTag.LINE)
    selector.activate = async (): Promise<void> => {
        count = 0
        curve.visible = true
        boardApp.ticker.add(animate)
    }

    selector.idle = async (): Promise<void> => {
        boardApp.ticker.remove(animate)
    }

    selector.deactivate = async (): Promise<void> => {
        boardApp.ticker.remove(animate)
        curve.visible = false
    }

    return { component: curve, selector }
}

const getCenter = (dimensions: Dimensions): PIXI.Point => {
    const { width, x, y } = dimensions
    const newX = x + width / 2
    const newY = y + 50
    return new PIXI.Point(newX, newY)
}
