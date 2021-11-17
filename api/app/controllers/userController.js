const { User, Language } = require(`../models`);
const db = require('../database');
const jwt = require('../services/jwt')

const userController = {
    findAll: async (req, res) => {
        const limit = req.query.limit
        try {
            const users = await User.findAll(limit);
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    findOneById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findOneById(id);
            if (user) res.status(200).json(user);
            else res.status(404).json("user not found");
        } catch (error) {
            console.log(error);
            res.status(500).json("error");
        }

    },

    findOneByEmail: async (req, res, next) => {
        console.log('--> Find by login: req.body')
        console.table(req.body)
        try {
            const email = req.body.email;
            const user = await User.findOneByEmail(email)
            if (user) {
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    login: async (req, res, next) => {
        console.log('--> Login: req.body')
        console.table(req.body)

        console.dir(req.body)
        const email = req.body.email
        const password = req.body.password
        try {
            const user = await User.validByEmailPassword(email, password)
            // if(user.id){
            //     res.setHeader('Authorization', jwt.makeToken(user.id));
            // }
            res.status(user.id ? 200 : 401).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    create: async (req, res, next) => {
        console.log('--> Create account: req.body')
        console.table(req.body)
        const user = new User(req.body);
        if (user.password === user.confirmPassword) {
            try {
                const result = await user.save();
                // res.setHeader('Authorization', jwt.makeToken(user.id));
                res.status(201).json(result)
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        } else {
            res.status(400).json(`password and confirmPassword must be the same`)
        }

    },

    update: async (req, res, next) => {
        console.log('--> Update account: req.body')
        console.table(req.body)
        const user = new User(req.body);

        try {

            if (req.body.learningLanguage) {
                var result1 = await Language.deleteUserLearnLanguage(user.id);
                for (let language of req.body.learningLanguage) {
                    await Language.newUserLearnLanguage(user.id, language)
                };
                delete user.learningLanguage
            }

            if (req.body.speakingLanguage) {
                var result2 = await Language.deleteUserSpeakLanguage(user.id);
                for (let language of req.body.speakingLanguage) {
                    await Language.newUserSpeakLanguage(user.id, language)
                };
                delete user.speakingLanguage
            }

            if (user.confirmPassword) delete user.confirmPassword

            if (Object.keys(user).length > 1) {
                var result = await user.save();
            }

            if (result || result1 || result2) {
                const userResult = await User.findOneById(user.id)
                res.status(result1?.error || result2?.error || result?.error ? 418 : 200).json((userResult || "data not valid or ressource do not exist"))
            }

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    delete: async (req, res, next) => {
        console.log('--> Delete User: req.body')
        console.table(req.body)
        try {
            const id = req.body.id;
            await User.delete(id);
            res.status(200).json(`DELETE user with id ${id} : ok`);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
}




module.exports = userController;