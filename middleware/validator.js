const Joi = require("joi");
const apiResponseponse = require("../utils/api.response");

const validator = (schema) => async (req, res, next) => {
  const paths = Object.keys(schema);
  if (!paths.length) return next();
  if (!paths.includes("body") && !paths.includes("query") && !paths.includes("params") && !paths.includes("files")) return next();

  for (let path of paths) {
    const dataForValidation = req[path];
    const { value, error } = schema[path].validate(dataForValidation, {
      allowUnknown: false,
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      const context = error?.details;
      return apiResponseponse.BAD_REQUEST({
        res,
        message: `Validation failed for ${path}.`,
        payload: { context, fieldsAccepted: Object.keys(schema[path].describe().keys) },
      });
    }
    req[path] = value;
  }
  next();
};

const parseArray = (value, helper) => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (value === "") return [];
  if (Array.isArray(value)) return value;
  try {
    if (!Array.isArray(JSON.parse(value))) return helper.error("any.invalid");
    return JSON.parse(value);
  } catch (error) {
    return helper.error("any.invalid");
  }
};

module.exports = {
  validator,
  parseArray,
};
