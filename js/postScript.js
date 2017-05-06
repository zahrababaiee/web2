
var token = localStorage.getItem("token");
var id = location.search.substring(1);
var comments;

    var xhr = new XMLHttpRequest();

    var data = new FormData();

    xhr.open('GET', "https://ce419.herokuapp.com/blog/post"+ "?id=" + id);

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){
         //  alert(xhr.responseText);
           var node = document.createTextNode(data.post.title);
           document.getElementById("header").appendChild(node);
           var node = document.createTextNode(data.post.text + "</br></br></br>");
           document.getElementById("text").appendChild(node);
           var node = document.createTextNode(Date(data.post.datetime));
           document.getElementById("aut").appendChild(node);
           document.getElementById("title").innerHTML = data.post.title;
        }

    };

    xhr.setRequestHeader('X-Token', token);
    xhr.send(data);

function send() {
    var xhr = new XMLHttpRequest();


    var data = new FormData();
    data.append('post_id', id);
    data.append('text', document.getElementById("cmnt").value);

    xhr.open('POST', 'http://ce419.herokuapp.com/blog/comment');

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){alert(xhr.responseText) }

    };

   xhr.setRequestHeader('X-Token', token);
   xhr.send(data);

}

function multi() {
    alert("hi");
    var xhr = new XMLHttpRequest();

    var data = new FormData();
    data.append('count', document.getElementById("count").value);
    data.append('offset', document.getElementById("offset").value);

    xhr.open('GET', "https://ce419.herokuapp.com/blog/comments"+ "?post_id=" + id);

    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if(data.status == -1){alert(data.message);}
        if(data.status == 0){
        alert(xhr.responseText);
        comments = data.comments;
        }

        var t = document.createElement("p");
        var node = document.createTextNode("This is new.");
        t.appendChild(node);

        var pin = document.getElementById("main");

        for(i = 0 ; i < comments.length ; i++) {
            var data = comments[i];
            var a = document.createElement('tr');
            var b = document.createElement('td');
            var date = Date(data.datetime);
            var gyear = date.slice(11, 15);
            var gday = date.slice(8, 10);
            var gmonth = date.slice(4, 7);
            alert(gyear + "/" + gmonth + "/" + gday);
            b.innerHTML = Date(data.datetime) +":";
            var c = document.createElement('td');
            c.innerHTML = data.text;
            a.appendChild(b);
            a.appendChild(c);
            pin.appendChild(a);

         }

    };



    xhr.setRequestHeader('X-Token', token);
    xhr.send(data);
}






function gLeapYear(y){
    if ( (y%4==0) && ((y%100!=0) || (y%400==0))){
        return True;
    }else{
        return False;
    }
}

function sLeapYear(y){
    var result = False;
    var b = y%33;
    if ((b == 1) || (b == 5) || (b == 9) || (b == 13) || (b == 17) || (b == 22) || (b == 26) || (b == 30)){
        result = True;
    }
    return result;
 }

function shamsi(date){
    var gyear = date.slice(11, 15);
    var gday = date.slice(8, 10);
    var gmont = date.slice(4, 7);
    alert(gyear + "/" + gmonth + "/" + gday);
    if(gmont == "Jan"){
       gmonth = 1;
    }
    if(gmont == "Feb"){
       gmonth = 2;
    }
    if(gmont == "Mar"){
       gmonth = 3;
    }
    if(gmont == "Apr"){
       gmonth = 4;
    }
    if(gmont == "May"){
       gmonth = 5;
    }
    if(gmont == "Jun"){
       gmonth = 6;
    }
    if(gmont == "Jul"){
       gmonth = 7;
    }
    if(gmont == "Aug"){
       gmonth = 8;
    }
    if(gmont == "Sep"){
       gmonth = 9;
    }
    if(gmont == "Oct"){
       gmonth = 10;
    }
    if(gmont == "Nov"){
       gmonth = 11;
    }
    if(gmont == "Dec"){
       gmonth = 12;
    }

    var gl = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    var g  = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    var deydiffjan = 10;
    if (gLeapYear(gyear-1)){
        deydiffjan = 11;
        }
    if (gLeapYear(gyear)){
        var gd = gl[gmonth-1]+gday;
        }
    else{
        var gd =g[gmonth-1]+gday;
        }

    if (gd>79){
        var sy = gyear - 621;
        gd = gd - 79;
        if (gd<=186){
            var gmod = gd%31;
            if (gmod==0){
                var sd = 31;
                var sm = Math.floor(gd/31);
                }
            else{
                var sd = gmod;
                var sm = Math.floor(gd/31) + 1;
                }
        }else{
            gd = gd - 186;
            var gmod = gd%30;
            if (gmod==0){
                var sd = 30;
                var sm = Math.floor(gd/30) + 6;
                }
            else{
                var sd = gmod;
                var sm = Math.floor(gd/30) + 7;
                }
                }
    }else{
        var sy = gyear - 622;
        var gd = gd+deydiffjan;
        var gmod = gd%30;
        if (gmod==0){
            var sd = 30;
            var sm = Math.floor(gd/30) + 9;
            }
        else{
            var sd = gmod;
            var sm = Math.floor(gd/30) + 10;
            }
            }
            var str = date.slice(0, 15);
            return(date.replace(str, sy + "/" + sm + "/" + sd));
 }












