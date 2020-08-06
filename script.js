window.onload = function () {
    var data;
    // request the data and list the teams
    getData(listTeams);

    // search box filtering
    var searchBox = document.querySelector('#searchInput');
    searchBox.addEventListener('input', filterTeams);

    /**
 * getData makes the API call and runs the callback function with the response data.
 * in all other cases, console the error message
 * @param {function} _callback
 */
    function getData(_callback) {
        var resourceURL = "http://delivery.chalk247.com/team_list/NFL.JSON?api_key=74db8efa2a6db279393b433d97c2bc843f8e32b0";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    data = JSON.parse(xhttp.responseText);
                    _callback(data);
                } else
                    console.error("Couldn't retrieve data.");
            }

        };
        xhttp.open("GET", resourceURL, true);
        xhttp.send();
    }

    /**
     * createTable adds a table with the given data to the element with the id `teamTable`
     * @param {JSON} data
     */
    function listTeams(data) {
        //console.log(data);

        var t = document.querySelector('#teamTable');
        var tBody = document.createElement("tbody");

        // Add the team rows
        var i = 1;
        for (var team of data.results.data.team) {
            //console.log(team);
            var row = document.createElement("tr");

            var cellOrder = document.createElement("td");
            var order = document.createTextNode(i++);
            cellOrder.appendChild(order);
            row.appendChild(cellOrder);

            var cellName = document.createElement("td");
            var name = document.createTextNode(team.name);
            cellName.appendChild(name);
            row.appendChild(cellName);

            var cellNickname = document.createElement("td");
            var nickname = document.createTextNode(team.nickname);
            cellNickname.appendChild(nickname);
            row.appendChild(cellNickname);

            var cellDivision = document.createElement("td");
            var division = document.createTextNode(team.division);
            cellDivision.appendChild(division);
            row.appendChild(cellDivision);

            var cellConference = document.createElement("td");
            var conference = document.createTextNode(team.conference);
            cellConference.appendChild(conference);
            row.appendChild(cellConference);

            tBody.appendChild(row);
        }

        t.appendChild(tBody);
    }

    /**
     * filterTeams hides the team rows not matching with the search keyword
     */
    function filterTeams() {
        var rows = document.querySelectorAll('#teamTable tbody tr');
        var keyword = searchBox.value.toLowerCase();
        
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].childNodes;
            var isMattching = false;
            for (let k = 0; k < cells.length; k++) {
                var txtValue = cells[k].textContent || cells[k].innerText;
                txtValue = txtValue.toLowerCase();
                if (txtValue.indexOf(keyword) > -1)
                    isMattching = true;       
            }

            if (isMattching) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
};


