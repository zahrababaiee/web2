
function send() {

    var xhr = new XMLHttpRequest();

    var data = new FormData();
    data.append('user_name', document.getElementById("sid").value);
    data.append('password', document.getElementById("pass").value);
    data.append('first_name', document.getElementById("first").value);
    data.append('last_name', document.getElementById("last").value);
    data.append('email', document.getElementById("email").value);

    xhr.open('POST', 'https://ce419.herokuapp.com/auth/register');

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){window.location.href = "login.html"; }

    };
    xhr.send(data);
}
