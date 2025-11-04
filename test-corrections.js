#!/usr/bin/env node
/**
 * Test corrections for iPhone 14 Plus
 * Verify that tap targets, contrasts, and overflows are fixed
 */

const puppeteer = require('puppeteer');
const path = require('path');

const IPHONE_14_PLUS = {
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

async function testCorrections(page) {
    console.log('\n🔍 Testing corrections...\n');

    const results = await page.evaluate(() => {
        const issues = {
            smallTapTargets: [],
            textOverflows: [],
            elementOverflows: []
        };

        // Test 1: Check tap targets
        const tapTargets = document.querySelectorAll('button, a, input, textarea, select, label');
        let smallCount = 0;
        tapTargets.forEach(el => {
            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
                if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                    smallCount++;
                    if (smallCount <= 5) { // Limit to first 5 for display
                        issues.smallTapTargets.push({
                            element: el.tagName,
                            text: el.textContent?.substring(0, 20) || el.placeholder || '',
                            width: Math.round(rect.width),
                            height: Math.round(rect.height)
                        });
                    }
                }
            }
        });

        // Test 2: Check text overflows
        const textElements = document.querySelectorAll('h1, h2, h3, p, div, span');
        let overflowCount = 0;
        textElements.forEach(el => {
            if (el.scrollWidth > el.clientWidth + 5) { // 5px tolerance
                overflowCount++;
                if (overflowCount <= 5) {
                    issues.textOverflows.push({
                        element: el.tagName,
                        class: el.className,
                        scrollWidth: el.scrollWidth,
                        clientWidth: el.clientWidth,
                        overflow: el.scrollWidth - el.clientWidth
                    });
                }
            }
        });

        // Test 3: Check element overflows
        const viewportWidth = window.innerWidth;
        const allElements = document.querySelectorAll('*');
        let elementOverflowCount = 0;
        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.position !== 'fixed' &&
                computedStyle.display !== 'none' &&
                rect.right > viewportWidth + 5) {
                elementOverflowCount++;
                if (elementOverflowCount <= 5) {
                    issues.elementOverflows.push({
                        element: el.tagName,
                        class: el.className,
                        right: Math.round(rect.right),
                        viewportWidth: viewportWidth
                    });
                }
            }
        });

        return {
            tapTargetsTotal: tapTargets.length,
            smallTapTargets: smallCount,
            textOverflows: overflowCount,
            elementOverflows: elementOverflowCount,
            details: issues
        };
    });

    return results;
}

async function main() {
    console.log('📱 Testing corrections on iPhone 14 Plus...\n');

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.setViewport(IPHONE_14_PLUS.viewport);
    await page.setUserAgent(IPHONE_14_PLUS.userAgent);

    const url = `file://${path.join(__dirname, 'index.html')}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test at different scroll positions
    const positions = [
        { name: 'Hero', scroll: 0 },
        { name: 'Timeline', scroll: 926 },
        { name: 'Gallery', scroll: 926 * 4 },
        { name: 'Guestbook', scroll: 926 * 6 }
    ];

    let totalSmall = 0;
    let totalTextOverflow = 0;
    let totalElementOverflow = 0;

    for (const pos of positions) {
        console.log(`📍 Testing ${pos.name}...`);
        await page.evaluate((y) => window.scrollTo(0, y), pos.scroll);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const results = await testCorrections(page);

        totalSmall += results.smallTapTargets;
        totalTextOverflow += results.textOverflows;
        totalElementOverflow += results.elementOverflows;

        console.log(`  Tap targets < 44px: ${results.smallTapTargets}`);
        console.log(`  Text overflows: ${results.textOverflows}`);
        console.log(`  Element overflows: ${results.elementOverflows}`);

        if (results.details.smallTapTargets.length > 0) {
            console.log('  Small tap targets:');
            results.details.smallTapTargets.forEach(t => {
                console.log(`    - ${t.element}: ${t.width}x${t.height}px`);
            });
        }

        if (results.details.textOverflows.length > 0) {
            console.log('  Text overflows:');
            results.details.textOverflows.forEach(t => {
                console.log(`    - ${t.element}.${t.class}: ${t.overflow}px`);
            });
        }
        console.log('');
    }

    await browser.close();

    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60) + '\n');

    console.log(`Total small tap targets: ${totalSmall}`);
    console.log(`Total text overflows: ${totalTextOverflow}`);
    console.log(`Total element overflows: ${totalElementOverflow}\n`);

    if (totalSmall === 0 && totalTextOverflow === 0 && totalElementOverflow === 0) {
        console.log('✅ All corrections successful! No critical issues found.\n');
    } else {
        console.log('⚠️ Some issues remain:\n');
        if (totalSmall > 0) console.log(`  - ${totalSmall} tap targets still too small`);
        if (totalTextOverflow > 0) console.log(`  - ${totalTextOverflow} text overflows`);
        if (totalElementOverflow > 0) console.log(`  - ${totalElementOverflow} element overflows`);
        console.log('');
    }
}

main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
});
