fetch('https://fakestoreapi.com/products')
.then((res)=>{
    return res.json()
})
.then((data)=>{
    var trdata="";
    const mydata=data.map((cval)=>{
        trdata+=`<tr>
        <td>${cval.id}</td>
        <td>${cval.title}</td>
        <td>${cval.price}</td>
        <td>${cval.category}</td>
        <td>${cval.description}</td>
        <td><img src="${cval.image}" height="75px" width="75px"></td>
    </tr>`;
    })
    document.getElementById("data").innerHTML=trdata;
})