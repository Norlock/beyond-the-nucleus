import {ParticleRenderer, ParticleRendererFactory} from "./ParticleRenderer"

// Shapes 
// * trail
// * fire
// * water
// uncommented attributes will slowely be included
export interface ParticleAttributes {
  diameter: number
  spacing: number
  //heat: number
  color: {
    red: number,
    green: number,
    blue: number
  }
  //diffusionOffset: number
  //rigidness: number
  weight: number // 0 for none negative for rising
  factory: ParticleRendererFactory
}

export class Particle {
  attributes: ParticleAttributes
  x: number
  y: number
  vx: number = 0
  vy: number = 0
  z?: number
  renderer: ParticleRenderer

  private constructor() {}

  static create(attributes: ParticleAttributes, x: number, y: number) {
    const self = new Particle()
    self.attributes = attributes
    self.x = x
    self.y = y
    self.renderer = attributes.factory.create(self)

    return self
  }
}


