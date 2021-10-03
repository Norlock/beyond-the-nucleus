import * as PIXI from "pixi.js"
import {Particle} from "./Particle"
import {ParticleRenderer, ParticleRendererFactory} from "./ParticleRenderer"

export class PixiParticleRenderer implements ParticleRenderer {
  mesh: PIXI.Graphics
  particle: Particle

  private constructor() {}

  static create(particle: Particle): ParticleRenderer {
    const {color, x, y, radius} = particle.attributes

    const self = new PixiParticleRenderer()
    self.mesh = new PIXI.Graphics()
      .beginFill(color)
      .drawCircle(x, y, radius)
      .endFill()

    return self
  }

  render(): void {
    const {color, x, y, radius} = this.particle.attributes
    this.mesh
      .clear()
      .beginFill(color)
      .drawCircle(x, y, radius)
      .endFill()
  }
}

export const PixiParticleRendererFactory = (): ParticleRendererFactory => {
  const create = (particle: Particle) => {
    return PixiParticleRenderer.create(particle)
  }

  return {create}
}
