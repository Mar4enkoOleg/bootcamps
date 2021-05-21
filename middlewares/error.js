const errorHandler = (err, req, res, next) => {
  // Log to console to dev
  console.log(err.stack.red)
  res.status(500).json({ success: false, error: err.message })
}

export default errorHandler
