const Comment = require("../models/comments");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);

  console.log(req.body)

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
    next(new HttpError("Comment title or card id are missing", 404));
  }
}

const deleteComment = (req, res, next) => {
  const commentId = req.params.id;

  Comment.deleteOne({_id: commentId})
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => {
    next(new HttpError("Comment couldn't be deleted"));
   });
}

exports.createComment = createComment;
exports.deleteComment = deleteComment;