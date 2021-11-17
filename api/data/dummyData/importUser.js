require('dotenv').config;
const bcrypt = require('bcrypt')
const db = require('../../app/database');

console.log('Script d\'import user');

jacquie = async (mdp) => {
    const newmdp = await bcrypt.hash(mdp, 10)
    console.log(newmdp)
    return newmdp
}

test = async (clair, crypt) => {
    const isCorrect = await bcrypt.compare(clair, crypt)
    console.log(isCorrect)
}

test('1234', '$2b$10$8c4H.Bt5T2rkmKhIXe.OCeLRWVme2CZBsXdxVMImxFBA5sNWLplUS')
db.end()
// (async () => {

//     await db.query(`INSERT INTO "user" (firstname, lastname, gender, email, password, description, age, city, phone_number, img_url) VALUES('Emmanuel', 'Martin', 'Male', 'gnutley0@nature.com', ${jacquie()}, 'je vis à bordeaux.', 43, 'Bordeaux', '0123456789', 'https://robohash.org/deseruntmollitiarepudiandae.png?size=50x50&set=set1'`)

//     db.end()
// })()
// console.log('Fin de script')

// await db.query(`${await mafonction()}`);
// await bcrypt.hash(this.password, 10)

// ('Emmanuel', 'Martin', 'Male', 'gnutley0@nature.com', '$2b$10$8c4H.Bt5T2rkmKhIXe.OCeLRWVme2CZBsXdxVMImxFBA5sNWLplUS', 'je vis à bordeaux.', 43, 'Bordeaux', '0123456789', 'https://robohash.org/deseruntmollitiarepudiandae.png?size=50x50&set=set1'),
