import mongoose from 'mongoose';
const { Schema } = mongoose;

// Order Schema
const OrderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    default: 0
  },
  updated: Date, 
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', OrderSchema);
