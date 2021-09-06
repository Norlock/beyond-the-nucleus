import * as THREE from 'three'

export const ThreeCardFactory = (width: number, height: number) => {
    console.log('three card')
    const geometry = new THREE.BoxGeometry(1, 1, 0)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshBasicMaterial({ map: texture })

    const drawBackground = (background: BackgroundType, border?: BorderProperties) => {
        if (background.type === 'gradient') {
            const gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, background.color1)
            gradient.addColorStop(1, background.color2)

            ctx.fillStyle = gradient
        } else {
            ctx.fillStyle = background.color || '#777'
        }

        ctx.fillRect(0, 0, width, height)

        if (border) {
            const borderWidth = border.width
            ctx.fillStyle = border.color
            ctx.fillRect(0, 0, width, borderWidth)
            ctx.fillRect(0, 0, borderWidth, height)
            ctx.fillRect(width - borderWidth, 0, width, height)
            ctx.fillRect(0, height - borderWidth, width, borderWidth)
        }

        return { drawText }
    }

    const drawText = (text: string, properties: FontProperties) => {
        const { font, color, x, y, maxWidth } = properties
        ctx.fillStyle = color
        ctx.font = font
        ctx.fillText(text, x, y, maxWidth)
        return new THREE.Mesh(geometry, material)
    }

    return { drawBackground }
}

export interface FontProperties {
    x: number
    y: number
    maxWidth?: number
    color: string
    font: string
}

export interface BorderProperties {
    color: string
    width: number
}

export enum GradientDirection {
    TOP_DOWN,
    LEFT_RIGHT,
    DIAGONAL
}

type Color = { color: string; type: 'color' }
type Gradient = { color1: string; color2: string; type: 'gradient' }

export type BackgroundType = Color | Gradient
