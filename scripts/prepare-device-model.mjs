import { NodeIO } from "@gltf-transform/core"
import { KHRDracoMeshCompression } from "@gltf-transform/extensions"
import draco from "draco3dgltf"
import { mkdir } from "node:fs/promises"

const io = new NodeIO().registerExtensions([KHRDracoMeshCompression]).registerDependencies({
  "draco3d.decoder": await draco.createDecoderModule(),
  "draco3d.encoder": await draco.createEncoderModule(),
})
const document = await io.read("tmp/device-models/macbook.gltf")
await mkdir("public/models/draco", { recursive: true })
await io.write("public/models/laptop.glb", document)
console.log("Prepared local Draco-compressed laptop model.")
