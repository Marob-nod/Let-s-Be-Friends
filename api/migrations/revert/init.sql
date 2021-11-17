-- Revert lbf:init from pg

BEGIN;

DROP TABLE event_has_language ,event_has_tag, user_participate_event, user_learn_language, user_speak_language ,user_ask_event, tag, language, event, "user";
DROP DOMAIN places_left_domain, latitude_domain, longitude_domain, title_domain, phone_domain, email_domain, age_domain;
DROP EXTENSION citext;


COMMIT;
