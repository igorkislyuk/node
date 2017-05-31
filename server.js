const flow = require('nimble');
const exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
    const url = 'http://nodejs.org/dist/node-v' + version + '.tag.gz';
    const filepath = destination + '/' + version + '.tgz';
    exec('curl ' + url + '>' + filepath, callback);
}

flow.series([
    function (callback) {
        flow.parallel([
            function (callback) {
                console.log('Downloading Node v0.4.6...');
                downloadNodeVersion('0.4.6', '/tmp', callback);
            },
            function (callback) {
                console.log('Downloading Node v0.4.7...');
                downloadNodeVersion('0.4.7', '/tmp', callback);
            }
        ], callback);
    },
    function (callback) {
        console.log('Creating archive of downloaded files...');

        exec(
            'tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
            function (err, stdout, stderr) {
                console.log('All Done!');
                callback();
            }
        );
    }
]);