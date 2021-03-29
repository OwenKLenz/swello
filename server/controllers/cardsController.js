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

exports.getCard = getCard;
exports.createCard = createCard;