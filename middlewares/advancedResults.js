const advancedResults = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query }

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param])

  // console.log(reqQuery)

  let queryStr = JSON.stringify(reqQuery)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  let query = model.find(JSON.parse(queryStr)).populate('courses')

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    console.log(fields)
    query = query.select(fields)
  }

  // Sort by
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.limit(limit).skip(startIndex)

  if (populate) {
    query = query.populate(populate)
  }

  const results = await query

  // Pagination result
  const pagination = {}
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  }
  next()
}

export default advancedResults
