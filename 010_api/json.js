const mydata=[1,2,3,4,5,6];
// for(let i=0;i<mydata.length;i++)
//     console.log(mydata[i]);
// console.log(mydata[0]);
    // mydata.forEach(element => {
    //     console.log(element);
    // });

const newarr=mydata.map((cval)=>{
    return "array Data "+cval*2;
})
console.log(newarr);