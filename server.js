import express from 'express'
import pkg from 'dotenv'
pkg.config({ path: './config/config.env' })

const PORT = process.env.PORT || 3002
const app = express()
app.listen(PORT, () => console.info(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`))
