#!/usr/bin/env node
/**
 * Fix specific image rotations based on user feedback:
 * - candid01: 90° left → rotate 90° clockwise
 * - pro06: 90° right → rotate 90° counter-clockwise
 * - pro10: 90° left → rotate 90° clockwise
 * - candid09: rotate as needed
 * - candid03: rotate as needed
 * - candid05: rotate as needed
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

async function fixSpecificRotations() {
    console.log('🎨 Fixing specific image rotations...\n');
    console.log('Images incorrectly rotated:');
    console.log('  • candid01: 90° left → need +90° (clockwise)');
    console.log('  • pro06: 90° right → need -90° (counter-clockwise)');
    console.log('  • pro10: 90° left → need +90° (clockwise)');
    console.log('  • candid09: need adjustment');
    console.log('  • candid03: need adjustment');
    console.log('  • candid05: need adjustment');

    // candid01: 90° left → rotate +90° clockwise
    await rotateAllVariants('candid01', 90, 'Rotating 90° clockwise (was tilted left)');

    // pro06: 90° right → rotate -90° counter-clockwise (270°)
    await rotateAllVariants('pro06', 270, 'Rotating 90° counter-clockwise (was tilted right)');

    // pro10: 90° left → rotate +90° clockwise
    await rotateAllVariants('pro10', 90, 'Rotating 90° clockwise (was tilted left)');

    // candid09: rotate +90° clockwise
    await rotateAllVariants('candid09', 90, 'Rotating 90° clockwise');

    // candid03: rotate +90° clockwise
    await rotateAllVariants('candid03', 90, 'Rotating 90° clockwise');

    // candid05: rotate +90° clockwise
    await rotateAllVariants('candid05', 90, 'Rotating 90° clockwise');

    console.log('\n✅ All specific rotations fixed!');
    console.log('📸 Images now correctly oriented');
}

fixSpecificRotations()
    .then(() => {
        console.log('\n🎉 Done! Refresh your browser to see the corrections.');
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
