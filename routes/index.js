const express = require('express');
const router = require("express").Router();
const Game = require("../models/Game.model")

/* GET home page */

router.get("/", (req, res, next) => {
  Game.find().limit(2)
  .then(gamesList=>{
    console.log("ruta demo!!", gamesList)
    res.render("index", {gamesList})
  })
  .catch(err=> console.log(err))
});




module.exports = router;
