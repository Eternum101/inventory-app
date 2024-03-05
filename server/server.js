require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", 
  "https://https://inventory-app-3hvj.onrender.com/"],
}));

app.get('/api', (req, res) => {
  res.send('Hello World!')
});

const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});
