import * as PIXI from 'pixi.js'
import * as THREE from 'three'
import {Particle} from './Particle'
import {Coordinates} from './Coordinates'
import {boardApp} from 'src/pixi/PixiApp'
import {Renderer} from 'pixi.js'

export interface ParticleContainer {
  add(particle: Particle): void
  remove(particle: Particle): void
  render(): void
}

export class PixiParticleContainer extends PIXI.Container implements ParticleContainer {

  constructor(coordinates: Coordinates) {
    super()
    this.x = coordinates.x
    this.y = coordinates.y
    this.zIndex = coordinates.z
  }

  add(particle: Particle): void {
    this.addChild(particle.renderer.mesh)
  }

  remove(particle: Particle): void {
    this.removeChild(particle.renderer.mesh)
  }

  render() {
    super.render(boardApp.renderer as Renderer)
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
