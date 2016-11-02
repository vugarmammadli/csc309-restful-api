var fs = require('fs');

var tasObj;
var coursesObj;
var result;

fs.readFile('tas.json', 'utf-8', function(err, data) {
    if(err) throw err;
    tasObj = JSON.parse(data);
});

fs.readFile('courses.json', 'utf-8', function(err, data) {
    if(err) throw err;
    coursesObj = JSON.parse(data);
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
    else{
        resultObj = tasObj;
    }
    
//    if(familyName){
//        
//    }
    
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
    var stunumExist = false;
    
    for(item in tasObj.tas){
        if(tasObj.tas[item].stunum == newApplicant.stunum)
            stunumExist = true;
    }
    
    if(!stunumExist){
        var result = {};
        result.stunum = newApplicant.stunum;
        result.givenname = newApplicant.givenname;
        result.familyname = newApplicant.familyname;
        result.status = newApplicant.status;
        result.year = newApplicant.year;
        result.courses = [];

        var courseObject = {};
        courseObject.code = newApplicant.code1;
        courseObject.rank = newApplicant.rank1;
        courseObject.experience = newApplicant.experience1;
        result.courses.push(courseObject);

        var keys = Object.keys(newApplicant);

        if(keys.length > 8){
            for(var i = 8; i < keys.length; i = i + 3){
                courseObject = {};
                courseObject.code = newApplicant[keys[i]];
                courseObject.rank = newApplicant[keys[i+1]];
                courseObject.experience = newApplicant[keys[i+2]];
                result.courses.push(courseObject);
            }
        }

        tasObj.tas.push(result);

        res.send("Success");
    }else{
        res.send("Error: duplicate student number");
    }
}

exports.removeApplicant = function(req, res) {
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

exports.getCourses = function(req, res) {
    result = {};
    result.courses = [];
    var listOfCourses = coursesObj.courses;
    for(var course in listOfCourses){
        var eachCourse = {};
        eachCourse.code = listOfCourses[course];
        eachCourse.tas = [];
        result.courses.push(eachCourse);
    }
    res.send(JSON.stringify(result));
}