function crFunk() {

    let form = document.getElementById('#crForm');
    let jsonObj = {
        personLogin : document.getElementById('login').value,
        personPassword : document.getElementById('password').value,
        subject : document.getElementById('subject').value,
        content : document.getElementById('message').value
    };

    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8080/mailing/teachers');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonObj));
    xhr.onload = function() {

        let responseBody = xhr.response;
        if (xhr.status < 400) {
            resFunk(responseBody);
        } else {
            errFunk(responseBody);
        }
    }
}

function resFunk(resArray) {

    let win = window.open('/mailing-to-teachers/result.html');

    win.onload = function() {
        for (let i = 0; i < resArray.length; i++) {

            let row = win.document.createElement('tr');

            row.innerHTML = '<td>' + resArray[i].status + '</td><td>'
                    + resArray[i].message + '</td><td>'
                    + resArray[i].email + '</td>';
            win.document.querySelector('.mailing_results').appendChild(row);
        }
    }
}

function errFunk(errObj) {
    let win = window.open('/mailing-to-teachers/err.html');
    win.onload = function() {
        win.document.getElementById('res').textContent = 'Ошибка';
        win.document.getElementById('status').textContent = errObj.status;
        win.document.getElementById('message').textContent = errObj.message;
    }
}
