const { Event, Language, Tag, Request } = require(`../models`);
const addressTranslate = require('../services/positionStack');
const formatAdress = require('../services/formatAddress')

const eventController = {

    findAll: async (req, res) => {

        const limit = req.query.limit;

        try {

            const results = await Event.findAll(limit);
            res.status(200).json(results);

        } catch (error) {

            console.log(error);
            res.status(400).json(error);
        };
    },

    findOneById: async (req, res, next) => {

        try {

            const id = parseInt(req.params.id, 10);
            const result = await Event.findOneById(id);
            res.status(result.error ? 418 : 200).json(result);

        } catch (error) {

            console.log(error);
            res.status(400).json(error);
        }
    },

    //! NON FAIT
    findOneByName: async (req, res) => {

        try {

            const name = req.params.name;
            const result = await Event.findOneByName(name);
            res.status(result.error ? 418 : 200).json(result);

        } catch (error) {

            console.log(error);
            res.status(400).json(error);
        }
    },

    create: async (req, res, next) => {

        console.log('--> Create Event: req.body');
        console.table(req.body);

        let data = req.body;
        let { eventLanguage, tagId } = data;
        let address = formatAdress(data.location, data.zipCode, data.city, data.country)

        try {
            // Ici on translate l'adresse en string en coordonées
            const coordinates = await addressTranslate(address);
            data.longitude = coordinates.lng;
            data.latitude = coordinates.lat;

            if (eventLanguage) delete data.eventLanguage;
            if (tagId) delete data.tagId;

            const event = new Event(data);
            const eventCreated = await event.save();

            if (eventLanguage) {
                for (let language of eventLanguage) {
                    await Language.newEventHasLanguage(eventCreated.id, language)
                };
            };

            if (tagId) {
                for (let tag of tagId) {
                    let tag_id = tag;
                    await Tag.newEventHasTag(eventCreated.id, tag_id)
                };
            }

            const newEvent = await Event.findOneById(eventCreated.id);
            await Request.newUserInEvent(data.user_id, newEvent.id)
            res.status(201).json(newEvent);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    update: async (req, res, next) => {

        console.log('--> Update Event: req.body')
        console.table(req.body)

        try {


            const event = new Event(req.body);

            if (req.body.address) {
                const coordinates = await addressTranslate(req.body.address);
                event.longitude = coordinates.lng;
                event.latitude = coordinates.lat;
            }

            if (req.body.eventLanguage) {
                var result1 = await Language.deleteEventHasLanguage(event.id);
                for (let language of req.body.eventLanguage) {
                    await Language.newEventHasLanguage(event.id, language)
                };
                delete event.eventLanguage
            }

            if (req.body.tagId) {
                var result2 = await Tag.deleteEventHasTag(event.id)
                for (let tag of req.body.tagId) {
                    await Tag.newEventHasTag(event.id, tag)
                };
                delete event.tagId
            }

            if (Object.keys(event).length > 1) {
                var result = await event.save();
            }

            if (result || result1 || result2) {
                const eventResult = await Event.findOneById(event.id)
                res.status(result1?.error || result2?.error || result?.error ? 418 : 200).json(eventResult);
            }

        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    delete: async (req, res, next) => {
        console.log('--> Delete event: req.body')
        console.table(req.body)
        try {
            const id = req.body.id;
            await Event.delete(id);
            res.status(200).json(`DELETE event with id ${id} : ok`);

        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    search: async (req, res, next) => {
        console.log('--> Search param: req.body')
        console.table(req.body)
        try {
            const events = await Event.findByParameters(req.body)
            res.status(200).json(events)
        } catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    },

    userLeaveEvent: async (req, res, next) => {
        const user_id = req.body.userId;
        const event_id = req.body.eventId;
        try {
            const result = await Event.userLeaveEvent(user_id, event_id)
            if (!result.error) result["event"] = await Event.placesLeftIncrement(event_id);
            res.status(200).json({ result })
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }

}

module.exports = eventController;