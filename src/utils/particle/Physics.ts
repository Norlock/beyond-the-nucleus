import {Particle} from "./Particle";
import {Voxel} from "./Voxel";

export const updatePhysicsInterVoxel = (voxel: Voxel) => {
  //updateGravity(voxel.particles)
}

const newY = (particle: Particle) => {
  const gravity = particle.attributes.weight + particle.vy
  return particle.y + gravity
}

const updateGravity = (particles: Particle[]) => {

  const collision = (particle: Particle) => {
    const possibleNewY = newY(particle)

    for (let compare of particles) {
      const compareY = newY(compare)
      const sub = possibleNewY - compareY
      //if (newY 
    }


  }

  for (let particle of particles) {

  }
}


// Check velocity x / y
// Recursively check where collision occurs
// calculate new pos in that place
// memorise last position for previous wave 
