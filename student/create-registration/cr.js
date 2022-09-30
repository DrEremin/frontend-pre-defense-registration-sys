function crFunk() {

    let form = document.getElementById('#crForm');
    let jsonObj = {
        personLogin : document.getElementById('login').value,
        personPassword : document.getElementById('password').value,
        comissionId : document.getElementById('id').value
    };
    let xhr = new XMLHttpRequest();

    xhr.open('PUT', 'http://localhost:8080/registration/student');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonObj));
    xhr.onload = function() {

        let responseObj = xhr.response;

        resFunk(responseObj);
    }
}

function resFunk(resObj) {
    let win = window.open('/create-registration/result.html');
    win.onload = function() {
        win.document.getElementById('res').textContent = (resObj.status == 200)
                ? 'Регистрация прошла успешно' : 'Ошибка';
        win.document.getElementById('status').textContent = resObj.status;
        win.document.getElementById('message').textContent = resObj.message;
    }
}
