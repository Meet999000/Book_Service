const Joi = require("joi");
const validator = require("../../middleware/validator").validator;
module.exports = {
  create: validator({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      authorName: Joi.string().required(),
      price: Joi.number().required(),
      isbn: Joi.string().required(),
      publishedYear: Joi.number().required(),
      language: Joi.string().required(),
    })
  }),

  fetch: validator({
    query: Joi.object({
      name: Joi.string(),
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid ID"),
      search: Joi.string(),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
      sortBy: Joi.string().default("createdAt"),
      sortOrder: Joi.string().default("desc"),
    }),
  }),

  update: validator({
    body: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      authorName: Joi.string(),
      price: Joi.number(),
      isbn: Joi.string(),
      publishedYear: Joi.number(),
      language: Joi.string(),
    }).min(1),
    params: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid ID")
        .required(),
    }),
  }),

  delete: validator({
    params: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid ID")
        .required(),
    }),
  }),
};
