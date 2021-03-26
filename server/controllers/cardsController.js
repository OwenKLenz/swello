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

  Card.create(card)
  .then(card => {
    List.findByIdAndUpdate(listId, {$push: { cards: card }})
    .then(() => res.json({ card }))
    .catch(err => next(new HttpError("Card Could not be added to a list."), 500))
  })
  .catch(() => next(new HttpError("The card could not be created.", 404)));
};

exports.getCard = getCard;
exports.createCard = createCard;