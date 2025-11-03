#!/usr/bin/env node
/**
 * Create optimized Open Graph image (1200x630px)
 * for social media sharing (Facebook, Twitter, LinkedIn)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOGImage() {
    const inputPath = path.join(__dirname, 'photos/pro05.jpg');
    const outputPath = path.join(__dirname, 'photos/og-image.jpg');

    console.log('🖼️  Creating Open Graph image (1200x630px)...');

    try {
        // Create 1200x630 image with proper cropping
        await sharp(inputPath)
            .resize(1200, 630, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 85, progressive: true })
            .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);

        console.log('✅ Open Graph image created!');
        console.log(`   Size: ${sizeKB} KB`);
        console.log(`   Dimensions: 1200x630px`);
        console.log(`   Path: ${outputPath}`);
        console.log('');
        console.log('💡 This image will be used when sharing your site on:');
        console.log('   • Facebook');
        console.log('   • Twitter');
        console.log('   • LinkedIn');
        console.log('   • Other social platforms');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createOGImage();
