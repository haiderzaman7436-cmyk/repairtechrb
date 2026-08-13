import { useState, useMemo } from 'react';
import ShopSidebar, { type FiltersState } from '../components/shop/ShopSidebar';
import CategoryProductCard from '../components/shop/CategoryProductCard';
import Pagination from '../components/shop/Pagination';

const initialProducts = [
  // First Screenshot
  { id: 1, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 430 G5 13.3" Laptop - Intel Core i5', price: 'R 4,250.00', priceNum: 4250, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 2, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T480 14" Laptop - Intel Core i5', price: 'R 4,950.00', priceNum: 4950, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 3, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 840 G5 14" Laptop - Intel Core i5', price: 'R 5,450.00', priceNum: 5450, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 4, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T480s 14" Premium Business Laptop', price: 'R 5,900.00', priceNum: 5900, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 5, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5490 14" Laptop - Intel Core i5', price: 'R 5,950.00', priceNum: 5950, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 6, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7490 14" Premium Business Laptop', price: 'R 6,450.00', priceNum: 6450, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 7, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5400 14" Laptop - Intel Core i5', price: 'R 6,450.00', priceNum: 6450, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 8, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T490 14" Laptop - Intel Core i5', price: 'R 6,950.00', priceNum: 6950, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 9, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X1 Carbon 6th Gen 14" Premium', price: 'R 7,950.00', priceNum: 7950, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 10, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo Thinkpad L480 14" Intel Core i5 8th Gen 8GB', price: 'R 4,999.00', priceNum: 4999, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 11, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 3410 14" HD Intel Core i3 10110U 8GB', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 12, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5400 14" FHD Intel Core i5 8265U 8GB', price: 'R 5,500.00', priceNum: 5500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 13, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad L390 13.3" FHD Touch Intel Core i5', price: 'R 5,500.00', priceNum: 5500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 14, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Vostro 3500 15.6" FHD Intel Core i3 1115G4 8GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 15, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T14s Gen 1 14" FHD Touch Intel Core i5', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 16, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5410 14" FHD Intel Core i5 10210U 8GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 17, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5420 14" FHD Intel Core i5 1135G7 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 18, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 840 G6 14" FHD Intel Core i5 8265U 8GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 19, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X1 Carbon 7th Gen 14" FHD Intel Core i5', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 20, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7410 14" FHD Intel Core i5 10310U 16GB', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 21, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook Firefly 14 G7 14" FHD Intel Core i7 10510U', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 22, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T14 Gen 2 14" FHD Intel Core i5', price: 'R 10,500.00', priceNum: 10500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 23, inStock: true, isUsed: true, category: 'USED DESKTOP', title: 'Dell OptiPlex 3080 Micro Intel Core i5 10500T 8GB', price: 'R 4,500.00', priceNum: 4500, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' },
  { id: 24, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 450 G8 15.6" FHD Intel Core i5 1135G7 8GB', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },

  // Second Screenshot
  { id: 25, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad L15 Gen 1 15.6" FHD Touch Intel Core i5', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 26, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5500 15.6" FHD Intel Core i5 8265U 8GB', price: 'R 5,500.00', priceNum: 5500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 27, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 850 G6 15.6" FHD Intel Core i5 8265U 8GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 28, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5510 15.6" FHD Intel Core i5 10210U 8GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 29, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 3510 15.6" HD Intel Core i3 10110U 8GB', price: 'R 4,900.00', priceNum: 4900, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 30, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 450 G7 15.6" FHD Intel Core i5 10210U 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 31, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad E15 Gen 2 15.6" FHD Intel Core i5', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 32, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Vostro 3500 15.6" FHD Intel Core i5 1135G7 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 33, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 850 G5 15.6" FHD Intel Core i5 8250U 8GB', price: 'R 5,500.00', priceNum: 5500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 34, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T15 Gen 1 15.6" FHD Intel Core i5', price: 'R 9,500.00', priceNum: 9500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 35, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5520 15.6" FHD Intel Core i5 1145G7 8GB', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 36, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 450 G9 15.6" FHD Intel Core i5 1235U 8GB', price: 'R 10,500.00', priceNum: 10500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 37, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad E590 15.6" FHD Intel Core i5 8265U 8GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 38, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 3541 15.6" FHD Intel Core i7 9750H 16GB', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 39, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 850 G7 15.6" FHD Intel Core i5 10210U 16GB', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 40, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T590 15.6" FHD Intel Core i5 8265U 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 41, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5530 15.6" FHD Intel Core i5 1235U 8GB', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 42, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook 15 G5 15.6" FHD Intel Core i7 8750H 16GB', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 43, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad P53s 15.6" FHD Intel Core i7 8565U 16GB', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 44, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 3551 15.6" FHD Intel Core i7 10750H 16GB', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 45, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook Studio G5 15.6" FHD Intel Core i7 8750H 16GB', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 46, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad P15s Gen 1 15.6" FHD Intel Core i7', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 47, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7520 15.6" FHD Intel Core i5 1145G7 16GB', price: 'R 10,500.00', priceNum: 10500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },

  // Third Screenshot
  { id: 48, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 830 G6 13.3" FHD Intel Core i5 8265U 8GB', price: 'R 5,500.00', priceNum: 5500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 49, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 830 G7 13.3" FHD Intel Core i5 10210U 8GB', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 50, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7300 13.3" FHD Intel Core i7 8665U 16GB', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 51, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7390 13.3" FHD Touch Intel Core i5 8350U 8GB', price: 'R 5,500.00', priceNum: 5500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 52, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 440 G7 14" FHD Intel Core i5 10210U 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 53, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook 14u G6 14" FHD Intel Core i7 8565U 16GB', price: 'R 9,500.00', priceNum: 9500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 54, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7400 14" FHD Touch Intel Core i7 8665U 16GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 55, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook x360 1040 G6 14" FHD Touch Intel Core i5', price: 'R 10,500.00', priceNum: 10500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 56, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X390 13.3" FHD Touch Intel Core i5 8265U', price: 'R 6,500.00', priceNum: 6500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 57, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7420 14" FHD Touch Intel Core i7 1185G7 16GB', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 58, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5310 13.3" FHD Touch Intel Core i5 10210U 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 59, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 840 G7 14" FHD Touch Intel Core i7 10610U 16GB', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 60, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X13 Gen 1 13.3" FHD Intel Core i5 10210U 8GB', price: 'R 10,500.00', priceNum: 10500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 61, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 430 G8 13.3" FHD Intel Core i5 1135G7 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 62, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5320 13.3" FHD Touch Intel Core i5 1145G7 8GB', price: 'R 10,500.00', priceNum: 10500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 63, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 830 G8 13.3" FHD Intel Core i5 1135G7 16GB', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 64, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook x360 830 G6 13.3" FHD Touch Intel Core i5 8265U', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 65, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7310 13.3" FHD Touch Intel Core i7 10610U 16GB', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 66, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 440 G8 14" FHD Intel Core i5 1135G7 8GB', price: 'R 8,500.00', priceNum: 8500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 67, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5430 14" FHD Intel Core i5 1235U 8GB', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 68, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad L13 Gen 2 13.3" FHD Intel Core i5 1135G7', price: 'R 11,500.00', priceNum: 11500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 69, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 3420 14" FHD Intel Core i5 1135G7 8GB', price: 'R 7,500.00', priceNum: 7500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 70, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 840 G8 14" FHD Intel Core i5 1135G7 16GB', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 71, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X13 Gen 2 13.3" FHD Intel Core i5 1135G7', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },

  // Fourth Screenshot
  { id: 72, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T14 Gen 2 14" FHD Intel Core i5 1135G7 16GB', price: 'R 12,000.00', priceNum: 12000, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 73, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 3560 15.6" FHD Intel Core i7 1185G7 16GB', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 74, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X13 Gen 2 13.3" FHD Intel Core i7 1165G7', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 75, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T14 Gen 2 14" FHD Intel Core i7 1165G7 16GB', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 76, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7420 14" FHD Touch Intel Core i7 1185G7 16GB', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 77, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X1 Carbon 9th Gen 14" FHD+ Intel Core i7', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 78, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T14 Gen 3 14" FHD+ Touch Intel Core i7', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 79, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7430 14" FHD Touch Intel Core i7 1265U 16GB', price: 'R 17,500.00', priceNum: 17500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 80, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X1 Carbon Gen 10 14" FHD+ Touch Intel Core i7', price: 'R 24,000.00', priceNum: 24000, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 81, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook x360 1040 G8 14" FHD Touch Intel Core i7', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 82, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7430 14" FHD Intel Core i7 1265U 16GB', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 83, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 840 G9 14" FHD Intel Core i7 1255U 16GB', price: 'R 18,500.00', priceNum: 18500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 84, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 9420 14" FHD+ Touch Intel Core i7 1185G7', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 85, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell XPS 13 9305 13.3" FHD Intel Core i7 1165G7 16GB', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 86, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 3580 15.6" FHD Intel Core i7 1355U 16GB', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 87, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad P14s Gen 2 14" FHD Intel Core i7 1165G7', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 88, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 5540 15.6" FHD Intel Core i7 9850H 16GB', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 89, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 5550 15.6" FHD+ Intel Core i7 10850H 32GB', price: 'R 18,500.00', priceNum: 18500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 90, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 5560 15.6" FHD+ Touch Intel Core i7 11850H', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 91, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 7740 17.3" FHD Intel Core i7 9850H 32GB', price: 'R 20,500.00', priceNum: 20500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 92, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X1 Extreme Gen 2 15.6" FHD Intel Core i7', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 93, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell XPS 15 9500 15.6" FHD+ Intel Core i7 10750H 16GB', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 94, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 5570 15.6" FHD+ Intel Core i7 12800H 32GB', price: 'R 22,500.00', priceNum: 22500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 95, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad P15 Gen 2 15.6" FHD Intel Core i7 11850H 32GB', price: 'R 25,500.00', priceNum: 25500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },

  // Fifth Screenshot
  { id: 96, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 3571 15.6" FHD Intel Core i7 12700H 32GB', price: 'R 22,500.00', priceNum: 22500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 97, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 3561 15.6" FHD Intel Core i7 11850H 32GB', price: 'R 17,500.00', priceNum: 17500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 98, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook Firefly 15 G8 15.6" FHD Intel Core i7 1165G7', price: 'R 17,500.00', priceNum: 17500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 99, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5530 15.6" FHD Intel Core i7 1265U 16GB', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 100, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 850 G8 15.6" FHD Intel Core i7 1165G7 16GB', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 101, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook Firefly 15 G8 Mobile Workstation 15.6"', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 102, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 5520 15.6" FHD Intel Core i7 1185G7 16GB', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 103, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7530 15.6" FHD Intel Core i7 1265U 16GB', price: 'R 20,500.00', priceNum: 20500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 104, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad X1 Extreme Gen 3 15.6" FHD Intel Core i7', price: 'R 19,500.00', priceNum: 19500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 105, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T15g Gen 1 15.6" FHD Intel Core i7 10750H', price: 'R 17,500.00', priceNum: 17500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 106, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 7550 15.6" FHD Intel Core i7 10850H 32GB', price: 'R 19,500.00', priceNum: 19500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 107, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 7520 15.6" FHD Intel Core i7 1185G7 16GB', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 108, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Latitude 9510 15.0" FHD Intel Core i7 10810U 16GB', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 109, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 5750 17.0" FHD+ Intel Core i7 10850H 32GB', price: 'R 22,500.00', priceNum: 22500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 110, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP Zbook Fury 15 G7 15.6" FHD Intel Core i7 10750H 32GB', price: 'R 24,500.00', priceNum: 24500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 111, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad P15v Gen 1 15.6" FHD Intel Core i7 10750H', price: 'R 22,500.00', priceNum: 22500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 112, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ZBook Power G8 Mobile Workstation 15.6" FHD', price: 'R 22,500.00', priceNum: 22500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 113, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 7560 15.6" FHD Intel Core i7 11850H 32GB', price: 'R 22,500.00', priceNum: 22500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 114, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF F15 FX506 15.6" FHD 144Hz Intel Core i5 11400H', price: 'R 12,500.00', priceNum: 12500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 115, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF F15 FX506 15.6" FHD 144Hz Intel Core i7 11800H', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 116, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Dash F15 FX516 15.6" FHD 144Hz Intel Core i7', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 117, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming A15 FA506 15.6" FHD 144Hz AMD Ryzen 7', price: 'R 14,500.00', priceNum: 14500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 118, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G15 G513 15.6" FHD 144Hz AMD Ryzen 7', price: 'R 16,500.00', priceNum: 16500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 119, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Dell G15 5511 15.6" FHD 120Hz Intel Core i5 11400H', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },

  // Sixth Screenshot
  { id: 120, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF F15 Gaming Intel Core i5 11400H 15.6" FHD 144Hz', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 121, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook 450 G9 15.6" FHD Intel Core i5 1235U 8GB', price: 'R 27,500.00', priceNum: 27500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 122, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP ProBook x360 435 G8 13.3" FHD Touch AMD Ryzen 7', price: 'R 17,500.00', priceNum: 17500, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 123, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Lenovo Legion 5 15ACH6 15.6" FHD 165Hz AMD Ryzen 7', price: 'R 21,500.00', priceNum: 21500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 124, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G15 G513 15.6" FHD 144Hz AMD Ryzen 7', price: 'R 18,500.00', priceNum: 18500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 125, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Lenovo ThinkPad T14 Gen 3 14" WUXGA Touch Intel Core i5', price: 'R 13,500.00', priceNum: 13500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80' },
  { id: 126, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming A15 FA506 15.6" FHD 144Hz AMD Ryzen 7', price: 'R 16,200.00', priceNum: 16200, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 127, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF F15 FX506 15.6" FHD 144Hz Intel Core i5 11400H', price: 'R 14,000.00', priceNum: 14000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 128, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming A15 FA506 15.6" FHD 144Hz AMD Ryzen 5', price: 'R 15,000.00', priceNum: 15000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 129, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus TUF Gaming A17 17.3" FHD 144Hz Intel Core i5 11400H', price: 'R 15,500.00', priceNum: 15500, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 130, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell XPS 15 9510 15.6" FHD+ Intel Core i7 11800H 16GB', price: 'R 19,000.00', priceNum: 19000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 131, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP EliteBook 830 G8 13.3" FHD Touch Intel Core i5 1135G7', price: 'R 15,000.00', priceNum: 15000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 132, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'HP Zbook Fury 15 G7 15.6" FHD Intel Core i7 10750H 32GB', price: 'R 20,000.00', priceNum: 20000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { id: 133, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell XPS 13 9310 13.4" FHD+ Touch Intel Core i7 1185G7', price: 'R 16,000.00', priceNum: 16000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 134, inStock: true, isUsed: true, category: 'USED LAPTOP', title: 'Dell Precision 7750 17.3" FHD Intel Core i9 10885H 32GB', price: 'R 26,000.00', priceNum: 26000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 135, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'MSI Vector GP66 12UG 15.6" FHD 144Hz Intel Core i7 12700H', price: 'R 30,000.00', priceNum: 30000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 136, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix G15 Advantage Edition G513 15.6" WQHD', price: 'R 27,000.00', priceNum: 27000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 137, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix Scar 15 G533 15.6" WQHD 165Hz AMD Ryzen 9', price: 'R 34,000.00', priceNum: 34000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 138, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Strix Scar 17 G733 17.3" WQHD 165Hz AMD Ryzen 9', price: 'R 36,000.00', priceNum: 36000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 139, inStock: true, isUsed: true, category: 'RUGGED LAPTOP', title: 'Getac S410 G3 14" HD Touch Intel Core i5 8265U 8GB', price: 'R 15,000.00', priceNum: 15000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 140, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Zephyrus G14 14" WQHD 120Hz AMD Ryzen 9', price: 'R 22,000.00', priceNum: 22000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 141, inStock: true, isUsed: true, category: 'RUGGED LAPTOP', title: 'Panasonic Toughbook CF-33 12.0" QHD Touch Intel Core i5', price: 'R 18,000.00', priceNum: 18000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { id: 142, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Zephyrus M16 GU603 16" WQXGA 165Hz Intel Core i9', price: 'R 32,000.00', priceNum: 32000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
  { id: 143, inStock: true, isUsed: true, category: 'GAMING LAPTOP', title: 'Asus ROG Zephyrus S17 GX703 17.3" WQHD 165Hz Intel Core i9', price: 'R 37,000.00', priceNum: 37000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' }
];

const ITEMS_PER_PAGE = 20;

export default function ShopUsedLaptops() {
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
        const isRefurbAllowed = filters.condition.includes('Refurbished');
        
        const isRefurb = product.title.includes('Refurbished');
        
        if (product.isUsed && !isRefurb && !isUsedAllowed) return false;
        if (!product.isUsed && !isRefurb && !isNewAllowed) return false;
        if (isRefurb && !isRefurbAllowed) return false;
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
    const sorted = [...filteredProducts];
    if (sortBy === 'price-ascending') return sorted.sort((a, b) => a.priceNum - b.priceNum);
    if (sortBy === 'price-descending') return sorted.sort((a, b) => b.priceNum - a.priceNum);
    if (sortBy === 'alphabetical') return sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted.sort((a, b) => b.id - a.id);
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb" style={{ margin: '2rem 0 1rem', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
          Home &gt; Used / Refurbished Laptops
        </div>
        
        <div className="category-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <h1>Used / Refurbished Laptops</h1>
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
              <option value="alphabetical">Alphabetical</option>
              <option value="latest">Newest Arrivals</option>
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
            {currentProducts.length > 0 ? (
              <>
                <div className="cat-product-grid">
                  {currentProducts.map((product) => (
                    <CategoryProductCard key={product.id} {...product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                  />
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-dark)' }}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button className="btn btn-navy" onClick={handleClearAll} style={{ marginTop: '1rem' }}>Clear all filters</button>
              </div>
            )}
            
            <div className="seo-text-box" style={{ marginTop: '4rem' }}>
              <p>Discover our extensive collection of high-quality used and refurbished laptops. Whether you need a reliable workhorse like a Lenovo ThinkPad, a versatile Dell Latitude, or a premium HP EliteBook, we offer thoroughly tested machines that deliver exceptional performance at a fraction of the cost of new. Every device is backed by our quality guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
