import { User, db } from "./model.js";

const users = await User.findAll()

console.log(users)
await db.close()