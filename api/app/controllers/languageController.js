const { Language } = require(`../models`);

const languageController = {

    findAll: async (req, res) => {
        try {
            const languages = await Language.findAll();
            res.status(languages.error ? 418 : 200).json(languages);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    // --- User Speak Languages
    newUserSpeakLanguage: async (req, res, next) => {
        const user_id = req.body.userId;
        const language_id = req.body.languageId;

        try {
            const result = await Language.newUserSpeakLanguage(user_id, language_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    deleteUserSpeakLanguage: async (req, res, next) => {
        const user_id = req.body.userId;
        const language_id = req.body.languageId;

        try {
            const result = await Language.deleteUserSpeakLanguage(user_id, language_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    //--- User Learn Languages
    newUserLearnLanguage: async (req, res, next) => {
        const user_id = req.body.userId;
        const language_id = req.body.languageId;

        try {
            const result = await Language.newUserLearnLanguage(user_id, language_id);
            res.status(result.error ? 418 : 200).json(result)
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    deleteUserLearnLanguage: async (req, res, next) => {
        const user_id = req.body.userId;
        const language_id = req.body.languageId;

        try {
            const result = await Language.deleteUserLearnLanguage(user_id, language_id);
            res.status(result.error ? 418 : 200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}




module.exports = languageController;