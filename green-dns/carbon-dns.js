const fs = require('fs')
const path = require('path')
const baseRequest = require('./update_request')
const request = require('request')
const CryptoJS = require("crypto-js")

require('dotenv').config()
const GREEN_FACTOR = {
    VERY_GREEN: 30,
    MODERATE: 20,
    LATENCY_FOCUSED: 10
}

// The data is meant to be loaded from CarbonAware SDK, but for the hackathon's purpose we load it as a file directly.
const eastString = fs.readFileSync(path.join(__dirname, 'us-east-1-data.json')).toString()
const westString = fs.readFileSync(path.join(__dirname, 'us-west-1-data.json')).toString()
const eastData = JSON.parse(eastString)
const westData = JSON.parse(westString)

const timeEast = process.argv[2]
const timeWest = process.argv[3]
const westSolar = westData.series.find(o => o.name === "Solar").data.find(o => {
    return o['Timestamp (Hour Ending)'] === timeWest
})
const eastSolar = eastData.series.find(o => o.name === "Solar").find(o => o['Timestamp (Hour Ending)'] === timeEast)
const westGas = westData.series.find(o => o.name === "Natural Gas").find(o => o['Timestamp (Hour Ending)'] === timeWest)
const eastGas = eastData.series.find(o => o.name === "Natural Gas").find(o => o['Timestamp (Hour Ending)'] === timeEast)

console.log(westSolar)
console.log(eastSolar)
console.log(westGas)
console.log(eastGas)

// night
const eastIntensity = 0.3
const westIntensity = 0.9
// day
// const eastIntensity = 0.2
// const eastIntensity = 0.3

const eastNet = (eastIntensity-westIntensity)

const eastHandicap = eastNet > 0 ? eastNet * GREEN_FACTOR : 0
const westHandicap = eastNet < 0 ? -1 * eastNet * GREEN_FACTOR : 0

function epochTime() {
    return new Date().getTime() + '';
}
const time = epochTime();
const hmac = CryptoJS.HmacSHA1( time, process.env.CONSTELLIX_SECRET ).toString( CryptoJS.enc.Base64 );
const token = process.env.CONSTELLIX_KEY + ":" + hmac + ":" + time;
baseRequest.values[0].handicap = westHandicap
baseRequest.values[1].handicap = eastHandicap
request('https://api.dns.constellix.com/v1/pools/CNAME/5745',{
        body: JSON.stringify(baseRequest),
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'x-cns-security-token' : token
        },
    },
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
    }
)
