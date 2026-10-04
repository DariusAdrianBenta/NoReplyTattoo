/* ==========================================================================
   MÁQUINA DE TATUAR 3D (Three.js, generada por código — sin modelos externos)
   --------------------------------------------------------------------------
   Réplica de la máquina "NO REPLY": rotativa tipo pen en metal negro con
   grabados en bronce. De la punta hacia atrás:
     aguja · cartucho transparente escalonado · anillo de bronce ·
     grip ensanchado con ranuras y llamas · banda moleteada con medallón ·
     anillo con ojo y botón dorado · cuerpo con logo, ojo y ventilación ·
     tapa trasera estriada.
   Los grabados se dibujan en ./engravings.js.

   createTattooMachineScene(canvas) (async) devuelve:
     setProgress(0..1)  → giro según el scroll
     setFocus(i)        → encuadre del capítulo activo (0..3)
     setVisible(bool)   → pausa el render fuera de pantalla
     dispose()
   ========================================================================== */

import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { drawEyeRing, drawGrip, drawGrooves, drawKnurl, drawMainBody, drawMedallion } from './engravings.js'

const ACCENT = 0xb8432f

/** Perfil de torno: [[radio, altura], ...] → malla de revolución */
function lathe(points, material, segments = 72) {
  const geo = new THREE.LatheGeometry(
    points.map(([r, y]) => new THREE.Vector2(r, y)),
    segments,
  )
  return new THREE.Mesh(geo, material)
}

/** Tramo cilíndrico con textura (u = contorno, v = longitud) */
function tube(r0, r1, y0, y1, material) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, y1 - y0, 96, 1, true), material)
  mesh.position.y = (y0 + y1) / 2
  return mesh
}

/** Anillo de bronce con bisel */
function ring(r, y0, y1, material) {
  const b = (y1 - y0) * 0.25
  return lathe([[r - 0.02, y0], [r, y0 + b], [r, y1 - b], [r - 0.02, y1]], material)
}

function textureFrom(canvas, anisotropy, { repeat, color = true } = {}) {
  const t = new THREE.CanvasTexture(canvas)
  if (color) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = anisotropy
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(...repeat)
  }
  return t
}

function engraved(drawing, anisotropy, { repeat, bumpScale = 2.5, ...rest } = {}) {
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textureFrom(drawing.color, anisotropy, { repeat }),
    bumpMap: drawing.bump ? textureFrom(drawing.bump, anisotropy, { repeat, color: false }) : null,
    bumpScale,
    metalness: 0.78,
    roughness: 0.36,
    ...rest,
  })
}

function buildMachine(anisotropy) {
  const machine = new THREE.Group()

  const black = new THREE.MeshStandardMaterial({ color: 0x151413, metalness: 0.85, roughness: 0.32 })
  const bronze = new THREE.MeshStandardMaterial({ color: 0xc9a074, metalness: 1, roughness: 0.28 })
  const gold = new THREE.MeshStandardMaterial({ color: 0xd8b07a, metalness: 1, roughness: 0.2 })
  const steel = new THREE.MeshStandardMaterial({ color: 0xc8c8cc, metalness: 1, roughness: 0.16 })
  const clear = new THREE.MeshPhysicalMaterial({
    color: 0xe6eef2,
    metalness: 0,
    roughness: 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  })

  // --- Aguja y cartucho transparente escalonado
  const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.002, 1.25, 16), steel)
  needle.position.y = -2.62
  machine.add(needle)
  machine.add(lathe([[0.0, -2.35], [0.03, -2.3], [0.03, -1.9], [0.06, -1.86], [0.06, -1.55], [0.0, -1.55]], steel, 32))
  machine.add(
    lathe(
      [
        [0.0, -2.42], [0.035, -2.4], [0.075, -2.24], [0.1, -2.22], [0.1, -2.16],
        [0.14, -2.04], [0.17, -2.02], [0.17, -1.96], [0.2, -1.86], [0.23, -1.84],
        [0.23, -1.76], [0.26, -1.68], [0.27, -1.56], [0.0, -1.56],
      ],
      clear,
    ),
  )
  machine.add(ring(0.29, -1.58, -1.5, bronze))

  // --- Grip ensanchado con ranuras y llamas
  machine.add(lathe([[0.27, -1.5], [0.3, -1.47], [0.3, -1.44]], black))
  machine.add(tube(0.3, 0.42, -1.44, -0.2, engraved(drawGrip(), anisotropy)))
  machine.add(lathe([[0.42, -0.2], [0.43, -0.17], [0.42, -0.14]], black))
  machine.add(ring(0.435, -0.14, -0.08, bronze))

  // --- Banda moleteada + medallón con estrella
  machine.add(tube(0.4, 0.4, -0.08, 0.34, engraved(drawKnurl(), anisotropy, { repeat: [28, 2], bumpScale: 4, roughness: 0.5 })))
  const medalFace = new THREE.MeshStandardMaterial({ map: textureFrom(drawMedallion().color, anisotropy), metalness: 0.8, roughness: 0.3 })
  const medal = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 48), [black, medalFace, black])
  medal.rotation.x = Math.PI / 2
  medal.position.set(0, 0.13, 0.4)
  machine.add(medal)
  machine.add(ring(0.435, 0.34, 0.4, bronze))

  // --- Anillo con ojo grabado y botón dorado
  machine.add(tube(0.43, 0.43, 0.4, 0.74, engraved(drawEyeRing(), anisotropy)))
  const buttonAt = new THREE.Vector3(0.62, 0.57, 0.62)
  const button = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 16, 40), gold)
  button.position.set(0.31, 0.57, 0.31)
  button.lookAt(buttonAt)
  machine.add(button)
  const buttonCore = new THREE.Mesh(new THREE.CircleGeometry(0.045, 32), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4 }))
  buttonCore.position.set(0.305, 0.57, 0.305)
  buttonCore.lookAt(buttonAt)
  machine.add(buttonCore)
  machine.add(ring(0.45, 0.74, 0.8, bronze))

  // --- Cuerpo principal con logo, ojo y ventilación
  machine.add(tube(0.45, 0.46, 0.8, 2.45, engraved(drawMainBody(), anisotropy)))
  machine.add(ring(0.465, 2.45, 2.52, bronze))

  // --- Tapa trasera estriada
  machine.add(lathe([[0.46, 2.52], [0.4, 2.56], [0.36, 2.58]], black))
  machine.add(tube(0.36, 0.36, 2.58, 3.02, engraved(drawGrooves(), anisotropy, { bumpScale: 3 })))
  machine.add(ring(0.37, 2.66, 2.7, bronze))
  machine.add(lathe([[0.36, 3.02], [0.34, 3.08], [0.28, 3.12], [0.0, 3.13]], black))

  // Puntos de enfoque para la cámara (capítulos)
  const marks = {
    whole: new THREE.Object3D(),
    body: new THREE.Object3D(),
    tip: new THREE.Object3D(),
  }
  marks.whole.position.y = 0.2
  marks.body.position.y = 1.4
  marks.tip.position.y = -2.1
  Object.values(marks).forEach((m) => machine.add(m))

  return { machine, marks }
}

