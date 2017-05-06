var token;
function send() {

    var xhr = new XMLHttpRequest();

    var data = new FormData();
    data.append('student_number', document.getElementById("sid").value);
    data.append('password', document.getElementById("pass").value);

    xhr.open('POST', 'https://ce419.herokuapp.com/auth/login');

    xhr.onload = function () {
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


