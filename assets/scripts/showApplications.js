function getAllAplications(){
    //returns all applicants at the beginning
    getApplicationAjaxCall("");
    
    //changes table when user select status
    $('#filter select').on('change', function() {
        $("#applicants").find("tr:gt(0)").remove();
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
            let parent = $('#applicants');
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

$(document).ready(function() {
    getAllAplications();
});