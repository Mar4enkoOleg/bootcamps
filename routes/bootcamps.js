import express from 'express'
import { createBootcamp, deleteBootcamp, getBootcamp, getBootcampInRadius, getBootcamps, updateBootcamp } from '../controllers/bootcamps.js'
const router = express.Router()

router.route('/').get(getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)

export default router
