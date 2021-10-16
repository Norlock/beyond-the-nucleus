import {Coordinates} from './Coordinates'
import {FillStyle} from './FillStyle'
import {ParticleAttributes} from './Particle'
import {ParticleContainer} from './ParticleContainer'
import {physics} from './physics/Physics'
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
  start: () => void
  stop: () => void

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
    self.start = () => start(self)
    self.stop = () => stop(self)

    addVoxels(self, 0, 0)

    return self
  }
}


const start = (self: Grid) => {
  self.animate = true

  const render = () => {
    if (self.animate) {
      requestAnimationFrame(render)

      physics.update(self)

      self.voxelArrays.forEach(array => {
        array.forEach(voxel => {
          voxel.transform()
        })
      })

      self.options.container.render()
    }
  }

  render()
}

const stop = (self: Grid) => {
  self.animate = false
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
    fillStyle: FillStyle.BOTTOM_HORIZONTAL_LEFT
  })

  const particleSpace = particleAttributes.spacing + particleAttributes.diameter
  const voxelWidth = probabilityXCount * particleSpace
  const voxelHeight = probabilityYCount * particleSpace

  self.voxelArrays[Math.round(x / voxelWidth)].push(voxel)

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
