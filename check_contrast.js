#!/usr/bin/env node
/**
 * Check color contrast ratios for WCAG AA compliance
 * WCAG AA requires:
 * - Normal text: 4.5:1
 * - Large text (18px+ or 14px+ bold): 3:1
 */

// Contrast calculation based on WCAG 2.0
function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    };
}

function getContrastRatio(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
}

function checkContrast(fg, bg, size = 'normal', description = '') {
    const ratio = getContrastRatio(fg, bg);
    const required = size === 'large' ? 3.0 : 4.5;
    const passes = ratio >= required;

    const status = passes ? '✅' : '❌';
    const ratioStr = ratio.toFixed(2);

    console.log(`${status} ${description}`);
    console.log(`   FG: ${fg} / BG: ${bg}`);
    console.log(`   Ratio: ${ratioStr}:1 (required: ${required}:1 for ${size} text)`);
    console.log('');

    return { passes, ratio, required, fg, bg, description };
}

console.log('=' .repeat(70));
console.log('🎨 COLOR CONTRAST ANALYSIS - WCAG AA');
console.log('=' .repeat(70));
console.log('');

const results = [];

// Timeline titles
results.push(checkContrast('#d4516f', '#ffffff', 'large', 'Timeline titles (French) - Pink on white'));
results.push(checkContrast('#d15a7f', '#ffffff', 'large', 'Timeline titles (Vietnamese) - Darker pink on white (FIXED)'));

// Body text
results.push(checkContrast('#2d2d2d', '#ffffff', 'normal', 'Body text - Dark gray on white'));
results.push(checkContrast('#555', '#ffffff', 'normal', 'Secondary text - Medium gray on white'));
results.push(checkContrast('#666', '#ffffff', 'normal', 'Tertiary text - Gray on white'));
results.push(checkContrast('#767676', '#ffffff', 'normal', 'Light gray text on white (FIXED)'));

// Buttons and interactive elements
results.push(checkContrast('#ffffff', '#d4516f', 'large', 'Button text - White on pink'));
results.push(checkContrast('#ffffff', '#8a6d1a', 'large', 'Gold button - White on darker gold (FIXED)'));
results.push(checkContrast('#8a6d1a', '#ffffff', 'normal', 'Gold text on white (FIXED)'));

// Special elements
results.push(checkContrast('#d11776', '#ffffff', 'normal', 'Hot pink text on white (FIXED)'));

console.log('=' .repeat(70));
console.log('📊 SUMMARY');
console.log('=' .repeat(70));

const passing = results.filter(r => r.passes).length;
const failing = results.filter(r => !r.passes).length;

console.log(`✅ Passing: ${passing}/${results.length}`);
console.log(`❌ Failing: ${failing}/${results.length}`);
console.log('');

if (failing > 0) {
    console.log('⚠️  ISSUES TO FIX:');
    results.filter(r => !r.passes).forEach(r => {
        console.log(`   • ${r.description}`);
        console.log(`     Ratio: ${r.ratio.toFixed(2)}:1 (needs ${r.required}:1)`);
    });
    console.log('');
    console.log('💡 RECOMMENDED FIXES:');
    console.log('   • Darken light colors for better contrast');
    console.log('   • Use darker shades of pink (#c43d5c or darker)');
    console.log('   • Replace #999 gray with #767676 or darker');
    console.log('   • Replace #ffc0cb with #ff69b4 or darker');
} else {
    console.log('🎉 All color combinations pass WCAG AA!');
}

console.log('=' .repeat(70));
