const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  property_type: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  area_unit: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Property = mongoose.model('property', PropertySchema);