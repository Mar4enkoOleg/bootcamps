import express from 'express'
import pkg from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
colors.enable()
// import logger from './middlewares/logger.js'
pkg.config({ path: './config/config.env' })

import connectDB from './config/db.js'
connectDB()

const PORT = process.env.PORT || 3002
const app = express()

// Middlewares
// app.use(logger)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
import bootcamps from './routes/bootcamps.js'
app.use('/api/v1/bootcamps', bootcamps)

const server = app.listen(PORT, () => console.info(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.cyan))

// Handle unhandled promise rejections
// Method change try/catch needs

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})
