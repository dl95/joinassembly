const express = require("express");
const app = express();
var request = require('request');
const moment = require('moment');
const port = 5000;
// app.use("/api", api);

app.get("/api/timestamp", (req, res) =>  {
    var {date}=req.query;
    var data =null;
    var result = [];
    try {
        request('https://data.lacity.org/api/id/trxm-jn3c.json',async function (error, response, body) {
            if (!error && response.statusCode === 200) {
                data = JSON.parse(body);
                if (data) {
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        for (const key in element) {
                            if (Object.hasOwnProperty.call(element, key)) {
                                if (key=="month") {
                                    const  month= element[key];
                                    var timeArr = moment(month).format('x');
                                    console.log(timeArr);
                                    element.timestamp= timeArr;
                                    result.push(element);
                                }
                                
                            }
                        }
                        
                    }
                    if (result.length>0) {
                        res.status(200).send(result)  
                    } else {
                        res.status(404).json({
                            success: true, 
                            message: "something went wrong"
                        })  
                    }
                } else {
                    res.status(404).json({
                        success: true, 
                        message: "data not found"
                    })  
                }
              
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true, 
            message: "Internal Server Error"
        })
    }
});

function maxVisitersTotal(obj, date) {
    var total =0;
    var maxTemp =0;
    if (obj) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (key!=="month") {        
                    const element = obj[key];
                    let visitorCount = parseInt(element);
                    total = total+visitorCount;
                    if (maxTemp<visitorCount && visitorCount!=0) {
                        maxTemp = visitorCount;
                        highest = {
                            museum: key,
                            visitors: visitorCount
                        }
                    }
                }
            }
        }
        return {
            total: total,
            highest:highest
        };
    }
    return null;
}

function minVisiters(obj, date) {
    var minTemp =0;
    var i =0;
    var lowest =null;
    if (obj) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (key!=="month") {        
                    const element = obj[key];
                    let visitorCount = parseInt(element);
                    if (i==0) {
                        minTemp =visitorCount;
                        i++;
                    } else if (minTemp>visitorCount && visitorCount!=0) {
                        minTemp = visitorCount;
                        lowest = {
                            museum: key,
                            visitors: visitorCount
                        }
                    }
                }
            }
        }
        return lowest;
    }
    return null;
}

function ignoreMuseum(obj, ignore, date) {
    // console.log(obj);
    if (obj) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (key==ignore) {        
                    const element = obj[key];
                    let visitorCount = parseInt(element);
                    if (visitorCount!=0) {
                        museum = {
                            museum: key,
                            visitors: visitorCount
                        }
                    }
                }
            }
        }
        return museum;
    }
    return null;
}


app.get("/api/visitors", (req, res) =>  {
    var {date, ignore}=req.query;
    var total = 0;
    try {
        request('https://data.lacity.org/api/id/trxm-jn3c.json',async function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            if(date){
                console.log(date);
                var time = moment(date, "x").format('YYYY-MM-DDT00:mm:ss.SSS');
                let obj = data.find(o => o.month == time);
                if (obj) {
                    time = time.toString();
                    var year = moment(parseInt(date)).format('YYYY');
                    var month = moment(parseInt(date)).format('MMM');
                    var attendance={
                        month: month,
                        year: year,
                    }
                    var highest =await maxVisitersTotal(obj)
                    if (highest) {
                        total = highest.total;
                        if (highest.highest && highest.highest.visitors>0) {
                            attendance.highest = highest.highest;
                        }
                    }
                    var lowest =await minVisiters(obj)
                    if (lowest && lowest.visitors>0) {
                        attendance.lowest = lowest;
                    }
                    if (ignore && ignore!=undefined) {
                        var highest =await ignoreMuseum(obj, ignore)
                        attendance.ignore = highest;
                    }
                    return res.status(200).json({
                        success: true,
                        attendance: attendance, 
                        total: total 
                    });
                } else {
                    res.status(404).json({
                        success: true, 
                        message: "data not found"
                    })  
                }
                  
            } else {
                res.status(404).json({
                    success: true, 
                    message: "date not found"
                })
            }
         }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true, 
            message: "Internal Server Error"
        })
    }
});
app.listen(port, () =>
  console.log(`app listening on port!` + port)
);