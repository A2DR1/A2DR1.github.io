import mongoose, { Document, Model, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  date: Date;
}

const ContactSchema: Schema<IContact> = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  date: { type: Date, default: Date.now },
});

const Contact: Model<IContact> =
  mongoose.models.Contact ??
  mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
