import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  {
    "id": 1,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "100W AC Adapter Generic Sony Laptop Charger with  Center Pin | 19.5V 5.13A(6.5*4.4mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/1.webp"
  },
  {
    "id": 2,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "120W - 135W Acer Laptop Charger | 19v 6.5a-7.1a (5.5*1.7mm)",
    "price": "R 1150.00",
    "priceNum": 1150,
    "image": "/images/laptop-parts-chargers/2.webp"
  },
  {
    "id": 3,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "120W HP Generic Replacement Laptop Charger | 18.5V, 6.5A (7.4*5.0mm)",
    "price": "R 1150.00",
    "priceNum": 1150,
    "image": "/images/laptop-parts-chargers/3.webp"
  },
  {
    "id": 4,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "120W-135W Generic Toshiba Replacement Adapter / Laptop charger | 19V 6.5-7.1A (5.5*2.5mm)",
    "price": "R 1150.00",
    "priceNum": 1150,
    "image": "/images/laptop-parts-chargers/4.webp"
  },
  {
    "id": 5,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "130W Original Dell Laptop Charger (19.5V, 6.7A)",
    "price": "R 1150.00",
    "priceNum": 1150,
    "image": "/images/laptop-parts-chargers/5.webp"
  },
  {
    "id": 6,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "135w HP Generic Replacement Laptop Charger (19V, 7.1A)",
    "price": "R 1150.00",
    "priceNum": 1150,
    "image": "/images/laptop-parts-chargers/6.webp"
  },
  {
    "id": 7,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "135w Lenovo USB Generic Replacement Laptop Charger (20V, 6.75A)",
    "price": "R 1250.00",
    "priceNum": 1250,
    "image": "/images/laptop-parts-chargers/7.webp"
  },
  {
    "id": 8,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "150W Asus AC Adapter Generic Asus Laptop Charger with Center Pin | 20V 7.5A(6.0*3.7mm)",
    "price": "R 1495.00",
    "priceNum": 1495,
    "image": "/images/laptop-parts-chargers/8.webp"
  },
  {
    "id": 9,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "150W Asus Generic Laptop Charger | 5.5*2.5mm (19.5V 7.7A)",
    "price": "R 1495.00",
    "priceNum": 1495,
    "image": "/images/laptop-parts-chargers/9.webp"
  },
  {
    "id": 10,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "180W Asus AC Adapter Generic Asus Laptop Charger with Center Pin | 20V 9A(6.0*3.7mm)",
    "price": "R 1955.00",
    "priceNum": 1955,
    "image": "/images/laptop-parts-chargers/10.webp"
  },
  {
    "id": 11,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "18W Asus, Acer & Other Brands Generic Laptop Charger | 3.0*1.1mm (12V 1.5A)",
    "price": "R 345.00",
    "priceNum": 345,
    "image": "/images/laptop-parts-chargers/11.webp"
  },
  {
    "id": 12,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "210W Dell Alienware, Precision Laptop Charger | 7.4*5.0mm (19.5V 10.8A)",
    "price": "R 1725.00",
    "priceNum": 1725,
    "image": "/images/laptop-parts-chargers/12.webp"
  },
  {
    "id": 13,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "230W Original HP Laptop Charger | 18.5V, 6.5A (7.4*5.0mm)",
    "price": "R 2300.00",
    "priceNum": 2300,
    "image": "/images/laptop-parts-chargers/13.webp"
  },
  {
    "id": 14,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "24W Laptop Charger for Mecer, Connex etc. | 12V 2A  (3.5mm x 1.35mm)",
    "price": "R 345.00",
    "priceNum": 345,
    "image": "/images/laptop-parts-chargers/14.webp"
  },
  {
    "id": 15,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "30W USB Type C  Apple MacBook Pro Generic Laptop Charger | AC Adapter (20V 1.5A)",
    "price": "R 805.00",
    "priceNum": 805,
    "image": "/images/laptop-parts-chargers/15.webp"
  },
  {
    "id": 16,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "36W Adapter LCD Display Monitor Generic Power Supply | 12V, 3A (5.5mm*2.5mm)",
    "price": "R 345.00",
    "priceNum": 345,
    "image": "/images/laptop-parts-chargers/16.webp"
  },
  {
    "id": 17,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "36W Microsoft Surface Pro 3 4 5 6 Generic AC Adapter / Laptop Charger | 12V=2.58A",
    "price": "R 740.00",
    "priceNum": 740,
    "image": "/images/laptop-parts-chargers/17.webp"
  },
  {
    "id": 18,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "40W Acer Generic Laptop Charger | 5.5*1.7mm (19V 2.15A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/18.webp"
  },
  {
    "id": 19,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "40W Asus, Samsung Generic Laptop Charger | 2.5*0.7mm (19V 2.1A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/19.webp"
  },
  {
    "id": 20,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "40W HP AC Adapter Generic Laptop Charger | 19.5V, 2.05A (4.0mm*1.7mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/20.webp"
  },
  {
    "id": 21,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "40W Microsoft Surface RT 10.6″ Generic AC Adapter Magnetic 5PIN-TIP Laptop Charger",
    "price": "R 575.00",
    "priceNum": 575,
    "image": "/images/laptop-parts-chargers/21.webp"
  },
  {
    "id": 22,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "42W Samsung LED Display Monitor Generic Power Supply | 14V, 3A (6.0mm*4.4mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/22.webp"
  },
  {
    "id": 23,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "44W Microsoft Surface Pro 3 4 5 6 Generic AC Adapter / Laptop Charger | 15V=2.58A",
    "price": "R 805.00",
    "priceNum": 805,
    "image": "/images/laptop-parts-chargers/23.webp"
  },
  {
    "id": 24,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W AC Adapter for Dell Inspiron 11/13/14/15, XPS 12/13 Laptop Charger | 19.5V 2.31A (4.5*3.0mm Pin)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/24.webp"
  },
  {
    "id": 25,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Acer Generic laptop Charger for ASPIRE R13 R7-372T | 19V, 2.37A (3.0mm*1.1mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/25.webp"
  },
  {
    "id": 26,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Asus Generic Power Adapter / Laptop Charger | 19V 2.37A (4.0*1.35)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/26.webp"
  },
  {
    "id": 27,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W HP Generic Laptop Charger (Blue Tip) | 19.5V 2.31A (4.5*3.0mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/27.webp"
  },
  {
    "id": 28,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Lenovo Ideapad 310 110 100s Replacement Laptop Charger | 20V, 2.25A (4.0mm*1.7mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/28.webp"
  },
  {
    "id": 29,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Lenovo Rectangular Slim Tip with Middle Pin Connector Replacement Laptop Charger (20V, 2.25A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/29.webp"
  },
  {
    "id": 30,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Lenovo Thinkpad USB Type C / USB C Generic Laptop Charger | 20V, 2.25A",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/30.webp"
  },
  {
    "id": 31,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Magsafe 1 Apple MacBook Air Generic Laptop Charger | AC Adapter (14.5V, 3.1A) Model A1244, ADP-45GD B",
    "price": "R 690.00",
    "priceNum": 690,
    "image": "/images/laptop-parts-chargers/31.webp"
  },
  {
    "id": 32,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Magsafe 2 Apple MacBook Air Generic Laptop Charger | AC Adapter (14.85V 3.05A) Model  A1436, PA-1450-8, NSW25804, A1465, A1466, A1467",
    "price": "R 690.00",
    "priceNum": 690,
    "image": "/images/laptop-parts-chargers/32.webp"
  },
  {
    "id": 33,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W Sony VAIO SVP132A1CW, AC Generic Adapter Laptop Charger (10.5V 4.3 A- 4.8*1.7mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/33.webp"
  },
  {
    "id": 34,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "45W USB Type-C / USB-C Generic Power Adapter for HP,  Lenovo, Dell, MacBook, Chromebook | 20V-2.25A 15V-3A 9V-3A 5V-3A",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/34.webp"
  },
  {
    "id": 35,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "60W Adapter LCD Display Monitor Generic Power Supply | 12V, 5A (5.5mm*2.5mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/35.webp"
  },
  {
    "id": 36,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "60W Adapter LCD Display Monitor Generic Power Supply | 12V, 5A (5.5mm*2.5mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/36.webp"
  },
  {
    "id": 37,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "60W Magsafe 1 Apple MacBook Pro Generic Laptop Charger | AC Adapter (16.5V 3.65A) Model A1184 A1330 A1344",
    "price": "R 782.00",
    "priceNum": 782,
    "image": "/images/laptop-parts-chargers/37.webp"
  },
  {
    "id": 38,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "60W Magsafe 2 Apple MacBook Pro Generic Laptop Charger | AC Adapter (16.5V 3.65A) Model  A1435, PSCV600121",
    "price": "R 782.00",
    "priceNum": 782,
    "image": "/images/laptop-parts-chargers/38.webp"
  },
  {
    "id": 39,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "60W Sony Vaio Generic AC Adaptor / Laptop Charger | 19.5v, 3a (6.5mm*4.4mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/39.webp"
  },
  {
    "id": 40,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "60W Toshiba Generic AC Adaptor / Laptop Charger | 15V, 4A (6.3*3.0mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/40.webp"
  },
  {
    "id": 41,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "61W USB Type C  Apple MacBook Pro Generic Laptop Charger | AC Adapter (20.3v 3a or 9v 3a or 5.2v 2.4a)",
    "price": "R 920.00",
    "priceNum": 920,
    "image": "/images/laptop-parts-chargers/41.webp"
  },
  {
    "id": 42,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Acer Generic laptop Charger | 19v, 3.42a (5.5mm*1.7mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/42.webp"
  },
  {
    "id": 43,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65w Asus Generic Laptop Charger | 5.5*2.5mm (19v, 3.42a)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/43.webp"
  },
  {
    "id": 44,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Dell Generic AC Adapter / Laptop Charger | 19.5V, 3.34A (7.4mm×5.0mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/44.webp"
  },
  {
    "id": 45,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W HP Generic AC Adapter / Laptop Charger with Yellow Tip | 18.5V, 3.5A (4.8*1.7mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/45.webp"
  },
  {
    "id": 46,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W HP Generic AC Adapter / Laptop Charger | 18.5v, 3.5a (7.4*5.0mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/46.webp"
  },
  {
    "id": 47,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W HP PPP009C Generic Laptop Charger | 4.5*3.0mm (19.5V 3.33A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/47.webp"
  },
  {
    "id": 48,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Lenovo Generic AC Adapter / Laptop Charger with Round Tip | 19V, 3.42A (5.5*2.5mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/48.webp"
  },
  {
    "id": 49,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Lenovo Generic AC Adapter / Laptop Charger | 20v, 3.25a (Yellow Rectangular Slim Tip)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/49.webp"
  },
  {
    "id": 50,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Lenovo Yoga IdeaPad Miix Series 5A10G68668  Generic Replacement Laptop Charger | 20V, 3.25A (USB Style Tip)",
    "price": "R 1380.00",
    "priceNum": 1380,
    "image": "/images/laptop-parts-chargers/50.webp"
  },
  {
    "id": 51,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Microsoft Surface Pro 3 4 5 6 Generic AC Adapter / Laptop Charger | 15V, 4A",
    "price": "R 805.00",
    "priceNum": 805,
    "image": "/images/laptop-parts-chargers/51.webp"
  },
  {
    "id": 52,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Samsung Generic Replacement Laptop Charger | 19V, 3.165A (5.5mm*3.0mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/52.webp"
  },
  {
    "id": 53,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Sony Vaio Generic AC Adapter / Laptop Charger | 16V, 4A (6.5*4.4mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/53.webp"
  },
  {
    "id": 54,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Sony Vaio Generic AC Adapter / Laptop Charger | 16V, 4A (6.5*4.4mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/54.webp"
  },
  {
    "id": 55,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "65W Toshiba Generic AC Adapter / Laptop Charger | 19v, 3.42a (5.5*2.5mm)",
    "price": "R 400.00",
    "priceNum": 400,
    "image": "/images/laptop-parts-chargers/55.webp"
  },
  {
    "id": 56,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "80W Sony Vaio Generic Laptop Charger | 6.5*4.4mm (16V 5.0A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/56.webp"
  },
  {
    "id": 57,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "85W Magsafe 1 Apple MacBook Pro Generic Laptop Charger | AC Adapter (16.5-18.5V, 4.6A) Model A1343, ADP-85EB T",
    "price": "R 805.00",
    "priceNum": 805,
    "image": "/images/laptop-parts-chargers/57.webp"
  },
  {
    "id": 58,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "85W Magsafe 2 Apple MacBook Pro Retina Generic Laptop Charger | AC Adapter (20V 4.25A) Model  A1424, ADP-85FB T",
    "price": "R 874.00",
    "priceNum": 874,
    "image": "/images/laptop-parts-chargers/58_Apple85WMagsafe2poweradapter2_8373b1eb-3efc-493b-b98b-0ea8942cb937.webp?v=2"
  },
  {
    "id": 59,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "87W USB Type C  Apple MacBook Pro Generic Laptop Charger | AC Adapter (20.2v 4.3a or 9v 3a)",
    "price": "R 920.00",
    "priceNum": 920,
    "image": "/images/laptop-parts-chargers/59_USBCCharger_29a9c3f2-b457-4ce5-906a-bf86126a0817.webp?v=2"
  },
  {
    "id": 60,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W Acer Generic LaptoAD-AC1947-5517p Charger | 5.5*1.7mm (19V 4.7A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/60.webp"
  },
  {
    "id": 61,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W HP AC Adapter Bullet Tip Generic Laptop Charger (19V 4.74A 4.8*1.7mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/61.webp"
  },
  {
    "id": 62,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W HP Generic Laptop Charger | 19V 4.74A (7.4*5.0mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/62.webp"
  },
  {
    "id": 63,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W HP H6Y89AA Generic Laptop Charger | 4.5*3.0mm (19.5V4.62A)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/63.webp"
  },
  {
    "id": 64,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W Lenovo Generic AC Adapter / Laptop Charger | 20v, 4.52a (8mm*5.5mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/64.webp"
  },
  {
    "id": 65,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W Lenovo Generic AC Adaptor / Laptop Charger |  20V 4.5A (Rectangular Yellow Slim Tip)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/65.webp"
  },
  {
    "id": 66,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W Sony Vaio Generic AC Adapter / Laptop Charger | 19V 4.74A (6.5*4.4mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/66.webp"
  },
  {
    "id": 67,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "90W Toshiba Generic AC Adapter / Laptop Charger | 19V, 4.74A (5.5*2.5mm)",
    "price": "R 460.00",
    "priceNum": 460,
    "image": "/images/laptop-parts-chargers/67.webp"
  },
  {
    "id": 68,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "Apple USB-C charging cable white type C | 1 Meter",
    "price": "R 379.00",
    "priceNum": 379,
    "image": "/images/laptop-parts-chargers/68.webp"
  },
  {
    "id": 69,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "BTI AC-U90EU-IB-90w Universal AC 100-240V Power Adapter , 47/63Hz, DC 16-19V, 90W, 4.74A for IBM/Lenovo Notebooks, Retail Box , 12 months warranty",
    "price": "R 855.78",
    "priceNum": 855.78,
    "image": "/images/laptop-parts-chargers/69.webp"
  },
  {
    "id": 70,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "BTI AC-U90EU-SY-90w Universal AC 100-240V Power Adapter , 47/63Hz, DC 16-19V, 90W, 4.74A for Sony Notebooks, Retail Box , 12 months warranty",
    "price": "R 855.78",
    "priceNum": 855.78,
    "image": "/images/laptop-parts-chargers/70.webp"
  },
  {
    "id": 71,
    "inStock": true,
    "isUsed": false,
    "category": "LAPTOP CHARGER",
    "title": "BTI AC-U90EU-TS-90w Universal AC 100-240V Power Adapter , 47/63Hz, DC 16-19V, 90W, 4.74A for Toshiba Notebooks, Retail Box , 12 months warranty",
    "price": "R 855.78",
    "priceNum": 855.78,
    "image": "/images/laptop-parts-chargers/71.webp"
  }
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
