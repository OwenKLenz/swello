const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");


const getCard = async (req, res, next) => {
  const cardId = req.params["id"];
  let card;
  try {
    card = await Card.findById(cardId);
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
  const { card } = req.body;

  Card.findByIdAndUpdate(cardId, {...card}, {new: true})
  .then(newCard => {
    res.status(200).json(newCard);
  })

  // card.title || oldCard.title
}

const addCommentToCard = (req, res, next) => {
  const card = req.card;

  const comment = req.comment;

  Card.findByIdAndUpdate(comment.cardId, {$addToSet: { comments: comment._id }})
  .then(() => res.json({comment}))
  .catch(err => next(new HttpError("Comment could not be added to card"), 500));
}

exports.getCard = getCard;
exports.updateCard = updateCard;
exports.createCard = createCard;
exports.addCommentToCard = addCommentToCard;