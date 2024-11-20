import { useState } from "react";
import axios from "axios";

function Upload() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        thumbnail: null,
        videoFile: null,
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const uploadData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                uploadData.append(key, value);
            }
        });

        try {
            const response = await axios.post("http://localhost:5000/user/uploadVideo", uploadData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            alert(response.data.message || "Video uploaded successfully!");
            setFormData({
                title: "",
                description: "",
                type: "",
                thumbnail: null,
                videoFile: null,
            });
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while uploading the video.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center h-8/10 bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-2xl w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload a Video</h1>

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full text-lg font-bold text-gray-800">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="text-lg font-bold text-gray-800">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                        placeholder="Description"
                        required
                    ></textarea>
                </div>

                <div className="w-full text-lg font-bold text-gray-800">
                    <label htmlFor="type">Category</label>
                    <div className="flex w-full gap-8 p-4">
                        <label>
                            <input type="radio" name="type" value="Action" onChange={handleInputChange} /> Action
                        </label>
                        <label>
                            <input type="radio" name="type" value="Comedy" onChange={handleInputChange} /> Comedy
                        </label>
                        <label>
                            <input type="radio" name="type" value="Music" onChange={handleInputChange} /> Music
                        </label>
                        <label>
                            <input type="radio" name="type" value="Experimental" onChange={handleInputChange} /> Experimental
                        </label>
                    </div>
                </div>

                <div className="relative w-full mb-4 text-lg font-bold text-gray-800">
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-3 text-sm cursor-pointer border border-gray-300 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                        required
                    />
                </div>

                <div className="relative w-full mb-4 text-lg font-bold text-gray-800">
                    <label htmlFor="videoFile">Video</label>
                    <input
                        id="videoFile"
                        name="videoFile"
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-3 text-sm cursor-pointer border border-gray-300 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-1/3 p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-700 hover:scale-110 transition-all transform mb-4"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
}

export default Upload;
