import * as PIXI from "pixi.js"
import {Particle} from "./Particle"
import {ParticleRenderer, ParticleRendererFactory} from "./ParticleRenderer"

class PixiParticleRenderer implements ParticleRenderer {
  mesh: PIXI.Mesh<PIXI.Shader>
  render: () => void
}

const createMesh = (particle: Particle) => {
  const {x, y, attributes} = particle
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
  triangle.x = x
  triangle.y = y
  triangle.width = attributes.diameter
  triangle.height = attributes.diameter
  return triangle
}


export const PixiParticleRendererFactory = (): ParticleRendererFactory => {
  const create = (particle: Particle): ParticleRenderer => {
    const self = new PixiParticleRenderer()
    const mesh = createMesh(particle)
    self.mesh = mesh

    self.render = (): void => {
      mesh.x = particle.x
      mesh.y = particle.y
    }

    return self
  }

  return {create}
}
