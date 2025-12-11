class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message), (this.statusCode = statusCode);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`;
    err = new errorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Json token is invalid, try again";
    err = new errorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Json token is expired, try again";
    err = new errorHandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = `invalid ${err.path}`;
    err = new errorHandler(message, 400);
  }

    const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;  

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
export default errorHandler;
