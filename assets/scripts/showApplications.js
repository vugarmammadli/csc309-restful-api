function getAllAplications(){
    $("#applicants > tbody").empty();
    //returns all applicants at the beginning
    getApplicationAjaxCall("");
    
    //changes table when user select status
    $('#filter select').on('change', function() {
        $("#applicants > tbody").empty();
        let status = $(this).find(":selected").val();
        //removes query to get all applicants
        if(status == "all")
            status = "";
        getApplicationAjaxCall(status);
    });
}

//gets data according to status
function getApplicationAjaxCall(status){
    $.ajax({
        url: "/applicants?status=" + status,
        type: "GET",
        success: function(data){
            let parent = $('#applicants > tbody');
            let applicants = JSON.parse(data);
            let applicantsArray = applicants.tas;
            applicantsArray.sort(sortByFamilyName);
            for(let i = 0; i < applicantsArray.length; i++) {
                let row = $("<tr>").append(
                    $("<td>").text(applicantsArray[i].stunum),
                    $("<td>").text(applicantsArray[i].givenname),
                    $("<td>").text(applicantsArray[i].familyname),
                    $("<td>").text(applicantsArray[i].status),
                    $("<td>").text(applicantsArray[i].year)
                );
                parent.append(row);
            }
        }
    });
}


function sortByFamilyName(firstTa, secondTa){
    var firstName = firstTa.familyname.toLowerCase();
    var secondName = secondTa.familyname.toLowerCase();
    if(firstName < secondName)
        return -1;
    else if(firstName > secondName)
        return 1;
    else
        return 0
}

function getApplicantByFamilyName(){
//    $('#search_button').click(function(){
//        $.get('applicants?fname=' + $("#search input[name=familyname]").val(), function (data) {
//            
//        });
//    });
}

function removeApplicantByFamilyName(){
    $("#rm_fname").click(function (e) {
        e.preventDefault();
        let familyName = $('#delete_fname input[type=text]').val();
        if(familyName){
            $.ajax({
                url: '/applicants/?fname=' + familyName,
                type: 'DELETE',
                success: function(result) {
                    location.reload(true);
                }
            });
        }
    });
}

function removeApplicantByStudentNum(){
    $("#rm_stunum").click(function (e) {
        e.preventDefault();
        let stdNum = $('#delete_stunum input[type=text]').val();
        if(stdNum){
            $.ajax({
                url: '/applicants/?stunum=' + stdNum,
                type: 'DELETE',
                success: function(result) {
                    location.reload(true);
                }
            });
        }
    });
}

function addMoreCourse(){
    let parent = $('#applicant_form');
    var number = 2;
    $("#add_course").click(function(e){
        e.preventDefault();
        let courseRow = $("<tr>").append(
            $("<td>").text("Course: "),
            $("<td>").append(
                $('<select></select>').attr("id", "list_of_courses_" + number)
            )
        );
        populateCourse("#list_of_courses_" + number);
        let rankRow = $("<tr>").append(
            $("<td>").text("Rank: "),
            $("<td>").append(
                $('<input>').attr({
                    type: "text",
                    id: "rank" + number})
            )
        );
        let experienceRow = $("<tr>").append(
            $("<td>").text("Experience: "),
            $("<td>").append(
                $('<input>').attr({
                    type: "text",
                    id: "experience" + number})
            )
        );
        parent.find("tr:last").before(courseRow);
        parent.find("tr:last").before(rankRow);
        parent.find("tr:last").before(experienceRow);
        number++;
    });
}

function populateCourse(id){
    $.ajax({
        url: "/courses",
        type: "GET",
        dataType: 'json',
        success: function(data){
            for(let i = 0; i < data.courses.length; i++){
                let course = data.courses[i].code;
                $(id).append(
                    $("<option></option>").attr("value", course).text(course)
                ); 
            }
        }
    });
}

$(document).ready(function() {
    getAllAplications();
    getApplicantByFamilyName();
    removeApplicantByFamilyName();
    removeApplicantByStudentNum();
    populateCourse("#list_of_courses_1");
    addMoreCourse();
});