#!/usr/bin/env node
/**
 * Capture website AFTER typography improvements
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

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

async function main() {
    console.log('📱 Capturing AFTER typography improvements...\n');

    const screenshotsDir = path.join(__dirname, 'screenshots-iphone14-after');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.setViewport(IPHONE_14_PLUS.viewport);
    await page.setUserAgent(IPHONE_14_PLUS.userAgent);

    const url = `file://${path.join(__dirname, 'index.html')}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Capture key sections
    const sections = [
        { name: 'Hero', scroll: 0 },
        { name: 'Timeline-1', scroll: 926 },
        { name: 'Timeline-2', scroll: 926 * 2 },
        { name: 'Gallery', scroll: 926 * 4 },
        { name: 'Guestbook', scroll: 926 * 6 }
    ];

    for (const section of sections) {
        await page.evaluate((y) => window.scrollTo(0, y), section.scroll);
        await new Promise(resolve => setTimeout(resolve, 800));

        const filename = path.join(screenshotsDir, `${section.name}.png`);
        await page.screenshot({ path: filename });
        console.log(`✓ ${section.name}.png`);
    }

    // Analyze typography
    const typography = await page.evaluate(() => {
        const samples = [];

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const styles = window.getComputedStyle(heroTitle);
            samples.push({
                element: 'Hero Title',
                font: styles.fontFamily,
                size: styles.fontSize,
                lineHeight: styles.lineHeight,
                letterSpacing: styles.letterSpacing
            });
        }

        const timelineH2 = document.querySelector('.timeline-text h2');
        if (timelineH2) {
            const styles = window.getComputedStyle(timelineH2);
            samples.push({
                element: 'Timeline H2',
                font: styles.fontFamily,
                size: styles.fontSize,
                lineHeight: styles.lineHeight,
                letterSpacing: styles.letterSpacing
            });
        }

        const bodyText = document.querySelector('.timeline-text p');
        if (bodyText) {
            const styles = window.getComputedStyle(bodyText);
            samples.push({
                element: 'Body Text',
                font: styles.fontFamily,
                size: styles.fontSize,
                lineHeight: styles.lineHeight
            });
        }

        return samples;
    });

    console.log('\n🔤 AFTER Typography:');
    typography.forEach(sample => {
        console.log(`\n  ${sample.element}:`);
        console.log(`    Font: ${sample.font}`);
        console.log(`    Size: ${sample.size}`);
        console.log(`    Line height: ${sample.lineHeight}`);
        if (sample.letterSpacing) {
            console.log(`    Letter spacing: ${sample.letterSpacing}`);
        }
    });

    await browser.close();
    console.log('\n✅ After screenshots saved!\n');
}

main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
});
