
var token = localStorage.getItem("token");

function share() {
    alert(token );
    var xhr = new XMLHttpRequest();


    var data = new FormData();
    data.append('title', document.getElementById("title").value);
    data.append('summary', document.getElementById("summary").value);
    data.append('text', document.getElementById("txt").value);

    xhr.open('POST', 'http://ce419.herokuapp.com/blog/post');

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){alert(xhr.responseText) }

    };

   xhr.setRequestHeader('X-Token', token);
   xhr.send(data);

}

