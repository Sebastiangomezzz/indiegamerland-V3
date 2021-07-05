const mongoose = require('mongoose');
const GameModel = require("../models/Game.model.js")


const games = [
    {
    name: "Flatearthling Nightmare", url: "https://sebastiangomezzz.github.io/flat-eathling-nightmare/",
    thumbnailUrl: "/public/images/Screenshot from 2021-07-05 11-52-15.png",
    description: "Coolest game ever",
    creator: "60e2b728ad2a3514e6c7566a",
    reviews: [],
    genre: "Arcade"
    },
    {
    name: "Skater Girl Takes Japan", url: "https://laurindor.github.io/Skater-girl-takes-Japan/",
    thumbnailUrl: "/public/images/skatergirl.PNG",
    description: "Not the coolest game ever but almost",
    creator: "60e2b728ad2a3514e6c7566a",
    reviews: [],
    genre: "Arcade"        
    },
    {
    name: "Aguafiestas", url: "https://viciot.github.io/Aguafiestas_v1/",
    thumbnailUrl: "/public/images/fondo1.png",
    description: "Something between Battlefield and Age of Empires 2",
    creator: "60e2b728ad2a3514e6c7566a",
    reviews: [],
    genre: "Strategy"     
    }
]

require("../db");////////////muy importante!!!!

GameModel.insertMany(games)
.then(gamesCreated=> {
    console.log("New game created!!", gamesCreated)})
.then(()=>{
    mongoose.disconnect()
})
.catch(err=> console.log("Oops, something went wrong!", err))