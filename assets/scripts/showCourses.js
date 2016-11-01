function getAllAplications(){
    $.ajax({
        url: "/courses",
        type: "GET",
        dataType: 'json',
        success: function(data){
            let parent = $('#applicants');
            for(let i = 0; i < data.courses.length; i++){
                let course = data.courses[i];
                let rowCourseName = $("<tr>").append(
                    $("<th colspan='7'>").text("Course name: " + course.code)
                );
                let listOfTas = course.tas;
                if(listOfTas.length != 0){
                }
                parent.append(rowCourseName);
                console.log(data.courses[i]);
            }
        }
    });
}


$(document).ready(function() {
    getAllAplications();
});