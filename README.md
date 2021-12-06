# Join Assembly Task

Installation process

1. Clone Repo
2. Run command "**npm install**" or "**npm i**"
3. I configured with port 5000 if you wants to change you can change in app.js.
* Two API's Here
  * For fetch data with date in milliseconds(It's only for timestamp(dateInMilliseconds))
  * *   URL: http://localhost:{{port}}/api/timestamp
  * Main API 
  * * http://localhost:{{port}}/api/visitors?date=dateInMilliseconds
  * * http://localhost:{{port}}/api/visitors?date=dateInMilliseconds&ignore=museumToIgnore
  
1. First Test Case: http://localhost:5000/api/visitors?date=1388514600000
```json
{
    "success": true,
    "attendance": {
        "month": "Jan",
        "year": "2014",
        "highest": {
            "museum": "avila_adobe",
            "visitors": 24778
        },
        "lowest": {
            "museum": "chinese_american_museum",
            "visitors": 1581
        }
    },
    "total": 42612
}
```
2. Second Test Case 1: http://localhost:5000/api/visitors?date=1388514600000&ignore=pico_house
```json
{
    "success": true,
    "attendance": {
        "month": "Jan",
        "year": "2014",
        "highest": {
            "museum": "avila_adobe",
            "visitors": 24778
        },
        "lowest": {
            "museum": "chinese_american_museum",
            "visitors": 1581
        },
        "ignore": {
            "museum": "pico_house",
            "visitors": 2204
        }
    },
    "total": 42612
}
```
* Test Case for fetch date and timestamp(dateInMilliseconds) 
* * URL: http://localhost:5000/api/timestamp
```json
[
    {
        "month": "2014-01-01T00:00:00.000",
        "america_tropical_interpretive_center": "6602",
        "avila_adobe": "24778",
        "chinese_american_museum": "1581",
        "firehouse_museum": "4486",
        "hellman_quon": "0",
        "pico_house": "2204",
        "visitor_center_avila_adobe": "2961",
        "timestamp": "1388514600000"
    },
    {
        "month": "2014-02-01T00:00:00.000",
        "america_tropical_interpretive_center": "5029",
        "avila_adobe": "18976",
        "chinese_american_museum": "1785",
        "firehouse_museum": "4172",
        "hellman_quon": "0",
        "pico_house": "1330",
        "visitor_center_avila_adobe": "2276",
        "timestamp": "1391193000000"
    },
    ...
]
```
