import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import problemRoutes from './routes/problems';

require("dotenv").config()

const app = express();
const port = process.env.PORT;

//MongoDB Database Connection
mongoose.connect(process.env.DB_URL!)

mongoose.connection.on("connected",() => {console.log("MongoDB Connected")})

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/problems', problemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
