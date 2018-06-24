const db = require('../models/model');

module.exports = {
  addEvent(req, res, next) {
    db.handleSubmit(req.body)
      .then(data => {
        res.send('ok')
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  async getAllEvents(req, res, next) {
    const events = await db.returnAllEvents(req.body).then(data => data)
    .catch(err => {
      next(err);
    });

    if(events){
      res.send(events)
      next();
    } else {
      res.send('err')
    }
  },

  async updateEvent(req, res, next) {
    req.body.event_id = req.params.event_id
    const updatedEvent = await db.update(req.body).then(data => data)
    .catch(err => next(err));

    if(updatedEvent){
      res.send(updatedEvent)
      next();
    } else {
      res.send('err')
    }
  }

}
