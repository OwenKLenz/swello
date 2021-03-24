const {check} = require('express-validator');

exports.validateBoard = [check("title").not().isEmpty()];

exports.validateList = [
  check("boardId").not().isEmpty(),
  check("list.title").not().isEmpty()
]
