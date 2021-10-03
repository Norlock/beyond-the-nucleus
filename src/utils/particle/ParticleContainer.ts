import * as PIXI from 'pixi.js'
import {Particle} from './Particle'

export interface ParticleContainer {
  add(particle: Particle): void
  remove(particle: Particle): void
}

export class PixiParticleContainer implements ParticleContainer {
  container = new PIXI.Container()

  add(particle: Particle): void {
    this.container.addChild(particle.renderer.mesh)
  }

  remove(particle: Particle): void {
    this.container.removeChild(particle.renderer.mesh)
  }
}
