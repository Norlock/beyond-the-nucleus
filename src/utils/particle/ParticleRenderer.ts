import {Particle} from "./Particle";

export interface ParticleRenderer {
  mesh: any
  render(particle: Particle): void
}

export interface ParticleRendererFactory {
  create(particle: Particle): ParticleRenderer
}
