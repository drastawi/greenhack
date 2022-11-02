const fs = require('fs')
const path = require('path')
const baseRequest = require('./update_request')
const request = require('request')
const CryptoJS = require("crypto-js")

const EastString = fs.readFileSync(path.join(__dirname, '930-data-export.json')).toString()
const WestString = fs.readFileSync(path.join(__dirname, '930-data-export.json')).toString()
const EastData = JSON.parse(EastString)
const WestData = JSON.parse(WestString)
console.log(EastData)
console.log(WestData)

const eastHandicap = 0
const westHandicap = 50

const apiKey = "218f41a1-0550-4aed-b93f-0192f980069e";
const secretKey = "e6bef67a-a8ad-42d5-b138-5f12aa9ef47d";
function epochTime() {
    return new Date().getTime() + '';
}
const time = epochTime();
const hmac = CryptoJS.HmacSHA1( time, secretKey ).toString( CryptoJS.enc.Base64 );
const token = apiKey + ":" + hmac + ":" + time;
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
