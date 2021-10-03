import {ParticleAttributes} from './Particle'
import {ParticleContainer} from './ParticleContainer'
import {ParticleRendererFactory} from './ParticleRenderer'
import {Voxel} from './Voxel'

export interface GridOptions {
  x: number
  y: number
  voxelXLength: number
  voxelYLength: number
  voxelWidth: number
  voxelHeight: number
  particlePercentage: number
  container: ParticleContainer
}

export class Grid {
  options: GridOptions
  particleAttributes: ParticleAttributes
  voxels: Voxel[] = []

  private constructor() {}

  static create(options: GridOptions, particleAttributes: ParticleAttributes) {

    if (options.voxelXLength < 1) {
      throw Error("Grid x length must be minimum 1")
    }

    if (options.voxelYLength < 1) {
      throw Error("Grid y length must be minimum 1")
    }

    const self = new Grid()
    self.options = options
    self.particleAttributes = particleAttributes

    addVoxels(self, 0, 0)
    return self
  }

  render() {
    // TODO render voxels -> voxels render particles
  }
}



const addVoxels = (self: Grid, x: number, y: number) => {
  const {voxelXLength, voxelYLength, particlePercentage, voxelWidth, voxelHeight} = self.options

  const voxel = Voxel.create({
    width: voxelWidth,
    height: voxelHeight,
    particleAttributes: self.particleAttributes,
    particlePercentage,
    x,
    y
  })

  self.voxels.push(voxel)

  voxel.particles.forEach(particle => {
    self.options.container.add(particle)
  })

  if (x + 1 < voxelXLength) {
    addVoxels(self, x + 1, y)
  } else if (y + 1 < voxelYLength) {
    addVoxels(self, 0, y + 1)
  }
}
