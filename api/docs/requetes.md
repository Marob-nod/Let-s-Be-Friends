
# BIG REQUEST

```sql
    SELECT "user".id, "user".firstname, "user".gender, "user".email, "user".description AS bio, "user".age, "user".city, "user".phone_number AS "phoneNumber", "user".img_url AS "imgUrl", "user".created_at AS "createdAt", "user".updated_at AS "updatedAt",
                json_agg(json_build_object(
                    'id', language.id,
                    'name', language.name
                )) AS "speakingLanguage",
                json_agg(json_build_object(
                    'id', language.id,
                    'name', language.name
                )) AS "learningLanguage",
                json_agg(
                    json_build_object(
                        'id', event.id,
                        'title', event.title,
                        'description', event.description,
                        'startingDate', event.starting_date,
                        'endingDate', event.ending_date,
                        'imgUrl', event.img_url,
                        'placesLeft', event.places_left,
                        'longitude', event.longitude,
                        'latitude', event.latitude,
                        'ownerId', event.user_id,
                        'createdAt', event.created_at,
                        'updatedAt', event.updated_at
                    )
                ) AS event         
                FROM user_participate_event 
                JOIN "user" ON user_participate_event.user_id = "user".id
                JOIN "event" ON user_participate_event.event_id = event.id
                JOIN "user_speak_language" ON user_participate_event.user_id = user_speak_language.user_id
                JOIN "language" ON user_speak_language.language_id = language.id
                JOIN "user_learn_language" ON user_participate_event.user_id = user_learn_language.user_id
                WHERE "user".id = $1
                GROUP BY "user".id
```

## Bonne grosse requête de la familia del papel        si
```sql
SELECT event.id, event.title, event.description, event.starting_date AS "startingDate", event.ending_date AS "endingDate", 
event.img_url AS "imgUrl",  event.places_left AS "placesLeft", event.longitude, event.latitude, event.user_id AS "ownerId",
event.created_at AS "createdAt", event.updated_at AS "updatedAt",
json_agg(
    DISTINCT jsonb_build_object(
        'id', language.id,
        'name', language.name
    )
) AS languages,
json_agg(
    DISTINCT jsonb_build_object(
        'name', tag.name,
        'color', tag.color
    )
) AS tags,
json_agg(
    DISTINCT jsonb_build_object(
        'id', "user".id,
        'firstname', "user".firstname,
        'lastname', "user".lastname,
        'gender', "user".gender,
        'email', "user".email,
        'bio', "user".description,
        'age', "user".age,
        'city', "user".city,
        'phoneNumber', "user".phone_number,
        'imgUrl', "user".img_url,
        'createdAt', "user".created_at,
        'updatedAt', "user".updated_at
    )
) AS participants
FROM event
JOIN user_participate_event ON event.id = user_participate_event.event_id
JOIN "user" ON user_participate_event.user_id = "user".id
JOIN "event_has_tag" ON event.id = event_has_tag.event_id
JOIN "tag" ON event_has_tag.tag_id = tag.id
JOIN "event_has_language" ON event.id = event_has_language.event_id
JOIN "language" ON event_has_language.language_id = language.id
WHERE event.id = $1
GROUP BY event.id
```