function chage(){
    document.getElementsByTagName("h1")[0].style.backgroundColor = "yellow"

}

function add(){
  var a = document.getElementById("a").value;
  var b =document.getElementById("b").value;
  var result = Number(a) + Number(b);
  document.getElementById("result").innerHTML = result;
}
function sub(){
    var a = document.getElementById("a").value;
    var b =document.getElementById("b").value;
    var result = Number(a) - Number(b);
    document.getElementById("result").innerHTML = result;
}
  function mul(){
    var a = document.getElementById("a").value;
    var b =document.getElementById("b").value;
    var result = Number(a) * Number(b);
    document.getElementById("result").innerHTML = result;
}
  function div(){
    var a = document.getElementById("a").value;
    var b =document.getElementById("b").value;
    var result = Number(a) / Number(b);
    document.getElementById("result").innerHTML = result;
}