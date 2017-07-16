
function submit() {

    var xhr = new XMLHttpRequest();

    var data = new FormData();
    data.append('username', document.getElementById("sid").value);
    data.append('password', document.getElementById("pass").value);
    data.append('first_name', document.getElementById("first").value);
    data.append('last_name', document.getElementById("last").value);
    data.append('email', document.getElementById("email").value);

    xhr.open('POST','http://127.0.0.1:8000/auth/register/');

    xhr.onload = function () {
        alert('hi');
        alert(xhr.responseText)
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){window.location.href = "login.html"; }

    };
    xhr.send(data);
}


  document.addEventListener('DOMContentLoaded', function () {
  var b = document.querySelector('#myButton');
  b.addEventListener('click', submit);
  })