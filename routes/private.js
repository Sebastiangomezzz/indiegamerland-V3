const express = require('express');
const router = express.Router();
const Game = require ("../models/Game.model")
const isLoggedIn = require("../middleware/isLoggedIn")
const protectCreator = require("../middleware/protectCreator")
const fileUploader = require('../config/cloudinary.config.js');
const Review = require('../models/Review.model');
const User = require('../models/User.model');
// router.get('/index', isLoggedIn, (req, res, next) => {
// 	res.render('creator');
// });

router.get('/user', isLoggedIn, (req, res) => {
	Game.find()
	.populate("creator")
	.then(gamesList =>{
		res.render('private/user', {gamesList,
		currentUser: req.session.user})
	})
	.catch(err=> console.log(err))
});

router.get("/creator", protectCreator, isLoggedIn, (req, res)=>{
	Game.find()
	.populate("creator")
	.then(gamesList =>{
		res.render('private/creator', {gamesList,
		currentCreator: req.session.user})
	})
	.catch(err=> console.log(err))
})

//////Add a new Game//////////////////// :D XDDD

router.post("/game/add", protectCreator, isLoggedIn, fileUploader.single("thumbnailUrl"), (req, res)=>{
	const creator = req.session.user._id  
	const {name, url, description, review, genre}= req.body	
	Game.create({name, url, thumbnailUrl: req.file.path, description, creator, review, genre})	
	.then(newGame=>{
		console.log("Game created", newGame)
		res.redirect("/private/creator")
	})
	.catch(err=> console.log(err))
})

router.get("/game/add", protectCreator, isLoggedIn, (req, res)=>{
	Game.find()
	.then(gamesList=>{		
		res.render("private/new-game", gamesList)
	})
	.catch(err=> console.log(err))
})
//////////router creator-profile///////////////martes 6 ////////

router.get("/creator/profile", protectCreator, isLoggedIn, (req, res)=>{
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
	.populate('creator')
		.populate({
			path: 'reviews',
			populate: {
				path: 'user'
			}
		})
	.then(foundGame =>{
		res.render('private/game-private', foundGame)
	})
	.catch(err=> console.log(err))
})

/////////////edit game//////////////////
router.get("/:id/edit", protectCreator, isLoggedIn, (req, res)=>{
	const {id} = req.params;

	Game.findById(id)
		.populate("creator")
		.then((game)=>{
			res.render('private/edit-game', { game })

		})
		.catch(err=> console.log(err))
})


router.post("/:id/edit", protectCreator, isLoggedIn, fileUploader.single("thumbnailUrl"), (req, res)=>{
	const {id} = req.params;
	const {name, description, genre} = req.body;

	Game.findByIdAndUpdate(id, {name, thumbnailUrl:req.file.path, description, genre})
		.then(()=>{
			res.redirect("/private/creator/profile")
		})
		.catch(err=> console.log(err))
})
//////////delete game/////////////////////

router.get('/:id/delete', protectCreator, isLoggedIn, (req, res)=>{
	const {id} = req.params;
	Game.findByIdAndDelete(id)
		.then(()=>{
			res.redirect("/private/creator/profile")
		})
		.catch((err) => console.log(err));			
})
		

////////////game reviews/////////////////

router.get('/:id/review', protectCreator, isLoggedIn, (req, res) => {
	const { id } = req.params;
	//const roomId = req.params.id
 
	Game.findById(req.params.id)
		
		.then((game) => {
			console.log(game)
			res.render('/private/creator',  game );

		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/:id/review', isLoggedIn, (req, res) => {
	const { id } = req.params;
	//const roomId = req.params.id
 
	Game.findById(req.params.id)
		.then((game) => {
			res.render('/private/user', { game });
		})
		.catch((error) => {
			console.log(error);
		});
});

router.post('/:id/review', isLoggedIn, protectCreator, (req, res) => {
	//GET the values
	const gameId = req.params.id;
	const { comment } = req.body;

	Review.create({
		user: req.session.user._id,
		comment // comment: req.body.comment
	})
		.then((newReview) => {
			console.log(newReview);

			Game.findByIdAndUpdate(gameId, {
				$addToSet: { reviews: newReview._id }
			})
				.then((updatedGame) => {
					console.log(updatedGame);
					res.redirect(`/private/${gameId}`);
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});

// router.post('/:id/review', isLoggedIn, (req, res) => {
// 	//GET the values
// 	const gameId = req.params.id;
// 	const { comment } = req.body;

// 	Review.create({
// 		user: req.session.user._id,
// 		comment // comment: req.body.comment
// 	})
// 		.then((newReview) => {
// 			console.log(newReview);

// 			Game.findByIdAndUpdate(gameId, {
// 				$addToSet: { reviews: newReview._id }
// 			})
// 				.then((updatedGame) => {
// 					console.log(updatedGame);
// 					res.redirect(`/private/${gameId}`);
// 				})
// 				.catch((error) => {
// 					console.log(error);
// 				});
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });

module.exports = router;


