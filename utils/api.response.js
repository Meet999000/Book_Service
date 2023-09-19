const { HTTP_CODES } = require("../json/enums.json");

module.exports = {
  BAD_REQUEST: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      success: false,
      message,
      payload,
    });
  },

  DUPLICATE_VALUE: ({ res, message = "Duplicate value.", payload = {} } = {}) => {
    res.status(HTTP_CODES.DUPLICATE_VALUE).json({
      success: false,
      message,
      payload,
    });
  },

  FORBIDDEN: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.FORBIDDEN).json({
      success: false,
      message,
      payload,
    });
  },

  CATCH_ERROR: ({ res, message = "-", payload = {} } = {}) => {
    let responseCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
    if ((message && message.includes("validation failed")) || message.includes("duplicate key error collection")) responseCode = HTTP_CODES.BAD_REQUEST;
    res.status(responseCode).json({
      success: false,
      message,
      payload,
    });
  },

  METHOD_NOT_ALLOWED: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.METHOD_NOT_ALLOWED).json({
      success: false,
      message,
      payload,
    });
  },

  MOVED_PERMANENTLY: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.MOVED_PERMANENTLY).json({
      success: false,
      message,
      payload,
    });
  },

  NOT_ACCEPTABLE: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.NOT_ACCEPTABLE).json({
      success: false,
      message,
      payload,
    });
  },

  NOT_FOUND: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.NOT_FOUND).json({
      success: false,
      message,
      payload,
    });
  },

  NO_CONTENT_FOUND: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.NO_CONTENT_FOUND).json({
      success: false,
      message,
      payload,
    });
  },

  OK: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.OK).json({
      success: true,
      message,
      payload,
    });
  },

  PERMANENT_REDIRECT: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.PERMANENT_REDIRECT).json({
      success: false,
      message,
      payload,
    });
  },

  UNAUTHORIZED: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.UNAUTHORIZED).json({
      success: false,
      message,
      payload,
    });
  },

  UPGRADE_REQUIRED: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.UPGRADE_REQUIRED).json({
      success: false,
      message,
      payload,
    });
  },

  VALIDATION_ERROR: ({ res, message = "-", payload = {} } = {}) => {
    res.status(HTTP_CODES.VALIDATION_ERROR).json({
      success: false,
      message,
      payload,
    });
  },
};
