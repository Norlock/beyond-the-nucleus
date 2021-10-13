import {Coordinates} from "./Coordinates"
import {ParticleAttributes} from "./Particle"
import {Probability} from './Probability'
import {addProbabilities} from "./Probability"

export interface VoxelAttributes {
  coordinates: Coordinates
  gridCoordinates: Coordinates,
  // No width and height because don't allow partial probabilities
  probabilityXCount: number
  probabilityYCount: number
  particlePercentage: number
  particleAttributes: ParticleAttributes
}

export class Voxel {
  // Used for physics
  probabilities: Probability[][] = []
  attributes: VoxelAttributes
  getGlobalCoordinates: () => Coordinates

  private constructor() {}

  static create(attributes: VoxelAttributes) {
    const self = new Voxel()
    self.attributes = attributes
    self.getGlobalCoordinates = () => getGlobalCoordinates(self)

    addProbabilities(self)
    return self

  }

  render() {
    this.probabilities.forEach(array => {
      array.forEach(probability => {
        if (probability.particle) {
          probability.particle.renderer.render()
        }
      })
    })
  }
}

const getGlobalCoordinates = (self: Voxel) => {
  const {gridCoordinates, coordinates} = self.attributes

  const x = gridCoordinates.x + coordinates.x
  const y = gridCoordinates.y + coordinates.y
  return new Coordinates(x, y)
}
