function Home() {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-2 max-w-xl sm:max-w-lg"
            >
              <div className="bg-gray-300 h-48 mb-4"></div>
              <h3 className="text-lg font-semibold">Video Title {index + 1}</h3>
              <p className="text-gray-600">Channel Name</p>
              <p className="text-gray-500">1.2M views • 3 days ago</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
