const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/auth')
const upload = require('../meddleware/upload')



router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/me',passport.authenticate('jwt',{session : false}),controller.me)
router.patch('/profile/photo',passport.authenticate('jwt',{session : false}),upload.single('image'),controller.updateProfilePhoto)
router.patch('/profile/userName',passport.authenticate('jwt',{session : false}),controller.updateUserName)

  

module.exports = router