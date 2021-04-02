const List = require("../models/list");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    console.log("this is the body:", req.body)

    const boardId = req.body.boardId;
    const title = req.body.list.title;
    const position = req.body.list.position;
    const list = {
      boardId,
      title,
      position
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

  console.log(card);

  List.findByIdAndUpdate(card.listId, {$addToSet: { cards: card._id }})
    .then(() => res.json({ card }))
    .catch(err => next(new HttpError("Card Could not be added to a list."), 500))
}

const removeCardFromList = (req, res, next) => {
  const listId = req.listId;
  const cardId = req.params.id;

  List.updateOne({_id: listId}, { $pull: { cards: cardId } })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => next(new HttpError("Card was not removed from list")))
}

exports.createList = createList;
exports.updateListTitle = updateListTitle;
exports.updateList = updateList;
exports.removeCardFromList = removeCardFromList;