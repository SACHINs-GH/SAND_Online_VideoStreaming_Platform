import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps:true
});

export const Video  = new mongoose.model('Video',VideoSchema)