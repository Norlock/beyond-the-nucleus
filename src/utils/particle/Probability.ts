import {Particle, ParticleAttributes} from './Particle'
import {Voxel} from './Voxel'
import {Coordinates} from './Coordinates'

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
  getParticleX: () => number
  getParticleY: () => number
  createParticle: () => void
  // Updates the coordinates of the particle
  // Only needed if particle is moved from another probability
  updateCoordinates: () => void

  private constructor() {}

  static create(options: ProbabilityOptions, particleAttributes: ParticleAttributes) {
    const self = new Probability()

    self.options = options
    self.getAbove = () => getAbove(self)
    self.getBelow = () => getBelow(self)
    self.getLeft = () => getLeft(self)
    self.getRight = () => getRight(self)
    self.getParticleX = () => getParticleX(self)
    self.getParticleY = () => getParticleY(self)
    self.createParticle = () => createParticle(self, particleAttributes)
    self.updateCoordinates = () => updateCoordinates(self)

    return self
  }

  get voxelProbabilities() {
    return this.options.voxel.probabilities
  }

  get voxelAttributes() {
    return this.options.voxel.attributes
  }
}

const getIndex = (self: Probability, point: number) => {
  return point / self.options.particleSpace
}

const getParticleX = (self: Probability): number => {
  const {x, particleSpace} = self.options
  return Math.round(x + particleSpace / 2)
}

const getParticleY = (self: Probability): number => {
  const {y, particleSpace} = self.options
  return Math.round(y + particleSpace / 2)
}

const updateCoordinates = (self: Probability) => {
  if (self.particle) {
    self.particle.coordinates = new Coordinates(self.getParticleX(), self.getParticleY())
  }
}

const createParticle = (self: Probability, particleAttributes: ParticleAttributes) => {
  const coordinates = new Coordinates(self.getParticleX(), self.getParticleY())
  self.particle = Particle.create(particleAttributes, coordinates)
}

const getAbove = (self: Probability) => {
  if (0 < self.options.y) {
    const {particleSpace} = self.options
    const x = getIndex(self, self.options.x)
    const y = getIndex(self, self.options.y - particleSpace)
    return self.voxelProbabilities[x][y]
  }
}

const getBelow = (self: Probability) => {
  const {particleSpace} = self.options
  const y = getIndex(self, self.options.y + particleSpace)

  if (y < self.voxelAttributes.probabilityYCount) {
    const x = getIndex(self, self.options.x)
    return self.voxelProbabilities[x][y]
  }
}

const getLeft = (self: Probability) => {
  if (0 < self.options.x) {
    const {particleSpace} = self.options
    const x = getIndex(self, self.options.x - particleSpace)
    const y = getIndex(self, self.options.y)
    return self.voxelProbabilities[x][y]
  }
}

const getRight = (self: Probability) => {
  const {particleSpace} = self.options
  const x = getIndex(self, self.options.x + particleSpace)
  if (x < self.voxelAttributes.probabilityXCount) {
    const y = getIndex(self, self.options.y)
    return self.voxelProbabilities[x][y]
  }
}
