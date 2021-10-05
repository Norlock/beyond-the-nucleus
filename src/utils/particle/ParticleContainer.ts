import * as PIXI from 'pixi.js'
import * as THREE from 'three'
import {Particle} from './Particle'
import {Coordinates} from './Coordinates'

export interface ParticleContainer {
  add(particle: Particle): void
  remove(particle: Particle): void
  render(): void
  coordinates: Coordinates
}

export class PixiParticleContainer implements ParticleContainer {
  readonly container: PIXI.Container
  readonly coordinates: Coordinates

  constructor(container: PIXI.Container, coordinates: Coordinates) {
    this.container = container
    this.coordinates = coordinates

    this.container.x = coordinates.x
    this.container.y = coordinates.y
    this.container.zIndex = coordinates.z

  }

  add(particle: Particle): void {
    this.container.addChild(particle.renderer.mesh)
  }

  remove(particle: Particle): void {
    this.container.removeChild(particle.renderer.mesh)
  }

  render() {
    this.container.updateTransform()
  }
}

export class ThreeParticleContainer implements ParticleContainer {
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.Renderer
  coordinates: Coordinates

  constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
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
