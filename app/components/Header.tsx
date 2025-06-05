export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="text-lg font-bold text-blue-700">Dashboard</div>
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
          Admin
        </span>
      </div>
    </header>
  );
}
