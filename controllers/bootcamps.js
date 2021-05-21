import Bootcamp from '../models/Bootcamp.js'
import asyncHandler from '../middlewares/async.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

// Example without asyncHandler

// export const getBootcamps = async (req, res, next) => {
//   try {
//     const bootcamps = await Bootcamp.find()
//     res.status(200).json({
//       success: true,
//       count: bootcamps.length,
//       data: bootcamps,
//     })
//   } catch (err) {
//     next(err)
//   }
// }

export const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find()
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
  }
  res.status(200).json({ success: true, data: bootcamp })
})

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)

  res.status(200).json({
    success: true,
    data: bootcamp,
  })
})

// @desc    Update new bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
  }
  res.status(200).json({ success: true, data: bootcamp })
})

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
  }
  res.status(200).json({ success: true, data: {} })
})
