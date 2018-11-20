-- psql -U dev -d noteful-app -f ./db/noteful-app.sql

SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes;

CREATE TABLE notes(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now()
  );

INSERT INTO notes (title, content)
  VALUES ('5 life lessons learned from cats', 'Broadside lugger sloop jack crimp. Jack Tar squiffy fluke lass jib. Hulk chandler topsail parley strike colors.'),
  ('What the government doesn''t want you to know about cats', 'Bounty fore case shot spanker hearties. Furl overhaul driver cog hands. Spike brigantine six pounders snow starboard.'),
  ('The most boring article about cats you''ll ever read', 'Warp to go on account booty code of conduct dead men tell no tales.'),
  ('9 things lady gaga has in common with cats', ''),
  ('The most incredible article about cats you''ll ever read', 'Gaff barque come about tack trysail. Carouser clipper pillage log Arr.')
  RETURNING id, title;
