-- Verify lbf:init on pg

BEGIN;

SELECT id FROM "user" WHERE false;
SELECT id FROM event WHERE false;
SELECT id FROM language WHERE false;
SELECT id FROM tag WHERE false;

SELECT user_id FROM user_speak_language WHERE false;
SELECT user_id FROM user_learn_language WHERE false;
SELECT user_id FROM user_participate_event WHERE false;
SELECT event_id FROM event_has_tag WHERE false;
SELECT event_id FROM event_has_language WHERE false;

ROLLBACK;
