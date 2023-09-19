const messages = require("../../json/message.json");
const apiResponse = require("../../utils/api.response");
const DB = require("../../models");
const utils = require("../../utils/utils");
const helper = {
  generateSearchQuery: async ({ req }) => {
    let { skip, limit, sortBy, sortOrder, ...findCriteria } = await utils.generateGetFilter({
      query: req.query,
      regexFields: ["name", "description",
        "authorName",
        "price",
        "isbn",
        "publishedYear",
        "language"],
      searchFields: ["name", "description",
        "authorName",
        "price",
        "isbn",
        "publishedYear",
        "language"],
    });
    return { skip, limit, sortBy, sortOrder, findCriteria };
  },
};

module.exports = exports = {
  create: async (req, res) => {
    return apiResponse.OK({ res, message: messages.SUCCESS, payload: await DB.BOOK.create(req.body) });
  },

  fetch: async (req, res) => {
    let { skip, limit, sortBy, sortOrder, findCriteria } = await helper.generateSearchQuery({ req });
    const data = await DB.BOOK.find(findCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    const count = await DB.BOOK.countDocuments(findCriteria);
    return apiResponse.OK({ res, message: messages.SUCCESS, payload: { count, data } });
  },

  update: async (req, res) => {
    const updatedItem = await DB.BOOK.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
    if (!updatedItem) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });

    return apiResponse.OK({ res, message: messages.SUCCESS, payload: updatedItem });
  },

  delete: async (req, res) => {
    const deletedItem = await DB.BOOK.findOneAndRemove({ _id: req.params._id });
    if (!deletedItem) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};
