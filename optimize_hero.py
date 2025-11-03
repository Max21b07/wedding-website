#!/usr/bin/env python3
"""
Script to optimize the hero image:
- Convert to WebP format
- Compress to target size < 300KB
- Maintain good visual quality
"""

from PIL import Image
import os

def optimize_hero_image(input_path, output_webp, target_size_kb=280, quality_start=85):
    """
    Optimize image to WebP format with target file size.

    Args:
        input_path: Path to input JPEG
        output_webp: Path for output WebP
        target_size_kb: Target file size in KB
        quality_start: Starting quality level (0-100)
    """
    print(f"Opening image: {input_path}")
    img = Image.open(input_path)

    # Get original dimensions
    original_size = os.path.getsize(input_path) / 1024
    print(f"Original size: {original_size:.2f} KB ({img.size[0]}x{img.size[1]})")

    # Start with high quality and reduce until we hit target size
    quality = quality_start

    while quality > 50:
        # Save with current quality
        img.save(output_webp, 'WEBP', quality=quality, method=6)

        # Check file size
        webp_size = os.path.getsize(output_webp) / 1024

        print(f"Quality {quality}: {webp_size:.2f} KB")

        if webp_size <= target_size_kb:
            print(f"✓ Target achieved! Final size: {webp_size:.2f} KB at quality {quality}")
            reduction = ((original_size - webp_size) / original_size) * 100
            print(f"✓ Size reduction: {reduction:.1f}%")
            return True

        quality -= 5

    print(f"⚠ Could not reach target size. Final: {webp_size:.2f} KB")
    return False

if __name__ == "__main__":
    input_file = "photos/pro05.jpg"
    output_file = "photos/pro05.webp"

    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found!")
        exit(1)

    optimize_hero_image(input_file, output_file, target_size_kb=280, quality_start=85)
    print(f"\n✓ WebP image created: {output_file}")
