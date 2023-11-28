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
    { name: 'Jalen Hurts Jersey', description: 'Nike Jalen Hurts Jersey', price: 99.99, stock_quantity: 50, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-nike-jalen-hurts-midnight-green-philadelphia-eagles-player-jersey_pi4277000_altimages_ff_4277482-825bde2b996982c75599alt1_full.jpg?_hv=2&w=900` },
    { name: 'Jason Kelce Jersey', description: 'Nike Jason Kelce Jersey', price: 129.99, stock_quantity: 30, image_url: `https://m.media-amazon.com/images/I/71MYC+PGQpS._AC_UY1000_.jpg` },
    { name: 'AJ Brown Jersey', description: 'Nike AJ Brown Jersey', price: 129.99, stock_quantity: 100, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-nike-aj-brown-midnight-green-philadelphia-eagles-player-game-jersey_pi4885000_altimages_ff_4885630-8999e7ed3e674ec30b03alt1_full.jpg?_hv=2&w=900` },
    { name: 'Kelly Green Shirt', description: 'Eagles Kelly Green Shirt', price: 29.99, stock_quantity: 50, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-fanatics-branded-jalen-hurts-kelly-green-philadelphia-eagles-alternate-icon-player-name-and-number-t-shirt_ss5_p-5078787+pv-2+u-joob1kw2v7mjw54fmo09+v-vmnaeqawtkaltjtdd5zs.jpg?_hv=2&w=600` },
    { name: 'Gray Shirt', description: 'Gray Eagles Conference Champions Shirt', price: 29.99, stock_quantity: 30, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-nike-gray-philadelphia-eagles-2022-nfc-champions-locker-room-trophy-collection-t-shirt_pi5293000_altimages_ff_5293837-04aae7550968c6a7f723alt1_full.jpg?_hv=2&w=900` },
    { name: 'Black Shirt', description: 'Black Eagles Shirt', price: 29.99, stock_quantity: 100, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-fanatics-branded-black-philadelphia-eagles-primary-logo-team-t-shirt_pi3725000_altimages_ff_3725682-71ee9d18bba69b18e3dealt1_full.jpg?_hv=2&w=900` },
    { name: 'Kelly Green Hoodie', description: 'Eagles Kelly Green Hoodie', price: 59.99, stock_quantity: 50, image_url: `https://media.rallyhouse.com/homepage/18242811-1.jpg?tx=f_auto,c_fit,w_730,h_730` },
    { name: 'Black Hoodie', description: 'Black Eagles Hoodie', price: 49.99, stock_quantity: 30, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-fanatics-branded-black-philadelphia-eagles-logo-team-lockup-fitted-pullover-hoodie_pi5076000_altimages_ff_5076708-f4ecabb8e3ed5a878197alt1_full.jpg?_hv=2&w=900` },
    { name: 'Beanie', description: 'Eagles Beanie', price: 29.99, stock_quantity: 100, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-47-midnight-green-philadelphia-eagles-secondary-basic-cuffed-knit-hat_pi3882000_ff_3882524-0b0370377bcdd85c3f32_full.jpg?_hv=2&w=900` },
    { name: 'Baseball Cap', description: 'Eagles Baseball Cap', price: 25.99, stock_quantity: 100, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-47-midnight-green-philadelphia-eagles-mvp-adjustable-hat_ss5_p-200489347+pv-1+u-ieap2ggraqoqdzy5vtzw+v-qncfhe68kfh6hdvl8iyo.jpg?_hv=2&w=900` },
    { name: 'Visor', description: 'Black Eagles Visor', price: 20.99, stock_quantity: 100, image_url: `https://images.footballfanatics.com/philadelphia-eagles/mens-new-era-black-philadelphia-eagles-2023-nfl-training-camp-adjustable-visor_ss5_p-200004335+pv-1+u-algreogiwyz8xumxnmyx+v-khjbmnkd1ulkdtd5mlun.jpg?_hv=2` },
    { name: 'Bucket Hat', description: 'Eagles Bucket Hat', price: 35.99, stock_quantity: 100, image_url: `https://fanatics.frgimages.com/philadelphia-eagles/mens-47-midnight-green-philadelphia-eagles-striped-bucket-hat_pi4840000_altimages_ff_4840880-f2fdd60fd68088ff02b9alt1_full.jpg?_hv=2&w=900` },
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

  const numberOfReviews = 5;

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


