//what are we doing here
//we are creating a higher order function that takes a request handler and returns a new function

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
    Promise.resolve(requestHandler(req,res,next)).
    catch((err) => next(err));
    }
};

export {asyncHandler}

//both are same we are just changing the way we define the function
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}

/* const asyncHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req, res, next)
    }catch(err){
        res.status(err.code || 500). json({
            success: false,
            message: err.message || "Internal Server Error"
        })
        
    }
};
*/