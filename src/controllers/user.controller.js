import { asyncHandler } from  "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
    // Registration logic here, writing if db or anything fails it will be caught by asyncHandler
    //and server won't crash
    res.status(201).json
    ({ 
        message: "User registered successfully" 
    });
});

export { registerUser };