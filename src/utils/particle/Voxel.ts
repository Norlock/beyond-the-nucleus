import {Particle, ParticleAttributes} from "./Particle"

export interface VoxelAttributes {
  x: number
  y: number
  z?: number // TODO in future
  width: number
  height: number
  particlePercentage: number
  particleAttributes: ParticleAttributes
}

export class Voxel {
  particles: Particle[] = []
  attributes: VoxelAttributes

  private constructor() {}

  static create(attributes: VoxelAttributes) {
    const self = new Voxel()
    self.attributes = attributes

    addParticles(self)
    return self

  }

  render() {
    this.particles.forEach(particle => {
      particle.renderer.render(particle)
    })
  }
}

const addParticles = (self: Voxel) => {
  const {particlePercentage, x, y, width, height, particleAttributes} = self.attributes
  const {spacing, radius} = particleAttributes

  const particlesX = Math.trunc(width / (spacing + radius))
  const particlesY = Math.trunc(height / (spacing + radius))

  const particleAmount = Math.trunc(particlesX * particlesY / 100 * particlePercentage)

  const addParticle = (xOffset: number, yOffset: number, particlesLeft: number) => {
    const particle = Particle.create(particleAttributes, x + xOffset, y + yOffset)
    self.particles.push(particle)

    if (0 < --particlesLeft) {
      if (x < particlesX) {
        addParticle(xOffset + spacing, yOffset, particlesLeft)
      } else if (y < particlesY) {
        addParticle(xOffset, yOffset + spacing, particlesLeft)
      }
    }
  }

  addParticle(0, 0, particleAmount)
}
