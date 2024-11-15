
function Uplaod() {
    
    return (
       
            <div className="flex flex-col items-center h-8/10 bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-2xl w-full  ">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload an Video</h1>
                <div className="w-full text-lg font-bold text-gray-800">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="w-full p-3 mb-4 border border-gray-300  rounded-lg text-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="text-lg font-bold text-gray-800">Description</label>
                    <textarea id="description" rows="4" cols="200" className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600" placeholder="Description " required></textarea>
                </div>

                <div className="w-full text-lg font-bold text-gray-800">
                    <label htmlFor="type">Category</label>
                    <div className="flex w-full gap-8 p-4">
                        <input type="radio" name="type" id="type1" /> Action
                        <input type="radio" name="type" id="type2" /> Comedy
                        <input type="radio" name="type" id="type3" /> Music
                        <input type="radio" name="type" id="type4" /> Experimental
                    </div>

                </div>

                <div className="relative w-full mb-4 text-lg font-bold text-gray-800">
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        id="thumbnail"
                        type="file"
                        className="w-full p-3 text-sm cursor-pointer border border-gray-300  rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                <div className="relative w-full mb-4 text-lg font-bold text-gray-800">
                    <label htmlFor="videoFile">Video</label>
                    <input
                        id="videoFile"
                        type="file"
                        className="w-full p-3 text-sm cursor-pointer border border-gray-300  rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>

                <button className="w-1/3 p-3 bg-teal-500 text-white  rounded-lg hover:bg-teal-700 hover:scale-110 transition-all transform mb-4">
                    Upload Video
                </button>
            </div>
    )
}
export default Uplaod