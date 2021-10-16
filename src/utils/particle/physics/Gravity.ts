import {Grid} from "../Grid";
import {Particle} from "../Particle";
import {Voxel} from "../Voxel";
import {physics} from "./Physics";

export const updateGravity = (grid: Grid) => {
  const {voxelYCount, voxelXCount} = grid.options
  for (let y = voxelYCount - 1; 0 <= y; y--) {
    for (let x = 0; x < voxelXCount; x++) {
      updateGravityVoxel(grid, x, y);
    }
  }
}

const updateGravityVoxel = (grid: Grid, voxelX: number, voxelY: number) => {
  // Check from bottom up
  const currentVoxel = grid.voxelArrays[voxelX][voxelY]
  const belowVoxel = physics.getVoxelBelow(grid, voxelX, voxelY) // Optional value

  const {probabilityYCount, probabilityXCount} = currentVoxel.attributes

  for (let y = probabilityYCount - 1; 0 <= y; y--) {
    for (let x = 0; x < probabilityXCount; x++) {
      tryMoveParticle(currentVoxel, belowVoxel, x, y);
    }
  }
}

const tryMoveParticle = (currentVoxel: Voxel, belowVoxel: Voxel, probabilityX: number, probabilityY: number) => {
  const {probabilityYCount} = currentVoxel.attributes
  const lastProbabilityY = probabilityYCount - 1

  const currentProbability = currentVoxel.probabilities[probabilityX][probabilityY]

  // pass to other voxel
  if (probabilityY === lastProbabilityY) {
    if (belowVoxel) {
      const belowProbability = belowVoxel.probabilities[probabilityX][0]
      physics.tryMove(currentProbability, belowProbability)
    }
  } else {
    const belowProbability = currentVoxel.probabilities[probabilityX][probabilityY + 1]
    physics.tryMove(currentProbability, belowProbability)
  }
}

const gravity = (particle: Particle) => {
  return 1 || particle.attributes.weight + particle.vy
}
