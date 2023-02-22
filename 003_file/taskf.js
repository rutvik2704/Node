const fs = require("fs")

const createfile = (data) => {
    const alldata = viewData();

    const duplicate = alldata.find(ele => {
        return ele.name == data.name
    })

    if (duplicate) {
        console.log("name alredy exist !!!");
        return;
    }
    alldata.push(data)
    
    const newData = JSON.stringify(data)
    fs.writeFile("task.json", newData, (err) => {
        if (err) {
            console.log(err);
            return
        }
        console.log("Data inserted in file");
    })
}

const viewfile = () => {
    const alldata = viewdata()
    console.log(alldata);
}


const viewdata = () => {

    try {
        const data = fs.readFileSync("task.json", "utf-8")
        if (data) {
            return JSON.parse(data)
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }

}
const viewByName = (name) => {
    const alldata = viewData();
    const duplicate = alldata.find(ele => {
        return ele.name == name
    })
    if (duplicate) {
        console.log(duplicate);
    }
    else {
        console.log("name not found !!!");
    }
}
const removedata = (name) => {
    const alldata = viewData();
    const newdata = alldata.filter(ele => {
        return ele.name != name
    })

    fs.writeFile("data.json", JSON.stringify(newdata), (err) => {
        console.log("data deleted");
    })
}

module.exports = { createfile, viewfile ,removedata ,viewByName}

