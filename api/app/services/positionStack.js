const fetch = require('node-fetch')

const addressTranslate = async(address)=>{


    const key = '14771fdc2464471897ce2d0bd89b50ca'
    const response  = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${key}`)
    const {results} = await response.json()
    console.log(results[0].geometry)
    return results[0].geometry
}

// 130 chemin des amandier, 83560 vinon sur verdon, france




module.exports = addressTranslate

