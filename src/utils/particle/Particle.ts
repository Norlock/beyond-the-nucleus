import {GraphicalEntity, GraphicalEntityFactory} from "./ParticleRenderer"

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
  factory: GraphicalEntityFactory
}

export class Particle {
  attributes: ParticleAttributes
  x: number
  y: number
  vx: number = 0
  vy: number = 0
  z?: number
  graphicalEntity: GraphicalEntity

  private constructor() {}

  static create(attributes: ParticleAttributes, x: number, y: number) {
    const self = new Particle()
    self.attributes = attributes
    self.x = x
    self.y = y
    self.graphicalEntity = attributes.factory.create(self)

    return self
  }
}


