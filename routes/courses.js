import express from 'express'
import { getCourses, getCourse, addCourse, updateCourse, deleteCourse } from '../controllers/courses.js'
import advancedResults from '../middlewares/advancedResults.js'
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
  .post(addCourse)
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse)

export default router
