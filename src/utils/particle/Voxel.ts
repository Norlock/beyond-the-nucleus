import {Coordinates} from "./Coordinates"
import {Particle, ParticleAttributes} from "./Particle"
import {Probability} from './Probability'
import {FillStyle} from './FillStyle'
import {ProbabilityOptions} from './Probability'

export interface VoxelAttributes {
  coordinates: Coordinates
  // No width and height because don't allow partial probabilities
  probabilityXCount: number
  probabilityYCount: number
  particlePercentage: number
  particleAttributes: ParticleAttributes
  fillStyle: FillStyle
}

export class Voxel {
  // Used for physics
  probabilities: Probability[][] = []
  attributes: VoxelAttributes
  transform: () => void
  particles: () => Particle[]

  private constructor() {}

  static create(attributes: VoxelAttributes) {
    const self = new Voxel()
    self.attributes = attributes
    self.transform = () => transform(self)
    self.particles = () => particles(self)

    addProbabilities(self)
    addParticles(self)

    return self
  }
}

const transform = (self: Voxel) => {
  self.probabilities.forEach(array => {
    array.forEach(probability => {
      probability.particle?.graphicalEntity.transform()
    })
  })
}

const particles = (self: Voxel) => {
  const particles: Particle[] = []
  self.probabilities.forEach(array => {
    array.forEach(probability => {
      if (probability.particle) {
        particles.push(probability.particle)
      }
    })
  })

  return particles
}

//const getGlobalCoordinates = (self: Voxel) => {
//const {gridCoordinates, coordinates} = self.attributes

//const x = gridCoordinates.x + coordinates.x
//const y = gridCoordinates.y + coordinates.y
//return new Coordinates(x, y)
//}

const addProbabilities = (self: Voxel) => {
  const {probabilityXCount, probabilityYCount, particleAttributes, coordinates} = self.attributes
  const {spacing, diameter} = particleAttributes

  const particleSpace = spacing + diameter

  for (let i = 0; i < probabilityXCount; i++) {
    let array: Probability[] = []
    self.probabilities.push(array)

    let probabilityX = coordinates.x + i * particleSpace

    for (let j = 0; j < probabilityYCount; j++) {
      let probabilityY = coordinates.y + j * particleSpace
      const options: ProbabilityOptions = {
        voxel: self,
        particleSpace,
        x: probabilityX,
        y: probabilityY
      }

      array.push(Probability.create(options, particleAttributes))
    }
  }
}

const addParticles = (self: Voxel) => {
  const {particlePercentage, probabilityXCount, probabilityYCount} = self.attributes
  const particleAmount = Math.trunc(probabilityXCount * probabilityYCount / 100 * particlePercentage)
  const {fillStyle} = self.attributes

  switch (fillStyle) {
    case FillStyle.TOP_HORIZONTAL_LEFT:
      fillTopHorizontalLeft(self, particleAmount)
      break
    case FillStyle.TOP_HORIZONTAL_RIGHT:
      fillTopHorizontalRight(self, particleAmount)
      break
    case FillStyle.TOP_VERTICAL_LEFT:
      fillTopVerticalLeft(self, particleAmount)
      break
    case FillStyle.TOP_VERTICAL_RIGHT:
      fillTopVerticalRight(self, particleAmount)
      break
    case FillStyle.BOTTOM_HORIZONTAL_LEFT:
      fillBottomHorizontalLeft(self, particleAmount)
      break
    case FillStyle.BOTTOM_HORIZONTAL_RIGHT:
      fillBottomHorizontalRight(self, particleAmount)
      break
    case FillStyle.BOTTOM_VERTICAL_LEFT:
      fillBottomVerticalLeft(self, particleAmount)
      break
    case FillStyle.BOTTOM_VERTICAL_RIGHT:
      fillBottomVerticalRight(self, particleAmount)
      break
    case FillStyle.WHITE_NOISE:
      fillWhiteNoise(self)
      break
    case FillStyle.BLUE_NOISE:
      fillBlueNoise(self, particleAmount)
      break
    default:
      throw new Error("unknown fillstyle")
  }
}

const fillTopHorizontalLeft = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (x + 1 < probabilityXCount) {
        addParticle(x + 1, y)
      } else if (y + 1 < probabilityYCount) {
        addParticle(0, y + 1)
      }
    }
  }

  addParticle(0, 0)
}

const fillTopHorizontalRight = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (0 < x) {
        addParticle(x - 1, y)
      } else if (y + 1 < probabilityYCount) {
        addParticle(probabilityXCount - 1, y + 1)
      }
    }
  }

  addParticle(probabilityXCount - 1, 0)
}

const fillTopVerticalLeft = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (y + 1 < probabilityYCount) {
        addParticle(x, y + 1)
      } else if (x + 1 < probabilityXCount) {
        addParticle(x + 1, 0)
      }
    }
  }

  addParticle(0, 0)
}

const fillTopVerticalRight = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (y + 1 < probabilityYCount) {
        addParticle(x, y + 1)
      } else if (0 < x) {
        addParticle(x - 1, 0)
      }
    }
  }

  addParticle(probabilityXCount - 1, 0)
}

const fillBottomHorizontalLeft = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (x + 1 < probabilityXCount) {
        addParticle(x + 1, y)
      } else if (0 < y) {
        addParticle(0, y - 1)
      }
    }
  }

  addParticle(0, probabilityYCount - 1)
}

const fillBottomHorizontalRight = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (0 < x) {
        addParticle(x - 1, y)
      } else if (0 < y) {
        addParticle(probabilityXCount - 1, y - 1)
      }
    }
  }

  addParticle(probabilityXCount - 1, probabilityYCount - 1)

}

const fillBottomVerticalLeft = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (0 < y) {
        addParticle(x, y - 1)
      } else if (x + 1 < probabilityXCount) {
        addParticle(x + 1, probabilityYCount - 1)
      }
    }
  }

  addParticle(0, probabilityYCount - 1)
}

const fillBottomVerticalRight = (self: Voxel, particleAmount: number) => {
  const {probabilityXCount, probabilityYCount} = self.attributes

  const addParticle = (x: number, y: number) => {
    self.probabilities[x][y].createParticle()

    if (0 < --particleAmount) {
      if (0 < y) {
        addParticle(x, y - 1)
      } else if (0 < x) {
        addParticle(x - 1, probabilityYCount - 1)
      }
    }
  }

  addParticle(probabilityXCount - 1, probabilityYCount - 1)
}

const fillWhiteNoise = (self: Voxel) => {
  const {probabilityXCount, probabilityYCount, particlePercentage} = self.attributes

  for (let x = 0; x < probabilityXCount; x++) {
    for (let y = 0; y < probabilityYCount; y++) {
      let addParticle = Math.round(Math.random() * 100) <= particlePercentage

      if (addParticle) {
        self.probabilities[x][y].createParticle()
      }
    }
  }
}

const fillBlueNoise = (self: Voxel, particleAmount: number) => {
  const probabilitiesArray = self.probabilities.reduce((array, item) => array.concat(item), []);

  const addParticle = () => {
    const index = Math.floor(Math.random() * probabilitiesArray.length)
    const probability = probabilitiesArray[index]
    probability.createParticle()
    probabilitiesArray.remove(probability)

    if (0 < --particleAmount) {
      addParticle()
    }
  }

  addParticle()
}
