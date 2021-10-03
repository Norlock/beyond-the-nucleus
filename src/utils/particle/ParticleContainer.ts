import * as PIXI from 'pixi.js'
import * as THREE from 'three'
import {boardApp} from 'src/pixi/PixiApp'
import {Particle} from './Particle'

export interface ParticleContainer {
  add(particle: Particle): void
  remove(particle: Particle): void
  render(): void
}

export class PixiParticleContainer implements ParticleContainer {
  container = new PIXI.Container()

  add(particle: Particle): void {
    this.container.addChild(particle.renderer.mesh)
  }

  remove(particle: Particle): void {
    this.container.removeChild(particle.renderer.mesh)
  }

  render() {
    boardApp.renderer.render(this.container)
  }
}

export class ThreeParticleContainer implements ParticleContainer {
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.Renderer

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  add(particle: Particle): void {
    this.scene.add(particle.renderer.mesh)
  }

  remove(particle: Particle): void {
    this.scene.remove(particle.renderer.mesh)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
