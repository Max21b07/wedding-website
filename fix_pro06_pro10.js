#!/usr/bin/env node
/**
 * Fix pro06 and pro10 rotations:
 * - pro06: Currently 90° left → rotate 90° clockwise
 * - pro10: Currently 90° right → rotate 90° counter-clockwise (270°)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function rotateImage(inputPath, degrees) {
    const tempPath = inputPath + '.tmp';

    await sharp(inputPath)
        .rotate(degrees)
        .toFile(tempPath);

    fs.renameSync(tempPath, inputPath);
}

async function rotateAllVariants(baseName, degrees, description) {
    const photosDir = path.join(__dirname, 'photos');
    const extensions = ['.jpg', '.webp'];
    const suffixes = ['', '-400w', '-800w', '-1200w', '-1600w'];

    console.log(`\n🔄 ${baseName}: ${description}`);

    for (const suffix of suffixes) {
        for (const ext of extensions) {
            const filename = `${baseName}${suffix}${ext}`;
            const filePath = path.join(photosDir, filename);

            if (fs.existsSync(filePath)) {
                try {
                    await rotateImage(filePath, degrees);
                    console.log(`  ✓ ${filename}`);
                } catch (error) {
                    console.error(`  ✗ ${filename}: ${error.message}`);
                }
            }
        }
    }
}

async function fixRotations() {
    console.log('🎨 Fixing pro06 and pro10 rotations...\n');

    // pro06: 90° left → rotate +90° clockwise
    await rotateAllVariants('pro06', 90, 'Rotating 90° clockwise (was tilted left)');

    // pro10: 90° right → rotate -90° counter-clockwise (270°)
    await rotateAllVariants('pro10', 270, 'Rotating 90° counter-clockwise (was tilted right)');

    console.log('\n✅ Pro06 and Pro10 rotations fixed!');
    console.log('📸 Images now correctly oriented');
}

fixRotations()
    .then(() => {
        console.log('\n🎉 Done! Both images corrected.');
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
