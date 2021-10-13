# Particle System
particle system consists out of three parts 

* grid -> consists of voxels
* voxel -> consists of particles
* particle

## Voxel
Voxel has a container interface that allows to particles to be placed (on a container in pixi.js or on a scene in three)

2d array for vertical and horizontal


## Particle
A particle must receive a factory that can create a render function for it's particle.

TODO determine the particle properties metrics (kg/g/percentage)
|-------|
| x x x |
|       |
| x x x |
|-------|
