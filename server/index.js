import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
const PORT = process.env.PORT || 1337;

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Updated CORS configuration for Codespaces
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CODESPACE_NAME ? 
    `https://${process.env.CODESPACE_NAME}-5173.preview.app.github.dev` : 
    null,
  process.env.CODESPACE_NAME ? 
    `https://sturdy-journey-q7v7969prpxvf6g76-5173.preview.app.github.dev` : 
    null
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* HEALTH CHECK */
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date(),
    origins: allowedOrigins 
  });
});

/* MONGOOSE SETUP */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");

    // Start server only after DB connection
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`CORS enabled for origins:`, allowedOrigins);
      if (process.env.CODESPACE_NAME) {
        console.log(`Codespace URL: https://${process.env.CODESPACE_NAME}-${PORT}.preview.app.github.dev`);
      }
    });

    // Check if database is empty and populate if needed
    const collections = await mongoose.connection.db.collections();
    if (collections.length === 0) {
      console.log("Populating database with initial data...");
      await mongoose.connection.db.dropDatabase();
      await KPI.insertMany(kpis);
      await Product.insertMany(products);
      await Transaction.insertMany(transactions);
      console.log("Database populated successfully!");
    }

    // Server error handling
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
      } else {
        console.error('Server error:', error);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Start the server
connectDB();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  mongoose.connection.close();
  process.exit(0);
});