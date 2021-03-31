const Comment = require("../models/comments");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const cardId = req.body.cardId;
    const text = req.body.comment.text;

    const comment = {
      cardId,
      text,
    }

    Comment.create(comment)
      .then(newComment => {
        req.comment = newComment;
        next();
      })
      .catch(err => {
        console.log(err);
        next(new HttpError("Creating a new comment failed"));
      });
  } else {
    return next(new HttpError("Comment title or card id are missing", 404));
  }
}

exports.createComment = createComment;