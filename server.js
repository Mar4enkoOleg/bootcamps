import express from 'express'
import pkg from 'dotenv'
import morgan from 'morgan'
import logger from './middlewares/logger.js'
import bootcamps from './routes/bootcamps.js'

pkg.config({ path: './config/config.env' })

const PORT = process.env.PORT || 3002
const app = express()

// Middlewares
// app.use(logger)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/v1/bootcamps', bootcamps)

app.listen(PORT, () => console.info(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`))
