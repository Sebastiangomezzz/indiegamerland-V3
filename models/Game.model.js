const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
  name: {type: String, unique: true},
  url: {type: String, required: true},
  thumbnailUrl: {type: String, default:"poner imagen aqui"},
  description: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review', default: []}]   
  }
);

const User = model("Game", gameSchema);

// Game model{name, genre, ???}

module.exports = Game;