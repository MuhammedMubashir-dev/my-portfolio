import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { GLTFLoader, DRACOLoader } from "three-stdlib"

const laptopPath = "/models/laptop.glb"
const phonePath = "/models/phone.glb"

class RecoverableDRACOLoader extends DRACOLoader {
  decodeDracoFile(buffer, onLoad, attributeIDs, attributeTypes, _colorSpace, onError) {
    // GLTFLoader supplies an error callback, but stdlib's legacy decoder drops it.
    this.decodeGeometry(buffer, {
      attributeIDs: attributeIDs || this.defaultAttributeIDs,
      attributeTypes: attributeTypes || this.defaultAttributeTypes,
      useUniqueIDs: !!attributeIDs,
    }).then(onLoad).catch(onError)
  }
}

function createModelLoader() {
  const decoder = new RecoverableDRACOLoader().setDecoderPath("/models/draco/")
  const loader = new GLTFLoader().setDRACOLoader(decoder)
  return { loader, decoder }
}

let modelAssets = createModelLoader()

export function useLaptopModel() {
  return useLoader(modelAssets.loader, laptopPath)
}

export function usePhoneModel() {
  return useLoader(modelAssets.loader, phonePath)
}

export function resetDeviceAssets(screenshots) {
  useLoader.clear(modelAssets.loader, laptopPath)
  useLoader.clear(modelAssets.loader, phonePath)
  modelAssets.decoder.dispose()
  // A rejected Draco decoder promise is cached on the loader too.
  modelAssets = createModelLoader()
  screenshots.forEach(source => useLoader.clear(TextureLoader, source))
}
