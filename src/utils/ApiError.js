    // Constructor function - runs when you create new ApiError instance
    // Parameters:
    // - statusCode: HTTP status code (400, 401, 404, 500, etc.)
    // - message: Description of what went wrong (optional, has default)
    // - errors: Array of detailed error messages (optional, defaults to empty array)
    // - stack: Custom stack trace (optional, auto-generated if not provided)
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        this.statusCode = statusCode // Set the HTTP status code property (e.g., 404, 500, 401)
        this.message = message // Set the error message property (default: "Something went wrong")
        this.data = null  // Set data property to null - can be used later to attach additional error data
        this.success = false  // Set success to false - indicates this represents a failure/error state
        this.errors = errors  // Store array of detailed error messages
  
        // Store array of detailed error messages

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
    }


    export {ApiError}