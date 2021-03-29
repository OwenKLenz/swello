const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, "The Card title field is required"],
  },
  dueDate: Date,

  labels: [
    {
      type: String,
    },
  ],

  description: String,

  listId: {
    type: Schema.Types.ObjectId,
    ref: "List",
  },

  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },

  position: {
    type: Schema.Types.Decimal128,
    required: [true, "The Card must have a position field"],
    default: 65535.0,
  },

  completed: {
    type: Boolean,
    required: [true, "The card must have a completion status"],
    default: false,
  },

  actions: [
    {
      type: String,
    }
  ],

  comments: [
    {
      type: String,
    }
  ],
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
