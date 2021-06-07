import express from 'express'
import { createBootcamp, deleteBootcamp, getBootcamp, getBootcampInRadius, getBootcamps, updateBootcamp } from '../controllers/bootcamps.js'

// Include othe resources router
import courseRouter from './courses.js'

const router = express.Router()

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/').get(getBootcamps).post(createBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)

export default router
