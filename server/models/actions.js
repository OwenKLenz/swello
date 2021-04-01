const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionSchema = new Schema(
  {
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    description: {
      type: String,
      required: [true, "The action description is required"]
    },
  },
  { timestamps: true }
);

const Action = mongoose.model("Action", ActionSchema);

module.exports = Action;