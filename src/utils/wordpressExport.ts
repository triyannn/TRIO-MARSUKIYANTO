import JSZip from 'jszip';
import {
  CHICKEN_ADDONS,
  MENU_ITEMS,
  OUTLETS,
  PLATFORM_LINKS,
  SPICE_LEVELS,
} from '../data/menuData';

export interface WordPressThemeFile {
  path: string;
  content: string;
  language?: 'html' | 'css' | 'js' | 'php' | 'json' | 'yaml' | 'md' | 'txt';
}

const MASCOT_PUBLIC_PATH = '/assets/aistudio/Logo_Ayam_Ceria_Geprek_Aja_1cb8013f.png';

async function fetchMascotPngBytes(): Promise<Uint8Array | null> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') {
    return null;
  }
  try {
    const res = await fetch(MASCOT_PUBLIC_PATH);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    return new Uint8Array(buffer);
  } catch {
    return null;
  }
}

export function buildWordPressThemeFiles(): WordPressThemeFile[] {
  const menuJson = JSON.stringify(MENU_ITEMS, null, 2);
  const spiceJson = JSON.stringify(SPICE_LEVELS, null, 2);
  const addOnsJson = JSON.stringify(CHICKEN_ADDONS, null, 2);
  const outletsJson = JSON.stringify(OUTLETS, null, 2);

  const styleCss = `/*
Theme Name: Geprek Aja
Theme URI: ${PLATFORM_LINKS.githubRepoUrl}
Author: Geprek Aja Kitchen Wonogiri
Description: Tema WordPress resmi & responsif untuk website pemesanan online Geprek Aja (Kabupaten Wonogiri) lengkap dengan profil brand, menu geprek & olahan ayam, kustomisasi level pedas 0-4, add-ons olahan ayam, pembayaran QRIS & voucher barcode Code-39 kasir, Open Mitra WhatsApp 0838-2184-6574, ShopeeFood, GrabFood, dan peta 3 outlet Wonogiri.
Version: 1.2.0
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: geprek-aja
*/

@import url('assets/css/geprek-style.css');
`;

  const themeJson = JSON.stringify(
    {
      $schema: 'https://schemas.wp.org/trunk/theme.json',
      version: 2,
      settings: {
        appearanceTools: true,
        color: {
          palette: [
            { slug: 'canvas', color: '#FAFAFA', name: 'Canvas Putih' },
            { slug: 'surface', color: '#FFFFFF', name: 'Permukaan Kartu' },
            { slug: 'ink', color: '#18181B', name: 'Teks Utama' },
            { slug: 'muted', color: '#52525B', name: 'Teks Sekunder' },
            { slug: 'sambal', color: '#DC2626', name: 'Merah Sambal' },
            { slug: 'api', color: '#EA580C', name: 'Oranye Api' },
            { slug: 'lombok-ijo', color: '#15803D', name: 'Hijau Lombok Ijo' },
          ],
        },
        typography: {
          fontFamilies: [
            {
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              slug: 'display',
              name: 'Bricolage Grotesque',
            },
            {
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              slug: 'body',
              name: 'Plus Jakarta Sans',
            },
          ],
        },
      },
    },
    null,
    2
  );

  const functionsPhp = `<?php
/**
 * Geprek Aja Theme Functions & Customizer Settings
 */

if (!defined('ABSPATH')) {
  exit;
}

function geprek_aja_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption'));
  add_theme_support('editor-styles');
  register_nav_menus(array(
    'primary' => __('Menu Utama Geprek Aja', 'geprek-aja'),
  ));
}
add_action('after_setup_theme', 'geprek_aja_setup');

function geprek_aja_enqueue_assets() {
  wp_enqueue_style(
    'geprek-aja-fonts',
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
    array(),
    null
  );
  wp_enqueue_style(
    'geprek-aja-main',
    get_template_directory_uri() . '/assets/css/geprek-style.css',
    array(),
    '1.2.0'
  );
  wp_enqueue_script(
    'geprek-aja-order',
    get_template_directory_uri() . '/assets/js/geprek-order.js',
    array(),
    '1.2.0',
    true
  );
  wp_localize_script('geprek-aja-order', 'GeprekAjaConfig', array(
    'whatsapp'   => get_theme_mod('geprek_whatsapp', '${PLATFORM_LINKS.whatsappMain}'),
    'shopeeFood' => get_theme_mod('geprek_shopeefood', '${PLATFORM_LINKS.shopeeFood}'),
    'grabFood'   => get_theme_mod('geprek_grabfood', '${PLATFORM_LINKS.grabFood}'),
    'githubUrl'  => get_theme_mod('geprek_github', '${PLATFORM_LINKS.githubRepoUrl}'),
    'outletName' => get_theme_mod('geprek_outlet_name', '${OUTLETS[0].name}'),
    'outletAddr' => get_theme_mod('geprek_outlet_addr', '${OUTLETS[0].address}'),
    'mascotUrl'  => get_template_directory_uri() . '/assets/img/logo-ayam-geprek-aja.png',
  ));
}
add_action('wp_enqueue_scripts', 'geprek_aja_enqueue_assets');

function geprek_aja_customize_register($wp_customize) {
  $wp_customize->add_section('geprek_aja_store', array(
    'title'    => __('Pengaturan Toko Geprek Aja', 'geprek-aja'),
    'priority' => 30,
  ));

  $fields = array(
    'geprek_hero_title' => array('Judul Utama Hero', 'Ayam Geprek Renyah dengan Sambal Sesuai Levelmu.'),
    'geprek_profil_desc'=> array('Profil Singkat Geprek Aja', 'Lahir di Kabupaten Wonogiri, Geprek Aja menyajikan ayam krispi marinasi rempah dengan sambal ulek segar setiap pesanan.'),
    'geprek_whatsapp'   => array('Nomor WhatsApp & Open Mitra (628xxx)', '${PLATFORM_LINKS.whatsappMain}'),
    'geprek_shopeefood' => array('Link Toko ShopeeFood', '${PLATFORM_LINKS.shopeeFood}'),
    'geprek_grabfood'   => array('Link Toko GrabFood', '${PLATFORM_LINKS.grabFood}'),
    'geprek_github'     => array('Link Repository GitHub', '${PLATFORM_LINKS.githubRepoUrl}'),
    'geprek_outlet_name'=> array('Nama Outlet Utama', '${OUTLETS[0].name}'),
    'geprek_outlet_addr'=> array('Alamat Outlet Utama', '${OUTLETS[0].address}'),
  );

  foreach ($fields as $id => $meta) {
    $wp_customize->add_setting($id, array(
      'default'           => $meta[1],
      'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control($id, array(
      'label'   => $meta[0],
      'section' => 'geprek_aja_store',
      'type'    => 'text',
    ));
  }
}
add_action('customize_register', 'geprek_aja_customize_register');

function geprek_aja_order_shortcode() {
  ob_start();
  get_template_part('template-parts/order-app');
  return ob_get_clean();
}
add_shortcode('geprek_aja_order', 'geprek_aja_order_shortcode');
`;

  const headerPhp = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class('ga-body'); ?>>
<?php wp_body_open(); ?>
<header class="ga-header">
  <div class="ga-accent-bar"></div>
  <div class="ga-container ga-header-inner">
    <a class="ga-brand" href="<?php echo esc_url(home_url('/')); ?>">
      <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/img/logo-ayam-geprek-aja.png'); ?>" alt="Logo Geprek Aja" class="ga-brand-logo" />
      <span>Geprek <strong>Aja</strong></span>
    </a>
    <nav class="ga-nav" aria-label="Navigasi Utama">
      <a href="#profil">Profil</a>
      <a href="#menu">Menu</a>
      <a href="#paket">Paket</a>
      <a href="#lokasi">Lokasi</a>
      <a href="#mitra">Open Mitra</a>
      <a href="#voucher">Cek Voucher</a>
    </nav>
    <button type="button" id="ga-open-cart" class="ga-btn-primary">
      Keranjang (<span id="ga-cart-count">0</span>)
    </button>
  </div>
</header>
`;

  const footerPhp = `<footer class="ga-footer">
  <div class="ga-container ga-footer-inner">
    <div>
      <strong>Geprek Aja · Kabupaten Wonogiri</strong>
      <p>Ayam geprek krispi, olahan ayam &amp; sambal ulek segar setiap hari.</p>
    </div>
    <div class="ga-footer-links">
      <a href="<?php echo esc_url(get_theme_mod('geprek_shopeefood', '${PLATFORM_LINKS.shopeeFood}')); ?>" target="_blank" rel="noopener">ShopeeFood</a>
      <a href="<?php echo esc_url(get_theme_mod('geprek_grabfood', '${PLATFORM_LINKS.grabFood}')); ?>" target="_blank" rel="noopener">GrabFood</a>
      <a href="https://wa.me/<?php echo esc_attr(get_theme_mod('geprek_whatsapp', '${PLATFORM_LINKS.whatsappMain}')); ?>" target="_blank" rel="noopener">WhatsApp</a>
      <a href="<?php echo esc_url(get_theme_mod('geprek_github', '${PLATFORM_LINKS.githubRepoUrl}')); ?>" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
`;

  const orderAppPart = `<?php
$hero_title  = get_theme_mod('geprek_hero_title', 'Ayam Geprek Renyah dengan Sambal Sesuai Levelmu.');
$profil_desc = get_theme_mod('geprek_profil_desc', 'Lahir di Kabupaten Wonogiri, Geprek Aja menyajikan ayam krispi marinasi rempah dengan sambal ulek segar setiap pesanan.');
$wa_num      = get_theme_mod('geprek_whatsapp', '${PLATFORM_LINKS.whatsappMain}');
$shopee_url  = get_theme_mod('geprek_shopeefood', '${PLATFORM_LINKS.shopeeFood}');
$grab_url    = get_theme_mod('geprek_grabfood', '${PLATFORM_LINKS.grabFood}');
$mascot_img  = get_template_directory_uri() . '/assets/img/logo-ayam-geprek-aja.png';
?>
<main id="geprek-aja-root" class="ga-main">
  <section class="ga-hero ga-container">
    <div class="ga-hero-grid">
      <div class="ga-hero-copy">
        <p class="ga-kicker">Situs Resmi Geprek Aja · Kabupaten Wonogiri</p>
        <h1><?php echo esc_html($hero_title); ?></h1>
        <p class="ga-lead">Nikmati Ayam Geprek Mozza, Lombok Ijo, Pedas Nagih, Sambal Matah, Saus Keju, Paket Duo &amp; Hemat, serta olahan Karage &amp; Dimsum Ayam. Bayar QRIS &amp; tukar voucher barcode di kasir.</p>
        <div class="ga-hero-actions">
          <a href="#menu" class="ga-btn-primary">Pesan Menu Sekarang</a>
          <a href="https://wa.me/<?php echo esc_attr($wa_num); ?>" target="_blank" rel="noopener" class="ga-btn-green">WhatsApp 0838-2184-6574</a>
        </div>
      </div>
      <div class="ga-mascot-card">
        <img src="<?php echo esc_url($mascot_img); ?>" alt="Maskot Ayam Ceria Geprek Aja" class="ga-mascot-float" />
        <p class="ga-mascot-title">Hallo, Sobat Geprek!</p>
        <p id="ga-mascot-bubble" class="ga-mascot-msg">Hallo! Ada ayam geprek renyah &amp; sambal ulek segar hari ini!</p>
        <button type="button" id="ga-greet-btn" class="ga-btn-orange">Sapa Ayam Lagi &rarr;</button>
      </div>
    </div>
  </section>

  <section id="profil" class="ga-section ga-container">
    <div class="ga-location-box">
      <p class="ga-kicker">Profil Resmi Geprek Aja · Kabupaten Wonogiri</p>
      <h2>Tentang Geprek Aja</h2>
      <p><?php echo esc_html($profil_desc); ?></p>
    </div>
  </section>

  <section id="menu" class="ga-section ga-container">
    <div class="ga-section-head">
      <h2>Daftar Menu &amp; Add-ons Olahan Ayam</h2>
      <div class="ga-tabs" role="tablist">
        <button type="button" class="ga-tab is-active" data-filter="all">Semua Menu</button>
        <button type="button" class="ga-tab" data-filter="ayam">Ayam Geprek</button>
        <button type="button" class="ga-tab" data-filter="paket" id="paket">Paket Duo &amp; Hemat</button>
        <button type="button" class="ga-tab" data-filter="olahan">Olahan &amp; Add-ons</button>
        <button type="button" class="ga-tab" data-filter="minuman">Minuman</button>
      </div>
    </div>
    <div id="ga-menu-grid" class="ga-grid"></div>
  </section>

  <section id="delivery" class="ga-section ga-container">
    <h2>Pesan Juga Lewat Mitra Pengantaran</h2>
    <div class="ga-platform-links">
      <a href="<?php echo esc_url($shopee_url); ?>" target="_blank" rel="noopener" class="ga-platform-card ga-card-orange">ShopeeFood Geprek Aja &rarr;</a>
      <a href="<?php echo esc_url($grab_url); ?>" target="_blank" rel="noopener" class="ga-platform-card ga-card-green">GrabFood Geprek Aja &rarr;</a>
      <a href="https://wa.me/<?php echo esc_attr($wa_num); ?>" target="_blank" rel="noopener" class="ga-platform-card ga-card-red">WhatsApp 0838-2184-6574 &rarr;</a>
    </div>
  </section>

  <section id="lokasi" class="ga-section ga-container">
    <h2>Lokasi 3 Cabang Resmi Kabupaten Wonogiri</h2>
    <div id="ga-outlet-tabs" class="ga-tabs" style="margin-bottom:16px;"></div>
    <div id="ga-outlet-detail" class="ga-location-box"></div>
  </section>

  <section id="mitra" class="ga-section ga-container">
    <div class="ga-mitra-box">
      <p class="ga-kicker">Open Mitra Geprek Aja · 0838-2184-6574</p>
      <h2>Bergabung Menjadi Mitra Outlet &amp; Booth</h2>
      <p>Tanpa biaya royalti bulanan, resep bumbu baku lengkap, dan pendampingan ShopeeFood/GrabFood.</p>
      <div class="ga-mitra-form">
        <input type="text" id="ga-mitra-name" placeholder="Nama Calon Mitra" />
        <input type="text" id="ga-mitra-city" value="Wonogiri Kota" placeholder="Kecamatan / Kota" />
        <select id="ga-mitra-pkg">
          <option value="Paket Booth Usaha">Paket Booth Usaha</option>
          <option value="Paket Outlet Ruko">Paket Outlet Ruko</option>
        </select>
        <button type="button" id="ga-mitra-send" class="ga-btn-green">Kirim Pengajuan via WhatsApp</button>
      </div>
    </div>
  </section>

  <section id="voucher" class="ga-section ga-container">
    <h2>Voucher Barcode Kasir</h2>
    <div id="ga-voucher-display" class="ga-voucher-box">
      <p>Belum ada voucher aktif. Selesaikan pemesanan untuk menerbitkan barcode Code-39 penukaran kasir.</p>
    </div>
  </section>

  <div id="ga-customize-modal" class="ga-modal" hidden>
    <div class="ga-modal-panel">
      <div class="ga-drawer-head">
        <h3 id="ga-modal-title">Kustomisasi Pesanan</h3>
        <button type="button" id="ga-close-modal" class="ga-btn-outline">Tutup</button>
      </div>
      <div id="ga-modal-body" class="ga-modal-body"></div>
      <div class="ga-modal-foot">
        <strong id="ga-modal-price">Rp 0</strong>
        <button type="button" id="ga-modal-add" class="ga-btn-primary">Masukkan Keranjang</button>
      </div>
    </div>
  </div>

  <aside id="ga-cart-drawer" class="ga-drawer" hidden>
    <div class="ga-drawer-panel">
      <div class="ga-drawer-head">
        <h3>Keranjang Pesanan</h3>
        <button type="button" id="ga-close-cart" class="ga-btn-outline">Tutup</button>
      </div>
      <div id="ga-cart-items" class="ga-cart-list"></div>
      <div class="ga-drawer-foot">
        <div class="ga-total-row">
          <span>Total</span>
          <strong id="ga-cart-total">Rp 0</strong>
        </div>
        <select id="ga-fulfillment">
          <option value="pickup">Ambil Sendiri di Outlet (Gratis)</option>
          <option value="dinein">Makan di Sini (Gratis)</option>
          <option value="delivery">Antar Kurir Lokal (+Rp 8.000)</option>
        </select>
        <input type="text" id="ga-customer-name" placeholder="Nama Pemesan" />
        <select id="ga-payment-method">
          <option value="QRIS Instan">QRIS Instan (Voucher Barcode)</option>
          <option value="E-Wallet">E-Wallet (GoPay / OVO / DANA)</option>
          <option value="Virtual Account">Transfer Virtual Account</option>
          <option value="Tunai Kasir">Bayar Tunai di Kasir</option>
        </select>
        <button type="button" id="ga-checkout-btn" class="ga-btn-primary">Bayar &amp; Terbitkan Barcode</button>
      </div>
    </div>
  </aside>
</main>
`;

  const frontPagePhp = `<?php get_header(); ?>
<?php get_template_part('template-parts/order-app'); ?>
<?php get_footer(); ?>
`;

  const indexPhp = `<?php get_header(); ?>
<main class="ga-container ga-section">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article <?php post_class(); ?>>
      <h1><?php the_title(); ?></h1>
      <div class="entry-content"><?php the_content(); ?></div>
    </article>
  <?php endwhile; else : ?>
    <?php get_template_part('template-parts/order-app'); ?>
  <?php endif; ?>
</main>
<?php get_footer(); ?>
`;

  const geprekStyleCss = `:root {
  --ga-bg: #FAFAFA;
  --ga-surface: #FFFFFF;
  --ga-ink: #18181B;
  --ga-muted: #52525B;
  --ga-border: #E4E4E7;
  --ga-red: #DC2626;
  --ga-orange: #EA580C;
  --ga-green: #15803D;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body.ga-body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background: var(--ga-bg);
  color: var(--ga-ink);
  line-height: 1.6;
}
h1, h2, h3, h4 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  margin: 0 0 0.65rem;
  letter-spacing: -0.02em;
}
.ga-accent-bar {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--ga-green), var(--ga-orange), var(--ga-red));
}
.ga-container { max-width: 1152px; margin: 0 auto; padding: 0 20px; }
.ga-header {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--ga-border);
  position: sticky;
  top: 0;
  z-index: 40;
}
.ga-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 64px;
}
.ga-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--ga-ink);
  text-decoration: none;
  white-space: nowrap;
}
.ga-brand strong { color: var(--ga-red); }
.ga-brand-logo { width: 34px; height: 34px; object-fit: contain; }
.ga-nav { display: flex; gap: 20px; }
.ga-nav a {
  color: var(--ga-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
}
.ga-nav a:hover { color: var(--ga-red); }
.ga-btn-primary, .ga-btn-green, .ga-btn-orange, .ga-btn-outline {
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, transform 0.15s ease;
}
.ga-btn-primary { background: var(--ga-red); color: #FFF; }
.ga-btn-primary:hover { background: #B91C1C; }
.ga-btn-green { background: var(--ga-green); color: #FFF; }
.ga-btn-green:hover { background: #166534; }
.ga-btn-orange { background: var(--ga-orange); color: #FFF; }
.ga-btn-orange:hover { background: #C2410C; }
.ga-btn-outline { background: var(--ga-surface); color: var(--ga-ink); border: 1px solid var(--ga-border); }
.ga-btn-outline:hover { background: #F4F4F5; }

.ga-hero { padding: 40px 20px 28px; }
.ga-hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 32px;
  align-items: center;
}
.ga-kicker { color: var(--ga-green); font-size: 0.8rem; font-weight: 700; margin: 0 0 8px; }
.ga-hero h1 { font-size: clamp(2rem, 4vw, 3.1rem); line-height: 1.08; }
.ga-lead { color: var(--ga-muted); max-width: 58ch; margin: 0 0 22px; }
.ga-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
.ga-hero-links { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.85rem; color: var(--ga-muted); border-top: 1px solid var(--ga-border); padding-top: 14px; }
.ga-hero-links a { font-weight: 600; text-decoration: none; }

@keyframes mascotFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(1.5deg); }
}
.ga-mascot-float { width: 140px; height: 140px; object-fit: contain; animation: mascotFloat 4s ease-in-out infinite; }
.ga-mascot-card {
  background: linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 55%, #FEF2F2 100%);
  border: 1px solid var(--ga-border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}
.ga-mascot-title { font-weight: 700; color: var(--ga-green); font-size: 0.85rem; margin: 8px 0 4px; }
.ga-mascot-msg {
  background: #FFF;
  border: 1px solid var(--ga-border);
  border-radius: 10px;
  padding: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 12px;
}

.ga-section { padding: 36px 20px; border-top: 1px solid var(--ga-border); }
.ga-section-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
.ga-tabs { display: flex; flex-wrap: wrap; gap: 6px; background: #F4F4F5; padding: 4px; border-radius: 10px; }
.ga-tab {
  border: none;
  background: transparent;
  padding: 8px 14px;
  border-radius: 7px;
  font-weight: 600;
  font-size: 0.84rem;
  cursor: pointer;
  color: var(--ga-muted);
}
.ga-tab.is-active { background: #FFF; color: var(--ga-ink); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06); }

.ga-pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-top: 18px; }
.ga-pillar { background: #FFF; border: 1px solid var(--ga-border); border-radius: 12px; padding: 18px; }
.ga-pillar strong { display: block; margin-bottom: 4px; }
.ga-pillar p { margin: 0; font-size: 0.85rem; color: var(--ga-muted); }

.ga-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.ga-card {
  background: var(--ga-surface);
  border: 1px solid var(--ga-border);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ga-card:hover { border-color: #FDA4AF; transform: translateY(-2px); }
.ga-card-meta { font-size: 0.76rem; color: var(--ga-muted); margin-bottom: 4px; }
.ga-card-tag { display: inline-block; font-size: 0.72rem; font-weight: 700; color: var(--ga-orange); margin-bottom: 4px; }
.ga-card-price { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 1rem; font-variant-numeric: tabular-nums; }
.ga-card-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #F4F4F5; padding-top: 12px; }

.ga-platform-links { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.ga-platform-card, .ga-location-box, .ga-voucher-box, .ga-mitra-box {
  background: var(--ga-surface);
  border: 1px solid var(--ga-border);
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: var(--ga-ink);
}
.ga-card-orange:hover { border-color: var(--ga-orange); }
.ga-card-green:hover { border-color: var(--ga-green); }
.ga-card-red:hover { border-color: var(--ga-red); }

.ga-mitra-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; margin-top: 16px; }
.ga-mitra-form input, .ga-mitra-form select,
.ga-drawer-foot input, .ga-drawer-foot select,
.ga-modal-body input, .ga-modal-body textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--ga-border);
  border-radius: 8px;
  font-size: 0.88rem;
  font-family: inherit;
}

.ga-modal {
  position: fixed;
  inset: 0;
  background: rgba(24, 24, 27, 0.55);
  z-index: 65;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.ga-modal[hidden] { display: none; }
.ga-modal-panel {
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  background: #FFF;
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ga-modal-body { display: flex; flex-direction: column; gap: 14px; }
.ga-modal-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--ga-border); padding-top: 14px; }
.ga-option-grid { display: flex; flex-wrap: wrap; gap: 6px; }
.ga-chip-btn {
  border: 1px solid var(--ga-border);
  background: #FAFAFA;
  padding: 7px 11px;
  border-radius: 7px;
  font-size: 0.8rem;
  cursor: pointer;
}
.ga-chip-btn.is-selected { border-color: var(--ga-red); background: #FEF2F2; color: var(--ga-red); font-weight: 700; }

.ga-drawer { position: fixed; inset: 0; background: rgba(24, 24, 27, 0.5); z-index: 60; display: flex; justify-content: flex-end; }
.ga-drawer[hidden] { display: none; }
.ga-drawer-panel {
  width: 100%;
  max-width: 430px;
  background: #FFF;
  height: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  gap: 14px;
}
.ga-drawer-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--ga-border); padding-bottom: 12px; }
.ga-cart-list { flex: 1; overflow-y: auto; }
.ga-drawer-foot { border-top: 1px solid var(--ga-border); padding-top: 14px; display: flex; flex-direction: column; gap: 10px; }
.ga-total-row { display: flex; justify-content: space-between; font-size: 1.05rem; }

.ga-barcode-wrap {
  background: #FFF;
  border: 1px dashed var(--ga-border);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  margin: 12px 0;
}
.ga-voucher-status { color: var(--ga-green); font-weight: 700; white-space: nowrap; }

.ga-footer { border-top: 1px solid var(--ga-border); background: var(--ga-surface); padding: 28px 0; margin-top: 32px; }
.ga-footer-inner { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; align-items: center; }
.ga-footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
.ga-footer-links a { color: var(--ga-muted); text-decoration: none; font-size: 0.88rem; }

@media (max-width: 900px) {
  .ga-nav { display: none; }
  .ga-hero-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .ga-mascot-float { animation: none; }
}
@media print {
  header, footer, section:not(#voucher), .ga-no-print { display: none !important; }
  #voucher { border: none !important; }
}
`;

  const geprekOrderJs = `(function() {
  var MENU = ${menuJson};
  var SPICE = ${spiceJson};
  var ADDONS = ${addOnsJson};
  var OUTLETS = ${outletsJson};
  var STORAGE_KEY = 'geprek_aja_vouchers_v1';

  var CODE39 = {
    '0':'nnnwwnwnn','1':'wnnwnnnnw','2':'nnwwnnnnw','3':'wnwwnnnnn',
    '4':'nnnwwnnnw','5':'wnnwwnnnn','6':'nnwwwnnnn','7':'nnnwnnwnw',
    '8':'wnnwnnwnn','9':'nnwwnnwnn','A':'wnnnnwnnw','B':'nnwnnwnnw',
    'C':'wnwnnwnnn','D':'nnnnwwnnw','E':'wnnnwwnnn','F':'nnwnwwnnn',
    'G':'nnnnnwwnw','H':'wnnnnwwnn','I':'nnwnnwwnn','J':'nnnnwwwnn',
    'K':'wnnnnnnww','L':'nnwnnnnww','M':'wnwnnnnwn','N':'nnnnwnnww',
    'O':'wnnnwnnwn','P':'nnwnwnnwn','Q':'nnnnnnwww','R':'wnnnnnwwn',
    'S':'nnwnnnwwn','T':'nnnnwnwwn','U':'wwnnnnnnw','V':'nwwnnnnnw',
    'W':'wwwnnnnnn','X':'nwnnwnnnw','Y':'wwnnwnnnn','Z':'nwwnwnnnn',
    '-':'nwnnnnwnw','*':'nwnnwnwnn'
  };

  var cart = [];
  var activeFilter = 'all';
  var activeOutletId = OUTLETS[0] ? OUTLETS[0].id : '';
  var modalState = null;
  var greetIndex = 0;
  var greetings = [
    'Hallo! Ada ayam geprek renyah & sambal ulek segar hari ini!',
    'Mau Mozza leleh, Lombok Ijo wangi, atau Pedas Nagih level 0–4?',
    'Tersedia juga Karage, Dimsum Ayam, Paket Duo & Paket Hemat!',
    'Bayar QRIS di website langsung terbit Voucher Barcode untuk kasir Wonogiri!'
  ];

  function formatRp(n) {
    return 'Rp ' + Math.round(n).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.');
  }

  function encodeBarcodeSvg(code) {
    var upper = '*' + String(code || 'GPA-000000-0000').toUpperCase() + '*';
    var x = 0;
    var rects = [];
    for (var i = 0; i < upper.length; i++) {
      var pat = CODE39[upper[i]] || CODE39['-'];
      for (var j = 0; j < pat.length; j++) {
        var w = pat[j] === 'w' ? 3.5 : 1.4;
        if (j % 2 === 0) {
          rects.push('<rect x="' + x + '" y="0" width="' + w + '" height="54" fill="#18181B" />');
        }
        x += w;
      }
      x += 1.4;
    }
    return '<svg viewBox="0 0 ' + Math.ceil(x) + ' 54" width="100%" height="58" role="img" aria-label="Barcode Voucher ' + code + '">' + rects.join('') + '</svg>';
  }

  function loadVouchers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveVoucher(v) {
    var list = loadVouchers();
    list.unshift(v);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 10)));
    } catch (e) {}
  }

  function renderMenu() {
    var grid = document.getElementById('ga-menu-grid');
    if (!grid) return;
    var items = MENU.filter(function(m) { return activeFilter === 'all' || m.category === activeFilter; });
    grid.innerHTML = items.map(function(item) {
      return '<article class="ga-card">' +
        '<div>' +
          (item.featuredTag ? '<span class="ga-card-tag">' + item.featuredTag + '</span>' : '') +
          '<div class="ga-card-meta">' + item.categoryLabel + ' · ' + item.shortSpec + '</div>' +
          '<h3>' + item.name + '</h3>' +
          '<p style="color:#52525B;font-size:0.86rem;margin:0;">' + item.description + '</p>' +
        '</div>' +
        '<div class="ga-card-foot">' +
          '<span class="ga-card-price">' + formatRp(item.price) + '</span>' +
          '<button type="button" class="ga-btn-primary ga-open-modal" data-id="' + item.id + '">' +
            (item.isSpicyCustomizable ? 'Pilih Level &amp; Pesan' : 'Pilih &amp; Tambah') +
          '</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function openCustomizeModal(menuId) {
    var item = MENU.find(function(m) { return m.id === menuId; });
    if (!item) return;
    var opts = item.defaultCutOptions || item.drinkTempOptions || ['Standar'];
    modalState = {
      item: item,
      spice: item.isSpicyCustomizable ? 2 : null,
      option: opts[0],
      addOns: [],
      note: ''
    };
    var modal = document.getElementById('ga-customize-modal');
    var titleEl = document.getElementById('ga-modal-title');
    if (titleEl) titleEl.textContent = item.name;
    renderModalBody();
    if (modal) modal.hidden = false;
  }

  function computeModalUnitPrice() {
    if (!modalState) return 0;
    var extraSpice = modalState.spice === 4 ? 2000 : 0;
    var extraAddOns = modalState.addOns.reduce(function(sum, id) {
      var found = ADDONS.find(function(a) { return a.id === id; });
      return sum + (found ? found.price : 0);
    }, 0);
    return modalState.item.price + extraSpice + extraAddOns;
  }

  function renderModalBody() {
    var body = document.getElementById('ga-modal-body');
    var priceEl = document.getElementById('ga-modal-price');
    if (!body || !modalState) return;
    var item = modalState.item;
    var opts = item.defaultCutOptions || item.drinkTempOptions || ['Standar'];

    var spiceHtml = item.isSpicyCustomizable
      ? '<div><strong style="display:block;font-size:0.84rem;margin-bottom:6px;">Pilih Level Kepedasan</strong>' +
          '<div class="ga-option-grid">' +
          SPICE.map(function(s) {
            return '<button type="button" class="ga-chip-btn ga-m-spice' + (modalState.spice === s.level ? ' is-selected' : '') + '" data-lvl="' + s.level + '">' +
              'Lv.' + s.level + ' ' + s.name + (s.priceDelta ? ' (+2rb)' : '') +
            '</button>';
          }).join('') +
        '</div></div>'
      : '';

    var optHtml = '<div><strong style="display:block;font-size:0.84rem;margin-bottom:6px;">Pilihan Penyajian / Potongan</strong>' +
      '<div class="ga-option-grid">' +
      opts.map(function(o) {
        return '<button type="button" class="ga-chip-btn ga-m-opt' + (modalState.option === o ? ' is-selected' : '') + '" data-opt="' + o + '">' + o + '</button>';
      }).join('') +
      '</div></div>';

    var addOnsHtml = item.category !== 'minuman'
      ? '<div><strong style="display:block;font-size:0.84rem;margin-bottom:6px;">Add-ons Olahan Ayam &amp; Pelengkap</strong>' +
          '<div class="ga-option-grid">' +
          ADDONS.map(function(a) {
            var active = modalState.addOns.indexOf(a.id) >= 0;
            return '<button type="button" class="ga-chip-btn ga-m-addon' + (active ? ' is-selected' : '') + '" data-addon="' + a.id + '">' +
              a.name + ' (+' + formatRp(a.price) + ')' +
            '</button>';
          }).join('') +
        '</div></div>'
      : '';

    body.innerHTML = spiceHtml + optHtml + addOnsHtml +
      '<div><label style="display:block;font-size:0.84rem;font-weight:700;margin-bottom:6px;">Catatan Dapur (Opsional)</label>' +
      '<input type="text" id="ga-modal-note" value="' + (modalState.note || '') + '" placeholder="Contoh: sambal dipisah, nasi hangat..." /></div>';

    if (priceEl) priceEl.textContent = formatRp(computeModalUnitPrice());
  }

  function renderCart() {
    var countEl = document.getElementById('ga-cart-count');
    var itemsEl = document.getElementById('ga-cart-items');
    var totalEl = document.getElementById('ga-cart-total');
    if (!countEl || !itemsEl || !totalEl) return;

    var fulfillEl = document.getElementById('ga-fulfillment');
    var fee = fulfillEl && fulfillEl.value === 'delivery' ? 8000 : 0;
    var count = cart.reduce(function(acc, c) { return acc + c.qty; }, 0);
    var sub = cart.reduce(function(acc, c) { return acc + c.price * c.qty; }, 0);
    countEl.textContent = String(count);
    totalEl.textContent = formatRp(cart.length > 0 ? sub + fee : 0);

    if (cart.length === 0) {
      itemsEl.innerHTML = '<p style="color:#52525B;font-size:0.9rem;">Keranjang masih kosong. Pilih menu favorit Anda terlebih dahulu.</p>';
      return;
    }

    itemsEl.innerHTML = cart.map(function(c, idx) {
      return '<div style="padding:10px 0;border-bottom:1px solid #E4E4E7;display:flex;justify-content:space-between;gap:10px;align-items:center;">' +
        '<div>' +
          '<strong>' + c.qty + 'x ' + c.name + '</strong>' +
          '<div style="font-size:0.78rem;color:#52525B;">' +
            (c.spice !== null ? 'Level ' + c.spice + ' · ' : '') + c.option +
            (c.addOnNames.length ? ' · +' + c.addOnNames.join(', ') : '') +
          '</div>' +
        '</div>' +
        '<div style="text-align:right;white-space:nowrap;">' +
          '<div style="font-family:JetBrains Mono,monospace;font-weight:600;font-size:0.86rem;">' + formatRp(c.price * c.qty) + '</div>' +
          '<button type="button" class="ga-cart-del" data-idx="' + idx + '" style="background:none;border:none;color:#DC2626;font-size:0.75rem;cursor:pointer;padding:2px 0;">Hapus</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderOutlets() {
    var tabsEl = document.getElementById('ga-outlet-tabs');
    var detailEl = document.getElementById('ga-outlet-detail');
    if (!tabsEl || !detailEl) return;

    tabsEl.innerHTML = OUTLETS.map(function(o) {
      return '<button type="button" class="ga-tab ga-outlet-tab' + (o.id === activeOutletId ? ' is-active' : '') + '" data-outlet="' + o.id + '">' + o.name.replace('Outlet ', '') + '</button>';
    }).join('');

    var active = OUTLETS.find(function(o) { return o.id === activeOutletId; }) || OUTLETS[0];
    if (!active) return;

    detailEl.innerHTML = '<p class="ga-kicker">' + active.district + ' · ' + active.hours + '</p>' +
      '<h3 style="margin-bottom:6px;">' + active.name + '</h3>' +
      '<p style="color:#52525B;margin:0 0 10px;">' + active.address + '</p>' +
      '<p style="font-size:0.84rem;margin:0 0 14px;">Patokan: ' + active.landmarks.join(' · ') + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;">' +
        '<a href="' + active.googleMapsUrl + '" target="_blank" rel="noopener" class="ga-btn-primary">Buka Google Maps</a>' +
        '<a href="' + active.shopeeFoodUrl + '" target="_blank" rel="noopener" class="ga-btn-orange">ShopeeFood</a>' +
        '<a href="' + active.grabFoodUrl + '" target="_blank" rel="noopener" class="ga-btn-green">GrabFood</a>' +
        '<a href="https://wa.me/' + active.whatsapp + '" target="_blank" rel="noopener" class="ga-btn-outline">WhatsApp 0838-2184-6574</a>' +
      '</div>';
  }

  function renderLatestVoucher() {
    var voucherEl = document.getElementById('ga-voucher-display');
    if (!voucherEl) return;
    var list = loadVouchers();
    if (!list.length) return;
    var v = list[0];
    voucherEl.innerHTML = '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;align-items:center;">' +
        '<div><strong style="font-size:1.1rem;">Voucher Kasir: ' + v.code + '</strong><div style="font-size:0.84rem;color:#52525B;">Pemesan: ' + v.customerName + ' · Metode: ' + v.paymentMethod + ' · Outlet: ' + v.outletName + '</div></div>' +
        '<span class="ga-voucher-status">' + (v.paid ? 'LUNAS · SIAP TUKAR' : 'BAYAR DI KASIR') + '</span>' +
      '</div>' +
      '<div class="ga-barcode-wrap">' + encodeBarcodeSvg(v.code) + '<div style="font-family:JetBrains Mono,monospace;font-size:0.9rem;font-weight:700;margin-top:6px;">' + v.code + '</div></div>' +
      '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">' +
        '<strong>Total: ' + formatRp(v.total) + '</strong>' +
        '<div style="display:flex;gap:8px;">' +
          '<button type="button" onclick="window.print()" class="ga-btn-outline ga-no-print">Cetak Voucher</button>' +
          '<a href="https://wa.me/6283821846574?text=' + encodeURIComponent('Halo Geprek Aja! Pesanan kode ' + v.code + ' a/n ' + v.customerName + ' total ' + formatRp(v.total)) + '" target="_blank" rel="noopener" class="ga-btn-green ga-no-print">Kirim ke WhatsApp</a>' +
        '</div>' +
      '</div>';
  }

  document.addEventListener('click', function(e) {
    var tab = e.target.closest('.ga-tab[data-filter]');
    if (tab) {
      document.querySelectorAll('.ga-tab[data-filter]').forEach(function(t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      activeFilter = tab.getAttribute('data-filter') || 'all';
      renderMenu();
      return;
    }

    var outletTab = e.target.closest('.ga-outlet-tab');
    if (outletTab) {
      activeOutletId = outletTab.getAttribute('data-outlet') || activeOutletId;
      renderOutlets();
      return;
    }

    var modalBtn = e.target.closest('.ga-open-modal');
    if (modalBtn) {
      openCustomizeModal(modalBtn.getAttribute('data-id'));
      return;
    }

    if (e.target.id === 'ga-close-modal') {
      document.getElementById('ga-customize-modal').hidden = true;
      return;
    }

    var spiceChip = e.target.closest('.ga-m-spice');
    if (spiceChip && modalState) {
      modalState.spice = Number(spiceChip.getAttribute('data-lvl'));
      renderModalBody();
      return;
    }

    var optChip = e.target.closest('.ga-m-opt');
    if (optChip && modalState) {
      modalState.option = optChip.getAttribute('data-opt') || 'Standar';
      renderModalBody();
      return;
    }

    var addonChip = e.target.closest('.ga-m-addon');
    if (addonChip && modalState) {
      var aid = addonChip.getAttribute('data-addon');
      var pos = modalState.addOns.indexOf(aid);
      if (pos >= 0) modalState.addOns.splice(pos, 1);
      else modalState.addOns.push(aid);
      renderModalBody();
      return;
    }

    if (e.target.id === 'ga-modal-add' && modalState) {
      var noteEl = document.getElementById('ga-modal-note');
      var addOnNames = modalState.addOns.map(function(id) {
        var found = ADDONS.find(function(a) { return a.id === id; });
        return found ? found.name : '';
      }).filter(Boolean);
      cart.push({
        id: modalState.item.id,
        name: modalState.item.name,
        price: computeModalUnitPrice(),
        qty: 1,
        spice: modalState.spice,
        option: modalState.option,
        addOnNames: addOnNames,
        note: noteEl ? noteEl.value.trim() : ''
      });
      document.getElementById('ga-customize-modal').hidden = true;
      renderCart();
      document.getElementById('ga-cart-drawer').hidden = false;
      return;
    }

    var delBtn = e.target.closest('.ga-cart-del');
    if (delBtn) {
      cart.splice(Number(delBtn.getAttribute('data-idx')), 1);
      renderCart();
      return;
    }

    if (e.target.id === 'ga-open-cart') {
      document.getElementById('ga-cart-drawer').hidden = false;
      return;
    }
    if (e.target.id === 'ga-close-cart') {
      document.getElementById('ga-cart-drawer').hidden = true;
      return;
    }

    if (e.target.id === 'ga-greet-btn') {
      greetIndex = (greetIndex + 1) % greetings.length;
      var bubble = document.getElementById('ga-mascot-bubble');
      if (bubble) bubble.textContent = greetings[greetIndex];
      return;
    }

    if (e.target.id === 'ga-mitra-send') {
      var mName = (document.getElementById('ga-mitra-name').value || 'Calon Mitra').trim();
      var mCity = (document.getElementById('ga-mitra-city').value || 'Wonogiri').trim();
      var mPkg = document.getElementById('ga-mitra-pkg').value;
      var txt = 'Halo Tim Kemitraan Geprek Aja!\\nNama: ' + mName + '\\nPaket: ' + mPkg + '\\nLokasi: ' + mCity + '\\nMohon info detail Open Mitra. Terima kasih.';
      window.open('https://wa.me/6283821846574?text=' + encodeURIComponent(txt), '_blank', 'noopener');
      return;
    }

    if (e.target.id === 'ga-checkout-btn') {
      if (cart.length === 0) return;
      var cName = (document.getElementById('ga-customer-name').value || 'Pelanggan Geprek Aja').trim();
      var payMethod = document.getElementById('ga-payment-method').value;
      var fulfillEl = document.getElementById('ga-fulfillment');
      var fee = fulfillEl && fulfillEl.value === 'delivery' ? 8000 : 0;
      var total = cart.reduce(function(acc, c) { return acc + c.price * c.qty; }, 0) + fee;
      var now = new Date();
      var yy = String(now.getFullYear()).slice(-2);
      var mm = String(now.getMonth() + 1).padStart(2, '0');
      var dd = String(now.getDate()).padStart(2, '0');
      var rand = String(Math.floor(1000 + Math.random() * 9000));
      var code = 'GPA-' + yy + mm + dd + '-' + rand;
      var outlet = OUTLETS.find(function(o) { return o.id === activeOutletId; }) || OUTLETS[0];

      saveVoucher({
        code: code,
        customerName: cName,
        paymentMethod: payMethod,
        outletName: outlet ? outlet.name : 'Outlet Wonogiri Kota',
        total: total,
        paid: payMethod !== 'Tunai Kasir'
      });

      cart = [];
      renderCart();
      renderLatestVoucher();
      document.getElementById('ga-cart-drawer').hidden = true;
      var vSec = document.getElementById('voucher');
      if (vSec) vSec.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.addEventListener('change', function(e) {
    if (e.target.id === 'ga-fulfillment') renderCart();
  });

  renderMenu();
  renderCart();
  renderOutlets();
  renderLatestVoucher();
})();
`;

  const readmeTxt = `PANDUAN INSTALASI & EDIT TEMA WORDPRESS "GEPREK AJA" (WONOGIRI)
=================================================================

1. CARA UPLOAD KE WORDPRESS
   - Masuk ke Dashboard WordPress Admin (wp-admin).
   - Buka menu: Tampilan (Appearance) > Tema (Themes) > Tambah Baru (Add New).
   - Klik "Unggah Tema" (Upload Theme), pilih file "geprek-aja-wp-theme.zip".
   - Klik "Pasang Sekarang" (Install Now), lalu klik "Aktifkan" (Activate).

2. CARA EDIT PROFIL, LINK SHOPEEFOOD, GRABFOOD, GITHUB & WHATSAPP (083821846574)
   - Buka Tampilan > Sesuaikan (Customize) > "Pengaturan Toko Geprek Aja".
   - Shortcode untuk halaman lain: [geprek_aja_order]

3. CARA DEPLOY KE GITHUB PAGES / REPOSITORY GITHUB
   - Unduh paket "geprek-aja-github-final.zip" untuk mendapatkan kode sumber HTML/CSS/JS lengkap + GitHub Actions workflow (.github/workflows/deploy-pages.yml).
`;

  return [
    { path: 'geprek-aja/style.css', content: styleCss, language: 'css' },
    { path: 'geprek-aja/theme.json', content: themeJson, language: 'json' },
    { path: 'geprek-aja/functions.php', content: functionsPhp, language: 'php' },
    { path: 'geprek-aja/header.php', content: headerPhp, language: 'php' },
    { path: 'geprek-aja/footer.php', content: footerPhp, language: 'php' },
    { path: 'geprek-aja/front-page.php', content: frontPagePhp, language: 'php' },
    { path: 'geprek-aja/index.php', content: indexPhp, language: 'php' },
    { path: 'geprek-aja/template-parts/order-app.php', content: orderAppPart, language: 'php' },
    { path: 'geprek-aja/assets/css/geprek-style.css', content: geprekStyleCss, language: 'css' },
    { path: 'geprek-aja/assets/js/geprek-order.js', content: geprekOrderJs, language: 'js' },
    { path: 'geprek-aja/README-WORDPRESS.txt', content: readmeTxt, language: 'txt' },
  ];
}

export function buildGitHubStaticFiles(): WordPressThemeFile[] {
  const wpFiles = buildWordPressThemeFiles();
  const styleContent =
    wpFiles.find((f) => f.path === 'geprek-aja/assets/css/geprek-style.css')
      ?.content ?? '';
  const jsContent =
    wpFiles.find((f) => f.path === 'geprek-aja/assets/js/geprek-order.js')
      ?.content ?? '';

  const indexHtml = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Geprek Aja Wonogiri — Ayam Geprek &amp; Sambal Ulek Segar</title>
  <meta name="description" content="Website resmi Geprek Aja Kabupaten Wonogiri. Pesan Ayam Geprek Mozza, Lombok Ijo, Pedas Nagih, Paket Duo &amp; Hemat, Karage, Dimsum, bayar QRIS dengan Voucher Barcode Kasir &amp; Open Mitra 0838-2184-6574." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/geprek-style.css" />
</head>
<body class="ga-body">
  <header class="ga-header">
    <div class="ga-accent-bar"></div>
    <div class="ga-container ga-header-inner">
      <a class="ga-brand" href="#beranda">
        <img src="assets/img/logo-ayam-geprek-aja.png" alt="Logo Ayam Ceria Geprek Aja" class="ga-brand-logo" />
        <span>Geprek <strong>Aja</strong></span>
      </a>
      <nav class="ga-nav" aria-label="Navigasi Utama">
        <a href="#profil">Profil</a>
        <a href="#menu">Menu</a>
        <a href="#paket">Paket</a>
        <a href="#lokasi">Lokasi</a>
        <a href="#mitra">Open Mitra</a>
        <a href="#voucher">Cek Voucher</a>
      </nav>
      <button type="button" id="ga-open-cart" class="ga-btn-primary">
        Keranjang (<span id="ga-cart-count">0</span>)
      </button>
    </div>
  </header>

  <main id="beranda" class="ga-main">
    <section class="ga-hero ga-container">
      <div class="ga-hero-grid">
        <div class="ga-hero-copy">
          <p class="ga-kicker">Situs Resmi Geprek Aja · Kabupaten Wonogiri</p>
          <h1>Ayam Geprek Renyah dengan Sambal Sesuai Levelmu.</h1>
          <p class="ga-lead">Nikmati Ayam Geprek Mozza, Lombok Ijo, Pedas Nagih, Sambal Matah, Saus Keju, Paket Duo &amp; Hemat, serta olahan Karage &amp; Dimsum Ayam. Pesan langsung, bayar digital QRIS, dan tukar voucher barcode di kasir outlet Wonogiri.</p>
          <div class="ga-hero-actions">
            <a href="#menu" class="ga-btn-primary">Pesan Menu Sekarang</a>
            <a href="https://wa.me/${PLATFORM_LINKS.whatsappMain}" target="_blank" rel="noopener noreferrer" class="ga-btn-green">WhatsApp 0838-2184-6574</a>
          </div>
          <div class="ga-hero-links">
            <span>Tersedia juga di:</span>
            <a href="${PLATFORM_LINKS.shopeeFood}" target="_blank" rel="noopener noreferrer" style="color:#EA580C;">ShopeeFood</a>
            <a href="${PLATFORM_LINKS.grabFood}" target="_blank" rel="noopener noreferrer" style="color:#15803D;">GrabFood</a>
            <a href="#paket" style="color:#DC2626;">Lihat Paket Duo &amp; Hemat</a>
          </div>
        </div>

        <div class="ga-mascot-card">
          <img src="assets/img/logo-ayam-geprek-aja.png" alt="Maskot Ayam Ceria Geprek Aja menyapa pelanggan" class="ga-mascot-float" />
          <p class="ga-mascot-title">Hallo, Sobat Geprek!</p>
          <p id="ga-mascot-bubble" class="ga-mascot-msg">Hallo! Ada ayam geprek renyah &amp; sambal ulek segar hari ini!</p>
          <button type="button" id="ga-greet-btn" class="ga-btn-orange">Sapa Ayam Lagi &rarr;</button>
        </div>
      </div>
    </section>

    <section id="profil" class="ga-section ga-container">
      <p class="ga-kicker">Profil Resmi Brand · Dapur Asli Kabupaten Wonogiri</p>
      <h2>Tentang Geprek Aja</h2>
      <p style="color:#52525B;max-width:72ch;">
        <strong>Geprek Aja</strong> adalah gerai kuliner spesialis ayam geprek krispi dan olahan ayam modern yang lahir di Kabupaten Wonogiri, Jawa Tengah. Setiap pesanan diulek segar dari Level 0 hingga Level 4 dengan standar bahan halal dan higienis.
      </p>
      <div class="ga-pillars">
        <div class="ga-pillar">
          <strong style="color:#DC2626;">Ayam Segar Marinasi 12 Jam</strong>
          <p>Pasokan ayam segar harian dimarinasi rempah khas agar gurih meresap sampai ke tulang.</p>
        </div>
        <div class="ga-pillar">
          <strong style="color:#EA580C;">Sambal Ulek Dadakan Level 0–4</strong>
          <p>Cabai rawit merah dan lombok ijo diulek per porsi tanpa bahan pengawet maupun pewarna buatan.</p>
        </div>
        <div class="ga-pillar">
          <strong style="color:#15803D;">3 Cabang Resmi Wonogiri</strong>
          <p>Melayani makan di tempat, ambil cepat, dan kurir dari Wonogiri Kota, Selogiri, dan Baturetno.</p>
        </div>
      </div>
    </section>

    <section id="menu" class="ga-section ga-container">
      <div class="ga-section-head">
        <div>
          <p class="ga-kicker">Daftar Menu Lengkap · Kustomisasi Level 0–4</p>
          <h2>Pilih Menu &amp; Atur Level Pedas</h2>
        </div>
        <div class="ga-tabs" role="tablist">
          <button type="button" class="ga-tab is-active" data-filter="all">Semua Menu</button>
          <button type="button" class="ga-tab" data-filter="ayam">Ayam Geprek</button>
          <button type="button" class="ga-tab" data-filter="paket" id="paket">Paket Duo &amp; Hemat</button>
          <button type="button" class="ga-tab" data-filter="olahan">Olahan &amp; Add-ons</button>
          <button type="button" class="ga-tab" data-filter="minuman">Minuman</button>
        </div>
      </div>
      <div id="ga-menu-grid" class="ga-grid"></div>
    </section>

    <section id="delivery" class="ga-section ga-container">
      <div class="ga-platform-links">
        <a href="${PLATFORM_LINKS.shopeeFood}" target="_blank" rel="noopener noreferrer" class="ga-platform-card ga-card-orange">
          <strong style="color:#EA580C;">ShopeeFood Geprek Aja &rarr;</strong>
          <p style="font-size:0.84rem;color:#52525B;margin:6px 0 0;">Akses menu lengkap dengan promo pengiriman ShopeeFood.</p>
        </a>
        <a href="${PLATFORM_LINKS.grabFood}" target="_blank" rel="noopener noreferrer" class="ga-platform-card ga-card-green">
          <strong style="color:#15803D;">GrabFood Geprek Aja &rarr;</strong>
          <p style="font-size:0.84rem;color:#52525B;margin:6px 0 0;">Pengiriman cepat dari dapur cabang Wonogiri.</p>
        </a>
        <a href="https://wa.me/${PLATFORM_LINKS.whatsappMain}" target="_blank" rel="noopener noreferrer" class="ga-platform-card ga-card-red">
          <strong style="color:#DC2626;">WhatsApp 0838-2184-6574 &rarr;</strong>
          <p style="font-size:0.84rem;color:#52525B;margin:6px 0 0;">Pesan nasi kotak rombongan &amp; konsultasi langsung.</p>
        </a>
      </div>
    </section>

    <section id="lokasi" class="ga-section ga-container">
      <p class="ga-kicker">Kabupaten Wonogiri, Jawa Tengah</p>
      <h2>Lokasi Dapur Geprek Aja Wonogiri</h2>
      <div id="ga-outlet-tabs" class="ga-tabs" style="margin-bottom:16px;width:fit-content;"></div>
      <div id="ga-outlet-detail" class="ga-location-box"></div>
    </section>

    <section id="mitra" class="ga-section ga-container">
      <div class="ga-mitra-box">
        <p class="ga-kicker">Open Mitra Geprek Aja · 0838-2184-6574</p>
        <h2>Bergabung Menjadi Mitra Outlet &amp; Booth</h2>
        <p style="color:#52525B;margin:0 0 12px;">Tanpa biaya royalti bulanan (100% laba mitra), resep baku sambal ulek &amp; tepung krispi, sistem voucher barcode kasir, serta pendampingan ShopeeFood &amp; GrabFood.</p>
        <div class="ga-mitra-form">
          <input type="text" id="ga-mitra-name" placeholder="Nama Calon Mitra" />
          <input type="text" id="ga-mitra-city" value="Wonogiri Kota" placeholder="Kecamatan / Kota" />
          <select id="ga-mitra-pkg">
            <option value="Paket Booth Usaha">Paket Booth Usaha</option>
            <option value="Paket Outlet Ruko">Paket Outlet Ruko</option>
          </select>
          <button type="button" id="ga-mitra-send" class="ga-btn-green">Hubungi Open Mitra (0838-2184-6574)</button>
        </div>
      </div>
    </section>

    <section id="voucher" class="ga-section ga-container">
      <h2>Voucher Barcode Kasir</h2>
      <div id="ga-voucher-display" class="ga-voucher-box">
        <p style="color:#52525B;margin:0;">Belum ada voucher aktif. Selesaikan pemesanan di keranjang untuk menerbitkan voucher barcode Code-39 penukaran kasir.</p>
      </div>
    </section>
  </main>

  <div id="ga-customize-modal" class="ga-modal" hidden>
    <div class="ga-modal-panel">
      <div class="ga-drawer-head">
        <h3 id="ga-modal-title" style="margin:0;">Kustomisasi Pesanan</h3>
        <button type="button" id="ga-close-modal" class="ga-btn-outline">Tutup</button>
      </div>
      <div id="ga-modal-body" class="ga-modal-body"></div>
      <div class="ga-modal-foot">
        <strong id="ga-modal-price">Rp 0</strong>
        <button type="button" id="ga-modal-add" class="ga-btn-primary">Masukkan Keranjang</button>
      </div>
    </div>
  </div>

  <aside id="ga-cart-drawer" class="ga-drawer" hidden>
    <div class="ga-drawer-panel">
      <div class="ga-drawer-head">
        <h3 style="margin:0;">Keranjang Pesanan</h3>
        <button type="button" id="ga-close-cart" class="ga-btn-outline">Tutup</button>
      </div>
      <div id="ga-cart-items" class="ga-cart-list"></div>
      <div class="ga-drawer-foot">
        <div class="ga-total-row"><span>Total</span><strong id="ga-cart-total">Rp 0</strong></div>
        <select id="ga-fulfillment">
          <option value="pickup">Ambil Sendiri di Outlet (Gratis)</option>
          <option value="dinein">Makan di Sini (Gratis)</option>
          <option value="delivery">Antar Kurir Lokal (+Rp 8.000)</option>
        </select>
        <input type="text" id="ga-customer-name" placeholder="Nama Pemesan" />
        <select id="ga-payment-method">
          <option value="QRIS Instan">QRIS Instan (Voucher Barcode)</option>
          <option value="E-Wallet">E-Wallet (GoPay / OVO / DANA)</option>
          <option value="Virtual Account">Transfer Virtual Account</option>
          <option value="Tunai Kasir">Bayar Tunai di Kasir</option>
        </select>
        <button type="button" id="ga-checkout-btn" class="ga-btn-primary">Bayar &amp; Terbitkan Barcode</button>
      </div>
    </div>
  </aside>

  <footer class="ga-footer">
    <div class="ga-container ga-footer-inner">
      <div>
        <strong>Geprek Aja</strong> · Kabupaten Wonogiri · Ayam Geprek &amp; Olahan Ayam Segar
      </div>
      <div class="ga-footer-links">
        <a href="#profil">Profil</a>
        <a href="#menu">Menu</a>
        <a href="#lokasi">Lokasi Wonogiri</a>
        <a href="#mitra">Open Mitra</a>
        <a href="https://wa.me/${PLATFORM_LINKS.whatsappMain}" target="_blank" rel="noopener noreferrer">WhatsApp 0838-2184-6574</a>
      </div>
    </div>
  </footer>

  <script src="assets/js/geprek-order.js"></script>
</body>
</html>
`;

  const deployWorkflowYml = `name: Deploy Geprek Aja ke GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload static files
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const packageJson = JSON.stringify(
    {
      name: 'geprek-aja-wonogiri',
      version: '1.2.0',
      private: true,
      description:
        'Website resmi pemesanan online Geprek Aja (Kabupaten Wonogiri) lengkap dengan voucher barcode Code-39, kustomisasi level pedas 0-4, peta 3 outlet Wonogiri, dan Open Mitra WhatsApp 0838-2184-6574.',
      scripts: {
        start: 'npx serve .',
        preview: 'npx serve . -l 3000',
      },
      keywords: [
        'geprek-aja',
        'wonogiri',
        'ayam-geprek',
        'github-pages',
        'wordpress-theme',
      ],
      license: 'MIT',
    },
    null,
    2
  );

  const gitignore = `node_modules/
.DS_Store
Thumbs.db
*.log
.env
.env.local
`;

  const readmeMd = `# Geprek Aja — Website Resmi Pemesanan Online & Kemitraan (Wonogiri)

Kode sumber final **siap deploy** untuk **GitHub Pages** maupun **WordPress** tanpa konfigurasi tambahan.

## Struktur File Repository
- \`index.html\` — Halaman utama lengkap (Profil, Menu 13 Item + Level Pedas 0–4 + Add-ons, Keranjang, Pembayaran Digital QRIS, Barcode Voucher Code-39, Peta 3 Cabang Wonogiri, Open Mitra).
- \`assets/css/geprek-style.css\` — Desain responsif 3 warna resmi (**Hijau** \`#15803D\`, **Oranye** \`#EA580C\`, **Merah** \`#DC2626\`) dan animasi maskot.
- \`assets/js/geprek-order.js\` — Logika menu, kalkulasi add-ons, encoder SVG Barcode Code-39, penyimpanan lokal voucher, sapaan maskot, dan integrasi WhatsApp.
- \`assets/img/logo-ayam-geprek-aja.png\` — Logo resmi Maskot Ayam Ceria Geprek Aja.
- \`.github/workflows/deploy-pages.yml\` — Workflow GitHub Actions otomatis ke GitHub Pages setiap push ke branch \`main\`.
- \`wordpress-theme/\` — Salinan tema WordPress siap pakai untuk diunggah via Dashboard WordPress.

## Cara Push ke GitHub & Aktifkan GitHub Pages Otomatis
\`\`\`bash
git init
git add .
git commit -m "Final release website resmi Geprek Aja Wonogiri"
git branch -M main
git remote add origin https://github.com/USERNAME/geprek-aja-web.git
git push -u origin main
\`\`\`
Setelah di-push, buka **Settings → Pages → Source: GitHub Actions** pada repository GitHub Anda. Website otomatis online!

## Jalankan di Lokal
\`\`\`bash
npm run preview
\`\`\`

## Kontak Resmi & Open Mitra
- **WhatsApp Resmi / Open Mitra**: **0838-2184-6574** (\`https://wa.me/6283821846574\`)
- **Outlet Pusat**: Jl. Jenderal Sudirman No. 88, Kabupaten Wonogiri, Jawa Tengah
- **Cabang Lain**: Selogiri Wonogiri & Baturetno Wonogiri
`;

  return [
    { path: 'geprek-aja-github/index.html', content: indexHtml, language: 'html' },
    { path: 'geprek-aja-github/assets/css/geprek-style.css', content: styleContent, language: 'css' },
    { path: 'geprek-aja-github/assets/js/geprek-order.js', content: jsContent, language: 'js' },
    { path: 'geprek-aja-github/.github/workflows/deploy-pages.yml', content: deployWorkflowYml, language: 'yaml' },
    { path: 'geprek-aja-github/package.json', content: packageJson, language: 'json' },
    { path: 'geprek-aja-github/.gitignore', content: gitignore, language: 'txt' },
    { path: 'geprek-aja-github/.nojekyll', content: '', language: 'txt' },
    { path: 'geprek-aja-github/README.md', content: readmeMd, language: 'md' },
  ];
}

export async function generateWordPressThemeZipBlob(): Promise<Blob> {
  const zip = new JSZip();
  const files = buildWordPressThemeFiles();
  for (const file of files) {
    zip.file(file.path, file.content);
  }
  const mascotBytes = await fetchMascotPngBytes();
  if (mascotBytes) {
    zip.file('geprek-aja/assets/img/logo-ayam-geprek-aja.png', mascotBytes);
  }
  return zip.generateAsync({ type: 'blob' });
}

export async function generateGitHubSourceZipBlob(): Promise<Blob> {
  const zip = new JSZip();
  const ghFiles = buildGitHubStaticFiles();
  for (const file of ghFiles) {
    zip.file(file.path, file.content);
  }
  // Include WordPress theme inside wordpress-theme/ folder for one complete final GitHub repository
  const wpFiles = buildWordPressThemeFiles();
  for (const wpFile of wpFiles) {
    const subPath = wpFile.path.replace(/^geprek-aja\//, 'geprek-aja-github/wordpress-theme/');
    zip.file(subPath, wpFile.content);
  }
  const mascotBytes = await fetchMascotPngBytes();
  if (mascotBytes) {
    zip.file('geprek-aja-github/assets/img/logo-ayam-geprek-aja.png', mascotBytes);
    zip.file('geprek-aja-github/wordpress-theme/assets/img/logo-ayam-geprek-aja.png', mascotBytes);
  }
  return zip.generateAsync({ type: 'blob' });
}
