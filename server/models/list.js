const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The List title is required"],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    position: {
      type: Schema.Types.Decimal128,
      required: [true, "The List position field is required"],
      default: 65535.0,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
