const apiResponse = require("../utils/api.response");
const message = require("../json/message.json");
const { MulterError } = require("multer");
const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = require("jsonwebtoken");
const {
  Error: {
    CastError,
    DivergentArrayError,
    DocumentNotFoundError,
    MissingSchemaError,
    OverwriteModelError,
    ParallelSaveError,
    StrictModeError,
    VersionError,
    MongooseServerSelectionError,
    StrictPopulateError,
    ValidationError,
    ValidatorError,
  },
} = require("mongoose");

module.exports = async (error, req, res, next) => {
  console.log("ERROR MESSAGE: ", error.message, "\nERROR STACK: ", error.stack);
  if (error instanceof JsonWebTokenError) return apiResponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED, payload: { context: error.message } });
  if (error instanceof NotBeforeError) return apiResponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED, payload: { context: error.message } });
  if (error instanceof TokenExpiredError) return apiResponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED, payload: { context: error.message } });
  if (error instanceof MulterError) return apiResponse.BAD_REQUEST({ res, message: message.FILE_UPLOAD_FAILED, payload: { context: error.code } });
  if (
    error instanceof DivergentArrayError ||
    error instanceof DocumentNotFoundError ||
    error instanceof MissingSchemaError ||
    error instanceof OverwriteModelError ||
    error instanceof ParallelSaveError ||
    error instanceof StrictModeError ||
    error instanceof VersionError ||
    error instanceof MongooseServerSelectionError ||
    error instanceof StrictPopulateError ||
    error instanceof ValidationError ||
    error instanceof ValidatorError ||
    error instanceof CastError
  ) {
    return apiResponse.BAD_REQUEST({ res, message: message.FAILED, payload: { context: error.message } });
  }

  return apiResponse.CATCH_ERROR({ res, message: message.INTERNAL_SERVER_ERROR, payload: { context: error.message } });
};
