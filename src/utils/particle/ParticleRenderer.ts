import {Particle} from "./Particle";

export interface ParticleRenderer {
  mesh: any
  render(): void
}

export interface ParticleRendererFactory {
  create(particle: Particle): ParticleRenderer
}
