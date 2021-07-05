const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn")


// router.get('/index', isLoggedIn, (req, res, next) => {
// 	res.render('creator');
// });

router.get('/index', isLoggedIn, (req, res, next) => {
	res.render('private/user');
});


module.exports = router;