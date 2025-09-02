import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, //Automatically removes extra spaces from the beginning and end of the string
        index: true //Creates a database index on this field for faster searches
    },
    emal: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullnme: {
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    avatar: {
        type: String, //cloudinary url same as aws
        required: true,
    },
    coverImage: {
        type: String, ////cloudinary url same as aws
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }

},
{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);
