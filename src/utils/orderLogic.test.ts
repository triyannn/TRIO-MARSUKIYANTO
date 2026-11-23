import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCartKey,
  buildWhatsAppOrderUrl,
  calculateCartTotals,
  calculateItemUnitPrice,
  encodeCode39Barcode,
  formatRupiah,
  generateVoucherCode,
  type CartItem,
} from './orderLogic';
import {
  buildGitHubStaticFiles,
  buildWordPressThemeFiles,
  generateGitHubSourceZipBlob,
} from './wordpressExport';
import { MENU_ITEMS, OUTLETS, PLATFORM_LINKS } from '../data/menuData';

test('formatRupiah formats Indonesian currency accurately', () => {
  assert.equal(formatRupiah(26000), 'Rp 26.000');
  assert.equal(formatRupiah(52000), 'Rp 52.000');
  assert.equal(formatRupiah(0), 'Rp 0');
});

test('calculateItemUnitPrice applies spice level 4 delta and chicken add-ons', () => {
  assert.equal(calculateItemUnitPrice(26000, 3, []), 26000);
  assert.equal(calculateItemUnitPrice(26000, 4, []), 28000);
  assert.equal(
    calculateItemUnitPrice(23000, 2, ['ayam-karage-mini', 'dimsum-ayam-2']),
    23000 + 12000 + 9000
  );
  assert.equal(calculateItemUnitPrice(6000, null, []), 6000);
});

test('menu contains all required Geprek varieties, combos, olahan ayam add-ons, drinks, and Wonogiri outlets', () => {
  const ids = MENU_ITEMS.map((m) => m.id);
  for (const requiredId of [
    'geprek-mozza',
    'geprek-lombok-ijo',
    'geprek-pedas-nagih',
    'geprek-sambal-matah',
    'geprek-ayam-keju',
    'paket-duo',
    'paket-hemat',
    'ayam-karage',
    'dimsum-ayam',
    'ayam-keju-bites',
    'es-teh-manis',
    'air-mineral',
  ]) {
    assert.ok(ids.includes(requiredId), `Missing menu item: ${requiredId}`);
  }

  assert.equal(PLATFORM_LINKS.whatsappMain, '6283821846574');
  assert.ok(OUTLETS.every((o) => o.district.includes('Wonogiri')));
});

test('calculateCartTotals computes subtotal, delivery fee, and item count', () => {
  const sampleItems: CartItem[] = [
    {
      cartKey: buildCartKey('geprek-mozza', 3, 'Dada', [], ''),
      menuId: 'geprek-mozza',
      name: 'Ayam Geprek Mozza',
      basePrice: 26000,
      unitPrice: 26000,
      quantity: 2,
      spiceLevel: 3,
      spiceLabel: 'Level 3 · Pedas Nagih',
      optionChoice: 'Dada',
      addOnIds: [],
      addOnNames: [],
      note: '',
    },
    {
      cartKey: buildCartKey('es-teh-manis', null, 'Es Normal', [], ''),
      menuId: 'es-teh-manis',
      name: 'Es Teh Manis',
      basePrice: 6000,
      unitPrice: 6000,
      quantity: 1,
      spiceLevel: null,
      spiceLabel: null,
      optionChoice: 'Es Normal',
      addOnIds: [],
      addOnNames: [],
      note: '',
    },
  ];

  const pickupTotals = calculateCartTotals(sampleItems, 'pickup');
  assert.equal(pickupTotals.subtotal, 58000);
  assert.equal(pickupTotals.serviceFee, 0);
  assert.equal(pickupTotals.total, 58000);
  assert.equal(pickupTotals.itemCount, 3);

  const deliveryTotals = calculateCartTotals(sampleItems, 'delivery');
  assert.equal(deliveryTotals.serviceFee, 8000);
  assert.equal(deliveryTotals.total, 66000);
});

test('generateVoucherCode produces deterministic GPA-YYMMDD-XXXX format', () => {
  const fixedDate = new Date(2026, 10, 19);
  assert.equal(generateVoucherCode(fixedDate, 42), 'GPA-261119-0042');
});

test('encodeCode39Barcode produces valid positive-width bars', () => {
  const encoded = encodeCode39Barcode('GPA-261119-0042');
  assert.ok(encoded.bars.length > 20);
  assert.ok(encoded.totalWidth > 100);
});

test('buildWhatsAppOrderUrl encodes order details cleanly for 083821846574', () => {
  const url = buildWhatsAppOrderUrl({
    phone: PLATFORM_LINKS.whatsappMain,
    customerName: 'Siti',
    outletName: 'Outlet Wonogiri Kota (Pusat)',
    voucherCode: 'GPA-261119-0042',
    total: 26000,
    items: [
      {
        cartKey: 'k1',
        menuId: 'geprek-mozza',
        name: 'Ayam Geprek Mozza',
        basePrice: 26000,
        unitPrice: 26000,
        quantity: 1,
        spiceLevel: 3,
        spiceLabel: 'Level 3 · Pedas Nagih',
        optionChoice: 'Dada',
        addOnIds: [],
        addOnNames: [],
        note: '',
      },
    ],
  });

  assert.ok(url.startsWith('https://wa.me/6283821846574?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.match(decoded, /GPA-261119-0042/);
  assert.match(decoded, /Wonogiri/);
});

test('buildWordPressThemeFiles and buildGitHubStaticFiles produce complete final export manifests', async () => {
  const wpFiles = buildWordPressThemeFiles();
  const wpPaths = wpFiles.map((f) => f.path);
  assert.ok(wpPaths.includes('geprek-aja/style.css'));
  assert.ok(wpPaths.includes('geprek-aja/functions.php'));
  assert.ok(wpPaths.includes('geprek-aja/front-page.php'));

  const ghFiles = buildGitHubStaticFiles();
  const ghPaths = ghFiles.map((f) => f.path);
  assert.ok(ghPaths.includes('geprek-aja-github/index.html'));
  assert.ok(ghPaths.includes('geprek-aja-github/assets/css/geprek-style.css'));
  assert.ok(ghPaths.includes('geprek-aja-github/assets/js/geprek-order.js'));
  assert.ok(ghPaths.includes('geprek-aja-github/.github/workflows/deploy-pages.yml'));
  assert.ok(ghPaths.includes('geprek-aja-github/package.json'));
  assert.ok(ghPaths.includes('geprek-aja-github/.gitignore'));
  assert.ok(ghPaths.includes('geprek-aja-github/README.md'));

  const jsFile = ghFiles.find((f) => f.path === 'geprek-aja-github/assets/js/geprek-order.js');
  assert.ok(jsFile && jsFile.content.includes('encodeBarcodeSvg'));
  assert.ok(jsFile && jsFile.content.includes('0838-2184-6574'));

  const zipBlob = await generateGitHubSourceZipBlob();
  assert.ok(zipBlob.size > 5000);
});
