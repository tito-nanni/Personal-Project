import lodash from 'lodash';
import { User, Product, Order, OrderDetail, Review, db } from './model.js';

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

  console.log('Seeding Orders table...');

  const usersInDb = await User.findAll();

  const orders = usersInDb.map((user, index) => ({
    user_id: user.user_id,
    order_date: new Date()
  }));

  await Order.bulkCreate(orders);

  console.log('Finished seeding Orders table');

  console.log('Seeding OrderDetails table...');

  const ordersInDb = await Order.findAll();
  const productsInDb = await Product.findAll();

  const orderDetails = [];

  ordersInDb.forEach((order) => {

    const numProducts = lodash.random(1, 3);
    const selectedProducts = lodash.sampleSize(productsInDb, numProducts);

    selectedProducts.forEach((product) => {
        orderDetails.push({
            order_id: order.order_id,
            product_id: product.product_id,
            quantity: lodash.random(1, 5),
            price: product.price
        })
    })
  })

  await OrderDetail.bulkCreate(orderDetails);

  console.log('Finished seeding OrderDetails table.');

  console.log('Seeding Reviews table...');

  const reviews = [];

  const numberOfReviews = 15;

  for (let i = 0; i < numberOfReviews; i++) {

    const user = lodash.sample(usersInDb);
    const product = lodash.sample(productsInDb);

    const review = {
        user_id: user.user_id,
        product_id: product.product_id,
        rating: lodash.random(1, 5),
        comment: `This is a review for the ${product.name}.`,
        review_date: new Date()
    };

    reviews.push(review);
  }

  await Review.bulkCreate(reviews);

  console.log('Finished seeding Reviews table');
}

seed().catch(console.error);


