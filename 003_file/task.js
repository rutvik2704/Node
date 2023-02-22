const file = require("./taskf")
const yargs = require("yargs");

yargs.command({
    command: "create",
    builder: {
        name: {
            type: String
        },
        desc: {
            type: String
        },
        date: {
            type: Date,
            default: new Date()
        }
    },
    handler: function (argv) {

        const data = {
            name: argv.name,
            desc: argv.desc,
            date: argv.date
        }
        file.createfile(data)
    }
})

yargs.command({
    command: "view",
    handler: function (argv) {
        file.viewfile()
    }
})

yargs.command({
    command: "viewbyname",
    builder: {
        name: {
            type: String
        }
    },
    handler: function (argv) {
        file.viewByName(argv.name)
    }

})

yargs.command({
    command: "remove",
    builder: {
        name: {
            type: String
        }
    },
    handler: function (argv) {
        file.removedata(argv.name)
    }

})

yargs.argv
