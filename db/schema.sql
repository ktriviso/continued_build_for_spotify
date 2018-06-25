\connect calendar;

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event (
  event_id SERIAL PRIMARY KEY,
  event_name VARCHAR(28),
  event_description VARCHAR(28),
  start_time VARCHAR(28),
  end_time VARCHAR(28),
  event_date INT,
  event_month VARCHAR(28)
);
