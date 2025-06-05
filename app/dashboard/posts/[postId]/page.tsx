"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BlogPost({ params }: { params: { id: string } }) {
  const router = useRouter();

  // This is just sample data - in a real app, this would come from a database
  const post = {
    id: params.id,
    title: "Getting Started with Next.js",
    content: `
      <h1>Welcome to Next.js</h1>
      <p>This is a sample blog post content. In a real application, this would be fetched from a database based on the post ID.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Server-side rendering</li>
        <li>Static site generation</li>
        <li>API routes</li>
      </ul>
      <p>You can learn more about <a href="https://nextjs.org">Next.js</a> by visiting their official website.</p>
    `,
    date: "March 19, 2024",
    readTime: "5 min read",
  };

  return (
    <div className="min-h-screen p-8">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Back to all posts
        </Link>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
