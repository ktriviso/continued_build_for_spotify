const db = require ('../config/connection');

module.exports = {
  handleSubmit(calendar_event){
    return db.one(`
      INSERT INTO event
      (event_name, event_description, start_time, end_time, event_date, event_month)
      VALUES ($/event_name/, $/event_description/, $/start_time/, $/end_time/, $/event_date/, $/event_month/)
      RETURNING *
    `, calendar_event);
  },

  returnAllEvents(){
    return db.many(`
      SELECT *
      FROM event
    `)
  },

  update(calendar_event) {
    return db.one(`
      UPDATE event
      SET
      event_name = $/event_name/,
      event_description = $/event_description/,
      start_time = $/start_time/,
      end_time = $/end_time/
      WHERE event_id = $/event_id/
      RETURNING *
    `, calendar_event);
  },

  deleteEvent(event_id){
    return db.none(`
      DELETE FROM event
      WHERE event_id = $1
    `, event_id)
  }

}
