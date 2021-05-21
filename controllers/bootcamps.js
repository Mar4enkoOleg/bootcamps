import Bootcamp from '../models/Bootcamp.js'

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    })
  } catch (err) {
    res.status(400).json({ seccess: false })
  }
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
    next(err)
    // res.status(400).json({ success: false })
  }
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(200).json({
      success: true,
      data: bootcamp,
    })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc    Update new bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}
