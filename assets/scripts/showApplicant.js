// gets query from page url
var query = location.search.split('fname=')[1];

// gets applicant according to query
function getApplicant() {
    $.ajax({
        url: "/applicants?fname=" + query,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            fillTable(data);
        }
    });
}

// fills table with applicant info
function fillTable(data) {
    let parent = $('#applicants > tbody');
    let row = $("<tr>").append(
        $("<td>").text(data.stunum),
        $("<td>").text(data.givenname),
        $("<td>").text(data.familyname),
        $("<td>").text(data.status),
        $("<td>").text(data.year)
    );
    parent.append(row);
    fillCourses(data);
}

// fills table with courses info which applicant applied
function fillCourses(data) {
    let table = $("<table>").addClass("course-list");
    let headerRow = $("<tr>").append(
        $("<th>").text("Course name:"),
        $("<th>").text("Ranking:"),
        $("<th>").text("Experience")
    );
    table.append(headerRow);
    data.courses.sort(sortByRanking);
    for (item in data.courses) {
        let insideRow = $("<tr>").append(
            $("<td>").text(data.courses[item].code),
            $("<td>").text(data.courses[item].rank),
            $("<td>").text(data.courses[item].experience)
        );
        table.append(insideRow);
    }
    table.insertAfter($("#applicants"));
}


// sorts the courses that applicant applied by ranking
function sortByRanking(first, second) {
    var firstRank = first.rank;
    var secondRank = second.rank;
    if (firstRank < secondRank)
        return -1;
    else if (firstRank > secondRank)
        return 1;
    else
        return 0
}

$(document).ready(function() {
    getApplicant();
    //loads header menu
    $("#header").load("menu.html");
});