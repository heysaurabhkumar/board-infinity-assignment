const express = require('express')
const mongoose = require("mongoose")
const cron = require('node-cron')
const moment = require('moment')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

var mongoDB = 'mongodb+srv://admin-saurabh:Test123@cluster0.wapcc.mongodb.net/tasksDB';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const tasksSchema = mongoose.Schema({
    taskName: String,
    taskDescription: String,
    creator: String,
    duration: Number,
    createdAt: Date,
    endedAt: Date
})

const Task = mongoose.model("Task", tasksSchema)

app.get('/', (req, res) => {
    Task.find({}, function (err, foundTasks) {
        res.render('index', { allTasks: foundTasks })
    })

})

app.post('/', (req, res) => {
    const task = new Task({
        "taskName": req.body.taskName,
        "taskDescription": req.body.taskDescription,
        "creator": req.body.creator,
        "duration": req.body.duration,
        "createdAt": new Date(),
        "endedAt": new Date(moment().add(req.body.duration, 'minutes').format())
    })

    task.save()
    res.redirect("/")
})

app.get('/add', (req, res) => {
    Task.find({}, function (err, foundTasks) {
        res.render('add')
    })
})

app.get('/list', (req, res) => {
    Task.find({}, function (err, foundTasks) {
        res.render('list', { allTasks: foundTasks })
    })
})

cron.schedule('* * * * *', () => {
    let ct = new Date()
    Task.deleteMany({ endedAt: { $lte: ct } }, function (err) {
        if (err) {
            console.log(err);
        }
    })
});

app.listen(port, () => {
    console.log(`Assignment app listening at http://localhost:${port}`)
})