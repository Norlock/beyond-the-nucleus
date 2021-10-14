import * as PIXI from "pixi.js"
import {Particle} from "./Particle"
import {GraphicalEntity, GraphicalEntityFactory} from "./ParticleRenderer"

class PixiGraphicalEntity implements GraphicalEntity {
  mesh: PIXI.Mesh<PIXI.Shader>
  transform: () => void

  private constructor() {}

  static create(particle: Particle): PixiGraphicalEntity {
    const self = new PixiGraphicalEntity()
    self.mesh = createMesh(particle)

    self.transform = (): void => {
      self.mesh.x = particle.coordinates.x
      self.mesh.y = particle.coordinates.y
    }

    return self
  }
}

const createMesh = (particle: Particle) => {
  const {coordinates, attributes} = particle
  const {red, green, blue} = attributes.color
  const geometry = new PIXI.Geometry()
    .addAttribute('aVertexPosition', [-100, -50, 100, -50, 0, 100]);

  const redFraction = red / 255
  const greenFraction = green / 255
  const blueFraction = blue / 255

  const shader = PIXI.Shader.from(`
    precision mediump float;
    attribute vec2 aVertexPosition;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    void main() {
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }`,

    `precision mediump float;

    void main() {
        gl_FragColor = vec4(` + redFraction + ',' + greenFraction + ',' + blueFraction + `, 1.0);
    }
`);

  const triangle = new PIXI.Mesh(geometry, shader);
  triangle.x = coordinates.x
  triangle.y = coordinates.y
  triangle.width = attributes.diameter
  triangle.height = attributes.diameter
  return triangle
}


export const PixiParticleRendererFactory = (): GraphicalEntityFactory => {
  const create = (particle: Particle): GraphicalEntity => {
    return PixiGraphicalEntity.create(particle)
  }

  return {create}
}
