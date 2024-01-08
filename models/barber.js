const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  availability: {
    type: [{day: String, startTime: String, endTime: String}],
    required: false
  },
  serviceIds: [{ type: Schema.Types.ObjectId, ref: 'Service'}],
  isOwner: {
    type: Boolean,
    required: true,
    default: false
  },
  instaId: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('Barber', barberSchema);
