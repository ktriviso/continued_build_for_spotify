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

  deleteEvent(req, res, next) {
    db.deleteEvent(req.params.event_id)
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

  updateEvent(req, res, next) {
    req.body.event_id = req.params.event_id
    db.update(req.body).then(data => data)
    .then(data => {
      res.send('ok')
      next();
    })
    .catch(err => {
      next(err);
    });
  }

}
