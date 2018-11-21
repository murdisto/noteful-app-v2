-- psql -U dev -d noteful-app -f ./db/noteful-app.sql

SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS folders CASCADE;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO folders (name) VALUES
('Archive'),
('Drafts'),
('Personal'),
('Work');


CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);



INSERT INTO notes (title, content, folder_id)
  VALUES ('5 life lessons learned from cats', 'Broadside lugger sloop jack crimp. Jack Tar squiffy fluke lass jib. Hulk chandler topsail parley strike colors.', 100),
  ('What the government doesn''t want you to know about cats', 'Bounty fore case shot spanker hearties. Furl overhaul driver cog hands. Spike brigantine six pounders snow starboard.', 101),
  ('The most boring article about cats you''ll ever read', 'Warp to go on account booty code of conduct dead men tell no tales.', 102),
  ('9 things lady gaga has in common with cats', '', 103)
  RETURNING id, title;
