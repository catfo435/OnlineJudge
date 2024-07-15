import express from 'express';
import bodyParser from 'body-parser';
const cors = require("cors");
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

require("dotenv").config()

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
