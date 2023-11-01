import { Express } from "express";

const app = express();

const PORT = 5173;

app.get('/', (req, res) => {
    res.send('Server is running Correctly!')
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
})