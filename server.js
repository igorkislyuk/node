const http = require('http');

const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/tasks');

const Schema = mongoose.Schema;

const Tasks = new Schema({
    project: String,
    description: String
});

mongoose.model('Task', Tasks);

const Task = mongoose.model('Task');

// const task = new Task();
// task.project = 'Bikeshed';
// task.description = 'Paint the bikeshed red.';
// task.save(function (err) {
//     if (err) {
//         throw err;
//     }
//
//     console.log('Task saved.');
// });


Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    for (var i = 0; i < tasks.length; i++) {
        console.log('ID: ' + tasks[i]._id);
        console.log(tasks[0].description);
    }
});


// mongoose.disconnect();