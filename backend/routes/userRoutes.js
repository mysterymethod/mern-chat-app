const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

// router.route("/").get(protect, allUsers);

// .get(protectect, allUsers) = first allUsers have to go through protect middleware,
// where the current user gets authorize.
 
router.route("/").post(registerUser).get(protect, allUsers)
router.post("/login", authUser);

module.exports = router















// router.route("/").post(registerUser);
// by doing this we can chain our get/post request.

// router.post("/login", authUser);
// this is the simple way to do it.
