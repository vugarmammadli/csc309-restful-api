var fs = require('fs');

var tasObj;

fs.readFile('tas.json', 'utf-8', function(err, data) {
    if(err) throw err;
    tasObj = JSON.parse(data);
});


exports.getApplicants = function(req, res) {
    var statusOfApplicant = req.query.status;
    var familyName = req.query.fname;
    
    var resultObj = {};
    
    if(statusOfApplicant){
        var resultArr = [];
        for(var i = 0; i < tasObj.tas.length; i++){
            if(tasObj.tas[i].status == statusOfApplicant){
                resultArr.push(tasObj.tas[i]);
            }
        }
        resultObj.tas = resultArr;
    }
//    else if(familyName){
//        var resultArr = [];
//        for(var i = 0; i < tasObj.tas.length; i++){
//            if(tasObj.tas[i].familyname == familyName){
//                resultArr.push(tasObj.tas[i]);
//            }
//        }
//        resultObj.tas = resultArr;
//    }
    else{
        resultObj = tasObj;
    }
    
    res.send(JSON.stringify(resultObj));
}

//exports.getByFamilyName = function(req, res) {
////    var familyName = req.query.fname;
////    var resultObj = {};
////    
////    if(familyName){
////        var resultArr = [];
////        for(var i = 0; i < tasObj.tas.length; i++){
////            if(tasObj.tas[i].familyname == familyName){
////                resultArr.push(tasObj.tas[i]);
////            }
////        }
////        resultObj.tas = resultArr;
////    }
////    
////    res.send(JSON.stringify(resultObj));
//    console.log("sada");
//}

exports.addNewApplicant = function(req, res) {
    var newApplicant = req.body;
    tasObj.tas.push(newApplicant);
    res.send("Success");
}

exports.removeByFamilyName = function(req, res) {
    var familyName = req.query.fname;
    var stunum = req.query.stunum;
    
    if(familyName){
        for(var i = 0; i < tasObj.tas.length; i++){
            if(tasObj.tas[i].familyname == familyName){
                tasObj.tas.splice(i, 1);
            }
        }
    }
    
    if(stunum){
        for(var i = 0; i < tasObj.tas.length; i++){
            if(tasObj.tas[i].stunum == stunum){
                tasObj.tas.splice(i, 1);
            }
        }
    }
    
    res.send("Success");
}

exports.removeByStudentNum = function(req, res) {
    var stunum = req.query.stunum;
}