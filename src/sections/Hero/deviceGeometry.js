import { Box3, BufferAttribute, ExtrudeGeometry, ShaderMaterial, Shape, ShapeGeometry, Vector3 } from "three"

export function roundedShape(width, height, radius) {
  const x = -width / 2, y = -height / 2
  const shape = new Shape()
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  return shape
}

export function phoneShellGeometry(width, height, radius, depth, bevel = 0.006) {
  const geometry = new ExtrudeGeometry(roundedShape(width, height, radius), {
    depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 16,
  })
  geometry.translate(0, 0, -depth / 2)
  return geometry
}

export function phoneScreenGeometry() {
  const geometry = new ShapeGeometry(roundedShape(1.19, 2.6444, 0.115), 24)
  const positions = geometry.attributes.position
  const uv = new Float32Array(positions.count * 2)
  for (let index = 0; index < positions.count; index++) {
    uv[index * 2] = positions.getX(index) / 1.19 + 0.5
    uv[index * 2 + 1] = positions.getY(index) / 2.6444 + 0.5
  }
  geometry.setAttribute("uv", new BufferAttribute(uv, 2))
  return geometry
}

export function laptopScreenGeometry(source) {
  const geometry = source.clone()
  geometry.computeBoundingBox()
  const bounds = geometry.boundingBox
  const positions = geometry.attributes.position
  const uv = new Float32Array(positions.count * 2)
  for (let index = 0; index < positions.count; index++) {
    uv[index * 2] = (positions.getX(index) - bounds.min.x) / (bounds.max.x - bounds.min.x)
    uv[index * 2 + 1] = (bounds.max.z - positions.getZ(index)) / (bounds.max.z - bounds.min.z)
  }
  geometry.setAttribute("uv", new BufferAttribute(uv, 2))
  return geometry
}

export function modelScreenGeometry(mesh) {
  const positions = mesh.geometry.attributes.position
  const bounds = new Box3().setFromBufferAttribute(positions).applyMatrix4(mesh.matrixWorld)
  // The downloaded display is a narrow rim with an empty center. Fill its
  // existing curved outline so the app covers the glass without hiding the bezel.
  const points = Array.from({ length: positions.count }, (_, index) => ({ x: -positions.getZ(index), y: positions.getY(index) }))
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .filter((point, index, sorted) => index === 0 || point.x !== sorted[index - 1].x || point.y !== sorted[index - 1].y)
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
  const lower = [], upper = []
  for (const point of points) {
    while (lower.length > 1 && cross(lower.at(-2), lower.at(-1), point) <= 0) lower.pop()
    lower.push(point)
  }
  for (const point of [...points].reverse()) {
    while (upper.length > 1 && cross(upper.at(-2), upper.at(-1), point) <= 0) upper.pop()
    upper.push(point)
  }
  const outline = [...lower.slice(0, -1), ...upper.slice(0, -1)]
  const shape = new Shape()
  shape.moveTo(outline[0].x, outline[0].y)
  outline.slice(1).forEach(point => shape.lineTo(point.x, point.y))
  shape.closePath()
  const geometry = new ShapeGeometry(shape)
  geometry.rotateY(Math.PI / 2)
  geometry.translate(positions.getX(0) + 0.002, 0, 0)
  const displayPositions = geometry.attributes.position
  const uv = new Float32Array(displayPositions.count * 2)
  const point = new Vector3()
  for (let index = 0; index < displayPositions.count; index++) {
    point.fromBufferAttribute(displayPositions, index).applyMatrix4(mesh.matrixWorld)
    uv[index * 2] = (point.x - bounds.min.x) / (bounds.max.x - bounds.min.x)
    uv[index * 2 + 1] = (point.y - bounds.min.y) / (bounds.max.y - bounds.min.y)
  }
  geometry.setAttribute("uv", new BufferAttribute(uv, 2))
  return { geometry, aspect: (bounds.max.x - bounds.min.x) / (bounds.max.y - bounds.min.y) }
}

export function screenMaterial(texture, aspect) {
  const imageAspect = texture.image.width / texture.image.height
  return new ShaderMaterial({
    name: "Project display",
    uniforms: { screenTexture: { value: texture }, imageAspect: { value: imageAspect }, screenAspect: { value: aspect } },
    vertexShader: "varying vec2 screenUv; void main() { screenUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: [
      "uniform sampler2D screenTexture; uniform float imageAspect; uniform float screenAspect; varying vec2 screenUv;",
      "void main() {",
      "vec2 fittedUv = screenUv;",
      "if (imageAspect > screenAspect) fittedUv.y = (screenUv.y - 0.5) * imageAspect / screenAspect + 0.5;",
      "else fittedUv.x = (screenUv.x - 0.5) * screenAspect / imageAspect + 0.5;",
      "if (fittedUv.x < 0.0 || fittedUv.x > 1.0 || fittedUv.y < 0.0 || fittedUv.y > 1.0) gl_FragColor = vec4(0.005, 0.006, 0.007, 1.0);",
      "else gl_FragColor = texture2D(screenTexture, fittedUv);",
      "#include <colorspace_fragment>",
      "}",
    ].join("\n"),
    toneMapped: false,
  })
}

export function fitDeviceCamera(camera, group, width, height) {
  group.updateMatrixWorld(true)
  const bounds = new Box3().setFromObject(group)
  const center = bounds.getCenter(new Vector3())
  camera.position.set(center.x, center.y + 2.6, center.z + 9)
  camera.lookAt(center)
  camera.updateMatrixWorld(true)
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  // Frame each device part, avoiding the empty corners of one combined 3D box.
  group.traverse(mesh => {
    if (!mesh.isMesh) return
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
    const partBounds = mesh.geometry.boundingBox
    for (const x of [partBounds.min.x, partBounds.max.x]) {
      for (const y of [partBounds.min.y, partBounds.max.y]) {
        for (const z of [partBounds.min.z, partBounds.max.z]) {
          const corner = new Vector3(x, y, z).applyMatrix4(mesh.matrixWorld).applyMatrix4(camera.matrixWorldInverse)
          minX = Math.min(minX, corner.x); maxX = Math.max(maxX, corner.x)
          minY = Math.min(minY, corner.y); maxY = Math.max(maxY, corner.y)
        }
      }
    }
  })
  const framingOffset = new Vector3((minX + maxX) / 2, (minY + maxY) / 2, 0).applyQuaternion(camera.quaternion)
  camera.position.add(framingOffset)
  camera.updateMatrixWorld(true)
  if (camera.isPerspectiveCamera) {
    camera.aspect = width / height
    camera.zoom = 1
    camera.updateProjectionMatrix()
    let extent = 0
    group.traverse(mesh => {
      if (!mesh.isMesh) return
      const partBounds = mesh.geometry.boundingBox
      for (const x of [partBounds.min.x, partBounds.max.x]) {
        for (const y of [partBounds.min.y, partBounds.max.y]) {
          for (const z of [partBounds.min.z, partBounds.max.z]) {
            const point = new Vector3(x, y, z).applyMatrix4(mesh.matrixWorld).project(camera)
            extent = Math.max(extent, Math.abs(point.x), Math.abs(point.y))
          }
        }
      }
    })
    camera.zoom = 0.92 / extent
    camera.updateProjectionMatrix()
    return
  }
  camera.left = -width / 2; camera.right = width / 2
  camera.top = height / 2; camera.bottom = -height / 2
  camera.near = 0.1; camera.far = 50
  camera.zoom = Math.min(width / (maxX - minX + 0.4), height / (maxY - minY + 0.4))
  camera.updateProjectionMatrix()
}
