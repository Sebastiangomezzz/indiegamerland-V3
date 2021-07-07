const express = require('express');
const router = express.Router();
const Game = require ("../models/Game.model")
const isLoggedIn = require("../middleware/isLoggedIn")

const fileUploader = require('../config/cloudinary.config.js');

// router.get('/index', isLoggedIn, (req, res, next) => {
// 	res.render('creator');
// });

router.get('/user', isLoggedIn, (req, res) => {
	Game.find()
	.populate("creator")
	.then(gamesList =>{
		res.render('private/user', {gamesList})
	})
	.catch(err=> console.log(err))
});

router.get("/creator", isLoggedIn, (req, res)=>{
	Game.find()
	.populate("creator")
	.then(gamesList =>{
		// console.log(gamesList)
		res.render('private/creator', {gamesList})
	})
	.catch(err=> console.log(err))
})

//////Add a new Game//////////////////// :D XDDD

router.post("/game/add", isLoggedIn, fileUploader.single("thumbnailUrl"), (req, res)=>{
	const creator = req.session.user._id  
	const {name, url, description, review, genre}= req.body	
	Game.create({name, url, thumbnailUrl: req.file.path, description, creator, review, genre})	
	.then(newGame=>{
		console.log("Game created", newGame)
		res.redirect("/private/creator")
	})
	.catch(err=> console.log(err))
})

router.get("/game/add", isLoggedIn, (req, res)=>{
	Game.find()
	.then(gamesList=>{		
		res.render("private/new-game", gamesList)
	})
	.catch(err=> console.log(err))
})
//////////router creator-profile///////////////martes 6 ////////

router.get("/creator/profile", isLoggedIn, (req, res)=>{
	const creatorId = req.session.user._id
	Game.find({creator: creatorId})	//mas explicito, Boss way
	.populate("creator")
	.then(creatorGamesList =>{		
		//console.log(creatorGamesList)

		//gitan way+
		// const newList = creatorGamesList.filter((eachGame)=>eachGame.creator.id===creatorId)
		// console.log(newList)//gitan way+
		
		res.render('private/creator-profile', {creatorGamesList})
	})
	.catch(err=> console.log(err))
})

//////////router game-private///////////

router.get("/:id", isLoggedIn, (req,res)=>{
	const {id} = req.params
	Game.findById(id)
	.then(foundGame =>{
		console.log(foundGame)
		res.render('private/game-private', {foundGame})
	})
	.catch(err=> console.log(err))
})

router.get("/:id/edit", isLoggedIn, (req, res)=>{
	const {id} = req.params;

	Game.findById(id)
		.populate("creator")
		.then((game)=>{
			res.render('private/edit-game', { game })

		})
		.catch(err=> console.log(err))
})


router.post("/:id/edit", isLoggedIn, fileUploader.single("thumbnailUrl"), (req, res)=>{
	const {id} = req.params;
	const {name, description, genre} = req.body;

	Game.findByIdAndUpdate(id, {name, thumbnailUrl:req.file.path, description, genre})
		.then(()=>{
			res.redirect("/private/creator/profile")
		})
		.catch(err=> console.log(err))
})

router.get('/:id/delete', (req, res)=>{
	const {id} = req.params;
	Game.findByIdAndDelete(id)
		.then(()=>{
			res.redirect("/private/creator/profile")
		})
		.catch((err) => console.log(err));			
})
		



/* <a href="/rooms/{{_id}}">See more</a> */

module.exports = router;


