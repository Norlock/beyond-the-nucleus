import * as PIXI from "pixi.js"
import {Particle} from "./Particle"
import {ParticleRenderer, ParticleRendererFactory} from "./ParticleRenderer"

class PixiParticleRenderer implements ParticleRenderer {
  mesh: PIXI.Sprite
  render: () => void
}

export const PixiParticleRendererFactory = (): ParticleRendererFactory => {
  const create = (particle: Particle): ParticleRenderer => {
    const {color, diameter: radius} = particle.attributes

    const self = new PixiParticleRenderer()
    const mesh = PIXI.Sprite.from('src/assets/space/star.png') //new PIXI.Graphics() 
    mesh.width = radius
    mesh.height = radius
    self.mesh = mesh
    //.beginFill(color)
    //.drawCircle(particle.x, particle.y, radius)
    //.endFill()

    self.render = (): void => {
      mesh.x = particle.x
      mesh.y = particle.y
      //.clear()
      //.beginFill(color)
      //.drawCircle(particle.x, particle.y, radius)
      //.endFill()
    }

    return self
  }

  return {create}
}
