import lodash from 'lodash';
import { User, Product, Order, OrderDetail, Review, db } from '../src/model.js';

async function seed() {
console.log('Syncing database...');
await db.sync({ force: true });

console.log('Seeding Users table...');

const users= [
    { email: 'alice@example.com', password: 'password123' },
    { email: 'bob@example.com', password: 'password123' },
    { email: 'charlie@example.com', password: 'password123'},
];

await User.bulkCreate(users);

console.log('Finished seeding Users table.');

console.log('Seeding Products table...');

  const products = [
    { name: 'Jalen Hurts Jersey', description: 'Nike Jalen Hurts Jersey', price: 99.99, stock_quantity: 50, image_url: 'http://example.com/hurts.jpg' },
    { name: 'Jason Kelce Jersey', description: 'Nike Jason Kelce Jersey', price: 129.99, stock_quantity: 30, image_url: 'http://example.com/kelce.jpg' },
    { name: 'AJ Brown Jersey', description: 'Nike AJ Brown Jersey', price: 129.99, stock_quantity: 100, image_url: 'http://example.com/brown.jpg' },
    { name: 'Kelly Green Shirt', description: 'Eagles Kelly Green Shirt', price: 29.99, stock_quantity: 50, image_url: 'http://example.com/hurts.jpg' },
    { name: 'Gray Shirt', description: 'Gray Eagles Shirt', price: 29.99, stock_quantity: 30, image_url: 'http://example.com/kelce.jpg' },
    { name: 'Black Shirt', description: 'Black Eagles Shirt', price: 29.99, stock_quantity: 100, image_url: 'http://example.com/brown.jpg' },
    { name: 'Kelly Green Hoodie', description: 'Eagles Kelly Green Hoodie', price: 59.99, stock_quantity: 50, image_url: 'http://example.com/hurts.jpg' },
    { name: 'Black Hoodie', description: 'Black Eagles Hoodie', price: 49.99, stock_quantity: 30, image_url: 'http://example.com/kelce.jpg' },
    { name: 'Beanie', description: 'Eagles Beanie', price: 29.99, stock_quantity: 100, image_url: 'http://example.com/brown.jpg' },
    { name: 'Baseball Cap', description: 'Eagles Baseball Cap', price: 25.99, stock_quantity: 100, image_url: 'http://example.com/brown.jpg' },
  ];

  await Product.bulkCreate(products);

  console.log('Finished seeding Products table.');

}

seed().catch(console.error);


