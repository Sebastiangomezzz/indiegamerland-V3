const express = require('express');
const router = require("express").Router();
const Game = require("../models/Game.model")
const protectIndex = require("../middleware/protectIndex")

/* GET home page */

router.get("/", protectIndex, (req, res, next) => {
  Game.find().limit(2)
  .then(gamesList=>{
    res.render("index", {gamesList})
  })
  .catch(err=> console.log(err))
});

router.get("/:id", (req, res)=>{
  const {id} = req.params
  Game.findById(id)
  .then((foundGame)=>{
    res.render("demo", {foundGame})
    
  })
  .catch(err=> console.log(err))
})



module.exports = router;
