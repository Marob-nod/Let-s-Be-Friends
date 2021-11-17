-- Revert lbf:extension from pg

BEGIN;
DROP EXTENSION moddatetime CASCADE;

COMMIT;
