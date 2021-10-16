import {Grid} from "./Grid";
import {Particle} from "./Particle";
import {Probability} from "./Probability";
import {Voxel} from "./Voxel";

export const updatePhysics = (grid: Grid) => {
  updateGravityGrid(grid)
}

const updateGravityGrid = (grid: Grid) => {
  const {voxelYCount, voxelXCount} = grid.options
  for (let y = voxelYCount - 1; 0 <= y; y--) {
    for (let x = voxelXCount - 1; 0 <= x; x--) {
      updateGravityVoxel(grid, x, y);
    }
  }
}

const gravity = (particle: Particle) => {
  return 1 || particle.attributes.weight + particle.vy
}

// Tries to move particle, remains unchanged otherwise
const tryMove = (source: Probability, target: Probability) => {
  if (source.particle && typeof target.particle === 'undefined') {
    move(source, target)
  }
}

const move = (source: Probability, target: Probability) => {
  target.particle = source.particle
  source.particle = undefined
  target.updateCoordinates()
}


const getVoxelBelow = (grid: Grid, x: number, y: number) => {
  if (y < grid.options.voxelYCount - 1) {
    return grid.voxelArrays[x][y + 1]
  }
}

const updateGravityVoxel = (grid: Grid, voxelX: number, voxelY: number) => {
  // Check from bottom up
  const currentVoxel = grid.voxelArrays[voxelX][voxelY]
  const belowVoxel = getVoxelBelow(grid, voxelX, voxelY) // Optional value

  const {probabilityYCount, probabilityXCount} = currentVoxel.attributes

  const update = (probabilityX: number, probabilityY: number) => {

    tryMoveParticle(currentVoxel, belowVoxel, probabilityX, probabilityY)

    if (probabilityX + 1 < probabilityXCount) {
      update(probabilityX + 1, probabilityY)
    } else if (0 < probabilityY) {
      update(0, probabilityY - 1)
    }
  }

  update(0, probabilityYCount - 1)
}

const tryMoveParticle = (currentVoxel: Voxel, belowVoxel: Voxel, probabilityX: number, probabilityY: number) => {
  const {probabilityYCount} = currentVoxel.attributes
  const lastProbabilityY = probabilityYCount - 1

  const currentProbability = currentVoxel.probabilities[probabilityX][probabilityY]

  // pass to other voxel
  if (probabilityY === lastProbabilityY) {
    if (belowVoxel) {
      const belowProbability = belowVoxel.probabilities[probabilityX][0]
      tryMove(currentProbability, belowProbability)
    }
  } else {
    const belowProbability = currentVoxel.probabilities[probabilityX][probabilityY + 1]
    tryMove(currentProbability, belowProbability)
  }
}

const getYVoxels = (grid: Grid, y: number) => {
  const {voxelYCount} = grid.options

  const voxels: Voxel[] = []

  grid.voxelArrays.forEach(array => {
    voxels.push(array[voxelYCount])
  })

  return voxels
}

const getXVoxels = (grid: Grid, x: number) => {
  return grid.voxelArrays[x]
}

// Check velocity x / y
// Recursively check where collision occurs
// calculate new pos in that place
// memorise last position for previous wave 
