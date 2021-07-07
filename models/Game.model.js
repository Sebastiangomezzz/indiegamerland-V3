const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
  name: {type: String, unique: true},
  url: {type: String, required: true},
  thumbnailUrl: String,
  description: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },//esto se "autosustituye" por el id del user.model 
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review', default: []}],
  genre: String
  }
);

const Game = model("Game", gameSchema);

// Game model{name, genre, ???}

module.exports = Game;