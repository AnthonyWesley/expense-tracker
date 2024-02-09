export default function Spin() {
  return (
    <div className="bg-black/70 flex items-center justify-center h-screen fixed inset-0 z-50 none">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-300"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-700 animate-spin"></div>
      </div>
    </div>
  );
}
