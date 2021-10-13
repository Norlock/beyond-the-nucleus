import {Particle, ParticleAttributes} from './Particle'
import {Voxel} from './Voxel'
import {FillStyle} from './FillStyle'

// An array doesn't give any information about position of an element
// Thats why each particle must be contained inside a probability
export interface ProbabilityOptions {
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
  createParticle: () => void

  private constructor() {}

  static create(options: ProbabilityOptions, particleAttributes: ParticleAttributes) {
    const self = new Probability()

    self.options = options
    self.getAbove = () => getAbove(self)
    self.getBelow = () => getBelow(self)
    self.getLeft = () => getLeft(self)
    self.getRight = () => getRight(self)
    self.createParticle = () => createParticle(self, particleAttributes)

    return self
  }
}

const createParticle = (self: Probability, particleAttributes: ParticleAttributes) => {
  const {x, y, particleSpace} = self.options
  const offset = particleSpace / 2
  const particleX = Math.round(x + offset)
  const particleY = Math.round(y + offset)
  self.particle = Particle.create(particleAttributes, particleX, particleY)
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
