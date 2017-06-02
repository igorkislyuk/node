const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const args = process.argv.splice(2);
const command = args.shift();
const taskDescription = args.join('');

const file = path.join(process.cwd(), './tasks');

switch (command) {
    case 'list':
        listTasks(file);
        break;

    case 'add':
        addTask(file, taskDescription);
        break;

    default:
        console.log('Usage: ' + process.argv[0] + 'list|add [taskDescription]');
}

function loadOrInitializeTaskArray(file, callback) {
    fs.exists(file, function (exists) {
        var tasks = [];
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }

                const stringData = data.toString();
                const tasks = JSON.parse(stringData || '[]');
                callback(tasks);
            });
        } else {
            callback([]);
        }
    });
}

function listTasks(file) {
    loadOrInitializeTaskArray(file, function (tasks) {
        for (var index in tasks) {
            console.log(tasks[index]);
        }
    });
}

function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function (err) {
        if (err) {
            throw err;
        }

        console.log('Saved.');
    });
}

function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, function (tasks) {
        tasks.push(taskDescription);
        storeTasks(file, tasks);
    });
}







