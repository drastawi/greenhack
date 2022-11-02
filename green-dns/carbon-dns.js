
const fs = require('fs')
const path = require('path')
const dataString = fs.readFileSync(path.join(__dirname, '930-data-export.json')).toString()
const data = JSON.parse(dataString)
print(data)

//TODO update handicap

//Update https://api-docs.constellix.com/#3688e62b-0fb8-4093-9df4-0608a4be06ba
