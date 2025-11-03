#!/usr/bin/env node
/**
 * Minify and optimize CSS/JS for production
 * - Minify styles.css → styles.min.css
 * - Minify all JS files → *.min.js
 * - Critical CSS inline in HTML
 */

const fs = require('fs');
const path = require('path');
const { minify: minifyJS } = require('terser');
const CleanCSS = require('clean-css');

async function minifyCSS() {
    console.log('📦 Minifying CSS...');

    const cssPath = path.join(__dirname, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    const result = new CleanCSS({
        level: 2,
        compatibility: 'ie10'
    }).minify(cssContent);

    const minPath = path.join(__dirname, 'styles.min.css');
    fs.writeFileSync(minPath, result.styles);

    const originalSize = (fs.statSync(cssPath).size / 1024).toFixed(2);
    const minifiedSize = (fs.statSync(minPath).size / 1024).toFixed(2);
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    console.log(`  ✓ styles.css: ${originalSize} KB → ${minifiedSize} KB (-${savings}%)`);

    return result.styles;
}

async function minifyJSFile(filename) {
    const jsPath = path.join(__dirname, filename);
    const jsContent = fs.readFileSync(jsPath, 'utf8');

    const result = await minifyJS(jsContent, {
        compress: {
            dead_code: true,
            drop_console: false,
            drop_debugger: true,
            keep_classnames: true,
            keep_fnames: false,
            passes: 2
        },
        mangle: {
            keep_classnames: true
        },
        format: {
            comments: false
        }
    });

    const minFilename = filename.replace('.js', '.min.js');
    const minPath = path.join(__dirname, minFilename);
    fs.writeFileSync(minPath, result.code);

    const originalSize = (fs.statSync(jsPath).size / 1024).toFixed(2);
    const minifiedSize = (fs.statSync(minPath).size / 1024).toFixed(2);
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    console.log(`  ✓ ${filename}: ${originalSize} KB → ${minifiedSize} KB (-${savings}%)`);
}

async function minifyAllJS() {
    console.log('\n📦 Minifying JavaScript...');

    const jsFiles = [
        'script.js',
        'carousel.js',
        'guestbook-firebase.js'
    ];

    for (const file of jsFiles) {
        if (fs.existsSync(path.join(__dirname, file))) {
            await minifyJSFile(file);
        }
    }
}

async function updateHTMLReferences() {
    console.log('\n📝 Updating HTML references to minified files...');

    const htmlPath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Replace CSS reference
    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        '<link rel="stylesheet" href="styles.min.css">'
    );

    // Replace JS references
    html = html.replace('src="script.js"', 'src="script.min.js"');
    html = html.replace('src="carousel.js"', 'src="carousel.min.js"');
    html = html.replace('src="guestbook-firebase.js"', 'src="guestbook-firebase.min.js"');

    fs.writeFileSync(htmlPath, html);

    console.log('  ✓ index.html updated with minified references');
}

async function build() {
    console.log('🚀 Building minified production assets...\n');

    try {
        await minifyCSS();
        await minifyAllJS();
        await updateHTMLReferences();

        console.log('\n✅ Build complete! All assets minified.');
        console.log('\n💡 Production files created:');
        console.log('  • styles.min.css');
        console.log('  • script.min.js');
        console.log('  • carousel.min.js');
        console.log('  • guestbook-firebase.min.js');
        console.log('\n📈 This will reduce bandwidth and improve load times!');

    } catch (error) {
        console.error('❌ Build error:', error);
        process.exit(1);
    }
}

build();
