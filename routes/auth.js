import express from 'express'
import { login, register, getMe, forgotPassword } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)
router.route('/forgotpassword').post(forgotPassword)

export default router
