//gets all courses
function getAllCourses() {
    $.ajax({
        url: "/courses",
        type: "GET",
        dataType: 'json',
        success: function(data) {
            fillTable(data);
        }
    });
}

// gets list of applicants according to course name
function getApplicationByCourse() {
    $('#search_course input[type=submit]').click(function() {
        var course = $('#course').val();
        $.ajax({
            url: "/courses?course=" + course,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                // creates new object with the same structure as get courses,
                //so we can use the same helper function to fill table.
                var dataObj = {}
                dataObj.courses = [];
                dataObj.courses.push(data);
                fillTable(dataObj);
                // adds button to show all courses
                let rowShowAll = $("<tr>").append(
                    $("<td colspan='5'>").append(
                        $("<input />").attr({
                            type: 'submit',
                            id: 'show_all',
                            value: 'Show all courses'
                        })
                    )
                ).addClass("show-all-row");
                $('#applicants').append(rowShowAll);
            }
        });
    });
}

// gets all courses when show all button is clicked.
function showAllButton() {
    $('#applicants').on('click', '#show_all', function() {
        getAllCourses();
    });
}

// fills the table with the information
function fillTable(data) {
    let parent = $('#applicants');
    parent.empty();
    if (data.courses.length != 0) {
        for (let i = 0; i < data.courses.length; i++) {
            let course = data.courses[i];
            // creates course name row
            let rowCourseName = $("<tr>").append(
                $("<th colspan='5'>").text("Course name: " + course.code)
                .addClass("course-name")
            );
            parent.append(rowCourseName);
            let listOfTas = course.tas;
            listOfTas.sort(sortByRanking);
            // creates header rows of TAs who applied the course
            if (listOfTas.length != 0) {
                var rowHead = $("<tr>").append(
                    $("<th>").text("Given name"),
                    $("<th>").text("Family name"),
                    $("<th>").text("Status"),
                    $("<th>").text("Experience"),
                    $("<th>").text("Ranking")
                );
                parent.append(rowHead);
                // adds information of TAs to table
                for (let j = 0; j < listOfTas.length; j++) {
                    if (listOfTas[j]) {
                        var rowTa = $("<tr>").append(
                            $("<td>").text(listOfTas[j].givenname),
                            $("<td>").text(listOfTas[j].familyname),
                            $("<td>").text(listOfTas[j].status),
                            $("<td>").text(listOfTas[j].experience),
                            $("<td>").text(listOfTas[j].ranking)
                        );
                        parent.append(rowTa);
                    }
                }
            } else {
                // there is no application for the course
                parent.append($("<tr>").append(
                    $("<td colspan='5'>").text(
                        "There is no applicant for this course.")));
            }
        }
    } else {
        parent.append($("<tr>").append(
            $("<td colspan='5'>").text("There is no such course.")));
    }

}

// sorts list of applicant according to ranking
function sortByRanking(firstTa, secondTa) {
    var firstRank = firstTa.ranking;
    var secondRank = secondTa.ranking;
    if (firstRank < secondRank)
        return -1;
    else if (firstRank > secondRank)
        return 1;
    else
        return 0
}


$(document).ready(function() {
    getAllCourses();
    getApplicationByCourse();
    showAllButton();
    // loads menu to header
    $("#header").load("menu.html");
});