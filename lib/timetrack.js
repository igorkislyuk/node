const qs = require('querystring');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('seq', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 1,
        min: 0,
        idle: 10000
    },
    define: {},
});

exports.database = sequelize;

const Timetrack = sequelize.define('Timetrack', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hours: Sequelize.DataTypes.INTEGER,
    date: Sequelize.DataTypes.DATE,
    archived: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    description: Sequelize.DataTypes.STRING
});

exports.createModel = function () {
    Timetrack.sync();
};

exports.sendHtml = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData = function (req, cb) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk
    });
    req.on('end', function () {
        var data = qs.parse(body);
        cb(data);
    });
};

exports.actionForm = function (id, path, label) {
    var html = '<form method="POST" action="' + path + '">' +
        '<input type="hidden" name="id" value="' + id + '">' +
        '<input type="submit" value="' + label + '" />' +
        '</form>';
    return html;
};

exports.add = function (req, res) {
    exports.parseReceivedData(req, function (work) {
        Timetrack
            .create({
                hours: work.hours,
                date: work.date,
                description: work.description
            })
            .then(timetrack => {
                console.log('create timetrack with ?', [timetrack.date]);
                exports.show(res);
            })
            .catch(err => {
                console.log(err);
                exports.show(res);
            })
    });
};

exports.delete = function (req, res) {
    // exports.parseReceivedData(req, function (work) {
    //     db.query(
    //         "DELETE FROM work WHERE id=?",
    //         [work.id],
    //         function (err) {
    //             if (err) throw err;
    //             exports.show(db, res);
    //         }
    //     );
    // });
};

exports.archive = function (req, res) {
    // exports.parseReceivedData(req, function (work) {
    //     db.query(
    //         "UPDATE work SET archived=1 WHERE id=?",
    //         [work.id],
    //         function (err) {
    //             if (err) throw err;
    //             exports.show(db, res);
    //         }
    //     );
    // });
};

exports.show = function (res, showArchived) {
    Timetrack.findAll({
        where: {
            archived: !!(showArchived)
        },
        order: [['date', 'DESC']]
    })
        .then(timetracks => {
            console.log(timetracks);

            html = (showArchived)
                ? ''
                : '<a href="/archived">Archived Work</a><br/>';
            html += exports.workHitlistHtml(timetracks);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.showArchived = function (res) {
    exports.show(res, true);
};

exports.workHitlistHtml = function (timetracks) {
    let html = '<table>';
    for (let i in timetracks) {
        html += '<tr>';
        html += '<td>' + timetracks[i].date + '</td>';
        html += '<td>' + timetracks[i].hours + '</td>';
        html += '<td>' + timetracks[i].description + '</td>';
        if (!timetracks[i].archived) {
            html += '<td>' + exports.workArchiveForm(timetracks[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(timetracks[i].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
};

exports.workFormHtml = function () {
    let html = '<form method="POST" action="/">' +
        '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>' +
        '<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
        '<p>Description:<br/>' +
        '<textarea name="description"></textarea></p>' +
        '<input type="submit" value="Add" />' +
        '</form>';
    return html;
};

exports.workArchiveForm = function (id) {
    return exports.actionForm(id, '/archive', 'Archive');
};

exports.workDeleteForm = function (id) {
    return exports.actionForm(id, '/delete', 'Delete');
};
