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
  const {spacing, diameter} = particleAttributes

  // TODO maybe radius * 2 
  const particleSpace = spacing + diameter

  const xMax = Math.trunc(width / (spacing + diameter))
  const yMax = Math.trunc(height / (spacing + diameter))

  const particleAmount = Math.trunc(xMax * yMax / 100 * particlePercentage)

  const addParticle = (particleX: number, particleY: number, particlesLeft: number) => {
    const particle = Particle.create(particleAttributes, particleX, particleY)
    self.particles.push(particle)

    if (0 < --particlesLeft) {
      if (particleX + particleSpace < x + width) {
        addParticle(particleX + particleSpace, particleY, particlesLeft)
      } else if (particleY + particleSpace < y + height) {
        console.log('test', particleY, particlesLeft)
        addParticle(x, particleY + particleSpace, particlesLeft)
      }
    }
  }

  addParticle(x, y, particleAmount)
}
