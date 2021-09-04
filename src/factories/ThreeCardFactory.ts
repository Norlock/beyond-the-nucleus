import * as THREE from 'three'

export const ThreeCardFactory = (width: number, height: number) => {
    console.log('three card')
    const geometry = new THREE.BoxGeometry()

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshBasicMaterial({ map: texture })

    const drawBackground = (color: string, border?: BorderProperties) => {
        ctx.fillStyle = color
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
        const { font, color, x, y } = properties
        ctx.fillStyle = color
        ctx.font = font // '80px sans-serif'
        ctx.fillText(text, x, y)
        return new THREE.Mesh(geometry, material)
    }

    return { drawBackground }
}

export interface FontProperties {
    x: number
    y: number
    color: string
    font: string
}

export interface BorderProperties {
    color: string
    width: number
}
