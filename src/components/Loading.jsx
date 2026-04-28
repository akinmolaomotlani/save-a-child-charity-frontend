export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-300 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-orange-300 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-orange-300 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}
