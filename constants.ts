
import { Product } from './types';

export interface CatalogGroup {
  name: string;
  products: Product[];
}

export const CATALOGS_DATA: CatalogGroup[] = [
  {
    name: "PERFUME",
    products: [
      { id: 1, label: "PRODUK A", name: "MY WAY", price: 100000, commission: 20, profit: 20000, imageUrl: "https://i.pinimg.com/1200x/8e/71/ec/8e71ec20e102fce96171a8d1522ecaef.jpg", statusText: "Cek Detail" },
      { id: 2, label: "PRODUK B", name: "ACQUA DI GIOIA", price: 300000, commission: 20, profit: 60000, imageUrl: "https://i.pinimg.com/1200x/f9/be/75/f9be75a03cec5e03d9ac9e3191676e94.jpg", statusText: "Cek Detail" },
      { id: 3, label: "PRODUK C", name: "ACQUA DI GIO", price: 500000, commission: 20, profit: 100000, imageUrl: "https://i.pinimg.com/736x/ea/91/d0/ea91d0ed6e8d50a2a4a1c0575d2f90f2.jpg", statusText: "Cek Detail" },
      { id: 4, label: "PRODUK D", name: "SI", price: 800000, commission: 20, profit: 160000, imageUrl: "https://i.pinimg.com/736x/e5/31/e4/e531e4e4499ed09757de7bfc2acf3a1d.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "MAKEUP",
    products: [
      { id: 5, label: "PRODUK A", name: "Luminous Silk Foundation", price: 600000, commission: 20, profit: 120000, imageUrl: "https://i.pinimg.com/736x/c2/f8/07/c2f807a8139da47acf55918677c051c5.jpg", statusText: "Cek Detail" },
      { id: 6, label: "PRODUK B", name: "Beauty Skin Tint Tinted Serum", price: 900000, commission: 20, profit: 180000, imageUrl: "https://i.pinimg.com/1200x/0f/93/a6/0f93a6af72b77a066747544983e96419.jpg", statusText: "Cek Detail" },
      { id: 7, label: "PRODUK C", name: "Luminous Silk Glow", price: 1550000, commission: 20, profit: 310000, imageUrl: "https://i.pinimg.com/1200x/fa/f0/23/faf023253c48c6764cda265edbeb37f7.jpg", statusText: "Cek Detail" },
      { id: 8, label: "PRODUK D", name: "Lip Maestro Satin", price: 2150000, commission: 20, profit: 430000, imageUrl: "https://i.pinimg.com/1200x/0e/0e/a4/0e0ea46fb0750da20a242ebad76e3754.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "ACCESSORIES",
    products: [
      { id: 9, label: "PRODUK A", name: "key chain", price: 880000, commission: 20, profit: 176000, imageUrl: "https://di2ponv0v5otw.cloudfront.net/posts/2024/01/20/65abcc8c678c3a6d6f9cd33c/s_65abccd397b5d01d8b4c0c83.jpg", statusText: "Cek Detail" },
      { id: 10, label: "PRODUK B", name: "White Hats For Men", price: 1000000, commission: 20, profit: 200000, imageUrl: "https://static.mercdn.net/item/detail/orig/photos/m22236428115_1.jpg?1710575729", statusText: "Cek Detail" },
      { id: 11, label: "PRODUK C", name: "Travel Pouch", price: 1800000, commission: 30, profit: 540000, imageUrl: "https://di2ponv0v5otw.cloudfront.net/posts/2022/03/17/62342851cb692c32f15f96f5/m_623428d781a36c0ecec9f5b3.jpg", statusText: "Cek Detail" },
      { id: 12, label: "PRODUK D", name: "Armani West Belt", price: 2500000, commission: 30, profit: 750000, imageUrl: "https://images.hyperinzerce.cz/inzeraty/4583045571088433636/original/11804652-armani-elegantni-pasek-001.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "BAG’S",
    products: [
      { id: 13, label: "PRODUK A", name: "La Prima wicker bag", price: 1500000, commission: 20, profit: 300000, imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR7rD0LvC8Jh8tdMUei81xggy4Gz5wChpCBKbp7u9uvT9u_wa8x", statusText: "Cek Detail" },
      { id: 14, label: "PRODUK B", name: "Efflorescence Gold bag", price: 2000000, commission: 20, profit: 400000, imageUrl: "https://i.pinimg.com/1200x/36/7c/0a/367c0af1310add14ed787ab3d4a393cb.jpg", statusText: "Cek Detail" },
      { id: 15, label: "PRODUK C", name: "Pre-Fall 2020", price: 3100000, commission: 30, profit: 930000, imageUrl: "https://i.pinimg.com/736x/8c/49/1e/8c491e6cc484a867f95651abf02b7f57.jpg", statusText: "Cek Detail" },
      { id: 16, label: "PRODUK D", name: "Britt Neutrals Canvas", price: 4800000, commission: 30, profit: 1440000, imageUrl: "https://i.pinimg.com/1200x/f1/de/5b/f1de5b4664b11910695551193e8b9178.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "WATCH",
    products: [
      { id: 17, label: "PRODUK A", name: "AR11688", price: 3300000, commission: 30, profit: 990000, imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/974ac287-5c55-436b-9c46-a487c92cafdf.__CR0,0,800,600_PT0_SX800_V1___.jpg", statusText: "Cek Detail" },
      { id: 18, label: "PRODUK B", name: "Hampton AX2144", price: 4500000, commission: 30, profit: 1350000, imageUrl: "https://i.pinimg.com/1200x/69/85/13/698513a55b4674679a024c2d5957c45a.jpg", statusText: "Cek Detail" },
      { id: 19, label: "PRODUK C", name: "Automatic AR60007", price: 5250000, commission: 40, profit: 2100000, imageUrl: "https://i.pinimg.com/1200x/d4/fa/5e/d4fa5e5e56630a378621b80e583b9f3b.jpg", statusText: "Cek Detail" },
      { id: 20, label: "PRODUK D", name: "AR1400 Black Montre", price: 6100000, commission: 40, profit: 2440000, imageUrl: "https://i.pinimg.com/736x/92/28/66/922866e657e650b2f7956d96e628b807.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "SHOES",
    products: [
      { id: 21, label: "PRODUK A", name: "Leather Sneakers", price: 2580000, commission: 30, profit: 774000, imageUrl: "https://i.pinimg.com/736x/48/f2/88/48f288f2c93a5d63f02d3080d1ef54b8.jpg", statusText: "Cek Detail" },
      { id: 22, label: "PRODUK B", name: "Scarpe 2019", price: 3500000, commission: 30, profit: 1050000, imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/2/389401477/EN/XM/DE/9581609/armani-exchange-mens-shoes-500x500.jpg", statusText: "Cek Detail" },
      { id: 23, label: "PRODUK C", name: "Uomo Scarpe Sneakers", price: 4200000, commission: 30, profit: 1260000, imageUrl: "https://img.lazcdn.com/g/p/0e4e24945adc87d1a1b49167d2eda070.jpg_720x720q80.jpg", statusText: "Cek Detail" },
      { id: 24, label: "PRODUK D", name: "Leather Trainers Sneakers", price: 5800000, commission: 40, profit: 2320000, imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/8/444349225/EY/UU/HK/9581609/emporio-armani-shoes.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "JEWERLY",
    products: [
      { id: 25, label: "PRODUK A", name: "Plated Ring Gold", price: 300000, commission: 30, profit: 90000, imageUrl: "https://a.rimg.com.tw/s6/683/84a/zqtnagud/5/53/22127614674259_937.jpg", statusText: "Cek Detail" },
      { id: 26, label: "PRODUK B", name: "Ring for Men Fashion", price: 500000, commission: 30, profit: 150000, imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/89d2e0e4-0958-4f6b-9fba-4853af1054ce.__CR0,0,600,450_PT0_SX600_V1___.jpg", statusText: "Cek Detail" },
      { id: 27, label: "PRODUK C", name: "Gold bracelet", price: 600000, commission: 40, profit: 240000, imageUrl: "https://dreamsjewellery.com/wp-content/uploads/2024/05/Armani-bracelet-03cly301_1062978.jpg", statusText: "Cek Detail" },
      { id: 28, label: "PRODUK D", name: "exquisite love bracelet", price: 800000, commission: 40, profit: 320000, imageUrl: "https://img2.ygo.tw/images/20230928/armanisz/armanisz_2309281001/armanisz_2309281001_9.jpg", statusText: "Cek Detail" }
    ]
  },
  {
    name: "SPECIAL",
    products: [
      { id: 29, label: "PRODUK A", name: "Couple's Chronograph Watches Black", price: 8000000, commission: 50, profit: 4000000, imageUrl: "https://dealpoint.pk/wp-content/uploads/2024/08/Couple-Chronograph-Watches-1.jpg", statusText: "Cek Detail" },
      { id: 30, label: "PRODUK B", name: "Couple's Chronograph Watches chocolate", price: 10800000, commission: 50, profit: 5400000, imageUrl: "https://www.bkmart.com.pk/wp-content/uploads/2025/07/1753725860275.jpg", statusText: "Cek Detail" },
      { id: 31, label: "PRODUK C", name: "Couple's Chronograph Watches Gray", price: 18500000, commission: 50, profit: 9250000, imageUrl: "https://www.bkmart.com.pk/wp-content/uploads/2025/07/1753725860779-700x646.jpg", statusText: "Cek Detail" },
      { id: 32, label: "PRODUK D", name: "Analog New Emporio Armani Couple Watch", price: 25250000, commission: 50, profit: 12625000, imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2021/9/IR/PV/WJ/30319864/product-jpeg-500x500.jpg", statusText: "Cek Detail" }
    ]
  }
];

export const FORMAT_CURRENCY = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value).replace('Rp', 'IDR ');
};
