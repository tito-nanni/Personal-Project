import express from 'express';
import ViteExpress from 'vite-express';
import session from 'express-session';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import { db } from './model.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import orderDetailRoutes from './routes/orderDetailRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { User } from './model.js';


const app = express();
const PORT = 5173;

app.use(express.json()); //Middleware to parse JSON requests
app.use(morgan('dev'));
app.use(session({ 
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));


//Test route to ensure the server is running
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Eagles Store')
});

app.use('/api', productRoutes); //prefixing routes with /api
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderDetailRoutes);
app.use('/api', reviewRoutes);

//Starting the server
ViteExpress.listen(app, PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
