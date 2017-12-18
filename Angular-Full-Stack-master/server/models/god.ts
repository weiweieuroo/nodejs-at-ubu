import * as mongoose from 'mongoose';

const godSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number
});

const God = mongoose.model('God', godSchema);

export default God;
