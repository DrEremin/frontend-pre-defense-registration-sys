function crFunk() {

    let form = document.getElementById('#crForm');
    let jsonObj = {
        personLogin : document.getElementById('login').value,
        personPassword : document.getElementById('password').value,
    };

    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8080/comissions-read/current/student');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonObj));
    xhr.onload = function() {

        let responseObj = xhr.response;
        console.log(xhr.status);
        if (xhr.status < 400) {
            resFunk(responseObj);
        } else {
            errFunk(responseObj);
        }
    }
}

function resFunk(resObj) {

    let win = window.open('/read-comission/result.html');

    win.onload = function() {

        win.document.getElementById('studyDirection').textContent = 'Направление - ' + resObj.studyDirection;
        win.document.getElementById('date').textContent = 'Дата - ' + resObj.date;
        win.document.getElementById('startTime').textContent = 'Начало - ' + resObj.startTime;
        win.document.getElementById('endTime').textContent = 'Завершение - ' + resObj.endTime;
        win.document.getElementById('location').textContent = 'Место проведения - ' + resObj.location;
        for (let i = 0; i < resObj.students.length; i++) {
            let row = win.document.createElement('tr');
            row.innerHTML = '<td>' + resObj.students[i].fullName + '</td><td>' + resObj.students[i].groupNumber + '</td>';
            win.document.querySelector('.comission').appendChild(row);
        }
    }
}

function errFunk(errObj) {
    let win = window.open('/read-comission/err.html');
    win.onload = function() {
        win.document.getElementById('res').textContent = 'Ошибка';
        win.document.getElementById('status').textContent = errObj.status;
        win.document.getElementById('message').textContent = errObj.message;
    }
}
