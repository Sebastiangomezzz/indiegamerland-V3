const express = require('express');
const router = express.Router();
const Game = require ("../models/Game.model")
const isLoggedIn = require("../middleware/isLoggedIn")


// router.get('/index', isLoggedIn, (req, res, next) => {
// 	res.render('creator');
// });

router.get('/user', isLoggedIn, (req, res) => {
	Game.find()
	.then(gamesList =>{
		res.render('private/user', {gamesList})
	})
	.catch(err=> console.log(err))
});

router.get("/creator", isLoggedIn, (req, res)=>{
	Game.find()
	.populate("User")
	.then(gamesList =>{
		res.render('private/creator', {gamesList})
	})
	.catch(err=> console.log(err))
})

//////Add a new Game//////////////////// :D XDDD

router.post("/game/add", isLoggedIn, (req, res)=>{
	const creator = req.session.user._id  
	const {name, url, thumbnailUrl, description, review, genre}= req.body	
	Game.create({name, url, thumbnailUrl, description, creator, review, genre})	
	.then(newGame=>{
		console.log("Game created", newGame)
		res.redirect("/private/creator")
	})
	.catch(err=> console.log(err))
})

router.get("/game/add", isLoggedIn, (req, res)=>{
	Game.find()
	.then(gamesList=>{
		console.log(userName)
		res.render("private/new-game", gamesList)
	})
	.catch(err=> console.log(err))
})


module.exports = router;