import * as mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  Owner: String
});

const Dog = mongoose.model('Dog', dogSchema);

export default Dog;
