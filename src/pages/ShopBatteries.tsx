import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1245 Apple MacBook Air 13" Replacement Battery. Fits A1245 A1237', price: 'R 966.00', priceNum: 966.0, image: '/images/laptop-parts-batteries/1.webp' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1278 Macbook Pro 13" Replacement Battery for  A1322 A1278 2009 2010 2011 2012', price: 'R 1850.00', priceNum: 1850.0, image: '/images/laptop-parts-batteries/2.webp' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1331 Apple MacBook Pro 13" Unibody Replacement Battery. Fits MacBook Pro 15" 17" A1331, A1342, A1322', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/3.webp' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1382 Apple MacBook Pro 15" Unibody Replacement Battery. Fits A1286 Early 2011, A1286 Late 2011, A1286 Mid 2012', price: 'R 2587.50', priceNum: 2587.5, image: '/images/laptop-parts-batteries/4.webp' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1398 Apple MacBook Pro Retina 15" Replacement Battery. Fits A1398, A1417, A1494 (Late 2013 mid 2014, Mid 2015)', price: 'R 2300.00', priceNum: 2300.0, image: '/images/laptop-parts-batteries/5.webp' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1406 Apple MacBook Air 11" Replacement Battery. Fits A1406 A1370 (Mid 2011)', price: 'R 1518.00', priceNum: 1518.0, image: '/images/laptop-parts-batteries/6.webp' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1437 Apple MacBook Pro Retina 13" Replacement Battery. Fits A1437 A1425 (2012 - 2013)', price: 'R 1702.00', priceNum: 1702.0, image: '/images/laptop-parts-batteries/7.webp' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1466 Apple MacBook Air 13" Replacement Battery. Fits A1377, A1496, A1466 (Mid 2012,Mid 2013, Early 2014 Version) A1369 (Mid 2010, Mid 2011 version)', price: 'R 2300.00', priceNum: 2300.0, image: '/images/laptop-parts-batteries/8.webp' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1502 Apple MacBook Pro 13" Retina Replacement Battery (Early 2015) MF839LL/A,  A1582', price: 'R 3450.00', priceNum: 3450.0, image: '/images/laptop-parts-batteries/9.webp' },
  { id: 10, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1534 Apple MacBook Pro Retina 12" Replacement Battery. Fits A1527 A1534 (Early 2015)', price: 'R 2645.00', priceNum: 2645.0, image: '/images/laptop-parts-batteries/10.webp' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'A1820 Apple MacBook Pro Retina 15.4" Replacement Battery. Fits A1820 A1707 (2016-2017)', price: 'R 2850.00', priceNum: 2850.0, image: '/images/laptop-parts-batteries/11.webp' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'a32-k52 Battery for Asus', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/12.webp' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Acer AS07B31 AS07B51 AS07B72 934T2180F AS07B42 LC.BTP00.014', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/13.webp' },
  { id: 14, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Acer AS09A31 AS09A41 AS09A56 AS09A61 AS09A70 AS09A71 AS09A73', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/14.webp' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Acer Aspire 4745G, AS10B31, AS10B71, AS10B75 Battery Black, 10.8V 4400mAh 48Wh', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/15.webp' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Acer Aspire AS10D31 AS10D41 AS10D51 AS10D61 AS10D71 AS10D73 AS10D75', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/16.webp' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Acer ES1-531, S1-521, ES1-531-C1ZS ( AC14B18J, AC14B13J, AC14B13J)', price: 'R 1529.50', priceNum: 1529.5, image: '/images/laptop-parts-batteries/17.webp' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Acer TravelMate 5330G 5520G TM00772 TM00741 TM00742', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/18.webp' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Asus 70-NXM1B2200Z A31-K52 A32-K52 A41-K52 A4', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/19.webp' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for ASUS A32-F52 A32-F82 L0690L6 K40 K40E K40IJ K40IN K50 K51', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/20.webp' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for ASUS A41-X550 A41-X550A X550C X550B X550V X550D X450C X450 X452', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-batteries/21.webp' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Asus G53 G53S G53J G53SV G53SX Fits 07G016DH1875 90-NY81B1000Y', price: 'R 862.50', priceNum: 862.5, image: '/images/laptop-parts-batteries/22.webp' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For ASUS N45E N45J N45S N55 N55E N55S N75S N75E A32-N55 07G016HY1875', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/23.webp' },
  { id: 24, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Dell Inspiron 1525 1526 XR693 X284G RN873 RU586 GW252 312-0625', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/24.webp' },
  { id: 25, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Inspiron 3451 3551 5558 5758 M5Y1K Vostro 3458 3558 Inspiron 14 15 3000 Series', price: 'R 1380.00', priceNum: 1380.0, image: '/images/laptop-parts-batteries/25.webp' },
  { id: 26, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Inspiron 3521 3721 5521 5721 Vostro 2421 2521 0MF69 24DRM', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/26.webp' },
  { id: 27, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Latitude D630 D620 D610 D600 D530 D520 D510 D505 0GD77 0GD787 0JD605', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/27.webp' },
  { id: 28, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Latitude E4300 E4310 0FX8X 312-0822 312-0823 XX337', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/28.webp' },
  { id: 29, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Dell Latitude E6400 ATG XFR E6410 E6500 E6510 312-0748', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/29.webp' },
  { id: 30, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Latitude E6420 E5520 Battery Black, 11.1V 4400mAh 49Wh', price: 'R 1050.00', priceNum: 1050.0, image: '/images/laptop-parts-batteries/30.webp' },
  { id: 31, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Dell Studio 1535 1537 312-0701 312-0702 A2990667 KM887', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/31.webp' },
  { id: 32, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Vostro 3400 3500 3700 V3400 V3500 V3700 Y5XF9 7FJ92', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/32.webp' },
  { id: 33, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell Vostro A840 A860 A860n 1014 1015, Dell Inspiron 1410', price: 'R 862.50', priceNum: 862.5, image: '/images/laptop-parts-batteries/33.webp' },
  { id: 34, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Dell XPS 14 15 17 L502x L702x JWPHF J70W7 WHXY3', price: 'R 977.00', priceNum: 977.0, image: '/images/laptop-parts-batteries/34.webp' },
  { id: 35, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For FUJITSU SIEMENS AMILO PRO V2020, UN255, UN259, M7425, A7640, A7645', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/35.webp' },
  { id: 36, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Fujitsu, Gigabyte, LG 3UR18650-2-T0144 3UR18650-2-T0188 3UR18650-2-T0412 916C7830F', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/36.webp' },
  { id: 37, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP 240 G2 240 G3 246 G3 250 G3 255 740715-001  HSTNN-IB5S', price: 'R 977.00', priceNum: 977.0, image: '/images/laptop-parts-batteries/37.webp' },
  { id: 38, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP 510 530 series 443063-001 440264-ABC 440704-001 440266-ABC', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/38.webp' },
  { id: 39, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Hp Compaq 550 610 510 511 6720s 6730s 451085-141 451085-121 14-volts', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/39.webp' },
  { id: 40, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP Compaq 6510b 6910p 6710b NC6120 NC6230 NC6220 NC6400', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/40.webp' },
  { id: 41, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For HP Compaq NC8230 NX7400 nx7300 NX8220 nx8200 NC8430', price: 'R 862.50', priceNum: 862.5, image: '/images/laptop-parts-batteries/41.webp' },
  { id: 42, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP G62 CQ42 CQ62 MU06 MU09 586006-321 593554-001 593553-001 G6 Series', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/42.webp' },
  { id: 43, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For HP ProBook 4320s 4325s 4326s 4421s 4425s 4520s 4525s 4420s 320 321', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/43.webp' },
  { id: 44, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP ProBook 440 445 450 455 G2 756478-221', price: 'R 977.50', priceNum: 977.5, image: '/images/laptop-parts-batteries/44.webp' },
  { id: 45, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP ProBook 440 450 470 G0 440 455 G1 707617-421 708457-001 FP06 FP09', price: 'R 991.80', priceNum: 991.8, image: '/images/laptop-parts-batteries/45.webp' },
  { id: 46, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP ProBook 4430s 4436s 4530s 4535s 4330s 4730s QK647AA', price: 'R 862.50', priceNum: 862.5, image: '/images/laptop-parts-batteries/46.webp' },
  { id: 47, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP ProBook 4510s 4515s 4710s HSTNN-IB89 513130-321 (11 Volts)', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/47.webp' },
  { id: 48, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for HP ProBook 4510s 4515s 4710s HSTNN-IB89 513130-321 (14 Volts)', price: 'R 862.50', priceNum: 862.5, image: '/images/laptop-parts-batteries/48.webp' },
  { id: 49, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for IBM ThinkPad T410 T420 T510 SL410 42T4703 42T4235 42T4714', price: 'R 832.20', priceNum: 832.2, image: '/images/laptop-parts-batteries/49.webp' },
  { id: 50, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Lenovo 3000 G530 G430 G550 G450 B460 N500 Z360 US', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-batteries/50_Battery_For_LENOVO_G430_N500_G550-2_copy.webp' },
  { id: 51, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Lenovo Ideapad G460 G470 G560 G570 V360 B470 B570 L09C6Y02 L09L6Y02', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-batteries/51.webp' },
  { id: 52, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for lenovo IdeaPad Y480 Y580 G480 G580 L11N6Y01 L11S6Y01', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-batteries/52.webp' },
  { id: 53, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Lenovo IdeaPad Y500 Y530 Y530A Y710 Y730 Y730A 45J7706', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-batteries/53.webp' },
  { id: 54, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Lenovo ThinkPad L430 L530 T430 T430i T530 T530i W520 W530 (70+)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/54.webp' },
  { id: 55, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Mecer, Clevo, Proline C4500BAT-6 Battery Black, 11.1V 4400mAh 49Wh', price: 'R 977.50', priceNum: 977.5, image: '/images/laptop-parts-batteries/55.webp' },
  { id: 56, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for MSI BTY-S14 BTY-S15 FX620DX FR700 FX700 GE620 GE620DX MS-1482', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-batteries/56.webp' },
  { id: 57, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Samsung R45 Pro R510 R60 R65 Pro R70 R700 R710 AA-PB2NC3B', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/57.webp' },
  { id: 58, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Sony vaio VGP-BPL24 VGP-BPS24 VGP-BPSC24 VPC-SA', price: 'R 1590.00', priceNum: 1590.0, image: '/images/laptop-parts-batteries/58.webp' },
  { id: 59, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Sony Vaio VGP-BPS13 VGP-BPL13 VGP-BPS13/Q SR FW', price: 'R 977.50', priceNum: 977.5, image: '/images/laptop-parts-batteries/59.webp' },
  { id: 60, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Sony VGP-BPS26 VGP-BPS26A PCG-61A12L PCG-61A13L PCG-71913L', price: 'R 977.50', priceNum: 977.5, image: '/images/laptop-parts-batteries/60.webp' },
  { id: 61, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Toshiba PA3534U Black, 10.8V 4400mAh/ 48Wh', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/61.webp' },
  { id: 62, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery For Toshiba PA3615U-1BRM PA3615U-1BRS PABAS115 Satellite L45 6cell', price: 'R 977.00', priceNum: 977.0, image: '/images/laptop-parts-batteries/62.webp' },
  { id: 63, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Toshiba PA3634U Black, 10.8V 4400mAh/ 48Wh', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-batteries/63.webp' },
  { id: 64, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery for Toshiba PA5023U-1BRS PA5025U-1BRS PA5024U-1BRS C855 PABAS260', price: 'R 862.00', priceNum: 862.0, image: '/images/laptop-parts-batteries/64.webp' },
  { id: 65, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Battery Replacement for Lenovo IdeaPad 320-14AST 320-14IAP 320-15ABR 320-15AST Series L16L2PB2 L16L2PB1', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/65.webp' },
  { id: 66, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Dell Inspiron 13 5368 5378 5379 14 5482 15 5565 5567 5568 5570 5578 5579 7560 7570 17 5770', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/66_inspiron-13-wdx0r.webp' },
  { id: 67, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Dell Latitude 7480 7280 7490 E7480 E7280 E7490 7380 7390 7290 E7390 E7290 E7380 12 13 14 7000, DM3WC F3YGT-1 KG7VF 2X39G V4940 451-BBYE 453-BBCF 0DM3WC 0F3YGT', price: 'R 1380.00', priceNum: 1380.0, image: '/images/laptop-parts-batteries/67.webp' },
  { id: 68, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Dell Latitude E5270, E5470, E5570, 6MT4T, 7V69V, E5450, E5550, E5570', price: 'R 1380.00', priceNum: 1380.0, image: '/images/laptop-parts-batteries/68_6MT4T.webp' },
  { id: 69, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Dell Latitude E5450 E5550 Notebook 15.6" G5M10 8V5GX R9XM9 WYJC2 1KY05-SIKER', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-batteries/69.webp' },
  { id: 70, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Dell Latitude E7270 E7470 Series MC34Y 0MC34Y 242WD', price: 'R 1380.00', priceNum: 1380.0, image: '/images/laptop-parts-batteries/70_replacement-battery-for-dell-latitude-e7470-55wh-76v-7080mah.webp' },
  { id: 71, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for HP 250 G6, 255 G6, 15-BS, 17-BS, 15Q-BU, 15G-BR, 17-AK, 15-BW, 15Q-BY Series, JC04, JC03', price: 'R 977.00', priceNum: 977.0, image: '/images/laptop-parts-batteries/71_hp250g61.webp' },
  { id: 72, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for HP 250 G7 255 G7 HT03XL, HSTNN-LB8M, L11119-855', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/72_hpHT03XL.webp' },
  { id: 73, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for HP ProBook 430 440 445 450 455 G6 RE03XL', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-batteries/73_RE03XL2.webp' },
  { id: 74, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for HP Probook 450 G4, 430 G4, 440 G4, 455 G4, 470 G4, RR03XL', price: 'R 1380.00', priceNum: 1380.0, image: '/images/laptop-parts-batteries/74_RE03XL.webp' },
  { id: 75, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Latitude E7240 E7250 45Wh 4-Cell KWFFN 0WD52H', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-batteries/75_0WD52H.webp' },
  { id: 76, inStock: true, isUsed: false, category: 'LAPTOP BATTERY', title: 'Replacement Battery for Toshiba C50-B,C50D-B,C50T-B,C55D-B L55D (PA5185U-1BRS)', price: 'R 977.00', priceNum: 977.0, image: '/images/laptop-parts-batteries/76_PA5184U-1.webp' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopBatteries() {
  const [filters, setFilters] = useState<FiltersState>({
    availability: [],
    condition: [],
    location: [],
    grade: []
  });
  
  const [priceInput, setPriceInput] = useState({ min: '', max: '' });
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: Infinity });
  
  const [sortBy, setSortBy] = useState('price-ascending');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (category: keyof FiltersState, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters({ availability: [], condition: [], location: [], grade: [] });
    setPriceInput({ min: '', max: '' });
    setAppliedPriceRange({ min: 0, max: Infinity });
    setCurrentPage(1);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceInput(prev => ({ ...prev, [type]: value }));
  };

  const handleApplyPrice = () => {
    const min = parseFloat(priceInput.min) || 0;
    const max = parseFloat(priceInput.max) || Infinity;
    setAppliedPriceRange({ min, max });
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      if (filters.condition.length > 0) {
        const isNewAllowed = filters.condition.includes('New');
        const isUsedAllowed = filters.condition.includes('Used');
        if (product.isUsed && !isUsedAllowed) return false;
        if (!product.isUsed && !isNewAllowed) return false;
      }
      
      if (filters.availability.length > 0) {
        const inStockAllowed = filters.availability.includes('In Stock');
        const onOrderAllowed = filters.availability.includes('On Order');
        if (product.inStock && !inStockAllowed) return false;
        if (!product.inStock && !onOrderAllowed) return false;
      }

      if (product.priceNum < appliedPriceRange.min || product.priceNum > appliedPriceRange.max) {
        return false;
      }

      return true;
    });
  }, [filters, appliedPriceRange]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-ascending') return a.priceNum - b.priceNum;
      if (sortBy === 'price-descending') return b.priceNum - a.priceNum;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return b.id - a.id; 
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb" style={{ margin: '2rem 0 1rem', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
          Home &gt; Laptop Batteries
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Batteries</h1>
            <span style={{ color: 'var(--gray-dark)', fontSize: '0.9rem' }}>{filteredProducts.length} products</span>
          </div>
          <div className="sort-box">
            <select 
              className="sort-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-ascending">Price: Low to High</option>
              <option value="price-descending">Price: High to Low</option>
              <option value="alphabetical">Alphabetically, A-Z</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>

        <div className="category-layout">
          <ShopSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            priceRange={priceInput}
            onPriceChange={handlePriceChange}
            onApplyPrice={handleApplyPrice}
          />
          
          <div className="category-main">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="cat-product-grid">
                  {paginatedProducts.map(product => (
                    <CategoryProductCard key={product.id} {...product} />
                  ))}
                </div>
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-dark)' }}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button className="btn btn-navy" onClick={handleClearAll} style={{ marginTop: '1rem' }}>Clear all filters</button>
              </div>
            )}
            
            <div className="seo-text-box" style={{ marginTop: '4rem' }}>
              <p>We stock replacement laptop batteries for a wide range of top tier brands. Your battery may eventually fail to hold a charge over time. If your battery indicator constantly shows a low level or rapidly depletes, replacing the battery can add a new lease of life to your computer. Remember to find the exact battery model that perfectly matches your current laptop or Mac model to ensure seamless operation and stability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
