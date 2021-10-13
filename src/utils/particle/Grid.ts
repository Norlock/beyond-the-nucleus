import {Coordinates} from './Coordinates'
import {FillStyle} from './FillStyle'
import {ParticleAttributes} from './Particle'
import {ParticleContainer} from './ParticleContainer'
import {Voxel} from './Voxel'

export interface GridOptions {
  voxelXCount: number
  voxelYCount: number
  probabilityXCount: number
  probabilityYCount: number
  particlePercentage: number
  container: ParticleContainer
  coordinates: Coordinates
}

export class Grid {
  options: GridOptions
  particleAttributes: ParticleAttributes
  voxelArrays: Voxel[][] = []
  animate = false

  private constructor() {}

  static create(options: GridOptions, particleAttributes: ParticleAttributes) {

    if (options.voxelYCount < 1) {
      throw Error("Grid x length must be minimum 1")
    }

    if (options.voxelYCount < 1) {
      throw Error("Grid y length must be minimum 1")
    }

    const self = new Grid()

    for (let i = 0; i < options.voxelXCount; i++) {
      self.voxelArrays.push([])
    }

    self.options = options
    self.particleAttributes = particleAttributes

    addVoxels(self, 0, 0)

    return self
  }

  start() {
    this.animate = true
    this.render()
  }

  stop() {
    this.animate = false
  }

  private render() {
    if (this.animate) {
      requestAnimationFrame(this.render.bind(this))

      this.voxelArrays.forEach(array => {
        array.forEach(voxel => {
          voxel.render()
        })
      })

      this.options.container.render()
    }
  }
}



const addVoxels = (self: Grid, x: number, y: number) => {
  const {voxelXCount, voxelYCount, particlePercentage, probabilityXCount, probabilityYCount} = self.options
  const {particleAttributes} = self

  const voxel = Voxel.create({
    probabilityXCount,
    probabilityYCount,
    particleAttributes,
    particlePercentage,
    coordinates: new Coordinates(x, y),
    // TODO find good way to add fillstyle (eather by requesting shape or passing it on).
    fillStyle: FillStyle.RANDOM
  })

  const particleSpace = particleAttributes.spacing + particleAttributes.diameter
  const voxelWidth = probabilityXCount * particleSpace
  const voxelHeight = probabilityYCount * particleSpace

  self.voxelArrays[Math.round(x / voxelWidth)].push(voxel)

  // TODO particles fixen
  voxel.probabilities.forEach(row => {
    row.forEach(probability => {
      if (probability.particle) {
        self.options.container.add(probability.particle)
      }
    })
  })

  if (x + voxelWidth < voxelXCount * voxelWidth) {
    addVoxels(self, x + voxelWidth, y)
  } else if (y + voxelHeight < voxelYCount * voxelHeight) {
    addVoxels(self, 0, y + voxelHeight)
  }
}
