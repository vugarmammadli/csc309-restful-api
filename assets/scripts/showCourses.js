function getAllAplications(){
    $.ajax({
        url: "/courses",
        type: "GET",
        dataType: 'json',
        success: function(data){
            fillTable(data);
        }
    });
}

function getApplicationByCourse(){
    $('#search_course input[type=submit]').click(function(){
        var course = $('#course').val();
        $.ajax({
            url: "/courses?course=" + course,
            type: "GET",
            dataType: 'json',
            success: function(data){
                console.log(data);
                fillTable(data);
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

function showAllButton(){
    $('#applicants').on('click','#show_all',function(){
        getAllAplications();
    });
}

function fillTable(data){
    let parent = $('#applicants');
    parent.empty();
    if(data.courses.length != 0){
        for(let i = 0; i < data.courses.length; i++){
            let course = data.courses[i];
            let rowCourseName = $("<tr>").append(
                $("<th colspan='5'>").text("Course name: " + course.code).addClass("course-name")
            );
            parent.append(rowCourseName);
            let listOfTas = course.tas;
            if(listOfTas.length != 0){
                var rowHead = $("<tr>").append(
                    $("<th>").text("Given name"),
                    $("<th>").text("Family name"),
                    $("<th>").text("Status"),
                    $("<th>").text("Experience"),
                    $("<th>").text("Ranking")
                );
                parent.append(rowHead);
                for(let j = 0; j < listOfTas.length; j++){
                    if(listOfTas[j]){
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
                parent.append($("<tr>").append(
                    $("<td colspan='5'>").text("There is no applicant for this course.")));
            }
        }
    } else {
        parent.append($("<tr>").append(
            $("<td colspan='5'>").text("There is no such course.")));
    }
    
}


$(document).ready(function() {
    getAllAplications();
    getApplicationByCourse();
    showAllButton();
});