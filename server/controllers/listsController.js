const List = require("../models/list");
const Board = require("../models/board");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const boardId = req.body.boardId;
    const title = req.body.list.title;

    const list = {
      boardId,
      title
    }

    List.create(list)
      .then(newList => {
        req.list = newList;
        next();
      })
      .catch(err => {
        console.log(err)
        next(new HttpError("Creating a new list failed", 500));
      });
  } else {
    return next(new HttpError("List title or board id are missing", 404));
  }
}

const updateListTitle = (req, res, next) => {
  const listId = req.params.id;
  const title = req.body.title;

  List.findByIdAndUpdate(listId, {title}, {new: true})
    .then((newList) => {
      res.status(200).json(newList);
    })
}

const updateList = (req, res, next) => {
  const card = req.card; 

  List.findByIdAndUpdate(card.ListId, {$push: { cards: card }})
    .then(() => res.json({ card }))
    .catch(err => next(new HttpError("Card Could not be added to a list."), 500))
}

exports.createList = createList;
exports.updateListTitle = updateListTitle;
exports.updateList = updateList;