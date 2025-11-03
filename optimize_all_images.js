#!/usr/bin/env node
/**
 * Script to optimize all images for the wedding website:
 * - Convert all photos to WebP format
 * - Generate multiple sizes for responsive images (srcset)
 * - Optimize quality vs file size
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image categories and their optimization settings
const IMAGE_CONFIGS = {
    // Professional photos (high quality needed)
    pro: {
        sizes: [
            { width: 400, suffix: '-400w', quality: 80 },
            { width: 800, suffix: '-800w', quality: 80 },
            { width: 1200, suffix: '-1200w', quality: 75 },
            { width: 1600, suffix: '-1600w', quality: 70 }
        ]
    },
    // Candid photos (medium quality acceptable)
    candid: {
        sizes: [
            { width: 400, suffix: '-400w', quality: 75 },
            { width: 800, suffix: '-800w', quality: 75 },
            { width: 1200, suffix: '-1200w', quality: 70 }
        ]
    }
};

async function optimizeImage(inputPath, outputDir, config) {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const results = [];

    console.log(`\n📸 Processing: ${filename}`);

    // Get original metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height}`);

    for (const size of config.sizes) {
        // Skip if original is smaller than target width
        if (metadata.width < size.width) {
            console.log(`   ⏭️  Skipping ${size.width}w (original too small)`);
            continue;
        }

        const outputPath = path.join(outputDir, `${filename}${size.suffix}.webp`);

        await sharp(inputPath)
            .resize(size.width, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: size.quality, effort: 6 })
            .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);

        console.log(`   ✓ ${size.width}w: ${sizeKB} KB (quality ${size.quality})`);

        results.push({
            width: size.width,
            path: outputPath,
            size: sizeKB
        });
    }

    return results;
}

async function processAllImages() {
    const photosDir = path.join(__dirname, 'photos');
    const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.jpg'));

    console.log(`🎨 Found ${files.length} JPEG images to optimize\n`);

    let totalOriginalSize = 0;
    let totalWebPSize = 0;

    for (const file of files) {
        const inputPath = path.join(photosDir, file);

        // Skip pro05.jpg (already optimized as hero)
        if (file === 'pro05.jpg') {
            console.log(`⏭️  Skipping ${file} (hero already optimized)`);
            continue;
        }

        // Determine config based on filename
        let config;
        if (file.startsWith('pro')) {
            config = IMAGE_CONFIGS.pro;
        } else if (file.startsWith('candid')) {
            config = IMAGE_CONFIGS.candid;
        } else {
            console.log(`⚠️  Unknown category for ${file}, using candid config`);
            config = IMAGE_CONFIGS.candid;
        }

        const originalSize = fs.statSync(inputPath).size / 1024;
        totalOriginalSize += originalSize;

        try {
            const results = await optimizeImage(inputPath, photosDir, config);

            // Sum up WebP sizes
            const webpSizes = results.reduce((sum, r) => sum + parseFloat(r.size), 0);
            totalWebPSize += webpSizes;

        } catch (error) {
            console.error(`   ❌ Error processing ${file}:`, error.message);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Original JPEG total: ${totalOriginalSize.toFixed(2)} KB`);
    console.log(`WebP variants total: ${totalWebPSize.toFixed(2)} KB`);
    console.log(`Savings: ${((1 - totalWebPSize/totalOriginalSize) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));
}

// Run the optimization
processAllImages()
    .then(() => {
        console.log('\n✅ All images optimized successfully!');
        console.log('\n💡 Next step: Update HTML with <picture> tags and srcset');
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
