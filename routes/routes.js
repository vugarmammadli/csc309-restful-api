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
    var result;
    
    if(familyName){
        for(var i = 0; i < tasObj.tas.length; i++){
            if(tasObj.tas[i].familyname == familyName){
                tasObj.tas.splice(i, 1);
                result = "Success";
            } else {
                result = "Error: no such student";
            }
        }
    }
    
    if(stunum){
        for(var i = 0; i < tasObj.tas.length; i++){
            if(tasObj.tas[i].stunum == stunum){
                tasObj.tas.splice(i, 1);
                result = "Success";
            } else {
                result = "Error: no such student";
            }
        }
    }
    
    res.send(result);
}

exports.getCourses = function(req, res) {
    var courseName = req.query.course;
    result = {};
    result.courses = [];
    var listOfCourses = coursesObj.courses;
    
    for(var course in listOfCourses){
        var eachCourse = {};
        eachCourse.code = listOfCourses[course];
        eachCourse.tas = [];

        for(var i = 0; i < tasObj.tas.length; i++){
            for(var j = 0; j < tasObj.tas[i].courses.length; j++){
                if(tasObj.tas[i].courses[j].code == eachCourse.code){
                    var taObj = {};
                    taObj.stunum = tasObj.tas[i].stunum;
                    taObj.givenname = tasObj.tas[i].givenname;
                    taObj.familyname = tasObj.tas[i].familyname;
                    taObj.status = tasObj.tas[i].status;
                    taObj.year = tasObj.tas[i].year;
                    taObj.ranking = tasObj.tas[i].courses[j].rank;
                    taObj.experience = tasObj.tas[i].courses[j].experience;
                    eachCourse.tas.push(taObj);
                }
            }
        }
        
        if(courseName){
            if(eachCourse.code == courseName){
                result.courses.push(eachCourse);
            }
        } else {
            result.courses.push(eachCourse);
        }
    }
    
    res.send(JSON.stringify(result));
}