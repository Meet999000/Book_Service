module.exports = utils = {
  generateGetFilter: async ({ isPermanentDelete = true, query = {}, regexFields = [], searchFields = [], rangeFields = [], inFields = [] } = {}) => {
    if (!isPermanentDelete && !query.isAll) query.isActive = true;
    query["$or"] = [];
    query["$and"] = [];
    query.page = +query.page;
    query.skip = query.page ? (query.page - 1) * query.limit : 0;
    query.limit = +query.limit;
    query.sortBy = query.sortBy;
    query.sortOrder = query.sortOrder;

    if (regexFields.length) for await (const key of regexFields) if (query[key]) query[key] = { $regex: query[key], $options: "i" };

    if (searchFields.length && query.search)
      for await (const key of searchFields)
        query["$or"].push({
          ...(key.startsWith("+") && typeof +query.search === "number" && +query.search === NaN
            ? { [key.substring(1)]: +query.search }
            : { [key]: { $regex: query.search, $options: "i" } }),
        });

    if (rangeFields.length) for await (const key of rangeFields) if (query[key]) query["$and"].push({ [key.split("Range")[0]]: { $gte: query[key][0], $lte: query[key][1] } });

    if (inFields.length) for await (const key of inFields) if (query[key]) query["$and"].push({ [key.split("In")[0]]: { $in: query[key] } });

    if (query["$or"].length === 0) delete query["$or"];
    if (query["$and"].length === 0) delete query["$and"];

    return query;
  },

  flattenObject: ({ obj, prefix = "" } = {}) => {
    const flattenObj = {};
    function flatten({ obj, prefix = "" } = {}) {
      for (const key in obj) {
        if (typeof obj[key] !== "object") flattenObj[`${prefix}${key}`] = obj[key];
        else flatten({ obj: obj[key], prefix: `${prefix}${key}.` });
      }
    }
    flatten({ obj, prefix });
    return flattenObj;
  },
};
