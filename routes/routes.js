var fs = require('fs');

var tasObj;

fs.readFile('tas.json', 'utf-8', function(err, data) {
    if(err) throw err;
    tasObj = JSON.parse(data);
});


exports.getApplicants = function(req, res) {
    var statusOfApplicant = req.query.status;
    var resultObj = {};
    
    if(statusOfApplicant){
        var resultArr = [];
        for(var i = 0; i < tasObj.tas.length; i++){
            if(tasObj.tas[i].status == statusOfApplicant){
                resultArr.push(tasObj.tas[i]);
            }
        }
        resultObj.tas = resultArr;
    }else{
        resultObj = tasObj;
    }
    
    res.send(JSON.stringify(resultObj));
}

//exports.getByFamilyName = function(req, res) {
//    var familyName = req.query.fname;
//    res.send(JSON.stringify(tasObj.tas[familyname]));
//}

exports.addNewApplicant = function(req, res) {
    var newApplicant = req.body;
    tasObj.tas.push(newApplicant);
    res.send("Success");
}

exports.removeByFamilyName = function(req, res) {
    var familyName = req.query.fname;
}

exports.removeByStudentNum = function(req, res) {
    var stunum = req.query.stunum;
}