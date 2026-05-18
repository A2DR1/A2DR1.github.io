import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    const post = await BlogPost.findOne({ slug }).lean();

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error("Blog post fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog post." },
      { status: 500 }
    );
  }
}
