import {ParticleRenderer, ParticleRendererFactory} from "./ParticleRenderer"

// Shapes 
// * trail
// * fire
// * water
// uncommented attributes will slowely be included
export interface ParticleAttributes {
  radius: number
  spacing: number
  //heat: number
  color: number
  //diffusionOffset: number
  //rigidness: number
  factory: ParticleRendererFactory
}

export class Particle {
  attributes: ParticleAttributes
  x: number
  y: number
  alive: boolean
  renderer: ParticleRenderer
  render: () => void
  stop: () => void

  private constructor() {}

  static create(attributes: ParticleAttributes, x: number, y: number) {
    const self = new Particle()
    self.attributes = attributes
    self.x = x
    self.y = y
    self.renderer = attributes.factory.create(self)

    setRenderFunction(self)
    setStopFunction(self)

    return self
  }
}

const setRenderFunction = (self: Particle) => {
  self.render = () => {
    if (self.alive) {
      requestAnimationFrame(self.render)
      self.renderer.render()
    }
  }
}

const setStopFunction = (self: Particle) => {
  self.stop = () => {self.alive = false}
}
