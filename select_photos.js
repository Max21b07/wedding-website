const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Directories
const professionalDir = '/Users/luthiminhphuong/Documents/Photo favorites/40 photo for album';
const candidDir = '/Users/luthiminhphuong/Downloads/Photos-1-001';

// Get all photos
const professionalPhotos = fs.readdirSync(professionalDir)
    .filter(f => f.match(/\.(jpg|jpeg|JPG|JPEG)$/i))
    .map(f => ({
        path: path.join(professionalDir, f),
        name: f,
        type: 'professional'
    }));

const candidPhotos = fs.readdirSync(candidDir)
    .filter(f => f.match(/\.(jpg|jpeg|JPG|JPEG|heic|HEIC)$/i))
    .filter(f => !f.includes('COLLAGE') && !f.includes('ANIMATION') && !f.includes('max21b'))
    .map(f => ({
        path: path.join(candidDir, f),
        name: f,
        type: 'candid'
    }));

console.log(`\nPhotos professionnelles trouvées: ${professionalPhotos.length}`);
console.log(`Photos candides trouvées: ${candidPhotos.length}\n`);

// Selection strategy: pick best photos
// For professional: select varied shots
const selectedProfessional = [
    'LQD_1338 copy.JPG',    // Likely a great shot (copy = selected)
    'LQD_1505 copy.JPG',
    'LQD_1755 copy.JPG',
    'LQD_1907 copy.JPG',
    'LQD_2045 copy.JPG',
    'LQD_1366.JPG',
    'LQD_1429.JPG',
    'LQD_1557.JPG',
    'LQD_1607.JPG',
    'LQD_1690.JPG',
    'LQD_1772.JPG',
    'LQD_1798.JPG',
    'LQD_1960.JPG',
    'LQD_1997.JPG',
    'LQD_2078.JPG'
].map(name => professionalPhotos.find(p => p.name === name)).filter(Boolean);

// For candid: select JPG photos first (easier to work with)
const candidJPG = candidPhotos.filter(p => p.name.match(/\.(jpg|JPG|jpeg|JPEG)$/));
const selectedCandid = candidJPG.slice(0, 10); // Take first 10 JPG candid photos

console.log('=== SELECTION FINALE ===\n');
console.log(`Photos professionnelles sélectionnées: ${selectedProfessional.length}`);
selectedProfessional.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name}`);
});

console.log(`\nPhotos candides sélectionnées: ${selectedCandid.length}`);
selectedCandid.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name}`);
});

console.log(`\nTotal: ${selectedProfessional.length + selectedCandid.length} photos`);

// Save selection to file
const selection = {
    professional: selectedProfessional,
    candid: selectedCandid,
    total: selectedProfessional.length + selectedCandid.length
};

fs.writeFileSync('photo_selection.json', JSON.stringify(selection, null, 2));
console.log('\n✓ Sélection sauvegardée dans photo_selection.json');
