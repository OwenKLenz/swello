const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const { validateBoard, validateList, validateCard, validateComment } = require("../validators/validators");


router.get('/boards', boardsController.getBoards );

router.post('/boards', validateBoard, boardsController.createBoard );

router.get('/boards/:id', boardsController.getBoard );

router.post('/lists', validateList, listsController.createList, boardsController.updateBoard);

router.put('/lists/:id', listsController.updateListTitle);

router.get('/cards/:id', cardsController.getCard);

router.post('/cards', validateCard, cardsController.createCard, listsController.updateList);

router.put('/cards/:id', /*validateComment,*/ cardsController.updateCard);

router.delete('/cards/:id', cardsController.deleteCard, listsController.removeCardFromList);

router.post('/comments'/*, validateComment*/, commentsController.createComment, cardsController.addCommentToCard);

// TODO: Remove comment from it's Card
router.delete('/comments/:id'/*, validateComment*/, commentsController.deleteComment);

module.exports = router;
