import * as THREE from 'three'
import * as PIXI from 'pixi.js'
import gsap from 'gsap'

export const initThreeJS = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 50)

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    camera.position.z = 15
    camera.position.x = 0
    camera.position.y = 0

    scene.add(camera)

    return { texture: PIXI.Texture.from(renderer.domElement), scene, camera, renderer }
}

const mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    track: false
}

export const rotateSphere = (group: THREE.Group) => {
    gsap.to(group.rotation, {
        x: mouse.y / 10,
        y: mouse.x / 10
        //duration: 2
    })
}

const mouseDown = (event: MouseEvent) => {
    mouse.startX = event.clientX / innerWidth
    mouse.startY = event.clientY / innerWidth
    mouse.track = true
}

const mouseUp = (_event: MouseEvent) => {
    mouse.track = false
}

const mouseMove = (event: MouseEvent) => {
    if (mouse.track) {
        const newX = event.clientX / innerWidth
        const newY = event.clientY / innerWidth
        mouse.x += newX - mouse.startX
        mouse.y += newY - mouse.startY
    }
}

export const addMouseHandler = () => {
    addEventListener('mousedown', mouseDown)
    addEventListener('mouseup', mouseUp)
    addEventListener('mousemove', mouseMove)
}

export const removeMouseHandler = () => {
    removeEventListener('mousedown', mouseDown)
    removeEventListener('mouseup', mouseUp)
    removeEventListener('mousemove', mouseMove)
}
