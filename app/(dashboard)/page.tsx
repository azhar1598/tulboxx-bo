export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-3xl font-extrabold text-gray-900 mb-2">
        Welcome to your Dashboard 👋
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col items-center shadow-sm">
          <div className="text-2xl font-bold text-blue-700 mb-1">12</div>
          <div className="text-sm text-gray-600">Published Posts</div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col items-center shadow-sm">
          <div className="text-2xl font-bold text-green-700 mb-1">3</div>
          <div className="text-sm text-gray-600">Drafts</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 flex flex-col items-center shadow-sm">
          <div className="text-2xl font-bold text-yellow-700 mb-1">1,234</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
      </div>
      <div className="mt-8 text-gray-500 text-sm">
        This is your blogging dashboard. Use the sidebar to create new posts,
        view all posts, or adjust your settings.
      </div>
    </div>
  );
}
