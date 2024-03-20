 import asyncHandler from 'express-async-handler'

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Auth User'})
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Register User'})
})

// @desc    Logout  user
// route    POST /api/users
// @access  Public
const logoutUser = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Logout User'})
})

// @desc    Get user Profile
// route    GET /api/users/profile
// @access  Private
const getuserProfile = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'User Profile'})
})

// @desc    Update user Profile
// route    GET /api/users/profile
// @access  Private
const updateuserProfile = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Update user Profile'})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getuserProfile,
    updateuserProfile
}