import express from 'express'
import { login, register, getMe } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)

export default router
