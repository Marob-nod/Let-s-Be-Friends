const { cloudinary } = require(`../services/cloudinary`);
const User = require('../models/user');
const db = require('../database');

const imageController = {
    uploadProfil: async (req, res) => {
        //!Need ID et Le fileStr dans le body

        const fileStr = req.body.data //UrlBase64 de l'image rendu par le front
        const user = new User(req.body)
        delete user.fileStr

        try {
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups'
            }) // Upload sur Cloudinary

            user["img_url"] = uploadedResponse.url // Ajout de l'url à l'instance d'User

            const result = await user.save(); // Demande à la bdd d'update l'user avec l'imgUrl

            result["uploadResponse"] = uploadedResponse // Ajoute la réponse de cloudinary à la réponse

            if (result) res.status(200).json(result)
            else res.status(400).json("data not valid or ressource do not exist")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = imageController