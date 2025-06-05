import Link from "next/link";

const samplePosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js...",
    status: "Published",
    date: "2024-03-19",
    views: 123,
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt:
      "Exploring the latest trends and technologies in web development...",
    status: "Draft",
    date: "2024-03-18",
    views: 45,
  },
  {
    id: 3,
    title: "SEO Best Practices for 2024",
    excerpt: "How to optimize your blog posts for search engines in 2024...",
    status: "Published",
    date: "2024-03-15",
    views: 321,
  },
];

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
        <Link
          href="/dashboard/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-base shadow-md transition"
        >
          + New Post
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {samplePosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col gap-2 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-bold text-gray-900 line-clamp-1">
                {post.title}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  post.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.status}
              </span>
            </div>
            <div className="text-gray-500 text-sm line-clamp-2 mb-2">
              {post.excerpt}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
              <span>{post.date}</span>
              <span>{post.views} views</span>
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="mt-3 text-blue-600 hover:underline text-sm font-medium self-start"
            >
              Edit Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
