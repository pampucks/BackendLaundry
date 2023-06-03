const paging = (page = 0) => {
  const limit = 10;
  const offset = page > 1 ? page * limit - 1 : 0;
  return { limit, offset };
};

module.exports = paging;
