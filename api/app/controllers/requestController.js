const Request = require('../models/request');
const Event = require('../models/event');

const requestController = {

    findAllJoiningRequest: async (req, res, next) => {
        const event_id = req.params.id
        try {
            const result = await Request.findAllJoiningRequest(event_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    findAllJoiningRequestByOwner: async (req, res, next) => {
        const user_id = Number(req.params.ownerId)
        try {
            console.log(user_id)
            const result = await Request.findAllJoiningRequestByOwnerID(user_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    makeJoiningRequest: async (req, res, next) => {
        const user_id = req.body.userId;
        const event_id = req.body.eventId;

        try {
            const result = await Request.newUserAskEvent(user_id, event_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    confirmJoiningRequest: async (req, res, next) => {
        const user_id = req.body.userId;
        const event_id = req.body.eventId;
        try {
            const { rowCount } = await Request.deleteUserAskEvent(user_id, event_id);
            let result = await Request.newUserInEvent(user_id, event_id);
            if (!result.error) result["event"] = await Event.placesLeftDecrement(event_id);
            res.status(result.error ? 418 : 200).json({ rowCount, result });
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    refuseJoiningRequest: async (req, res, next) => {
        const user_id = req.body.userId;
        const event_id = req.body.eventId;
        console.log('userId = ',user_id)
        console.log('eventId = ',event_id)

        try {
            const result = await Request.deleteUserAskEvent(user_id, event_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

}

module.exports = requestController