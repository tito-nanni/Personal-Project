import express from 'express';
import ViteExpress from 'vite-express';
import expressSession from 'express-session';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import { db } from './model.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import orderDetailRoutes from './routes/orderDetailRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
const PORT = 5173;

app.use(express.json()); //Middleware to parse JSON requests
app.use(morgan('dev'));
app.use(expressSession({ 
    secret: 'secret', //This is a secret key used to sign the session ID cookie
    saveUninitialized: false, //This forces the session that is 'uninitialized to be saved to the store
    resave: false,  // This forces the session to be saved back to the session store
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

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Login failed' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Set user info in session
            req.session.user = user;
            return res.json({ message: 'Logged in successfully' })
        } else {
            return res.status(401).json({ message: 'Login failed' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
})

//Starting the server
ViteExpress.listen(app, PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
