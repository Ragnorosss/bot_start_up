import "dotenv/config";

export const { BOT_TOKEN, MONGO_PASS, MONGO_NAME } = process.env;
export const MONGODB_URI = `mongodb+srv://${MONGO_NAME}:${MONGO_PASS}@cluster0.tvd06.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
