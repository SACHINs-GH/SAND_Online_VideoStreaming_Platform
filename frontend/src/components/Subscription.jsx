

function Subscription() {

    return (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-8">
                {Array(5).fill(0).map((_, index) => (
                    <div className="space-y-6" key={index}>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-red-300 flex-shrink-0">
                                <img src="" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-800">Channel Name</p>
                                <p className="text-gray-500">5 Subscribers</p> 
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="grid grid-flow-col auto-cols-max gap-3">
                                {Array(10).fill(0).map((_, videoIndex) => (
                                    <div
                                        key={videoIndex}
                                        className="bg-white rounded-lg shadow-md p-4 w-64"
                                    >
                                        <div className="bg-gray-300 h-48 mb-4"></div>
                                        <h3 className="text-lg font-semibold">Video Title {videoIndex + 1}</h3>
                                        <p className="text-gray-600">Channel Name</p>
                                        <p className="text-gray-500">1.2M views • 3 days ago</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
}

export default Subscription;
