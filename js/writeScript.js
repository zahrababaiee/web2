
var token = localStorage.getItem("token");

function share() {
    alert(token );
    var xhr = new XMLHttpRequest();


    var data = new FormData();
    data.append('title', document.getElementById("title").value);
    data.append('summary', document.getElementById("summary").value);
    data.append('text', document.getElementById("txt").value);

    xhr.open('POST', 'http://127.0.0.1:8000/blog/1/post/');

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){alert(xhr.responseText) }

    };

   xhr.setRequestHeader('X-Token', token);
   xhr.send(data);

}

