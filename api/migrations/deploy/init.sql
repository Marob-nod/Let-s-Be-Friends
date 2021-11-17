-- Deploy lbf:init to pg
BEGIN;

CREATE DOMAIN age_domain AS integer CHECK (VALUE > 0 AND VALUE < 124);
CREATE DOMAIN phone_domain AS TEXT CHECK (VALUE ~ '^[+]{1}[-0-9.]{2,20}$|^[-0-9.]{1,20}$');
--750-849-7957

CREATE EXTENSION citext;
CREATE DOMAIN email_domain AS citext
  CHECK ( VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );
CREATE DOMAIN title_domain AS VARCHAR(80);
CREATE DOMAIN longitude_domain AS float 
    CHECK (VALUE >= -180 AND VALUE <= 180);
CREATE DOMAIN latitude_domain AS float 
    CHECK (VALUE >= -90 AND VALUE <= 90);
CREATE DOMAIN places_left_domain AS INT 
    CHECK (VALUE >= 0);


CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    gender TEXT NOT NULL,
    email email_domain NOT NULL UNIQUE,
    password TEXT NOT NULL,
    description TEXT,
    age age_domain,
    city TEXT,
    phone_number phone_domain,
    img_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() --! https://newbedev.com/sql-postgres-created-at-updated-at-code-example
);

CREATE TABLE event (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title title_domain NOT NULL,
    starting_date TIMESTAMPTZ CHECK (starting_date > NOW()), 
    ending_date TIMESTAMPTZ CHECK (ending_date > starting_date),
    img_url TEXT,
    places_left places_left_domain NOT NULL,
    description TEXT NOT NULL,
    address TEXT,
    longitude longitude_domain NOT NULL,
    latitude latitude_domain NOT NULL,
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);


CREATE TABLE language (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    img_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tag (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_speak_language (
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_learn_language (
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_participate_event (
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_has_tag (
    event_id INT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    tag_id INT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_has_language (
    event_id INT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_ask_event (
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES "event"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



COMMIT;