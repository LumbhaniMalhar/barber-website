const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  barberId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Barber'
  },
  paymentStatus: {
    type: String,
    required: false,
  },
  bookedByBarber: {
    type: Boolean,
    default: false,
  },
  serviceIds: [{ type: Schema.Types.ObjectId, ref: 'Service'}],
});

module.exports = mongoose.model('Booking', bookingSchema);
