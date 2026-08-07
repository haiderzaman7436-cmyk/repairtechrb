const fs = require('fs');
const http = require('http'); // The site is http://asetos.co.za
const https = require('https');
const path = require('path');

const baseUrl = 'http://asetos.co.za/';
const images = [
  'images/favicon-32x32.png',
  'images/favicon-16x16.png',
  'images/slide-1.webp',
  'images/slide-1-600.webp',
  'images/slide-1.jpg',
  'images/slide-2.webp',
  'images/slide-2-600.webp',
  'images/slide-2.jpg',
  'images/slide-3.webp',
  'images/slide-3-600.webp',
  'images/slide-3.jpg',
  'images/slide-4.webp',
  'images/slide-4-600.webp',
  'images/slide-4.jpg',
  'images/slide-5.webp',
  'images/slide-5-600.webp',
  'images/slide-5.jpg',
  'images/slide-6.webp',
  'images/slide-6-600.webp',
  'images/slide-6.jpg',
  'images/asetos-header-logo-320.webp',
  'images/asetos-header-logo-320.png',
  'images/asetos-footer-logo-288.webp',
  'images/asetos-footer-logo-288.png',
  'images/shop-front.webp',
  'images/shop-front.jpg',
  'images/workshop.webp',
  'images/workshop.jpg',
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const run = async () => {
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  for (const img of images) {
    console.log('Downloading ' + img);
    try {
      await download(baseUrl + img, path.join('public', img));
    } catch(e) {
      console.log('Failed ' + img);
    }
  }
  console.log('Done');
};
run();
