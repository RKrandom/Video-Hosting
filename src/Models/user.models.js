import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function 
(Password) {
    return await bcrypt.compare(Password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.Access_TOKEN_SECRET, {
        expiresIn: process.env.Access_TOKEN_EXPIRES
    });
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
         id: this._id //here id is the user ID and this._id is from database
        }, 
        process.env.Access_TOKEN_SECRET, 
        {
        expiresIn: process.env.Access_TOKEN_EXPIRES
    });
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
         id: this._id //here id is the user ID and this._id is from database
        }, 
        process.env.Refresh_TOKEN_SECRET, 
        {
        expiresIn: process.env.Refresh_TOKEN_EXPIRES
    });
}

export const User = mongoose.model("User", userSchema);
