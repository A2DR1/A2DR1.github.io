import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({})
      .sort({ date: -1 })
      .select("title slug excerpt date tags")
      .lean();

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Blog list error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, tags } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: "title, slug, excerpt, and content are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      tags: tags ?? [],
    });

    return NextResponse.json({ success: true, id: post._id }, { status: 201 });
  } catch (err: unknown) {
    console.error("Blog create error:", err);
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "A post with that slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
