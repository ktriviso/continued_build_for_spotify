\connect calendar;

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event (
  event_id SERIAL PRIMARY KEY,
  event_name VARCHAR(28) NOT NULL,
  event_description VARCHAR(28) NOT NULL,
  start_time VARCHAR(28) NOT NULL,
  end_time VARCHAR(28) NOT NULL,
  event_date INT NOT NULL
);
