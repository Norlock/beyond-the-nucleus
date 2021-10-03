import * as PIXI from "pixi.js"
import {Particle} from "./Particle"
import {ParticleRenderer, ParticleRendererFactory} from "./ParticleRenderer"

class PixiParticleRenderer implements ParticleRenderer {
  mesh: PIXI.Graphics
  render: () => void
}

export const PixiParticleRendererFactory = (): ParticleRendererFactory => {
  const create = (particle: Particle): ParticleRenderer => {
    const {color, radius} = particle.attributes

    const self = new PixiParticleRenderer()
    self.mesh = new PIXI.Graphics()
      .beginFill(color)
      .drawCircle(particle.x, particle.y, radius)
      .endFill()

    self.render = (): void => {
      const {color, radius} = particle.attributes
      particle.renderer.mesh
        .clear()
        .beginFill(color)
        .drawCircle(particle.x, particle.y, radius)
        .endFill()
    }

    return self
  }

  return {create}
}
