from __future__ import annotations
import csv
import io
import time
import urllib.request
from pathlib import Path
from PIL import Image, UnidentifiedImageError

MANIFEST = Path("_data/visual-drive.tsv")
UA = "Mozilla/5.0 (compatible; OFFITA-Visual-Sync/1.0)"

def download(file_id: str) -> bytes:
    urls = [
        f"https://lh3.googleusercontent.com/d/{file_id}",
        f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t",
    ]
    last_error = None
    for url in urls:
        for attempt in range(4):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=60) as r:
                    data = r.read()
                    ctype = (r.headers.get("Content-Type") or "").lower()
                if len(data) > 1024 and ("image/" in ctype or data[:12].startswith((b"\x89PNG", b"\xff\xd8\xff", b"RIFF"))):
                    return data
                raise RuntimeError(f"Unexpected response: {ctype}, {len(data)} bytes")
            except Exception as exc:
                last_error = exc
                time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"Could not download {file_id}: {last_error}")

def save_webp(data: bytes, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        with Image.open(io.BytesIO(data)) as im:
            im.load()
            if im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
            max_dim = 2000
            scale = min(1.0, max_dim / max(im.size))
            if scale < 1.0:
                im = im.resize(
                    (round(im.width * scale), round(im.height * scale)),
                    Image.Resampling.LANCZOS,
                )
            im.save(dest, "WEBP", quality=88, method=4)
    except UnidentifiedImageError as exc:
        raise RuntimeError(f"Downloaded data is not a valid image for {dest}") from exc

with MANIFEST.open("r", encoding="utf-8", newline="") as f:
    rows = csv.reader((line for line in f if not line.startswith("#")), delimiter="\t")
    count = 0
    for row in rows:
        if not row:
            continue
        file_id, repo_path = row[0].strip(), row[1].strip()
        if not file_id or not repo_path:
            continue
        print(f"Syncing {file_id} -> {repo_path}")
        save_webp(download(file_id), Path(repo_path))
        count += 1

print(f"Synced {count} images.")
