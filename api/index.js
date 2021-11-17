// fichier index
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { cloudinary } = require('./app/services/cloudinary');

const router = require('./app/router');

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

const expressSwagger = require('express-swagger-generator')(app);

let options = {

    swaggerDefinition: {
        info: {
            description: 'a API REST',
            title: 'lets be friends',
            version: '1.0.0',
        },
        host: process.env.NODE_ENV === 'production' ?
            process.env.HEROKU_URL :
            `localhost:${port}`

        ,
        basepath: '/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],

    },
    basedir: __dirname,
    files: ['./app/**/*.js']
};
expressSwagger(options)


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/v1', router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

module.exports = app, router