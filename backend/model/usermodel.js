import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        rewuired:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "is invalid"]
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    Avatar:{
        type:String,
        default:""
    },
    refreshToken:{
        type:String
    },
    Videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
},
{
    timestamps:true
}
)
export const User = new mongoose.model('user',userSchema);