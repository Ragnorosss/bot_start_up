import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Заголовок поста
  content: { type: String, required: true },  // Содержимое поста
  createdAt: { type: Date, default: Date.now },  // Дата создания
  authorId: { type: Number, required: true }  // ID автора (для связи с администратором)
});

const Post = mongoose.model('Post', postSchema);

export default Post;
