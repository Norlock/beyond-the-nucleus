import {Grid} from "../Grid";
import {Probability} from "../Probability";
import {Voxel} from "../Voxel";
import {updateGravity} from "./Gravity";

const update = (grid: Grid) => {
  updateGravity(grid)
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

/*
* Grid help functions
*/
const getVoxelBelow = (grid: Grid, x: number, y: number) => {
  if (y < grid.options.voxelYCount - 1) {
    return grid.voxelArrays[x][y + 1]
  }
}


const getYVoxels = (grid: Grid, y: number) => {
  const voxels: Voxel[] = []

  grid.voxelArrays.forEach(array => {
    voxels.push(array[y])
  })

  return voxels
}

const getXVoxels = (grid: Grid, x: number) => {
  return grid.voxelArrays[x]
}

export const physics = {
  update,
  tryMove,
  getVoxelBelow,
  getXVoxels,
  getYVoxels
}
