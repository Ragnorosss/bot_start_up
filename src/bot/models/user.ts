import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  chatId: number;
  role: string;
  subscription: boolean;
  verificationCode?: string;
  isVerified: boolean;
}

const UserSchema = new Schema<IUser>({
  chatId: { type: Number, required: true },
  role: { type: String, default: "user" },
  subscription: { type: Boolean, default: false },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
});

export const User = model<IUser>("User", UserSchema);
