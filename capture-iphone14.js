#!/usr/bin/env node
/**
 * Capture website on iPhone 14 Plus viewport
 * Simulates exactly how the site looks on iPhone 14 Plus
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// iPhone 14 Plus specifications
const IPHONE_14_PLUS = {
    name: 'iPhone 14 Plus',
    viewport: {
        width: 428,
        height: 926,
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        isLandscape: false
    },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
};

async function captureSection(page, sectionName, scrollY, filename) {
    console.log(`  📸 Capturing ${sectionName}...`);

    // Scroll to position
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);

    // Wait for any animations
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot
    await page.screenshot({
        path: filename,
        fullPage: false
    });

    console.log(`  ✓ Saved: ${filename}`);
}

async function main() {
    console.log('📱 Simulating iPhone 14 Plus...\n');
    console.log(`Device: ${IPHONE_14_PLUS.name}`);
    console.log(`Viewport: ${IPHONE_14_PLUS.viewport.width}x${IPHONE_14_PLUS.viewport.height}`);
    console.log(`Scale: ${IPHONE_14_PLUS.viewport.deviceScaleFactor}x`);
    console.log(`User Agent: ${IPHONE_14_PLUS.userAgent}\n`);

    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots-iphone14');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set iPhone 14 Plus viewport
    await page.setViewport(IPHONE_14_PLUS.viewport);
    await page.setUserAgent(IPHONE_14_PLUS.userAgent);

    // Navigate to the local site
    const url = `file://${path.join(__dirname, 'index.html')}`;
    console.log(`🌐 Loading: ${url}\n`);

    await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 10000
    });

    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('📸 Taking screenshots...\n');

    // Capture different sections
    await captureSection(
        page,
        'Hero Section',
        0,
        path.join(screenshotsDir, '01-hero.png')
    );

    await captureSection(
        page,
        'Timeline Section 1',
        926,
        path.join(screenshotsDir, '02-timeline-1.png')
    );

    await captureSection(
        page,
        'Timeline Section 2',
        926 * 2,
        path.join(screenshotsDir, '03-timeline-2.png')
    );

    await captureSection(
        page,
        'Timeline Section 3',
        926 * 3,
        path.join(screenshotsDir, '04-timeline-3.png')
    );

    await captureSection(
        page,
        'Gallery',
        926 * 4,
        path.join(screenshotsDir, '05-gallery.png')
    );

    await captureSection(
        page,
        'Guestbook',
        926 * 6,
        path.join(screenshotsDir, '06-guestbook.png')
    );

    // Full page screenshot
    console.log('  📸 Capturing full page...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(resolve => setTimeout(resolve, 500));

    await page.screenshot({
        path: path.join(screenshotsDir, '00-full-page.png'),
        fullPage: true
    });
    console.log(`  ✓ Saved: 00-full-page.png`);

    // Get page metrics
    const metrics = await page.evaluate(() => {
        return {
            totalHeight: document.documentElement.scrollHeight,
            viewportHeight: window.innerHeight,
            viewportWidth: window.innerWidth,
            devicePixelRatio: window.devicePixelRatio
        };
    });

    console.log('\n📊 Page Metrics:');
    console.log(`  Total height: ${metrics.totalHeight}px`);
    console.log(`  Viewport: ${metrics.viewportWidth}x${metrics.viewportHeight}px`);
    console.log(`  Device pixel ratio: ${metrics.devicePixelRatio}x`);

    // Analyze typography
    const typography = await page.evaluate(() => {
        const samples = [];

        // Hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const styles = window.getComputedStyle(heroTitle);
            samples.push({
                element: 'Hero Title',
                font: styles.fontFamily,
                size: styles.fontSize,
                lineHeight: styles.lineHeight,
                color: styles.color
            });
        }

        // Timeline h2
        const timelineH2 = document.querySelector('.timeline-text h2');
        if (timelineH2) {
            const styles = window.getComputedStyle(timelineH2);
            samples.push({
                element: 'Timeline H2',
                font: styles.fontFamily,
                size: styles.fontSize,
                lineHeight: styles.lineHeight,
                color: styles.color
            });
        }

        // Body text
        const bodyText = document.querySelector('.timeline-text p');
        if (bodyText) {
            const styles = window.getComputedStyle(bodyText);
            samples.push({
                element: 'Body Text',
                font: styles.fontFamily,
                size: styles.fontSize,
                lineHeight: styles.lineHeight,
                color: styles.color
            });
        }

        return samples;
    });

    console.log('\n🔤 Typography Analysis:');
    typography.forEach(sample => {
        console.log(`\n  ${sample.element}:`);
        console.log(`    Font: ${sample.font}`);
        console.log(`    Size: ${sample.size}`);
        console.log(`    Line height: ${sample.lineHeight}`);
        console.log(`    Color: ${sample.color}`);
    });

    await browser.close();

    console.log('\n✅ Screenshots saved to: screenshots-iphone14/');
    console.log('\n💡 Use these screenshots to analyze:');
    console.log('  • Typography hierarchy');
    console.log('  • Spacing and margins');
    console.log('  • Color contrast');
    console.log('  • Overall visual balance');
}

main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
});
