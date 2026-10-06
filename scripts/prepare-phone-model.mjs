import {NodeIO} from '@gltf-transform/core'
import {KHRDracoMeshCompression,KHRMaterialsClearcoat} from '@gltf-transform/extensions'
import draco from 'draco3dgltf'
const io=new NodeIO().registerExtensions([KHRDracoMeshCompression,KHRMaterialsClearcoat]).registerDependencies({'draco3d.decoder':await draco.createDecoderModule(),'draco3d.encoder':await draco.createEncoderModule()})
const document=await io.read('tmp/device-models/iphone-15-pro-max-source.glb')
document.createExtension(KHRDracoMeshCompression).setRequired(true).setEncoderOptions({method:KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,quantizationBits:{POSITION:14,NORMAL:12,TEXCOORD:12}})
await io.write('public/models/phone.glb',document)
console.log('Phone model compressed and saved locally')
