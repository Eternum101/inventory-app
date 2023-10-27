const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://adminInventoryApp:inventory-app.001@inventoryappcluster.bw6xqaa.mongodb.net/InventoryAppCluster?retryWrites=true&w=majority&appName=AtlasApp';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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