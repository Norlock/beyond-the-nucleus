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
  renderer: ParticleRenderer

  private constructor() {}

  static create(attributes: ParticleAttributes, x: number, y: number) {
    const self = new Particle()
    self.attributes = attributes
    self.x = x
    self.y = y
    self.renderer = attributes.factory.create(self)

    //setHideFunction(self) fix hide function

    return self
  }
}


