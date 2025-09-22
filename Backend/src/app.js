import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.routes.js"; 
import { connectdb } from "./lib/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  'http://localhost:5173',
//   'link after deployment'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



// ✅ Middleware first
app.use(express.json());
app.use(cookieParser());

// ✅ Then routes
app.use("/auth", authrouter);


app.listen( () => {
  connectdb();

});

  export default app;
