import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: Date;
  tags: string[];
}

const BlogPostSchema: Schema<IBlogPost> = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  excerpt: { type: String, required: true, trim: true, maxlength: 500 },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: [{ type: String, trim: true }],
});

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ??
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
