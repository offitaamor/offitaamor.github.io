from __future__ import annotations
import io, time, urllib.request
from pathlib import Path
from PIL import Image, ImageOps

OUT = Path("gyeonggi-tracks/assets")
SOURCES = {
    "baekhak": "1JXeP4z8NAqH274wQJg2bCJyspVrMoWWJ",
    "haenghyeon": "10_mPZRA6yihgFzOCiEdwqsEgwoZsVQ2A",
    "duji": "1yY5e_gRanYoo0lrXROFzjBVDTCcI2zjU",
    "hangju": "1zZD-RVlyYfC8uGLL8yTbnNq7ukgHQwBH",
    "galmae": "1y0cn09jUtu2YfmgVszpV7x1NodJFsqRj",
    "sinmang": "1l3i4eJLNRT9QQHCgNyJqD3ETBweDQk9V",
    "gwanin": "1kt1MA7YtRzkdrkqmr6axOZB1PfYhU-8r",
    "horogoru": "1xUKN8bDbtT0A9vMcYWvFEsjJ3E4cmfDo",
    "byeokje": "18nzdCwgJkV30dtcJE1TK-PWrBNA0959Z",
    "manufacturing": "1mIxKe9L5bv_AC68plGhA_2LTkHIza8Hd",
    "jangheung": "1jGkfaXi5p-Kan1vXYNkrdNywev_lFfG3",
    "wonilsan": "1uq8Ee1Ujh1vG3z8dQtYGPNunoBREiuA1",
}
MAP_ID = "1ko1_mdAMlf8VGmIVkQSsT0hNF-Agyyc7"
UA = "Mozilla/5.0 (compatible; OFFITA-Gyeonggi-Assets/1.0)"

def fetch_image(file_id: str) -> Image.Image:
    urls = [
        f"https://lh3.googleusercontent.com/d/{file_id}",
        f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t",
    ]
    last = None
    for url in urls:
        for i in range(3):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=45) as res:
                    raw = res.read()
                image = Image.open(io.BytesIO(raw))
                image.load()
                return image.convert("RGB")
            except Exception as exc:
                last = exc
                print("retry", file_id, type(exc).__name__, flush=True)
                time.sleep(i + 1)
    raise RuntimeError(f"Cannot access source {file_id}: {last}")

covers = OUT / "covers"
covers.mkdir(parents=True, exist_ok=True)
for slug, file_id in SOURCES.items():
    im = fetch_image(file_id)
    im = ImageOps.fit(im, (850, 850), method=Image.Resampling.LANCZOS)
    target = covers / f"{slug}.webp"
    im.save(target, "WEBP", quality=84, method=5)
    print("Saved", target, target.stat().st_size, flush=True)

maps = OUT / "maps"
maps.mkdir(parents=True, exist_ok=True)
original = fetch_image(MAP_ID)
original.thumbnail((1300, 1700), Image.Resampling.LANCZOS)
target = maps / "gyeonggi-north-map-original.webp"
original.save(target, "WEBP", quality=90, method=5)
print("Saved", target, target.stat().st_size)
