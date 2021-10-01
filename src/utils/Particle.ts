import * as PIXI from 'pixi.js'
import {boardApp} from 'src/pixi/PixiApp'

export class Particle extends PIXI.Graphics {
  color: number
  radius: number
  spacing: number

  container: PIXI.Container
  alive: boolean

  constructor(container: PIXI.Container, attributes: ParticleAttributes) {
    super()
    const {radius, color, spacing} = attributes

    this.container = container
    this.radius = radius
    this.color = color
    this.spacing = spacing
  }

  render() {
    if (this.alive) {
      requestAnimationFrame(this.render)

      this.clear()
        .beginFill(this.color)
        .drawCircle(this.x, this.y, this.radius)
        .endFill()

      boardApp.renderer.render(this.container)
    } else {
      this.container.removeChild(this)
    }
  }

  startRender() {
    this.container.addChild(this)
    this.alive = true
    this.render()
  }

  stopRender() {
    this.alive = false
  }
}

export class ParticleVoxel {
  x: number
  y: number
  container: PIXI.Container
  particles: Particle[]

  constructor(voxelX: number, voxelY: number, particlesPerVoxel: number, particleAttributes: ParticleAttributes) {
    this.x = voxelX
    this.y = voxelY

    this.container = new PIXI.Container()
    for (let i = 0; i < particlesPerVoxel; i++) {
      let particle = new Particle(this.container, 

    }
  }
}


// Shapes 
// * trail
// * fire
// * water

const drawParticleVoxel = (options: GridOptions, particleAttributes: ParticleAttributes) => {
  const container = new PIXI.Container()

  for (let i = 0; i < options.particlesPerVoxel; i++) {
    let particle = new Particle(container, particleAttributes)
  }
}


export interface GridOptions {
  root: PIXI.Container
  gridX: number
  gridY: number
  voxelCount: number
  particlesPerVoxel: number
}

// uncommented attributes will slowely be included
export interface ParticleAttributes {
  radius: number
  spacing: number
  //heat: number
  color: number
  //diffusionOffset: number
  //rigidness: number
}

export const drawParticleGrid = (options: GridOptions, particleAttributes: ParticleAttributes) => {
  for (let i = 0; i < options.voxelCount; i++) {

  }
}

export const drawParticles = (container: PIXI.Container, particleCount: number, particleRadius: number) => {
  for (let i = 0; i < particleCount; i++) {
    const particle = new Particle(container, particleRadius)

    particle.alive = true
    while (true) {
      particle.x = Math.sin(particle.x)
      particle.y = Math.sin(particle.x)
    }
  }

}
