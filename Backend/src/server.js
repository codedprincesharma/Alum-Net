import dotenv from "dotenv";
import app from "./app.js";
import { connectdb } from "./lib/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectdb();
  console.log(`✅ Server running on http://localhost:${port}`);
});
