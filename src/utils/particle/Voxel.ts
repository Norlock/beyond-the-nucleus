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

const colors = [
  0xff0000,
  0x00ff00,
  0x0000ff,
  0xffff00,
  0x00ffff,
  0xffffff
]

const addParticles = (self: Voxel) => {
  const {particlePercentage, x, y, width, height, particleAttributes} = self.attributes
  const {spacing, diameter} = particleAttributes

  // TODO weghalen dev var
  //particleAttributes.color = colors[Math.round(Math.random() * (colors.length - 1))]

  const particleSpace = spacing + diameter
  const offset = spacing / 2
  const startX = Math.ceil(x + offset)
  const startY = Math.ceil(y + offset)
  const endX = x + width - (offset - diameter)
  const endY = y + height - (offset - diameter)

  const getXCount = (partX: number, count: number): number => {
    if (partX + particleSpace < endX) {
      return getXCount(partX + particleSpace, ++count)
    } else {
      return count
    }
  }

  const getYCount = (partY: number, count: number): number => {
    if (partY + particleSpace < endY) {
      return getYCount(partY + particleSpace, ++count)
    } else {
      return count
    }
  }

  const particleAmount = Math.trunc(getXCount(startX, 1) * getYCount(startY, 1) / 100 * particlePercentage)

  const addParticle = (particleX: number, particleY: number, particlesLeft: number) => {
    const particle = Particle.create(particleAttributes, particleX, particleY)
    self.particles.push(particle)

    if (0 < --particlesLeft) {
      if (particleX + particleSpace < endX) {
        addParticle(particleX + particleSpace, particleY, particlesLeft)
      } else if (particleY + particleSpace < endY) {
        addParticle(startX, particleY + particleSpace, particlesLeft)
      }
    }
  }

  addParticle(startX, startY, particleAmount)
}
