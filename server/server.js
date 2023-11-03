import express from 'express';
import { db } from './model.js';
import productRoutes from '../routes/productRoutes.js';

const app = express();
const PORT = 5173;

app.use(express.json()); //Middleware to parse JSON requests

//Test route to ensure the server is running
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Eagles Store')
});

app.use('/api', productRoutes); //prefix routes with /api

//Starting the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
