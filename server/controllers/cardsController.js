const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");


const getCard = async (req, res, next) => {
  const cardId = req.params["id"];
  let card;
  try {
    card = await Card.findById(cardId).populate("comments").populate("actions")
  } catch (error) {
    next(new HttpError("Card could not be found.", 404));
  }

  res.json({ card });
};

const createCard = (req, res, next) => {
  const card = req.body.card;
  const listId = req.body.listId;
  console.log(card);

  Card.create({ listId, ...card })
  .then(card => {
    req.card = card;
    next();
  })
  .catch(() => next(new HttpError("The card could not be created.", 404)));
};

const updateCard = (req, res, next) => {
  const cardId = req.params.id
  let card = req.body.card;
  Card.findByIdAndUpdate(cardId, {...card}, {new: true})
  .then(newCard => {
    req.card = newCard;
    next();
  })

  // card.title || oldCard.title
}
const addActionToCard = (req, res, next) => {
  const card = req.card;

  const action = req.action;
  if (action) {
    Card.findByIdAndUpdate(action.cardId, {$addToSet: { actions: action._id }}, {new: true})
    .then(() => res.json({card, action}))
    .catch(err => next(new HttpError("Comment could not be added to card"), 500));
  } else {
    res.json(card)
  }
}
const addCommentToCard = (req, res, next) => {
  const card = req.card;

  const comment = req.comment;

  Card.findByIdAndUpdate(comment.cardId, {$addToSet: { comments: comment._id }})
  .then(() => res.json({comment}))
  .catch(err => next(new HttpError("Comment could not be added to card"), 500));
}

const deleteCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findByIdAndDelete(cardId)
  .then(deletedCard => {
    console.log("deleted card", deletedCard);
    req.listId = deletedCard.listId;
    next();
  })
  .catch(err => next(new HttpError("Card not found"), 500));
}

exports.getCard = getCard;
exports.updateCard = updateCard;
exports.createCard = createCard;
exports.addCommentToCard = addCommentToCard;
exports.addActionToCard = addActionToCard;
exports.deleteCard = deleteCard;