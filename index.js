const express = require('express');
const app = express();
const port = 8001;
const mongoose = require('mongoose');
const Barber = require('./models/barber');
const Booking = require('./models/booking');

mongoose.connect('mongodb+srv://malharlumbhani1432:x69Vdkb7sbtWyjuu@barber-shop.ovr58sw.mongodb.net/')
  .then(() => console.log('DB Connected!'));

app.get('/', async function (req, res) {
  console.log("start")
  const firstBooking = new Booking({
    firstName: 'Virat',
    lastName: 'Kohli',
    email: 'vk@gmail.com',
    appointmentDate: '2024-01-09',
    barberId: '659b9ba96993477ceb5b53d3',
    serviceIds: ['659ba413a2605ec25aed0978']
  });
  await firstBooking.save();
  console.log("Barber created");
  const allBooking = await Booking.find();
  res.send({allBooking});
});

app.listen(port, function() {
  console.log(`Starting our backend at port: ${port}`);
});