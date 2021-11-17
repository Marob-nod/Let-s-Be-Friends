-- Deploy lbf:extension to pg

BEGIN;

-- Extension to trigger updated_at for each table at each update
CREATE EXTENSION IF NOT EXISTS moddatetime;
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "user"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "event"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "tag"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "language"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "user_speak_language"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "user_learn_language"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "user_participate_event"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "event_has_tag"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
CREATE TRIGGER update_timestamp BEFORE UPDATE ON "user_ask_event"
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
COMMIT;
