var smsList = [];
var SMS = SMS || null;

function onLoad() {
    if (( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        updateStatus('need run on mobile device for full functionalities.');
    }
}

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

function listSMS() {
    $.ajax('./sms.txt').then(res => {
        const data = res.split("\nSpr.:5099999\n\n").map(item => {
            return item = {
                address: 'MTBANK',
                body: item
            }
        });
        if (Array.isArray(data)) {
            smsList = getParseData(data);
            let prices = smsList.map(function (item) {
                return parseFloat(item.oplata);
            });
            let places = smsList.map(function (item) {
                return item.place;
            });

            let colors = smsList.map(function (item) {
                return item.color;
            });
            let ctx = $("#doughnutChart");
            MoneyStatistic.createChart({
                ctx: ctx,
                type: 'doughnut',
                data: prices,
                labels: places,
                colors: colors
            });
        }
    });
    if (SMS) {
        // SMS.listSMS({
        //     'maxCount': 7,
        //     'address': 'MTBANK'
        // }, function (data) {
        //     if (Array.isArray(data)) {
        //         smsList = getParseData(data);
        //         var prices = smsList.map(function (item) {
        //             return parseFloat(item.oplata);
        //         });
        //         var places = smsList.map(function (item) {
        //             return item.place;
        //         });
        //         var ctx = $("#doughnutChart");
        //         MoneyStatistic.createChart({
        //             ctx: ctx,
        //             type: 'doughnut',
        //             data: prices,
        //             labels: places
        //         });
        //     }
        // });
    }
}

function getParseData(data) {
    var smsList = [];

    data.forEach(function (sms) {
        var money = getMoney(sms.body);
        smsList.push({
            address: sms.address,
            body: sms.body,
            date: sms.body.match(/\d\d\/\d\d\/\d\d/),
            time: sms.body.match(/\d\d:\d\d/),
            money: money,
            place: sms.body.replace(/(\r\n|\n|\r)/gm, " ").match(/(?:\d+\.\d+\s\S+)([^,]*)/)[1],
            oplata: parseFloat(money[0]),
            curancy: money[0].match(/(\d+\.\d+)\s(\S+)/)[2],
            ostatok: money[1],
            color: getRandomColor()
        });
    });

    return smsList;
}

function getMoney(body) {
    return body.match(/(\d+\.\d+)\s(\S+)/ig);
}

setTimeout(function () {
    listSMS();
}, 2000);

function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}