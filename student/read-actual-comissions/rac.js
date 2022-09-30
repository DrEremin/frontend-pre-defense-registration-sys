function crFunk() {

    let form = document.getElementById('#crForm');
    let jsonObj = {
        personLogin : document.getElementById('login').value,
        personPassword : document.getElementById('password').value,
    };

    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8080/comissions-read/actual/student');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonObj));
    xhr.onload = function() {

        let responseBody = xhr.response;
        console.log(xhr.status);
        if (xhr.status < 400) {
            resFunk(responseBody);
        } else {
            errFunk(responseBody);
        }
    }
}

function resFunk(resArray) {

    let win = window.open('/read-actual-comissions/result.html');

    win.onload = function() {
        for (let i = 0; i < resArray.length; i++) {

            let teachers = '';
            let row = win.document.createElement('tr');

            for (let j = 0; j < resArray[i].teachers.length; j++) {
                if (j === resArray[i].teachers.length - 1) {
                    teachers += resArray[i].teachers[j].fullName;
                } else if (j % 3 === 0) {
                    teachers += resArray[i].teachers[j].fullName + ',\n';
                } else {
                    teachers += resArray[i].teachers[j].fullName + ', ';
                }
            }

            row.innerHTML = '<td>' + resArray[i].id + '</td><td>'
                    + resArray[i].date + '</td><td>'
                    + resArray[i].startTime + ' - '
                            + resArray[i].endTime + '</td><td>'
                    + resArray[i].studyDirection + '</td><td>'
                    + resArray[i].location + '</td><td>'
                    + teachers + '</td>';
            win.document.querySelector('.comission').appendChild(row);
        }
    }
}

function errFunk(errObj) {
    let win = window.open('/read-actual-comissions/err.html');
    win.onload = function() {
        win.document.getElementById('res').textContent = 'Ошибка';
        win.document.getElementById('status').textContent = errObj.status;
        win.document.getElementById('message').textContent = errObj.message;
    }
}
