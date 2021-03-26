const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard, validateList, validateCard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards );

router.post('/boards', validateBoard, boardsController.createBoard );

router.get('/boards/:id', boardsController.getBoard );

router.post('/lists', validateList, listsController.createList);

router.put('/lists/:id', listsController.updateListTitle);

router.get('/cards/:id', cardsController.getCard);

router.post('/cards', validateCard, cardsController.createCard);

module.exports = router;
