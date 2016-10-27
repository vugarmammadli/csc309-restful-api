# Assignment 2: RESTful API

Develop a set of RESTful APIs capable of reading a JSON file deployed on accessible Node.js server.  Data from the JSON file should be accessible using a collection of simple HTTP reqeusts and presented appropriately on the front-end.

You will be implementing a simple part of a TA application system using the RESTful API approach.

This assignment is individual.  You may use Node, Express, JavaScript, and plain jQuery.  It is unlikely that we will grant permission to use additional libraries.

**NOTE:** Your repo will be updated with a much better data set.  I wanted to get this published first.


### REST Specification

You will design the REST interface for this application.  Operations that retrieve data will use GET requests, operations that modify or add data will use POST requests, and operations that remove data will use DELETE requests.  There will be one REST call for each of the 7 specifications below.

Your server will be made up of at least 2 files: `tapp.js` (the main server file) and `routes.js`. You are welcome to modularize your program further if you desire.

#### List Applicants (15%)

Your RESTful API should be able to respond to the following requests with relevant front-end updating.  The JSON format of the responses is shown in the text file [responses.txt](./responses.txt)

 - `GET /applicants`  Get all applicants ordered by Family Name.  The view will display the following information about each in a table: Given Name, Family Name, Status, Year

 -  `GET /applicants?status=status`

    Get all applicants with a given status (Status is Undergrad, MSc, PhD, MScAC, MEng).  The view will display the results in a table with the following columns: Given Name, Family Name, Status, Year


#### Individual Applicants (20%)

 - `GET /applicants?fname=fname`

    Get the information about an applicant with a particular Family Name.  The view will display all of the information about the applicant, including the list of courses applied for, and the applicants' rankings and experience for the courses.

 - `POST /applicants`

    Add a new applicant.  The request fields are given in [responses.txt](./responses.txt)

 - `DELETE /applicants?fname=fname`
 - `DELETE /applicants?stunum=stunum`
 
    Remove an applicant by family name or by student number.

Note that we can either add an applicant or remove one, but we can not change any of the details about the applicant.

#### List Courses and applications (20%)

 - `GET /courses`

    Get applicants for each course.  For each course, list all the applicants who applied for that course ordered by ranking. The view will display a table with the following columns: Ranking, Experience, Status, Given Name, Family Name.

 - `GET /courses?course=course`

    Get all applicants who have applied for a particular course ordered by ranking.  The view will display a table with the following columns: Ranking, Experience, Status, Given Name, Family Name.

### Views (25%)

The website provides a list of possible operations to the user.  You can think of this list a navigation menu.

 - "Applicants"
 - "Applicants by status"
    - Requires user to select from a dropdown menu of statuses
 - "Search by Family Name"
     - Requires user to enter a Family Name
 - "Add applicant"
 - "Remove applicant"

 - "Courses"
 - "Search for Course"
     - Requires user to enter a course ID

Some menu items require additional information from the user before the request can be made to the server. You can use a `prompt` box or some other mechanism to get the user to enter the information before submitting the HTTP request.

You have two main options for the views.  One is to have a single HTML file that is updated via AJAX calls using JavaScript (or jQuery).  The other is to have a separate HTML file (page) for the results of each operation.  Whichever method you use, you should ensure that the user can see the main menu items at all times.

Minimal styling using CSS is required.  You should spend only a small amount of time on adding style to the website.

Note that the grade for this component is largely for the JavaScript/jQuery required to update the data displayed.

### Programming style (10%)

Good REST design and the usual attributes of good programming style.

### Creativity and/or Design (10%)

This is an opportunity for you to do little extra.  It could be doing some extra work on the design of the views, particularly good error handling, tests for your REST API, or something else that you come up with.  Please note that the graders will be *very* stingy with these marks if the basic functionality is not complete or well-implemented.

### Details

 - Front end may use jQuery, but is not required to.
 - The focus of this assignment is on API design and server implementation.
 - You are given sample JSON data, but we will use a larger data set for testing.
 - You might consider using [cURL](http://conqueringthecommandline.com/book/curl) (command-line tool) or a tool like [Postman](https://www.getpostman.com) to allow you to form HTTP requests to send to your server to help you debug the server-side operations.

