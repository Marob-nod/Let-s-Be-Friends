const { Tag } = require(`../models`);

const tagController = {
    findAll: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            res.status(201).json(tags);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    findOneByid: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);

        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    findOneByName: async (req, res) => {
        try {
            const name = req.params.name;
            const tag = await Tag.findOneByName(name);
            res.json(tag);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    newEventHasTag: async (req, res, next) => {
        const event_id = req.body.eventId;
        const tag_id = req.body.tagId;

        try {
            const result = await Tag.newEventHasTag(event_id, tag_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    deleteEventHasTag: async (req, res) => {
        const event_id = req.body.eventId;
        const tag_id = req.body.tagId;

        try {
            const result = await Tag.deleteEventHasTag(event_id, tag_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}

module.exports = tagController;