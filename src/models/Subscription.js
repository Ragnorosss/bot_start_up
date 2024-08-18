import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  planName: { type: String, required: true }, // Название плана, например: 'Basic', 'Premium'
  price: { type: Number, required: true }, // Цена подписки
  duration: { type: Number, required: true }, // Длительность подписки в днях
  benefits: [String] // Список преимуществ плана
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;