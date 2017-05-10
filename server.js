const events = require('events')
    , util = require('util')
    , fs = require('fs');

const watchDir = './watch'
    , processedDir = './done';

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}
util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function () {
    const watcher = this;
    fs.readdir(this.watchDir, function (err, files) {
        if (err) throw err;

        for (var index in files) {
            // process per file in folder
            watcher.emit('process', files[index]);
        }
    });
};

Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(watchDir, function () {
        watcher.watch();
    });
};

const watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function process(file) {
    const watchFile = this.watchDir + '/' + file;
    const processedFile = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, function (err) {
        if (err) throw err;
    });
});

watcher.start();
