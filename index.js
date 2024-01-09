const express = require('express');
const app = express();
const port = 8001;
const mongoose = require('mongoose');
const barberRoutes = require('./routes/barberRoutes');
const bodyParser = require('body-parser');

// db-connection
mongoose.connect('mongodb+srv://malharlumbhani1432:x69Vdkb7sbtWyjuu@barber-shop.ovr58sw.mongodb.net/')
  .then(() => console.log('DB Connected!'));


// middleware
app.use(bodyParser.json());


// routes
app.use('/api/barber', barberRoutes);

// opening the port
app.listen(port, function() {
  console.log(`Starting our backend at port: ${port}`);
});