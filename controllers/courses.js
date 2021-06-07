import Course from '../models/Course.js'
import asyncHandler from '../middlewares/async.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

export const getCourses = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId })
  } else {
    query = Course.find()
  }

  const courses = await query
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  })
})
