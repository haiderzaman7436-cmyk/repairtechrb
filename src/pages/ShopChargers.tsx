import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  { id: 1, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '100W AC Adapter Generic Sony Laptop Charger with  Center Pin | 19.5V 5.13A(6.5*4.4mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/1_sony-laptop-charger-500x500_d162a4e3-9e42-41a9-9b03-6ef1d5558caf.png?v=2' },
  { id: 2, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '120W - 135W Acer Laptop Charger | 19v 6.5a-7.1a (5.5*1.7mm)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-chargers/2_120w-charger-500x500.jpg?v=2' },
  { id: 3, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '120W HP Generic Replacement Laptop Charger | 18.5V, 6.5A (7.4*5.0mm)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-chargers/3_HP-19-5V-6-9A-135W_32bb5eb3-6f75-4e6f-8f42-47aed59524ad.jpg?v=2' },
  { id: 4, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '120W-135W Generic Toshiba Replacement Adapter / Laptop charger | 19V 6.5-7.1A (5.5*2.5mm)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-chargers/4_120w-charger-500x500_d95c72e0-ee2d-488d-90e5-baa0ef99e3f0.jpg?v=2' },
  { id: 5, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '130W Original Dell Laptop Charger (19.5V, 6.7A)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-chargers/5_New-Original-UL-Listed-130W-AC-Charger-Adapter-for-Dell-Precision-3541-P80F-Mobile-Workstations-Laptop.webp?v=2' },
  { id: 6, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '135w HP Generic Replacement Laptop Charger (19V, 7.1A)', price: 'R 1150.00', priceNum: 1150.0, image: '/images/laptop-parts-chargers/6_HP-19-5V-6-9A-135W.jpg?v=2' },
  { id: 7, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '135w Lenovo USB Generic Replacement Laptop Charger (20V, 6.75A)', price: 'R 1250.00', priceNum: 1250.0, image: '/images/laptop-parts-chargers/7_135w_lenovo_usb.jpg?v=2' },
  { id: 8, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '150W Asus AC Adapter Generic Asus Laptop Charger with Center Pin | 20V 7.5A(6.0*3.7mm)', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-chargers/8_asus-19v-6.32a-charger-pin-in-centre-6x3.7mm-72076-p.jpg?v=2' },
  { id: 9, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '150W Asus Generic Laptop Charger | 5.5*2.5mm (19.5V 7.7A)', price: 'R 1495.00', priceNum: 1495.0, image: '/images/laptop-parts-chargers/9_150w_ASUS.jpg?v=2' },
  { id: 10, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '180W Asus AC Adapter Generic Asus Laptop Charger with Center Pin | 20V 9A(6.0*3.7mm)', price: 'R 1955.00', priceNum: 1955.0, image: '/images/laptop-parts-chargers/10_asus-19v-6.32a-charger-pin-in-centre-6x3.7mm-72076-p_589dcaad-05fa-4bd7-baf5-e481405b4e5b.jpg?v=2' },
  { id: 11, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '18W Asus, Acer & Other Brands Generic Laptop Charger | 3.0*1.1mm (12V 1.5A)', price: 'R 345.00', priceNum: 345.0, image: '/images/laptop-parts-chargers/11_18w_asus-acer-etc.jpg?v=2' },
  { id: 12, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '210W Dell Alienware, Precision Laptop Charger | 7.4*5.0mm (19.5V 10.8A)', price: 'R 1725.00', priceNum: 1725.0, image: '/images/laptop-parts-chargers/12_210W-dELL-19-5V-10-8A.jpg?v=2' },
  { id: 13, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '230W Original HP Laptop Charger | 18.5V, 6.5A (7.4*5.0mm)', price: 'R 2300.00', priceNum: 2300.0, image: '/images/laptop-parts-chargers/13_Hb4feaee8399b4b999ddab422a6aa2450X.jpg?v=2' },
  { id: 14, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '24W Laptop Charger for Mecer, Connex etc. | 12V 2A  (3.5mm x 1.35mm)', price: 'R 345.00', priceNum: 345.0, image: '/images/laptop-parts-chargers/14_lcas006.jpg?v=2' },
  { id: 15, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '30W USB Type C  Apple MacBook Pro Generic Laptop Charger | AC Adapter (20V 1.5A)', price: 'R 805.00', priceNum: 805.0, image: '/images/laptop-parts-chargers/15_UsbC_a444375a-cfc9-4b8b-916c-2011d94a8eef.jpg?v=2' },
  { id: 16, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '36W Adapter LCD Display Monitor Generic Power Supply | 12V, 3A (5.5mm*2.5mm)', price: 'R 345.00', priceNum: 345.0, image: '/images/laptop-parts-chargers/16_36WLCDMonitor2.jpg?v=2' },
  { id: 17, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '36W Microsoft Surface Pro 3 4 5 6 Generic AC Adapter / Laptop Charger | 12V=2.58A', price: 'R 740.00', priceNum: 740.0, image: '/images/laptop-parts-chargers/17_microsoftsurfacecharger2.jpg?v=2' },
  { id: 18, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '40W Acer Generic Laptop Charger | 5.5*1.7mm (19V 2.15A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/18_40w_acer-charger.jpg?v=2' },
  { id: 19, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '40W Asus, Samsung Generic Laptop Charger | 2.5*0.7mm (19V 2.1A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/19_AsusACAdapterLaptopCharger19V21A.jpg?v=2' },
  { id: 20, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '40W HP AC Adapter Generic Laptop Charger | 19.5V, 2.05A (4.0mm*1.7mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/20_HP-Dell_40W19.5V2.05A.jpg?v=2' },
  { id: 21, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '40W Microsoft Surface RT 10.6″ Generic AC Adapter Magnetic 5PIN-TIP Laptop Charger', price: 'R 575.00', priceNum: 575.0, image: '/images/laptop-parts-chargers/21_MICROSOFT-SURFACE-RT-10.6_-40W-AC-ADAPTER-MAGNETIC-5PIN-TIP_bd8cef28-7fde-4760-993c-3c54ebfed684.jpg?v=2' },
  { id: 22, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '42W Samsung LED Display Monitor Generic Power Supply | 14V, 3A (6.0mm*4.4mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/22_45wsamsung6x4.jpg?v=2' },
  { id: 23, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '44W Microsoft Surface Pro 3 4 5 6 Generic AC Adapter / Laptop Charger | 15V=2.58A', price: 'R 805.00', priceNum: 805.0, image: '/images/laptop-parts-chargers/23_microsoftsurfacecharger2_8d28ac90-7b3d-4589-9d70-f04004183ec8.jpg?v=2' },
  { id: 24, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W AC Adapter for Dell Inspiron 11/13/14/15, XPS 12/13 Laptop Charger | 19.5V 2.31A (4.5*3.0mm Pin)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/24_dell_45w_small_pin.jpg?v=2' },
  { id: 25, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Acer Generic laptop Charger for ASPIRE R13 R7-372T | 19V, 2.37A (3.0mm*1.1mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/25_AD-ACER1923-45WCharger.jpg?v=2' },
  { id: 26, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Asus Generic Power Adapter / Laptop Charger | 19V 2.37A (4.0*1.35)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/26_19V-2-37A-45W-4-0-1-35mm-Laptop-charger-adapter-power-supply-For-ASUS-Zenbook.jpg?v=2' },
  { id: 27, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W HP Generic Laptop Charger (Blue Tip) | 19.5V 2.31A (4.5*3.0mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/27_45w-HP-Blue-Pin-Charger.jpg?v=2' },
  { id: 28, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Lenovo Ideapad 310 110 100s Replacement Laptop Charger | 20V, 2.25A (4.0mm*1.7mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/28_5WLenovoIdeaPad330S-14AST330S-14IKBPowersupplyACAdapter.jpg?v=2' },
  { id: 29, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Lenovo Rectangular Slim Tip with Middle Pin Connector Replacement Laptop Charger (20V, 2.25A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/29_20V-2-25A-45W-Power-Adapter-for-Lenovo-IdeaPad.jpg?v=2' },
  { id: 30, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Lenovo Thinkpad USB Type C / USB C Generic Laptop Charger | 20V, 2.25A', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/30_lenovo_usb_c_charger_678x452_be009b81-f5db-4571-a4a1-8f5322220777.jpg?v=2' },
  { id: 31, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Magsafe 1 Apple MacBook Air Generic Laptop Charger | AC Adapter (14.5V, 3.1A) Model A1244, ADP-45GD B', price: 'R 690.00', priceNum: 690.0, image: '/images/laptop-parts-chargers/31_45wmagsafe.jpg?v=2' },
  { id: 32, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Magsafe 2 Apple MacBook Air Generic Laptop Charger | AC Adapter (14.85V 3.05A) Model  A1436, PA-1450-8, NSW25804, A1465, A1466, A1467', price: 'R 690.00', priceNum: 690.0, image: '/images/laptop-parts-chargers/32_45wmagsafe2.jpg?v=2' },
  { id: 33, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W Sony VAIO SVP132A1CW, AC Generic Adapter Laptop Charger (10.5V 4.3 A- 4.8*1.7mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/33_SONY_VAIO_SVP132A1CW_45W_AC_ADAPTER_10.5V_4.3A_4.81.7mm.jpg?v=2' },
  { id: 34, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '45W USB Type-C / USB-C Generic Power Adapter for HP,  Lenovo, Dell, MacBook, Chromebook | 20V-2.25A 15V-3A 9V-3A 5V-3A', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/34_lenovo_usb_c_charger_678x452_1024x1024_adbdf82b-18e4-4ab4-afc7-8a00e3696edf.jpg?v=2' },
  { id: 35, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '60W Adapter LCD Display Monitor Generic Power Supply | 12V, 5A (5.5mm*2.5mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/35_36WLCDMonitor2_359a6309-9e30-46cf-81bc-8c78227ea967.jpg?v=2' },
  { id: 36, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '60W Adapter LCD Display Monitor Generic Power Supply | 12V, 5A (5.5mm*2.5mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/36_60WLCDMonitor.jpg?v=2' },
  { id: 37, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '60W Magsafe 1 Apple MacBook Pro Generic Laptop Charger | AC Adapter (16.5V 3.65A) Model A1184 A1330 A1344', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-chargers/37_MagsafeLshaped.jpg?v=2' },
  { id: 38, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '60W Magsafe 2 Apple MacBook Pro Generic Laptop Charger | AC Adapter (16.5V 3.65A) Model  A1435, PSCV600121', price: 'R 782.00', priceNum: 782.0, image: '/images/laptop-parts-chargers/38_45wmagsafe2_ecc449f0-110b-41e1-83f1-4c0eacddd40b.jpg?v=2' },
  { id: 39, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '60W Sony Vaio Generic AC Adaptor / Laptop Charger | 19.5v, 3a (6.5mm*4.4mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/39_sony-laptop-charger-500x500.png?v=2' },
  { id: 40, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '60W Toshiba Generic AC Adaptor / Laptop Charger | 15V, 4A (6.3*3.0mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/40_toshiba-15v-4a.jpg?v=2' },
  { id: 41, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '61W USB Type C  Apple MacBook Pro Generic Laptop Charger | AC Adapter (20.3v 3a or 9v 3a or 5.2v 2.4a)', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-chargers/41_runnerway-87w-usb-c-power-adapter-charger-with-type-c-charge-cable-for-apple-macbook-pro15-inch-type__31-V2PCj0xL.jpg?v=2' },
  { id: 42, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Acer Generic laptop Charger | 19v, 3.42a (5.5mm*1.7mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/42_acer-latop-charger-500x500_e5e6fc4c-6743-4f48-967e-1eca3cb9dada.jpg?v=2' },
  { id: 43, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65w Asus Generic Laptop Charger | 5.5*2.5mm (19v, 3.42a)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/43_19-342-laptop-charger-500x500_61aeb0c8-afe2-4c4a-a449-a05152df23c0.jpg?v=2' },
  { id: 44, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Dell Generic AC Adapter / Laptop Charger | 19.5V, 3.34A (7.4mm×5.0mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/44_Dell-laptop-charger-500x500_PA12.jpg?v=2' },
  { id: 45, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W HP Generic AC Adapter / Laptop Charger with Yellow Tip | 18.5V, 3.5A (4.8*1.7mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/45_hp-yellow-tip-charger-500x500.jpg?v=2' },
  { id: 46, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W HP Generic AC Adapter / Laptop Charger | 18.5v, 3.5a (7.4*5.0mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/46_90w-HP-Charger-500x500.jpg?v=2' },
  { id: 47, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W HP PPP009C Generic Laptop Charger | 4.5*3.0mm (19.5V 3.33A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/47_HP_Blue_Tip.jpg?v=2' },
  { id: 48, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Lenovo Generic AC Adapter / Laptop Charger with Round Tip | 19V, 3.42A (5.5*2.5mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/48_Lenovo-new-charger-65w-500x500.jpg?v=2' },
  { id: 49, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Lenovo Generic AC Adapter / Laptop Charger | 20v, 3.25a (Yellow Rectangular Slim Tip)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/49_Lenovo-usb-charger-65w-500x500.jpg?v=2' },
  { id: 50, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Lenovo Yoga IdeaPad Miix Series 5A10G68668  Generic Replacement Laptop Charger | 20V, 3.25A (USB Style Tip)', price: 'R 1380.00', priceNum: 1380.0, image: '/images/laptop-parts-chargers/50_65W_For_Lenovo_Yoga_3_Pro_Series_20V_3.25A_1024x1024_1391b6d0-f46c-40c4-b70b-bc5c7dba297d.jpg?v=2' },
  { id: 51, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Microsoft Surface Pro 3 4 5 6 Generic AC Adapter / Laptop Charger | 15V, 4A', price: 'R 805.00', priceNum: 805.0, image: '/images/laptop-parts-chargers/51_microsoftsurfacecharger2_c2f9f9a5-80eb-46f6-ada4-9877e19c2ee5.jpg?v=2' },
  { id: 52, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Samsung Generic Replacement Laptop Charger | 19V, 3.165A (5.5mm*3.0mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/52_65w_samsung_large_1f1cb3dd-6788-451e-a36f-246466b4e282.jpg?v=2' },
  { id: 53, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Sony Vaio Generic AC Adapter / Laptop Charger | 16V, 4A (6.5*4.4mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/53_60w_Sony.jpg?v=2' },
  { id: 54, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Sony Vaio Generic AC Adapter / Laptop Charger | 16V, 4A (6.5*4.4mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/54_60w_Sony_e7606879-3247-4165-a7b0-8409f25ab798.jpg?v=2' },
  { id: 55, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '65W Toshiba Generic AC Adapter / Laptop Charger | 19v, 3.42a (5.5*2.5mm)', price: 'R 400.00', priceNum: 400.0, image: '/images/laptop-parts-chargers/55_19-342-laptop-charger-500x500_b372da40-6aaf-4b4a-87e4-02f569347b68.jpg?v=2' },
  { id: 56, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '80W Sony Vaio Generic Laptop Charger | 6.5*4.4mm (16V 5.0A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/56_60w_Sony_82a9f359-2ee1-4552-b186-1204e4e987d7.jpg?v=2' },
  { id: 57, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '85W Magsafe 1 Apple MacBook Pro Generic Laptop Charger | AC Adapter (16.5-18.5V, 4.6A) Model A1343, ADP-85EB T', price: 'R 805.00', priceNum: 805.0, image: '/images/laptop-parts-chargers/57_1276255248_687130.jpg?v=2' },
  { id: 58, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '85W Magsafe 2 Apple MacBook Pro Retina Generic Laptop Charger | AC Adapter (20V 4.25A) Model  A1424, ADP-85FB T', price: 'R 874.00', priceNum: 874.0, image: '/images/laptop-parts-chargers/58_Apple85WMagsafe2poweradapter2_8373b1eb-3efc-493b-b98b-0ea8942cb937.jpg?v=2' },
  { id: 59, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '87W USB Type C  Apple MacBook Pro Generic Laptop Charger | AC Adapter (20.2v 4.3a or 9v 3a)', price: 'R 920.00', priceNum: 920.0, image: '/images/laptop-parts-chargers/59_USBCCharger_29a9c3f2-b457-4ce5-906a-bf86126a0817.jpg?v=2' },
  { id: 60, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W Acer Generic LaptoAD-AC1947-5517p Charger | 5.5*1.7mm (19V 4.7A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/60_acer-90w-latop-charger-500x500.jpg?v=2' },
  { id: 61, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W HP AC Adapter Bullet Tip Generic Laptop Charger (19V 4.74A 4.8*1.7mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/61_HP_90W_AC_ADAPTER_19V_4.74A_4.81.7mm_BULLET_TIP.jpg?v=2' },
  { id: 62, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W HP Generic Laptop Charger | 19V 4.74A (7.4*5.0mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/62_90w-HP-Charger-500x500_7ec6f3ad-c926-4df2-b939-773d77d0b965.jpg?v=2' },
  { id: 63, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W HP H6Y89AA Generic Laptop Charger | 4.5*3.0mm (19.5V4.62A)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/63_hp90w2.jpg?v=2' },
  { id: 64, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W Lenovo Generic AC Adapter / Laptop Charger | 20v, 4.52a (8mm*5.5mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/64_Lenovo-old-charger-90w-500x500.jpg?v=2' },
  { id: 65, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W Lenovo Generic AC Adaptor / Laptop Charger |  20V 4.5A (Rectangular Yellow Slim Tip)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/65_Lenovo-usb-charger-65w-500x500_1024x1024_92d3a7d6-767b-44db-91d0-b05389e5f62b.jpg?v=2' },
  { id: 66, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W Sony Vaio Generic AC Adapter / Laptop Charger | 19V 4.74A (6.5*4.4mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/66_60w_Sony_5c7b04cc-4dfc-494d-96bc-9544543a2c6e.jpg?v=2' },
  { id: 67, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: '90W Toshiba Generic AC Adapter / Laptop Charger | 19V, 4.74A (5.5*2.5mm)', price: 'R 460.00', priceNum: 460.0, image: '/images/laptop-parts-chargers/67_19-342-laptop-charger-500x500_906674a8-991b-4281-8643-6f5e653d7a5a.jpg?v=2' },
  { id: 68, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: 'Apple USB-C charging cable white type C | 1 Meter', price: 'R 379.00', priceNum: 379.0, image: '/images/laptop-parts-chargers/68_AppleUSBCChargeCable1m.jpg?v=2' },
  { id: 69, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: 'BTI AC-U90EU-IB-90w Universal AC 100-240V Power Adapter , 47/63Hz, DC 16-19V, 90W, 4.74A for IBM/Lenovo Notebooks, Retail Box , 12 months warranty', price: 'R 855.78', priceNum: 855.78, image: '/images/laptop-parts-chargers/69_AC-U90EU-IB-01_2018-09-04_06-50-38_eVJEPHRsln.jpg?v=2' },
  { id: 70, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: 'BTI AC-U90EU-SY-90w Universal AC 100-240V Power Adapter , 47/63Hz, DC 16-19V, 90W, 4.74A for Sony Notebooks, Retail Box , 12 months warranty', price: 'R 855.78', priceNum: 855.78, image: '/images/laptop-parts-chargers/70_AC-U90EU-sy-01_2018-06-27_09-23-58_rkP00GkETv.jpg?v=2' },
  { id: 71, inStock: true, isUsed: false, category: 'LAPTOP CHARGER', title: 'BTI AC-U90EU-TS-90w Universal AC 100-240V Power Adapter , 47/63Hz, DC 16-19V, 90W, 4.74A for Toshiba Notebooks, Retail Box , 12 months warranty', price: 'R 855.78', priceNum: 855.78, image: '/images/laptop-parts-chargers/71_AC-U90EU-TS-01_2018-06-27_09-23-58_GYdp8c9WR4.jpg?v=2' }
];

const ITEMS_PER_PAGE = 12;

export default function ShopChargers() {
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
          Home &gt; Laptop Chargers
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Laptop Chargers</h1>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Laptop Charger and Adapter Options</h3>
              <p>Choosing the right charger is critical. Ensure your voltage matches your device to prevent damage. We supply high-quality replacement chargers designed for durability and consistent power delivery. Please confirm your tip size before purchasing.</p>
              
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>Can my Laptop use a Charger with different voltage?</h3>
              <p>No, you should never use a charger with a different voltage than what your laptop specifies, as this can severely damage your computer. You can use a charger with higher amperage, but never lower. Always stick to the recommended voltage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
