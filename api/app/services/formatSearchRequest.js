
/*
{
    tagName : ['tag1', 'tag2'],
    languageName : ['language1', 'language2'],
    startingDate : '2021-10-20 01:08:43+02',
    endingDate : '2021-11-09 02:59:31+01'
}

*/

// `WHERE (tag.name=$1 OR tag.name=$2) 
// AND (language.name=$3 OR language.name=$4 OR language.name is NULL)
// AND (event.ending_date <= $5)`, values

// WHERE (${})
// AND (${})
// AND (${})

// const obj = {
//     tagName : ["cuisine", "peche"],
//     languageName : ["Chinois"],
//     startingDate : "2021-10-20 01:08:43+02",
//     endingDate : "2021-11-09 02:59:31+01"

// }
console.time('test')
const format = (obj) => {
    let count = 1;
    let where = [];
    let tags = [];
    let tagsToString;
    let languages = [];
    let languageToSting;
    let startingDate = [];
    let startingDateToString;
    let endingDate = [];
    let endingDateToSting;
    let betweenDatesToString;
    const final = {
        values: [],
        query: ''
    }


    if (obj.tagName.length) {
        for (const tag of obj.tagName) {
            tags.push(`tag.name=$${count++}`)
            final.values.push(tag)
        }
        tagsToString = `(${tags.join(' OR ')})`

    }
    if (obj.languageName.length) {
        for (const language of obj.languageName) {
            languages.push(`language.name=$${count++}`)
            final.values.push(language)
        }
        languageToSting = `(${languages.join(` OR `)})`

    }
    if (obj.startingDate && obj.endingDate) {
        startingDate.push(`event.starting_date BETWEEN $${count++}`)
        endingDate.push(`AND $${count++}`)
        final.values.push(obj.startingDate)
        final.values.push(obj.endingDate)
        betweenDatesToString = `(${startingDate} ${endingDate})`

    } else if (obj.startingDate) {
        startingDate.push(`event.starting_date >= $${count++}`)
        final.values.push(obj.startingDate)
        startingDateToString = `(${startingDate})`

    } else if (obj.endingDate) {
        endingDate.push(`event.ending_date <= $${count++}`)
        final.values.push(obj.endingDate)
        endingDateToSting = `(${endingDate})`

    }

    if (tagsToString) where.push(tagsToString)
    if (languageToSting) where.push(languageToSting)
    if (startingDateToString) where.push(startingDateToString)
    if (endingDateToSting) where.push(endingDateToSting)
    if (betweenDatesToString) where.push(betweenDatesToString)

    final.query = where.join(' AND ')
    final.query = 'WHERE ' + final.query


    return final
}

console.timeEnd('test')
module.exports = format;