# Connected applications illustration

`connected-world.svg` is the editable, standalone source. It contains three depth
layers: architecture, interfaces, and details. Colour and outline versions use
the same geometry.

After changing the source, run `python scripts/build_workspace_artwork.py` from
the repository root. This exports `connected-world-outline.svg` and the six
`world-*.svg` files consumed by `MobileWorkspace.jsx`.

The React component controls pointer parallax, the outline reveal, motion pause,
visibility, and reduced-motion preferences. The exported assets are static SVGs
with no embedded scripts, external fonts, or remote image dependencies.
