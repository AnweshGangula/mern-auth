import express from 'express'
import { authUser, registerUser, logoutUser, getuserProfile, updateuserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(getuserProfile).put(updateuserProfile)


export default router