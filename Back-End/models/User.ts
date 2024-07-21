import mongoose from 'mongoose';

// Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Create a Model.
const User = mongoose.model('Users',userSchema);

export default User;
