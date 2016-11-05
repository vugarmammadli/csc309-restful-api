function getAllAplications() {
    $("#applicants > tbody").empty();
    //returns all applicants at the beginning
    getApplicationAjaxCall("");

    //changes table when user select status
    $('#filter select').on('change', function() {
        $("#applicants > tbody").empty();
        let status = $(this).find(":selected").val();
        //removes query to get all applicants when all selecteds
        if (status == "all")
            status = "";
        getApplicationAjaxCall(status);
    });
}

//gets data according to status
function getApplicationAjaxCall(status) {
    $.ajax({
        url: "/applicants?status=" + status,
        type: "GET",
        success: function(data) {
            //fills table with applicants information
            let parent = $('#applicants > tbody');
            let applicants = JSON.parse(data);
            let applicantsArray = applicants.tas;
            applicantsArray.sort(sortByFamilyName);
            for (let i = 0; i < applicantsArray.length; i++) {
                let row = $("<tr>").append(
                    $("<td>").text(applicantsArray[i].stunum),
                    $("<td>").text(applicantsArray[i].givenname),
                    $("<td>").text(applicantsArray[i].familyname),
                    $("<td>").text(applicantsArray[i].status),
                    $("<td>").text(applicantsArray[i].year)
                );
                row.attr("id", applicantsArray[i].familyname);
                parent.append(row);
            }
        }
    });
}

//sorts applicants according to their family name in asc. order
function sortByFamilyName(firstTa, secondTa) {
    var firstName = firstTa.familyname.toLowerCase();
    var secondName = secondTa.familyname.toLowerCase();
    if (firstName < secondName)
        return -1;
    else if (firstName > secondName)
        return 1;
    else
        return 0
}

//when applicant row clicked redirect to applicant page.
function getApplicantByFamilyName() {
    $('#applicants').on('click', 'tbody tr', function() {
        location.assign('applicant.html?fname=' + $(this).attr('id'));
    });
}

//removes applicant by family name
function removeApplicantByFamilyName() {
    $("#rm_fname").click(function(e) {
        e.preventDefault();
        let familyName = $('#delete_fname input[type=text]').val();
        if (familyName) {
            $.ajax({
                url: '/applicants/?fname=' + familyName,
                type: 'DELETE',
                success: function(result) {
                    if (result == "Success")
                        location.reload(true);
                    else
                        alert(result);
                }
            });
        }
    });
}

//removes applicant by student number
function removeApplicantByStudentNum() {
    $("#rm_stunum").click(function(e) {
        e.preventDefault();
        let stdNum = $('#delete_stunum input[type=text]').val();
        if (stdNum) {
            $.ajax({
                url: '/applicants/?stunum=' + stdNum,
                type: 'DELETE',
                success: function(result) {
                    if (result == "Success")
                        location.reload(true);
                    else
                        alert(result);
                }
            });
        }
    });
}


//adds 3 more rows each time when user clicked add more course.
function addMoreCourse() {
    let parent = $('#applicant_form');
    var number = 2; //keep tracks of number of course
    $("#add_course").click(function(e) {
        e.preventDefault();
        // adds course row to select course from list
        let courseRow = $("<tr>").append(
            $("<td>").text("Course: "),
            $("<td>").append(
                $('<select></select>').attr({
                    id: "list_of_courses_" + number,
                    name: "code" + number
                }),
                $('<span />').addClass('course' + number).html(
                    "Remove class")
            )
        );
        // adds course lists to new created select element.
        populateCourse("#list_of_courses_" + number);
        // adds rank row for the new course
        let rankRow = $("<tr>").append(
            $("<td>").text("Rank: "),
            $("<td>").append(
                $('<input>').attr({
                    type: "text",
                    name: "rank" + number,
                    id: "rank" + number,
                    required: true,
                    pattern: "\\d*"
                })
            )
        );
        // adds experience row for the new course
        let experienceRow = $("<tr>").append(
            $("<td>").text("Experience: "),
            $("<td>").append(
                $('<input>').attr({
                    type: "text",
                    name: "experience" + number,
                    id: "experience" + number,
                    required: true,
                    pattern: "\\d*"
                })
            )
        );
        courseRow.addClass("course" + number);
        rankRow.addClass("course" + number);
        experienceRow.addClass("course" + number);
        // adds at the end of the form
        parent.find("tr:last").before(courseRow);
        parent.find("tr:last").before(rankRow);
        parent.find("tr:last").before(experienceRow);
        number++;
    });
}

// remove added course from new application
function removeCourse() {
    $('#applicant_form').on('click', 'span', function() {
        var className = $(this).attr('class');
        $('.' + className).remove();
    });
}

// adds all available course as option to select element.
function populateCourse(id) {
    $.ajax({
        url: "/courses",
        type: "GET",
        dataType: 'json',
        success: function(data) {
            for (let i = 0; i < data.courses.length; i++) {
                let course = data.courses[i].code;
                $(id).append(
                    $("<option></option>").attr("value",
                        course).text(course)
                );
            }
        }
    });
}

// creates new applicant
function addApplicant() {
    $("#add").submit(function(e) {
        e.preventDefault();
        // checks if all courses are different
        var selectedValues = [];    
        $("#applicant_form select :selected").each(function(){
            selectedValues.push($(this).val()); 
        });
        if ((new Set(selectedValues)).size !== selectedValues.length)
            alert("You cannot add same course multiple times.");
        else {
            // sends data
            $.post('/applicants', $('form').serialize(), function(data) {
                if (data == "Success")
                    location.reload(true);
                else
                    alert(data);
            });
        }
    });
}

// display form to add applicant
function displayForm() {
    $("#add_applicant").click(function(){
        $("#applicant_form").removeAttr('style');
    });
}

$(document).ready(function() {
    getAllAplications();
    getApplicantByFamilyName();
    removeApplicantByFamilyName();
    removeApplicantByStudentNum();
    populateCourse("#list_of_courses_1");
    addMoreCourse();
    removeCourse();
    addApplicant();
    displayForm();
    //loads header menu
    $("#header").load("menu.html");
});