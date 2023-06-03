const Paginator = async (page, queryBuilder) => {
  page = page ? page : 1;
  const limit = parseInt(process.env.PAGE_LIMIT || 10);
  const offSet = (page - 1) * limit;

  const total = await queryBuilder.clone().count("* as count").first();
  const results = await queryBuilder.clone().limit(limit).offSet(offSet);

  const numberOfPage = Math.ceil(total.count / limit);
  const next = page + 1 > numberOfPage ? null : page + 1;
  const prev = page - 1 <= 0 ? null : page - 1;

  return {
    page,
    next,
    prev,
    numberOfPage,
    total: total.count,
    results,
  };
};

module.exports = Paginator;
