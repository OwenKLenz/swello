const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find(
          { _id: board._id },
          "title _id createdAt updatedAt"
        ).then((board) => res.json({ board }));
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = async (req, res, next) => {
  const boardId = req.params["id"];
  let board;
  try {
    board = await Board.findById(boardId).populate({
      path: "lists",
      populate: {
        path: "cards",
        populate: {
          path: "comments",
        },
      },
    });
  } catch (e) {
    next(new HttpError("Board could not be retrieved.", 404));
  }
  res.json({ board });
};

const updateBoard = (req, res, next) => {
  const list = req.list;

  Board.findByIdAndUpdate(req.list.boardId, {$push: {lists: list._id}})
    .then(() => {
      res.status(201).json(list);
    })
    .catch(err => {
      next(new HttpError("Finding or updating board failed", 500));
    })
}

exports.getBoards = getBoards;
exports.getBoard = getBoard;
exports.createBoard = createBoard;
exports.updateBoard = updateBoard;