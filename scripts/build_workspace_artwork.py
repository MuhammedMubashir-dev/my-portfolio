"""Export the illustrated scene's depth layers and matching outline assets."""
from copy import deepcopy
from pathlib import Path
import xml.etree.ElementTree as ET


ARTWORK = Path(__file__).resolve().parents[1] / "public" / "artwork"
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)
source = ET.parse(ARTWORK / "connected-world.svg").getroot()
layers = [node for node in source if node.get("data-layer")]
assert [node.get("data-layer") for node in layers] == ["architecture", "interfaces", "details"]

outline = deepcopy(source)
outline.set("data-mode", "outline")
ET.ElementTree(outline).write(ARTWORK / "connected-world-outline.svg", encoding="unicode")

for layer in layers:
    name = layer.get("data-layer")
    root = deepcopy(source)
    for node in list(root):
        if node.get("data-layer") and node.get("data-layer") != name:
            root.remove(node)
    for mode in ("colour", "outline"):
        root.set("data-mode", mode)
        suffix = "-outline" if mode == "outline" else ""
        path = ARTWORK / f"world-{name}{suffix}.svg"
        ET.ElementTree(root).write(path, encoding="unicode")
        ET.parse(path)
    print(f"Exported {name} colour and outline layers")
