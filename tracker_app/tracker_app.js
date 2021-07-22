document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueDescription = document.getElementById("issueDescriptionInput").value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedInput').value;
    var issueID = chance.guid(); /* generate a global unique identifier */
    var issueStatus = 'Open';

    var issue = {
        id: issueID,
        description: issueDescription,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null){
        //empty storage case
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues)); //set issues to the JSON representation of our issues array
    }else{
        //non-empty storage case
        var issues = JSON.parse(localStorage.getItem('issues')); // retrive the info in JSON representation, and parse it into array form
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    //reset input elements
    document.getElementById('issueInputForm').reset();
    
    fetchListOfIssues();

    //prevent form from submitting
    e.preventDefault();
}


function fetchListOfIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for(var i = 0; i < issues.length; i++){
        var id = issues[i].id;
        var description = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class = "well">' +
                                '<h6>Issue ID: ' + id + '</h6>' +
                                '<p><span class = "span-status">' + status + '</span></p>' +
                                '<h3>' + description + '</h3>' + 
                                '<p>' + severity + '</p>'+
                                '<p>' + assignedTo + '</p>' +
                                '<div class = "link-buttons">' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class = "button button-warning">Close</a>' + 
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class = "button button-danger">Delete</a>' +
                                '</div>'+
                                '</div>'

    }
}

function setStatusClosed(id){
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i< issues.length; i++){
        if(issues[i].id == id){
            issues[i].status = "Closed";
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchListOfIssues();
}

function deleteIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i< issues.length; i++){
        if(issues[i].id == id){
            issues.splice(i, 1); /* remove 1 element from the array */
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchListOfIssues();
}