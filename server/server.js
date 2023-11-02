import { Express } from "express";
import { db } from "../src/model";

const app = express();

const PORT = 5173;

app.use(express.json());

// Define routes for your resources


db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});
}).catch(console.error);