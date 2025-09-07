import { useAsyncError } from  "./utils/asyncHandler.js";

const registerUser = useAsyncError(async (req, res, next) => {
    // Registration logic here, writing if db or anything fails it will be caught by asyncHandler
    //and server won't crash
    res.status(201).json
    ({ 
        message: "User registered successfully" 
    });
});
