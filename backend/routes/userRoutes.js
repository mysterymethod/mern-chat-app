const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

// router.route("/").get(protect, allUsers);
router.route("/").post(registerUser).get(protectect, allUsers)
router.post("/login", authUser);

module.exports = router















// router.route("/").post(registerUser);
// by doing this we can chain our get/post request.

// router.post("/login", authUser);
// this is the simple way to do it.
