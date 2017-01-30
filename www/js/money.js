var smsList = [];
var SMS = SMS || null;

function onLoad() {
    if (( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
        document.addEventListener('deviceready', initApp, false);
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
        var divdata = $('div#data');
        divdata.html(divdata.html() + JSON.stringify(data));
    });
}

function listSMS(config) {
    config = Object.assign({
        count: 5,
        address: 'MTBANK',
        chartType: 'doughnut'
    }, config);
    if (SMS) {
        SMS.listSMS({
            'maxCount': config.count,
            'address': config.address
        }, function (data) {
            if (Array.isArray(data)) {
                smsList = getParseData(data);
                data = smsList.map((item) => {
                    return {
                        oplata: item.oplata,
                        place: item.place.trim(),
                        color: item.color
                    }
                });
                let ctx = $("#doughnutChart");
                MoneyStatistic.createChart({
                    ctx: ctx,
                    type: config.chartType,
                    data: data
                });
            }
        });
    } else {
        $.ajax('./sms.txt').then(res => {
            let data = res.split("\nSpr.:5099999\n\n").map(item => {
                return {
                    address: config.address,
                    body: item
                }
            });
            if (Array.isArray(data)) {
                smsList = getParseData(data);
                data = smsList.map((item) => {
                    return {
                        oplata: item.oplata,
                        place: item.place.trim(),
                        color: item.color
                    }
                });
                let ctx = $("#doughnutChart");
                MoneyStatistic.createChart({
                    ctx: ctx,
                    type: config.chartType,
                    data: data
                });
            }
        });
    }
}

$('#form').on('submit', function (event) {
    event.preventDefault();
    let $form = $(this);
    listSMS({
        count: parseInt($form.find('#smsCount').val()),
        chartType: $form.find('#chartType').val()
    })
});

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

function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}