# Particle System
particle system consists out of three parts 

* grid -> consists of voxels
* voxel -> consists of particles
* particle

- [ ] Maybe move to seperate project to create better tools for testing and adjusting properties.

## Voxel
Voxel has a container interface that allows to particles to be placed (on a container in pixi.js or on a scene in three)

2d array for vertical and horizontal

- [ ] Check every physics run if voxel is full. 
- [ ] If full and particle wants to enter you can immediately check neighbour voxel to place.

## Probability
This is a place where a particle can be, maybe in the future you can place more particles in a probability but it will
create tension. If there is space outside it will try to move away again.

multiple particles can be placed as a pattern.

|---|     |---|     |---|
|   |     |x  |     |x  |
| x | --> |   | --> |  x|
|   |     |  x|     |x  |
|---|     |---|     |---|

## Particle
TODO determine the particle properties metrics (kg/g/percentage)
|-------|
| x x x |
|       |
| x x x |
|-------|

- [ ] Incorperate vx - vy properties
- [ ] Calculate side pressure (e.g. wind)
