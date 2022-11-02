module.exports = {
  "name": "GreenPool",
  "type": "Cname",
  "numReturn": 1,
  "minAvailableFailover": 1,
  "itoEnabled": true,
  "values": [
    {
      "active": true,
      "failedFlag": false,
      "disableFlag": false,
      "value": "a5c4def7e18c8412e980cf0efab7eeef-2029621111.us-west-1.elb.amazonaws.com.",
      "weight": 10,
      "checkId": 83493,
      "policy": "followsonar",
      "activated": true,
      "handicap": "0"
    },
    {
      "active": true,
      "failedFlag": false,
      "disableFlag": false,
      "value": "a0332e1de8e0d4acbaef46e89b9bae9b-2039963658.us-east-1.elb.amazonaws.com.",
      "weight": 10,
      "checkId": 83494,
      "policy": "followsonar",
      "activated": false,
      "handicap": 80.0
    }
  ],
  "sortOrder": null,
  "active": null,
  "poolIto": {
    "poolFrequency": 30,
    "maximumNumberOfBestResults": 1,
    "deviationAllowance": 10,
    "monitoringRegion": "WORLD",
    "handicapFactor": "speed",
    "lastUpdated": "2022-11-02 15:51:42 UTC"
  },
  "contactIds": null,
  "failedFlag": false,
  "disableFlag": false,
  "note": "",
  "version": 2
}
