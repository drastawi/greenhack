
const fs = require('fs')
const path = require('path')
const EastString = fs.readFileSync(path.join(__dirname, '930-data-export.json')).toString()
const WestString = fs.readFileSync(path.join(__dirname, '930-data-export.json')).toString()
const EastData = JSON.parse(EastString)
const WestData = JSON.parse(WestString)
print(EastData)
print(WestData)

//TODO update handicap

//Update https://api-docs.constellix.com/#3688e62b-0fb8-4093-9df4-0608a4be06ba
