import {Particle, ParticleAttributes} from './Particle'
import {Voxel} from './Voxel'

// An array doesn't give any information about position of an element
// Thats why each particle must be contained inside a probability

interface ProbabilityOptions {
  hasParticle: boolean
  x: number
  y: number
  particleSpace: number
  voxel: Voxel
}

export class Probability {
  options: ProbabilityOptions
  particle?: Particle

  getAbove: () => Probability
  getBelow: () => Probability
  getLeft: () => Probability
  getRight: () => Probability

  private constructor() {}

  static create(options: ProbabilityOptions, particleAttributes: ParticleAttributes) {
    const self = new Probability()
    const {x, y, particleSpace, hasParticle} = options
    self.options = options

    if (hasParticle) {
      const offset = particleSpace / 2
      const particleX = Math.round(x + offset)
      const particleY = Math.round(y + offset)
      self.particle = Particle.create(particleAttributes, particleX, particleY)
    }

    self.getAbove = () => getAbove(self)
    self.getBelow = () => getBelow(self)
    self.getLeft = () => getLeft(self)
    self.getRight = () => getRight(self)
    return self
  }
}

const getAbove = (self: Probability) => {
  if (0 < self.options.y) {
    return self.options.voxel.probabilities[self.options.x][self.options.y - 1]
  }
}

const getBelow = (self: Probability) => {
  if (self.options.y + 1 < self.options.voxel.attributes.probabilityYCount) {
    return self.options.voxel.probabilities[self.options.x][self.options.y + 1]
  }
}

const getLeft = (self: Probability) => {
  if (0 < self.options.x) {
    return self.options.voxel.probabilities[self.options.x - 1][self.options.y]
  }
}

const getRight = (self: Probability) => {
  if (self.options.x + 1 < self.options.voxel.attributes.probabilityXCount) {
    return self.options.voxel.probabilities[self.options.x + 1][self.options.y]
  }
}

export const addProbabilities = (voxel: Voxel) => {
  const {particlePercentage, probabilityXCount, probabilityYCount, particleAttributes, coordinates} = voxel.attributes
  const {spacing, diameter} = particleAttributes

  const particleSpace = spacing + diameter
  let particleAmount = Math.trunc(probabilityXCount * probabilityYCount / 100 * particlePercentage)

  for (let i = 0; i < probabilityXCount; i++) {
    let array: Probability[] = []
    voxel.probabilities.push(array)

    let probabilityX = coordinates.x + i * particleSpace

    for (let j = 0; j < probabilityYCount; j++) {
      let probabilityY = coordinates.y + j * particleSpace
      const options: ProbabilityOptions = {
        voxel,
        particleSpace,
        hasParticle: 0 < particleAmount--,
        x: probabilityX,
        y: probabilityY
      }

      array.push(Probability.create(options, particleAttributes))
    }
  }
}
