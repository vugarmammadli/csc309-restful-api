var fs = require('fs');

var tasObj;

fs.readFile('tas.json', 'utf-8', function(err, data) {
    if(err) throw err;
    tasObj = JSON.parse(data);
});


exports.getAllApplicants = function(req, res) {
    res.send(JSON.stringify(tasObj));
}

exports.getByStatus = function(req, res) {
    var statusOfApplicant = req.query.status;
    res.send(JSON.stringify(tasObj.tas[statusOfApplicant]));
}

exports.getByFamilyName = function(req, res) {
    var familyName = req.query.fname;
    res.send(JSON.stringify(tasObj.tas[familyname]));
}

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