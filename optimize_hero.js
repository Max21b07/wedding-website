#!/usr/bin/env node
/**
 * Script to optimize the hero image:
 * - Convert to WebP format
 * - Compress to target size < 300KB
 * - Maintain good visual quality
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeHeroImage(inputPath, outputWebp, targetSizeKB = 280) {
    console.log(`Opening image: ${inputPath}`);

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = originalStats.size / 1024;
    console.log(`Original size: ${originalSizeKB.toFixed(2)} KB`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`Dimensions: ${metadata.width}x${metadata.height}`);

    // Try different quality levels
    let quality = 85;
    let bestQuality = 85;
    let bestSize = Infinity;

    while (quality >= 50) {
        await sharp(inputPath)
            .webp({ quality: quality, effort: 6 })
            .toFile(outputWebp);

        const stats = fs.statSync(outputWebp);
        const webpSizeKB = stats.size / 1024;

        console.log(`Quality ${quality}: ${webpSizeKB.toFixed(2)} KB`);

        if (webpSizeKB <= targetSizeKB) {
            console.log(`✓ Target achieved! Final size: ${webpSizeKB.toFixed(2)} KB at quality ${quality}`);
            const reduction = ((originalSizeKB - webpSizeKB) / originalSizeKB) * 100;
            console.log(`✓ Size reduction: ${reduction.toFixed(1)}%`);
            return true;
        }

        bestSize = webpSizeKB;
        bestQuality = quality;
        quality -= 5;
    }

    console.log(`⚠ Could not reach target size. Final: ${bestSize.toFixed(2)} KB at quality ${bestQuality}`);
    return false;
}

// Run optimization
const inputFile = path.join(__dirname, 'photos/pro05.jpg');
const outputFile = path.join(__dirname, 'photos/pro05.webp');

if (!fs.existsSync(inputFile)) {
    console.error(`Error: ${inputFile} not found!`);
    process.exit(1);
}

optimizeHeroImage(inputFile, outputFile, 280)
    .then(() => {
        console.log(`\n✓ WebP image created: ${outputFile}`);

        // Show final comparison
        const originalSize = fs.statSync(inputFile).size / 1024;
        const webpSize = fs.statSync(outputFile).size / 1024;
        console.log(`\nComparison:`);
        console.log(`  Original JPEG: ${originalSize.toFixed(2)} KB`);
        console.log(`  Optimized WebP: ${webpSize.toFixed(2)} KB`);
        console.log(`  Savings: ${((1 - webpSize/originalSize) * 100).toFixed(1)}%`);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
