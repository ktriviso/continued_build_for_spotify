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
    }
    else {
      res.send('err')
    }
  },

  updateEvent(req, res, next) {
    console.log(req.body.event_id)
    db.update(req.body.event_id)
    .then(data => {
      next();
    })
    .catch(err => next(err));
  }
  //
  // async update(req, res, next) {
  //   console.log(req.body.event_id)
  //   const updatedEvent = await db.update(req.body.event_id).then(data => data)
  //   .catch(err => {
  //     next(err)
  //   });
  //
  //   if(updatedEvent){
  //     res.send(updatedEvent)
  //     nect();
  //   } else {
  //     res.send('err')
  //   }
  // }
}
