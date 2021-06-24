import express from 'express'
import Dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
colors.enable()
import fileupload from 'express-fileupload'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// import fs from 'fs'
// import logger from './middlewares/logger.js'
Dotenv.config({ path: './config/config.env' })

import connectDB from './config/db.js'
connectDB()

// Import routes
import bootcamps from './routes/bootcamps.js'
import courses from './routes/courses.js'

const PORT = process.env.PORT || 3002
const app = express()

// Middlewares
app.use(express.json())

// app.use(logger)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(join(__dirname, 'public')))

// Routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

import errorHandler from './middlewares/error.js'
app.use(errorHandler)

const server = app.listen(PORT, () =>
  console.info(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.cyan)
)

// Handle unhandled promise rejections
// Method change try/catch needs

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})

// watch 5. async await middleware
