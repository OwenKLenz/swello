const Action = require("../models/actions");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createAction = (req, res, next) => {
  const errors = validationResult(req);

  console.log("creating action:", req.body)

  if (errors.isEmpty()) {
    const cardId = req.body.cardId;
    const description = req.body.card.action;
    if (description) {
      const action = {
        cardId,
        description,
      }

      Action.create(action)
        .then(newAction => {
          req.action = newAction;
          next();
        })
        .catch(err => {
          console.log(err);
          next(new HttpError("Creating a new action failed"));
        });
    } else {
      console.log("no description", description);
      next()
    }
  } else {
    next(new HttpError("Action description is missing", 404));
  }
}

const deleteAction = (req, res, next) => {
  const actionId = req.params.id;

  Action.deleteOne({_id: actionId})
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => {
    next(new HttpError("Comment couldn't be deleted"));
   });
}

exports.createAction = createAction;
exports.deleteAction = deleteAction;