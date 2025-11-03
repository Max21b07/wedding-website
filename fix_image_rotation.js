#!/usr/bin/env node
/**
 * Fix image rotation - rotate images 90° counter-clockwise
 * to correct the orientation issue
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function rotateImage(inputPath, degrees) {
    const tempPath = inputPath + '.tmp';

    await sharp(inputPath)
        .rotate(degrees)
        .toFile(tempPath);

    // Replace original with rotated version
    fs.renameSync(tempPath, inputPath);
}

async function fixAllImages() {
    const photosDir = path.join(__dirname, 'photos');

    // Get all JPEG files
    const jpegFiles = fs.readdirSync(photosDir)
        .filter(f => f.endsWith('.jpg') && !f.startsWith('.'));

    // Get all WebP files
    const webpFiles = fs.readdirSync(photosDir)
        .filter(f => f.endsWith('.webp') && !f.startsWith('.'));

    console.log('🔄 Fixing image rotation (rotating 270° to correct 90° right tilt)...\n');

    console.log(`Found ${jpegFiles.length} JPEG files`);
    console.log(`Found ${webpFiles.length} WebP files\n`);

    // Rotate all JPEG files
    console.log('Rotating JPEG files:');
    for (const file of jpegFiles) {
        const filePath = path.join(photosDir, file);
        try {
            await rotateImage(filePath, 270); // 270° = -90° (counter-clockwise)
            console.log(`  ✓ ${file}`);
        } catch (error) {
            console.error(`  ✗ ${file}: ${error.message}`);
        }
    }

    console.log('\nRotating WebP files:');
    for (const file of webpFiles) {
        const filePath = path.join(photosDir, file);
        try {
            await rotateImage(filePath, 270);
            console.log(`  ✓ ${file}`);
        } catch (error) {
            console.error(`  ✗ ${file}: ${error.message}`);
        }
    }

    console.log('\n✅ All images rotated successfully!');
    console.log('💡 Images are now correctly oriented (vertical)');
}

fixAllImages()
    .then(() => {
        console.log('\n🎉 Done! Refresh your browser to see the corrected images.');
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
