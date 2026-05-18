import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "austin-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      "https://api.github.com/users/A2DR1/repos?sort=updated&per_page=30&type=public",
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const repos = await res.json();

    // Filter out forks and sort by stars then updated
    const filtered = repos
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((r: any) => !r.fork)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}
