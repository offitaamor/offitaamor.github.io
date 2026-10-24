from __future__ import annotations
import io, time, urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont, ImageFilter
import subprocess

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

# The source map contains an obsolete 09 caption; preserve the original asset and
# place a clearly labelled editorial inset for the revised BYEOKJE track.
mapim = original.copy()
W, H = mapim.size
scale = W / 1101.0
x0, y0, x1, y1 = [int(v * scale) for v in (834, 864, 1096, 1117)]
paper = Image.new("RGB", (x1-x0, y1-y0), (246, 239, 224))
tex = original.crop((int(825*scale), int(1100*scale), int(1087*scale), int(1353*scale))).resize(paper.size, Image.Resampling.BICUBIC)
paper = Image.blend(paper, tex, 0.08)
mask = Image.new("L", mapim.size, 0)
ImageDraw.Draw(mask).rounded_rectangle((x0, y0, x1, y1), radius=int(8*scale), fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(radius=max(1, int(7*scale))))
full = Image.new("RGB", mapim.size, (246,239,224))
full.paste(paper, (x0, y0))
mapim.paste(full, (0,0), mask)
d = ImageDraw.Draw(mapim)
card = (x0+int(9*scale), y0+int(7*scale), x1-int(10*scale), y1-int(12*scale))
d.rounded_rectangle(card, radius=int(8*scale), fill=(250,245,233), outline=(201,183,151), width=max(1,int(2*scale)))
red = (161,77,59)
d.ellipse((card[0]+int(9*scale), card[1]+int(9*scale), card[0]+int(52*scale), card[1]+int(52*scale)), fill=red)

def font_ko(pt):
    # Ubuntu runners provide a Korean font through fontconfig; fall back safely.
    try:
        path = subprocess.check_output(["fc-match", "-f", "%{file}", "sans:lang=ko"], text=True).strip()
        return ImageFont.truetype(path, max(10,int(pt*scale)))
    except Exception:
        return ImageFont.truetype("DejaVuSans.ttf", max(10,int(pt*scale)))

d.text((card[0]+int(15*scale), card[1]+int(16*scale)), "09",
       font=ImageFont.truetype("DejaVuSerif.ttf", max(11,int(22*scale))), fill=(255,255,255))
d.text((card[0]+int(62*scale),card[1]+int(7*scale)), "벽제", font=font_ko(26),fill=(51,45,35))
d.text((card[0]+int(63*scale),card[1]+int(39*scale)), "옛길 · 벽제관", font=font_ko(13),fill=(91,85,74))
cover = Image.open(covers / "byeokje.webp").convert("RGB")
box = (card[0]+int(10*scale),card[1]+int(69*scale),card[2]-int(10*scale),card[3]-int(11*scale))
cover = ImageOps.fit(cover,(box[2]-box[0],box[3]-box[1]),method=Image.Resampling.LANCZOS,centering=(.5,.47))
mapim.paste(cover,(box[0],box[1]))
d.rectangle(box,outline=(190,160,120),width=2)
target = maps / "gyeonggi-north-map-current.webp"
mapim.save(target,"WEBP",quality=91,method=5)
print("Saved",target,target.stat().st_size)
