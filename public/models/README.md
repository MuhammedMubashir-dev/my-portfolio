# Device assets

- `laptop.glb`: Draco-compressed version of the CC0 MacBook model distributed by [PMNDRS Market](https://github.com/pmndrs/market). The source was obtained from the [Three.js Journey course resource](https://threejs-journey.com/resources/models/macbook_model.gltf), linked in its [R3F portfolio lesson](https://threejs-journey.com/lessons/fun-and-simple-portfolio-with-r3f).
- `draco/`: decoder files from the installed Three.js package. Its [MIT license](https://github.com/mrdoob/three.js/blob/dev/LICENSE) applies to Three.js; the Draco decoder is distributed under the [Apache 2.0 license](https://github.com/google/draco/blob/main/LICENSE).
- `phone.glb`: [iPhone 15 Pro Max](https://sketchfab.com/3d-models/iphone-15-pro-max-5b7b35513a154ac69619dc2b2fe15686) by [MajdyModels / MpPower](https://sketchfab.com/MG990), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Obtained from the unchanged model asset in [Pane TS](https://github.com/nickolasdeluca/pane_ts/blob/5deb5481435903c774a5fd25c100137bd5ecc8f0/public/models/iphone-15-pro-max.glb); only this separately licensed model was reused, not the GPL application code. Draco compression was added, and the runtime replaces the display and adjusts materials. Attribution is available via the portfolio footer's 3D asset credits link.

The laptop screen receives UV coordinates in application code. The original screenshots are mapped to the displays without stretching. All model and decoder assets are served locally; the scene does not require an external model or environment service.

`previews/devices-*.webp` are transparent renders of the same locally rendered scene for first-load and WebGL fallback presentation. Their two numbers correspond to the laptop and phone screenshot selectors. Keep these renders in sync when changing the device models, materials, camera, or screenshots. Previews render at 3× resolution with high-quality WebP encoding; the initial preview is preloaded, while the models download in parallel with the 3D renderer. The screenshot links expose the original image for reading fine UI details.

To regenerate the compressed laptop, download the linked source to `tmp/device-models/macbook.gltf` and run `node scripts/prepare-device-model.mjs`.

To regenerate the phone, download the linked source to `tmp/device-models/iphone-15-pro-max-source.glb` and run `node scripts/prepare-phone-model.mjs`.
