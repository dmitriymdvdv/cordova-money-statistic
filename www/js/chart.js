;(function ($) {
    let chart;

    function destroyChart() {
        if (chart) {
            chart.destroy();
        }
    }

    function groupDataByPlace(data) {
        let paymentAmounts = [];
        let places = [];
        let colors = [];
        data.forEach(item => {
            if (!places.includes(item.place)) {
                places.push(item.place);
                paymentAmounts.push(item.oplata);
                colors.push(item.color);
            } else {
                let index = places.indexOf(item.place);
                paymentAmounts[index] += item.oplata
            }
        });

        return allInOneArray(places, paymentAmounts, colors);
    }

    function allInOneArray(labels, data, colors) {
        let result = [];
        for (let i = 0; i < labels.length; i++) {
            result.push({
                'place': labels[i],
                'paymentAmount': data[i],
                'color': colors[i]
            });
        }
        return result;
    }

    function getArray(field, arrayOfObjects) {
        return arrayOfObjects.map(item => item[field]);
    }

    $(document).ready(function () {
        window.MoneyStatistic = Object.assign({
            createChart: function (config) {
                destroyChart();
                let data = groupDataByPlace(config.data);
                chart = new Chart(config.ctx, {
                    type: config.type,
                    data: {
                        labels: getArray('place', data),
                        datasets: [{
                            label: '# of Votes',
                            data: getArray('paymentAmount', data),
                            backgroundColor: getArray('color', data),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        maintainAspectRatio: false
                    }
                });
            }
        }, window.MoneyStatistic);
    })
})(jQuery);