import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
colors.enable()
import dotenv from 'dotenv'

// Load env variables
dotenv.config({ path: './config/config.env' })

// Load models
import Bootcamp from './models/Bootcamp.js'

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

// Read JSON files
// const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const bootcamps = JSON.parse(fs.readFileSync(new URL('./_data/bootcamps.json', import.meta.url)))

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    console.log('Data destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
