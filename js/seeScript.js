var token = localStorage.getItem("token");
var posts;


function multi() {
    var xhr = new XMLHttpRequest();

    var data = new FormData();
    alert(document.getElementById("count").value);
    data.append('count', document.getElementById("count").value);
    data.append('offset', document.getElementById("offset").value);

    xhr.open('GET', 'https://ce419.herokuapp.com/blog/posts');

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){
        alert(xhr.responseText);
       //    localStorage.setItem("posts", data.posts);
       posts = data.posts;
  //         alert(posts[0]);
        var t = document.createElement("p");
var node = document.createTextNode("This is new.");
t.appendChild(node);

var pin = document.getElementById("main");
//pin.appendChild(t);

for(i = 0 ; i < posts.length ; i++) {
  //  alert(i);
    var data = posts[i];
    var e = document.createElement('div');
    e.className = "post";
    var a = document.createElement('p');
    a.className = "header";
    a.innerHTML = data.title + "</br></br>3/10/2017</br>by: Zahra Babaiee";
    var b = document.createElement('img');
    b.className = "writer";
    b.src = "photos/profilepic.jpg";
    var c = document.createElement('img');
    c.className = "imgpost";
    c.src = "photos/eid2.jpg";
    var d = document.createElement('p');
    d.className = "postp";
    d.innerHTML = data.summery + "... </br>";
    var l = document.createElement('a');
    l.href = "post.html"+ "?" + data.id;
    l.innerHTML = "Read more";
    d.appendChild(l);

    e.appendChild(a);
    e.appendChild(b);
    e.appendChild(c);
    e.appendChild(d);

//    var a = document.createElement('a');
    pin.appendChild(e);
}
        }

    };

    xhr.setRequestHeader('X-Token', token);
    xhr.send(data);
}

function load(){

var t = document.createElement("p");
var node = document.createTextNode("This is new.");
t.appendChild(node);

var pin = document.getElementById("main");
//pin.appendChild(t);

for(i = 0 ; i < posts.length ; i++) {
    var data = JSON.parse(posts[i]);
    var e = document.createElement('div');
    e.className = "post";
    var a = document.createElement('p');
    a.className = "header";
    a.innerHTML = data.title + "</br></br>3/10/2017</br>by: Zahra Babaiee";
    var b = document.createElement('img');
    b.className = "writer";
    b.src = "photos/profilepic.jpg";
    var c = document.createElement('img');
    c.className = "imgpost";
    c.src = "photos/eid2.jpg";
    var d = document.createElement('p');
    d.className = "postp";
    d.innerHTML = data.summery;

    e.appendChild(a);
    e.appendChild(b);
    e.appendChild(c);
    e.appendChild(d);

//    var a = document.createElement('a');
    pin.appendChild(e);
}

}
