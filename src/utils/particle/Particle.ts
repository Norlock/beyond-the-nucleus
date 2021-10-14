import {Coordinates} from "./Coordinates"
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
  coordinates: Coordinates
  vx: number = 0
  vy: number = 0
  graphicalEntity: GraphicalEntity

  private constructor() {}

  static create(attributes: ParticleAttributes, coordinates: Coordinates) {
    const self = new Particle()
    self.attributes = attributes
    self.coordinates = coordinates
    self.graphicalEntity = attributes.factory.create(self)

    return self
  }
}
