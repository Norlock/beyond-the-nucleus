import {Particle} from "./Particle";
import {Probability} from "./Probability";
import {Voxel} from "./Voxel";

export const updatePhysicsInterVoxel = (voxel: Voxel) => {
  updateGravity(voxel)
}

const gravity = (particle: Particle) => {
  return 1 || particle.attributes.weight + particle.vy
}

const newY = (particle: Particle) => {
  return particle.coordinates.y + gravity(particle)
}

const move = (source: Probability, target: Probability) => {
  target.particle = source.particle
  source.particle = undefined
  target.updateCoordinates()
}

// Tries to move particle, remains unchanged otherwise
const tryMove = (source: Probability, target: Probability) => {
  if (source.particle && typeof target.particle === 'undefined') {
    move(source, target)
  }
}

const updateGravity = (voxel: Voxel) => {
  const {probabilityYCount, probabilityXCount} = voxel.attributes
  const {probabilities} = voxel
  // Check from bottom up

  const update = (x: number, y: number) => {
    const probability = probabilities[x][y]
    const below = probabilities[x][y + 1]

    if (typeof probability === "undefined" || typeof below === "undefined")
      debugger

    tryMove(probability, below)

    if (x + 1 < probabilityXCount) {
      update(x + 1, y)
    } else if (0 < y) {
      update(0, y - 1)
    }
  }

  update(0, probabilityYCount - 2)
}

const getYRow = (voxel: Voxel, y: number): Probability[] => {
  const row: Probability[] = []
  voxel.probabilities.forEach(array => {
    row.push(array[y])
  })

  return row
}

const getXRow = (voxel: Voxel, x: number): Probability[] => {
  return voxel.probabilities[x]
}

// Check velocity x / y
// Recursively check where collision occurs
// calculate new pos in that place
// memorise last position for previous wave 
