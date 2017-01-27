function onLoad() {
    if (( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        updateStatus('need run on mobile device for full functionalities.');
    }
}

var smsList = [];

function initApp() {
    if (!SMS) {
        alert('SMS plugin not ready');
        return;
    }

    document.addEventListener('onSMSArrive', function (e) {
        var data = e.data;
        smsList.push(data);

        updateStatus('SMS arrived, count: ' + smsList.length);

        var divdata = $('div#data');
        divdata.html(divdata.html() + JSON.stringify(data));

    });
}

function update(id, str) {
    $('div#' + id).html(str);
}

function updateStatus(str) {
    $('div#status').html(str);
}

function updateData(str) {
    $('div#data').html(str);
}

function listSMS() {
    if (SMS) {
        SMS.listSMS({
            'maxCount': 5,
            'address': 'MTBANK'
        }, function (data) {
            updateStatus('sms listed as json array');
            var html = "<table>";
            if (Array.isArray(data)) {
                data.forEach(function (sms) {
                    smsList.push(sms);
                    var date    = sms.body.match(/\d\d\/\d\d\/\d\d/);
                    var time    = sms.body.match(/\d\d:\d\d/);
                    var money   = sms.body.match(/(\d+\.\d+)\s(\S+)/ig);
                    var place   = sms.body.replace(/(\r\n|\n|\r)/gm," ").match(/(?:\d+\.\d+\s\S+)([^,]*)/)[1];
                    var oplata  = money[0];
                    var curancy = money[0].match(/(\d+\.\d+)\s(\S+)/)[2];
                    var ostatok = money[1];
                    html +=
                        "<tr>" +
                            "<td>" + sms.address + "</td>" +
                            "<td>" + sms.body + "</td>" +
                            "<td>" + date + "</td>" +
                            "<td>" + time + "</td>" +
                            "<td>" + money + "</td>" +
                            "<td>" + place + "</td>" +
                            "<td>" + oplata + "</td>" +
                            "<td>" + curancy + "</td>" +
                            "<td>" + ostatok + "</td>" +
                        "</tr>";
                });
            }
            html += "</table>";
            updateData(html);
        }, function (err) {
            updateStatus('error list sms: ' + err);
        });
    }
}

function startWatch() {
    if (SMS) SMS.startWatch(function () {
        update('watching', 'watching started');
    }, function () {
        updateStatus('failed to start watching');
    });
}

function stopWatch() {
    if (SMS) SMS.stopWatch(function () {
        update('watching', 'watching stopped');
    }, function () {
        updateStatus('failed to stop watching');
    });
}
