import Dexie from 'dexie';

// Create your database
const db = new Dexie('cachedb');

// Define the database schema
db.version(1).stores({
    products: '++id, name, price, brand, availability, image, hoverImage', // Primary key and indexes
    productColors: '++id, productId, name, swatch, image',
    productSizes: '++id, productId, label, price',
    categories: '++id, name'
});

export default db;
