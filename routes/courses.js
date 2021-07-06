import express from 'express'
import { getCourses, getCourse, addCourse, updateCourse, deleteCourse } from '../controllers/courses.js'
import advancedResults from '../middlewares/advancedResults.js'
import { protect, authorize } from '../middlewares/auth.js'
import Course from '../models/Course.js'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse)
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse)

export default router
