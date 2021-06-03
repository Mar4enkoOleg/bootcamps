import NodeGeocoder from 'node-geocoder'
import Dotenv from 'dotenv'
Dotenv.config({ path: './config/config.env' })

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
}

const geocoder = NodeGeocoder(options)

export default geocoder
