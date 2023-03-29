fetch('https://jsonplaceholder.typicode.com/todos/')
.then((res)=>{
    return res.json()
})
.then((data)=>{
    var trdata="";
    const mydata=data.map((cval)=>{
        trdata+=`<tr>
        <td>${cval.id}</td>
        <td>${cval.title}</td>
        <td>${cval.completed}</td>
    </tr>`;
    })
    document.getElementById("data").innerHTML=trdata;
})