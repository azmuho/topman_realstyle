#!/usr/bin/env python3
"""Create responsive WebP assets from the temporary stock-image originals."""

from pathlib import Path
import sys

from PIL import Image, ImageOps


def save_variant(source: Path, target: Path, size: tuple[int, int], quality: int = 82) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        fitted = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        fitted.save(target, "WEBP", quality=quality, method=6)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: optimize-stock-images.py INPUT_DIR PUBLIC_DIR")

    source_dir = Path(sys.argv[1]).resolve()
    public_dir = Path(sys.argv[2]).resolve()
    product_dir = public_dir / "images" / "products"
    hero_dir = public_dir / "images" / "hero"
    category_dir = public_dir / "images" / "categories"

    save_variant(source_dir / "hero.jpg", hero_dir / "hero-main-800.webp", (800, 1000), 84)
    save_variant(source_dir / "hero.jpg", hero_dir / "hero-main-1600.webp", (1600, 2000), 86)

    product_sources = sorted(path for path in source_dir.glob("*.jpg") if path.stem != "hero")
    for source in product_sources:
        save_variant(source, product_dir / f"{source.stem}-480.webp", (480, 600), 80)
        save_variant(source, product_dir / f"{source.stem}-960.webp", (960, 1200), 84)

    category_sources = {
        "suits": "suit-01.jpg",
        "shirts": "shirt-01.jpg",
        "pants": "pants-01.jpg",
        "sport-blazers": "suit-02.jpg",
        "tshirts-polos": "tshirt-02.jpg",
        "outerwear-knitwear": "hero.jpg",
        "shoes": "shoes-02.jpg",
        "ties-belts": "tie-01.jpg",
    }
    for slug, filename in category_sources.items():
        source = source_dir / filename
        save_variant(source, category_dir / f"{slug}-480.webp", (480, 600), 80)
        save_variant(source, category_dir / f"{slug}-960.webp", (960, 1200), 84)


if __name__ == "__main__":
    main()
