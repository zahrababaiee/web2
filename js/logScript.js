var token;
function send() {

    var xhr = new XMLHttpRequest();

    var data = new FormData();
    data.append('username', document.getElementById("sid").value);
    data.append('password', document.getElementById("pass").value);

    xhr.open('POST', 'http://127.0.0.1:8000/auth/login/');

    xhr.onload = function () {
    alert(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){
           token = data.token;
           localStorage.setItem("token", token);
           window.location.href = "write.html";
        }

    };
    xhr.send(data);
}


