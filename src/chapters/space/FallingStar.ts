import { BloomFilter } from 'pixi-filters'
import * as PIXI from 'pixi.js'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'

export const createFallingStars = (container: PIXI.Container) => {
    container.sortableChildren = true

    const xVelocity = Math.random() * 8 + 8
    const yVelocity = Math.random() * 8 + 8

    const createTrail = (trail: PIXI.Graphics, previous: PIXI.Point, length: number) => {
        const next = new PIXI.Point((previous.x += xVelocity), (previous.y += yVelocity))

        trail.lineTo(next.x, next.y)

        if (0 < --length) {
            setTimeout(() => {
                createTrail(trail, next, length)
            }, 15)
        } else {
            const fadeTrail = () => {
                if (trail.alpha > 0) {
                    trail.alpha -= 0.05
                    setTimeout(fadeTrail, 15)
                } else {
                    container.removeChild(trail)
                }
            }

            fadeTrail()
        }
    }

    const selector = new Selector('Falling stars')
    let isSelected = false
    selector.activate = async () => {
        isSelected = true

        const trail = new PIXI.Graphics()
        trail.position.set(500 + Math.random() * 6000, 500 + Math.random() * 2000)
        //trail.tint = 0xccccdf
        trail.zIndex = -1
        trail.lineStyle(1, 0xccccef)

        const bloom = new BloomFilter(5, 5)
        trail.filters = [bloom]
        container.addChild(trail)

        const beginPoint = new PIXI.Point(0, 0)

        setTimeout(() => {
            createTrail(trail, beginPoint, 30)

            if (isSelected) {
                selector.activate()
            }
        }, 2000)
    }

    const stop = async () => {
        isSelected = false
    }

    selector.idle = stop
    selector.deactivate = stop

    return selector
}
