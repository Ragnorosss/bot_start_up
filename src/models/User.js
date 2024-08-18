import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  telegramId: String,
  registrationKey: String,
  isAuth: { type: Boolean, default: false }, 
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription' 
  },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
