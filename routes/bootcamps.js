import express from 'express'
import {
  bootcampPhotoUpload,
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcampInRadius,
  getBootcamps,
  updateBootcamp,
} from '../controllers/bootcamps.js'

import Bootcamp from '../models/Bootcamp.js'
import advancedResults from '../middlewares/advancedResults.js'

// Include othe resources router
import courseRouter from './courses.js'
import { authorize, protect } from '../middlewares/auth.js'

const router = express.Router()

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp)
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)
router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

export default router
