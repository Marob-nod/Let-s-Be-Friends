BEGIN;

INSERT INTO "language" (name) VALUES
('English'),
('German'),
('French'),
('Espagnol'),
('Chinese');

INSERT INTO "tag" (name) VALUES
('Couisine'),
('Culture'),
('Ecologique'),
('Dev');

INSERT INTO "user" (firstname, lastname, gender, email, password, description, age, phone_number, img_url) VALUES
('Jean', 'Bon', 'male', 'porc-salut@gmail.it', '1234', 'i love pata negra', 36, '0612847598', 'https://i.imgur.com/i2hO7b5.jpeg'),
('Maya', 'label', 'female', 'bzzbzz@laruche.com', '1234', 'bzzzzzz....', 8, '118218', 'https://i.imgur.com/3aGYwzc.png'),
('Pablo', 'escobar', 'male', 'contact@substance.co', '1234', 'money money money', 42, '05723133520', 'https://i.imgur.com/FLacYpn.png');

-- INSERT INTO "event" (title, starting_date, ending_date,img_url, places_left, description, longitude, latitude,user_id) VALUES
-- ('Partouze', '2021-09-03 01:46:09', '2020-12-03 09:12:55','https://uknown.com', 6, 'Dans lidée faut être nombreux..', 69, 69, 3),
-- ('Centre aéré','2020-12-03 09:12:55', '2021-09-03 01:46:09', 'https://uknown.com', 4, 'On va se faire un gouter de fou', 12, 43, 2),
-- ('BBQ','2020-12-03 09:12:55', '2021-09-03 01:46:09', 'https://uknown.com', 3, 'Pourriez ramener votre pain svp ?', 32, 87, 1);

-- INSERT INTO "user_speak_language" (user_id, language_id) VALUES
-- (1, 1),
-- (2, 2),
-- (2, 5),
-- (3, 4);

-- INSERT INTO "user_learn_language" (user_id, language_id) VALUES
-- (1, 2),
-- (2, 3),
-- (3, 1),
-- (3, 2);

-- INSERT INTO "user_participate_event" (user_id, event_id) VALUES
-- (1, 2),
-- (2, 2);

-- INSERT INTO "event_has_tag" (event_id, tag_id) VALUES
-- (1, 1),
-- (2, 2);
 
COMMIT;