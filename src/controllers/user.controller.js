import { asyncHandler } from "../utils/asyncHandler.js";

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

    

        const {fullname, email, password} = req.body;
        console.log("email: ", email);
    })

export { 
    registerUser
};