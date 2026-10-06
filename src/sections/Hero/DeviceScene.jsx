import { Suspense, useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, Lightformer, useCursor, useTexture } from "@react-three/drei"
import { Box3, MeshPhysicalMaterial, SRGBColorSpace, Vector3 } from "three"
import { fitDeviceCamera, laptopScreenGeometry, modelScreenGeometry, screenMaterial } from "./deviceGeometry"
import { useLaptopModel, usePhoneModel } from "./deviceAssets"
import { openProject } from "../../lib/projectNavigation"

function useScreenshot(source) {
  const deferredSource = useDeferredValue(source)
  const loaded = useTexture(deferredSource)
  const maxAnisotropy = useThree(state => state.gl.capabilities.getMaxAnisotropy())
  const texture = useMemo(() => {
    const copy = loaded.clone()
    copy.colorSpace = SRGBColorSpace
    copy.anisotropy = Math.min(16, maxAnisotropy)
    copy.needsUpdate = true
    return copy
  }, [loaded, maxAnisotropy])
  const invalidate = useThree(state => state.invalidate)
  useLayoutEffect(() => {
    invalidate()
  }, [texture, invalidate])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

const smoothProgress = value => {
  const progress = Math.max(0, Math.min(1, value))
  return progress * progress * (3 - 2 * progress)
}

// This model's lid extends behind its hinge at zero; its closed pose is near PI.
const closedLidAngle = Math.PI - 0.02

function Laptop({ source, intro }) {
  const laptop = useRef(null)
  const { scene } = useLaptopModel()
  const texture = useScreenshot(source)
  const model = useMemo(() => {
    const copy = scene.clone(true)
    copy.traverse(mesh => {
      if (!mesh.isMesh) return
      mesh.castShadow = true
      mesh.receiveShadow = true
      const original = mesh.material
      if (original.name === "DisplayGlass") {
        mesh.geometry = laptopScreenGeometry(mesh.geometry)
        mesh.material = screenMaterial(texture, 5.01135 / 3.10659)
        mesh.userData.ownsScreenGeometry = true
      } else if (["Frame.001", "HingeMetal", "TouchbarBorder"].includes(original.name)) {
        // This model has degenerate UVs on the chassis, so tangent anisotropy is unsuitable.
        mesh.material = new MeshPhysicalMaterial({ name: "Silver aluminium", color: "#d3d6dc", metalness: 0.85, roughness: 0.32 })
      } else {
        mesh.material = original.clone()
        if (original.name === "ScreenGlass" || original.name === "Touchbar") mesh.material.roughness = 0.2
      }
    })
    const lid = copy.getObjectByName("Top")
    const camera = copy.getObjectByName("FrontCameraRing001")
    if (lid && camera) lid.attach(camera)
    if (lid) lid.userData.openAngle = lid.rotation.x
    return copy
  }, [scene, texture])
  useFrame(() => {
    const lid = laptop.current?.getObjectByName("Top")
    if (lid) lid.rotation.x = closedLidAngle + (lid.userData.openAngle - closedLidAngle) * smoothProgress((intro.current.progress - 0.06) / 0.8)
  })

  useEffect(() => () => {
    model.traverse(mesh => {
      if (!mesh.isMesh) return
      if (mesh.userData.ownsScreenGeometry) mesh.geometry.dispose()
      mesh.material.dispose()
    })
  }, [model])

  return <group position={[-0.75, -0.635, -0.3]} rotation={[0, -0.14, 0]} scale={1.45}
    onClick={event => { event.stopPropagation(); openProject("#project-5") }}>
    <primitive ref={laptop} object={model} dispose={null} />
  </group>
}

function Phone({ source, intro }) {
  const phone = useRef(null)
  const { scene } = usePhoneModel()
  const texture = useScreenshot(source)
  const model = useMemo(() => {
    const copy = scene.clone(true)
    copy.updateMatrixWorld(true)
    copy.traverse(mesh => {
      if (!mesh.isMesh) return
      mesh.castShadow = true
      mesh.receiveShadow = true
      const original = mesh.material
      if (original.name === "Material.001") {
        const display = modelScreenGeometry(mesh)
        mesh.geometry = display.geometry
        mesh.material = screenMaterial(texture, display.aspect)
        mesh.userData.ownsScreenGeometry = true
      } else if (original.name === "metalframe") {
        mesh.material = new MeshPhysicalMaterial({ name: "Titanium frame", color: "#a6abb2", metalness: 1, roughness: 0.28 })
      } else if (original.name === "backpanel") {
        mesh.material = new MeshPhysicalMaterial({ name: "Frosted back glass", color: "#b6b9bd", metalness: 0, roughness: 0.48, clearcoat: 0.2, clearcoatRoughness: 0.35 })
      } else {
        mesh.material = original.clone()
        if (original.name === "glass") {
          mesh.material.roughness = 0.12
          mesh.material.clearcoatRoughness = 0.08
        }
        if (original.name === "black") {
          mesh.material.color.set("#08090c")
          mesh.material.roughness = 0.3
        }
        if (original.name === "lens") mesh.material.roughness = 0.12
      }
    })
    // Position the source camera island over the replacement display rather than behind it.
    copy.updateMatrixWorld(true)
    const display = copy.getObjectByName("Object_9")
    const island = copy.getObjectByName("Object_43")
    if (display && island) {
      const displayBounds = new Box3().setFromObject(display)
      const islandBounds = new Box3().setFromObject(island)
      const position = island.getWorldPosition(new Vector3())
      position.z += displayBounds.max.z - islandBounds.max.z + 0.001
      island.position.copy(island.parent.worldToLocal(position))
    }
    // Preserve the model's real proportions and center it on the existing phone position.
    const bounds = new Box3().setFromObject(copy)
    const center = bounds.getCenter(new Vector3())
    const scale = 2.82 / (bounds.max.y - bounds.min.y)
    copy.scale.setScalar(scale)
    copy.position.copy(center.multiplyScalar(-scale))
    return copy
  }, [scene, texture])
  useEffect(() => () => {
    model.traverse(mesh => {
      if (!mesh.isMesh) return
      if (mesh.userData.ownsScreenGeometry) mesh.geometry.dispose()
      mesh.material.dispose()
    })
  }, [model])
  useFrame(() => {
    const progress = smoothProgress((intro.current.progress - 0.28) / 0.72)
    phone.current.position.y = 1.65 + (1 - progress) * 0.14
    phone.current.rotation.y = -0.13 + (1 - progress) * 0.2
  })

  return <group ref={phone} name="Ganvin phone" position={[1.75, 1.65, 1.7]} rotation={[-0.04, -0.13, -0.02]} scale={1.15}
    onClick={event => { event.stopPropagation(); openProject("#project-6") }}>
    <primitive object={model} dispose={null} />
  </group>
}

function Devices({ laptopImage, phoneImage, springX, springY, reducedMotion, replay, onReady }) {
  const group = useRef()
  const intro = useRef({ progress: 1, startedAt: null })
  const rendered = useRef(false)
  const readyFrame = useRef(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const { camera, size, invalidate } = useThree()
  useLayoutEffect(() => {
    fitDeviceCamera(camera, group.current, size.width, size.height)
    invalidate()
  }, [camera, size.width, size.height, invalidate])
  useEffect(() => {
    const unsubscribeX = springX.on("change", invalidate)
    const unsubscribeY = springY.on("change", invalidate)
    return () => { unsubscribeX(); unsubscribeY() }
  }, [springX, springY, invalidate])
  useEffect(() => {
    invalidate()
    return () => {
      cancelAnimationFrame(readyFrame.current)
      rendered.current = false
    }
  }, [invalidate])
  useEffect(() => {
    intro.current = { progress: reducedMotion ? 1 : 0, startedAt: null }
    invalidate()
  }, [replay, reducedMotion, invalidate])
  useFrame(({ clock }) => {
    if (!rendered.current) {
      rendered.current = true
      // Reveal only after the first frame has drawn the loaded models and textures.
      readyFrame.current = requestAnimationFrame(onReady)
    }
    if (intro.current.progress < 1) {
      intro.current.startedAt ??= clock.elapsedTime
      intro.current.progress = Math.min((clock.elapsedTime - intro.current.startedAt) / 1.7, 1)
      invalidate()
    }
    group.current.rotation.y = reducedMotion ? 0 : springX.get() * 0.1
    group.current.rotation.x = reducedMotion ? 0 : springY.get() * 0.025
  })

  return <group ref={group} name="Portfolio devices"
    onPointerOver={event => { event.stopPropagation(); setHovered(true) }}
    onPointerOut={() => setHovered(false)}>
    <Laptop source={laptopImage} intro={intro} />
    <Phone source={phoneImage} intro={intro} />
  </group>
}

function StudioLights({ generation }) {
  return <>
    <ambientLight intensity={0.35} />
    <directionalLight position={[-3, 6, 5]} intensity={1.1} color="#fff9f1" />
    <directionalLight position={[4, 3, 4]} intensity={0.6} color="#edf3ff" />
    <Environment key={generation} resolution={512} frames={1}>
      <color attach="background" args={["#76808e"]} />
      <Lightformer form="rect" intensity={1.8} color="#fffaf3" position={[-4, 5, 3]} rotation={[0, Math.PI / 4, 0]} scale={[5, 6, 1]} />
      <Lightformer form="rect" intensity={1.2} color="#edf3ff" position={[4, 3, 2]} rotation={[0, -Math.PI / 4, 0]} scale={[2, 5, 1]} />
      <Lightformer form="rect" intensity={1.4} color="white" position={[0, 5, -3]} rotation={[Math.PI / 4, 0, 0]} scale={[7, 3, 1]} />
    </Environment>
  </>
}

function RecoverableStudio({ children }) {
  const { gl, invalidate } = useThree()
  const [generation, setGeneration] = useState(0)
  useEffect(() => {
    const canvas = gl.domElement
    const onLost = event => event.preventDefault()
    const onRestored = () => setGeneration(value => value + 1)
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
    }
  }, [gl])
  useLayoutEffect(() => {
    // Demand rendering must resume even when the pointer is idle.
    invalidate()
  }, [generation, invalidate])

  return <>
    <StudioLights generation={generation} />
    {children}
    <ContactShadows key={generation} position={[0, -0.03, 0]} opacity={0.6} scale={10} blur={1.8} far={4} resolution={512} />
  </>
}

export default function DeviceScene({ laptopImage, phoneImage, springX, springY, reducedMotion, replay, onReady }) {
  const [loading, setLoading] = useState(true)
  const ready = useCallback(() => { setLoading(false); onReady?.() }, [onReady])

  return <>
    <Canvas className="device-canvas" camera={{ position: [0, 3, 9], fov: 35, near: 0.1, far: 50 }}
      dpr={[1.5, 2]} frameloop="demand" fallback={null}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ opacity: loading ? 0 : 1 }} aria-hidden="true">
      <Suspense fallback={null}>
        <RecoverableStudio>
          <Devices laptopImage={laptopImage} phoneImage={phoneImage} springX={springX} springY={springY} reducedMotion={reducedMotion} replay={replay} onReady={ready} />
        </RecoverableStudio>
      </Suspense>
    </Canvas>
  </>
}
