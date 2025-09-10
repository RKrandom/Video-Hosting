import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../Models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
    // Registration logic here, writing if db or anything fails it will be caught by asyncHandler
    //and server won't crash

    //Steps to register a user
    //1. Get the user details / request from frontend
    //2. Validate if user email and password is present
    //3. Check if already exist then throw error
    //4. Check for avatar or images
    //5. Take the user details and upload avatar and images to cloudinary or aws s3
    //6. Create a user object and save to database
    //7. Remove password from user object before sending response
    //8. Check if user is created successfully or not
    //9. Send response to frontend

    

        const {fullname, email, username, password} = req.body;
        console.log("email: ", email);

        if (
            [fullname, email, username, password].some(field => 
                field?.trim() === "")
            ) {
                throw new ApiError(400, "All fields are required");
            }

            const existedUser = User.findOne({   //check if user already exist. So User is model which will interact with db.
                //Here findOne is mongoose method which will find 1st one user based on condition
                $or: [{ email }, { username }]
            })

            if (existedUser) {
                throw new ApiError(409, "User already exist with this email or username");
            }

            // Get the local path of the uploaded files y multer to upload to cloudinary or aws s3

            const avatarLocalPath = req.files?.avatar[0]?.path; //multer will add files object to req. why files? because we are uploading multiple files and it might be that they dont have access to avatar or coverImage
            const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

            if (!avatarLocalPath) {
                throw new ApiError(400, "Avatar file is required");
            }

            // Upload images to cloudinary or aws s3 and get the url

            const avatar = await uploadToCloudinary(avatarLocalPath)
            const coverImage = await uploadToCloudinary(coverImageLocalPath)

            if (!avatar) {
                throw new ApiError(400, "Avatar file is required");
            }


            //Create user object and save to database

            const user = await User.create({
                fullname,
                avatar: avatar.url,
                coverImage: coverImage.url || "", //if no cover image then empty string. As cover image is optional
                email,
                password,
                username: username.toLowerCase()
            });
            
            //Remove password from user object before sending response

            const createdUser = await User.findById(user._id).select(
                "-password -refreshToken"
            ); //-ve sign means exclude these fields

            if (!createdUser) {
                throw new ApiError(500, "Something went wrong while creating user");
            }

            // Send response to frontend

            return res.status(201).json(
                new ApiResponse(200, createdUser, "User created successfully")
            );
});

export { 
    registerUser
};