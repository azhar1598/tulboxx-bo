import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">My Blog</h1>
        <Link
          href="/blog/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Write New Post
        </Link>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="grid gap-8">
          {/* Sample blog post - we'll make this dynamic later */}
          <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href="/blog/1" className="hover:text-blue-600">
                Getting Started with Next.js
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Learn how to build modern web applications with Next.js...
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>March 19, 2024</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>
          </article>

          <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href="/blog/2" className="hover:text-blue-600">
                The Future of Web Development
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Exploring the latest trends and technologies in web development...
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>March 18, 2024</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
