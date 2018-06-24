const router        = require('express').Router();
const controller    = require('../controllers/controller');

router.route('/:event_id')
  .put(controller.updateEvent)

router.route('/')
    .post(controller.addEvent)
    .get(controller.getAllEvents)
    
module.exports = router;