// Encuadre de cada capítulo: punto de enfoque y distancia de cámara
const FOCUS = [
  { mark: 'whole', dist: 11.5 },
  { mark: 'body', dist: 8.5 },
  { mark: 'tip', dist: 6 },
  { mark: 'whole', dist: 12.5 },
]

export async function createTattooMachineScene(canvas) {
  // El logo usa la tipografía de la web: esperamos a que esté cargada (máx. 1,5 s)
  if (document.fonts?.load) {
    await Promise.race([document.fonts.load('400 120px Anton'), new Promise((r) => setTimeout(r, 1500))]).catch(() => {})
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  pmrem.dispose()

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.set(0, 0, 7)

  // Luz principal cálida, relleno suave y contraluz
  const key = new THREE.DirectionalLight(0xfff1e0, 2.2)
  key.position.set(3, 4, 5)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffe2c0, 0.6)
  fill.position.set(-3, -2, 4)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(ACCENT, 2.2)
  rim.position.set(-4, 1, -3)
  scene.add(rim)

  const { machine, marks } = buildMachine(renderer.capabilities.getMaxAnisotropy())
  // Pivot: giro con el scroll (eje vertical) + inclinación diagonal de la máquina
  const pivot = new THREE.Group()
  const tilt = new THREE.Group()
  tilt.rotation.z = -0.62
  tilt.add(machine)
  pivot.add(tilt)
  scene.add(pivot)

  let progress = 0
  let shown = 0
  let focusIndex = 0
  let visible = true
  let raf = 0
  let width = 0
  let height = 0
  const look = new THREE.Vector3()
  const target = new THREE.Vector3()
  let dist = FOCUS[0].dist
  const clock = new THREE.Clock()

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h || (w === width && h === height)) return
    width = w
    height = h
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function frame() {
    raf = 0
    if (!visible) return
    resize()
    const dt = Math.min(clock.getDelta(), 0.1)
    const t = clock.elapsedTime
    // Suavizado por tiempo (no por fotograma): cada cambio de capítulo tarda
    // lo mismo en cualquier pantalla (~1 s), por mucho que se deslice.
    const k = 1 - Math.exp(-dt * 4)
    shown += (progress - shown) * k
    pivot.rotation.y = -0.6 + shown * Math.PI * 2.2
    pivot.rotation.x = Math.sin(shown * Math.PI) * 0.25
    pivot.position.y = Math.sin(t * 1.1) * 0.05

    // Cámara hacia el punto del capítulo activo
    const f = FOCUS[focusIndex] ?? FOCUS[0]
    marks[f.mark].getWorldPosition(target)
    look.lerp(target, k * 0.8)
    // En pantallas estrechas, alejamos un poco la cámara
    const narrow = camera.aspect < 0.9 ? 1.35 : 1
    dist += (f.dist * narrow - dist) * k * 0.8
    camera.position.set(look.x + 0.3, look.y + 0.3, look.z + dist)
    camera.lookAt(look)

    renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }

  const start = () => {
    if (!raf && visible) raf = requestAnimationFrame(frame)
  }
  start()

  return {
    setProgress(p) {
      progress = Math.max(0, Math.min(1, p))
    },
    setFocus(i) {
      focusIndex = i
    },
    setVisible(v) {
      visible = v
      if (v) {
        clock.getDelta()
        start()
      }
    },
    dispose() {
      visible = false
      cancelAnimationFrame(raf)
      scene.traverse((o) => {
        o.geometry?.dispose()
        if (o.material)
          [].concat(o.material).forEach((m) => {
            m.map?.dispose()
            m.bumpMap?.dispose()
            m.dispose()
          })
      })
      scene.environment?.dispose()
      renderer.dispose()
    },
  }
}
