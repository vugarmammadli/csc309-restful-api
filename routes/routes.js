var fs = require('fs');

var tasObj;
var coursesObj;
var result;

fs.readFile('tas.json', 'utf-8', function(err, data) {
    if (err) throw err;
    tasObj = JSON.parse(data);
});

fs.readFile('courses.json', 'utf-8', function(err, data) {
    if (err) throw err;
    coursesObj = JSON.parse(data);
});


exports.getApplicants = function(req, res) {

    var statusOfApplicant = req.query.status;
    var familyName = req.query.fname;

    var resultObj = {};

    //checks query and get result according to query
    if (statusOfApplicant) {
        //get results according to status query
        var resultArr = [];
        for (var i = 0; i < tasObj.tas.length; i++) {
            if (tasObj.tas[i].status.toLowerCase() ==
                statusOfApplicant.toLowerCase()) {
                var ta = createTaObject(tasObj.tas[i]);
                resultArr.push(ta);
            }
        }
        resultObj.tas = resultArr;
    } else if (familyName) {
        //get results according to fname query
        for (var i = 0; i < tasObj.tas.length; i++) {
            if (tasObj.tas[i].familyname.toLowerCase() ==
                familyName.toLowerCase()) {
                resultObj = tasObj.tas[i];
            }
        }
    } else {
        var resultArr = [];
        for (var i = 0; i < tasObj.tas.length; i++) {
            var ta = createTaObject(tasObj.tas[i]);
            resultArr.push(ta);
        }
        resultObj.tas = resultArr;
    }
    res.send(JSON.stringify(resultObj));
}

//helper function to create TA object with the correct structure
function createTaObject(ta) {
    var taObj = {};
    taObj.stunum = ta.stunum;
    taObj.givenname = ta.givenname;
    taObj.familyname = ta.familyname;
    taObj.status = ta.status;
    taObj.year = ta.year;
    return taObj;
}

exports.addNewApplicant = function(req, res) {
    var newApplicant = req.body;
    var stunumExist = false;

    //checks if there is already this student number
    for (item in tasObj.tas) {
        if (tasObj.tas[item].stunum == newApplicant.stunum)
            stunumExist = true;
    }

    if (!stunumExist) {
        //creates object with new applicant information
        var result = {};
        result.stunum = newApplicant.stunum;
        result.givenname = newApplicant.givenname;
        result.familyname = newApplicant.familyname;
        result.status = newApplicant.status;
        result.year = newApplicant.year;
        result.courses = [];

        //adds courses to the applicant's information
        var courseObject = {};
        courseObject.code = newApplicant.code1;
        courseObject.rank = newApplicant.rank1;
        courseObject.experience = newApplicant.experience1;
        result.courses.push(courseObject);

        var keys = Object.keys(newApplicant);

        //checks if ta applies more than one course
        if (keys.length > 8) {
            for (var i = 8; i < keys.length; i = i + 3) {
                courseObject = {};
                courseObject.code = newApplicant[keys[i]];
                courseObject.rank = newApplicant[keys[i + 1]];
                courseObject.experience = newApplicant[keys[i + 2]];
                result.courses.push(courseObject);
            }
        }

        tasObj.tas.push(result);

        res.send("Success");
    } else {
        res.send("Error: duplicate student number");
    }
}

exports.removeApplicant = function(req, res) {
    var familyName = req.query.fname;
    var stunum = req.query.stunum;
    var result = "Error: no such student";

    if (familyName && !stunum) {
        //removes according to family name
        for (var i = 0; i < tasObj.tas.length; i++) {
            if (tasObj.tas[i].familyname.toLowerCase() ==
                familyName.toLowerCase()) {
                tasObj.tas.splice(i, 1);
                result = "Success";
            }
        }
    } else if (stunum && !familyName) {
        //removes according to student name
        for (var i = 0; i < tasObj.tas.length; i++) {
            if (tasObj.tas[i].stunum == stunum) {
                tasObj.tas.splice(i, 1);
                result = "Success";
            }
        }
    } else if (familyName && stunum) {
        //removes if there is two query and both of them correct
        for (var i = 0; i < tasObj.tas.length; i++) {
            if (tasObj.tas[i].stunum == stunum &&
                tasObj.tas[i].familyname.toLowerCase() == familyName.toLowerCase()) {
                tasObj.tas.splice(i, 1);
                result = "Success";
            }
        }
    } else {
        result = "Error: no such student";
    }
    
    res.send(result);
}

exports.getCourses = function(req, res) {
    var courseName = req.query.course;
    result = {};
    result.courses = [];
    var listOfCourses = coursesObj.courses;

    for (var course in listOfCourses) {
        var eachCourse = {};
        eachCourse.code = listOfCourses[course];
        eachCourse.tas = [];

        //creates list of tas who applied this course
        for (var i = 0; i < tasObj.tas.length; i++) {
            for (var j = 0; j < tasObj.tas[i].courses.length; j++) {
                if (tasObj.tas[i].courses[j].code == eachCourse.code) {
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

        //if there is course query, then adds only that course
        if (courseName) {
            if (eachCourse.code.toLowerCase() == courseName.toLowerCase()) {
                result = eachCourse;
                break;
            } else
                result = {};
        } else {
            result.courses.push(eachCourse);
        }
    }

    res.send(JSON.stringify(result));
}