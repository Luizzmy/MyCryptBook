const express = require("express");
const passport = require('passport');
const router = express.Router();


const { signup, 
    login, 
    logout,
    test,
    currentUser,
    userDetails,
    updateUser,
    googleInit, 
    googleCb 
} = require('../controllers/auth')

const {
    catchErrs
}=require('../middlewares/auth')




//Login route
router.post("/login", catchErrs(login));

//Signup route
router.post("/signup", catchErrs(signup));

//Logged In user
router.get('/current-user', currentUser)

//Update user
router.put('/userUpdate', catchErrs(updateUser))
// router.get('/testing', currentUser)
router.get("/logout", logout);

//User details
router.get("/:userId", catchErrs(userDetails))

//Logout user




//Google authentication routes
router.get('/auth/google', googleInit)
router.get('/auth/google/callback', googleCb)

module.exports = router;