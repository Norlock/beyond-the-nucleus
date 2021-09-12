import * as PIXI from 'pixi.js'
import { Emitter, BehaviorEntry } from '@pixi/particle-emitter'
import { boardApp } from 'src/pixi/PixiApp'

export const fallingStar = (root: PIXI.Container) => {
    console.clear()
    PIXI.settings.RESOLUTION = window.devicePixelRatio || 1
    const sharpness = 0.1
    const minDelta = 0.05
    const info = document.querySelector('#info')
    const texture = createTexture(0, 8, boardApp.renderer.resolution)
    const pointer = new PIXI.Point(boardApp.screen.width / 2, boardApp.screen.height / 2)
    const emitterPos = pointer.clone()
    const container = new PIXI.ParticleContainer(5000, {
        scale: true,
        position: true,
        rotation: false,
        uvs: false,
        tint: true
    })

    //alpha: {
    //start: 0.8,
    //end: 0.15
    //},
    //scale: {
    //start: 1,
    //end: 0.2,
    //minimumScaleMultiplier: 1
    //},
    const alpha: BehaviorEntry = {
        type: 'alpha',
        config: {
            start: 0.8,
            end: 0.15
        }
    }

    const scale: BehaviorEntry = {
        type: 'scale',
        config: {
            start: 1,
            end: 0.2,
            minimumScaleMultiplier: 1
        }
    }

    const emitter = new Emitter(container, {
        behaviors: [alpha, scale],

        autoUpdate: true,
        lifetime: {
            min: 0.6,
            max: 0.6
        },
        frequency: 0.0008,
        emitterLifetime: -1,
        maxParticles: 5000,
        pos: {
            x: 0,
            y: 0
        },
        addAtBack: false
    })
    let resized = false
    emitter.updateOwnerPos(emitterPos.x, emitterPos.y)
    root.addChild(container)
    boardApp.ticker.add(onTick)
    boardApp.stage.on('pointermove', (event) => pointer.copyFrom(event.data.global))
    window.addEventListener('resize', () => (resized = true))
    function onTick(delta: number) {
        if (resized) {
            boardApp.renderer.resize(window.innerWidth, window.innerHeight)
            resized = false
        }
        if (!emitterPos.equals(pointer)) {
            const dt = 1 - Math.pow(1 - sharpness, delta)
            const dx = pointer.x - emitterPos.x
            const dy = pointer.y - emitterPos.y
            if (Math.abs(dx) > minDelta) {
                emitterPos.x += dx * dt
            } else {
                emitterPos.x = pointer.x
            }
            if (Math.abs(dy) > minDelta) {
                emitterPos.y += dy * dt
            } else {
                emitterPos.y = pointer.y
            }
            emitter.updateOwnerPos(emitterPos.x, emitterPos.y)
        }
        info.innerHTML = `Particles: ${emitter.particleCount}`
    }

    function createTexture(r1: number, r2: number, resolution: number) {
        const c = (r2 + 1) * resolution
        r1 *= resolution
        r2 *= resolution
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = canvas.height = c * 2
        const gradient = context.createRadialGradient(c, c, r1, c, c, r2)
        gradient.addColorStop(0, 'rgba(255,255,255,1)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
        return PIXI.Texture.from(canvas)
    }
}
