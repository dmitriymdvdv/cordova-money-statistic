;(function ($) {
    let chart;

    $(document).ready(function () {
        window.MoneyStatistic = Object.assign({
            createChart: function (config) {
                let ctx  = config.ctx
                   ,type = config.type;
                let data = [];
                let labels = [];
                let colors = [];
                let result = [];
                config.data.forEach(item => {
                    if (!labels.includes(item.place)) {
                        labels.push(item.place);
                        data.push(item.oplata);
                        colors.push(item.color);
                    } else {
                        let index = labels.indexOf(item.place);
                        data[index] += item.oplata
                    }
                });
                for (let i = 0; i < labels.length; i++) {
                    result.push({
                        'place': labels[i],
                        'data': data[i],
                        'color': colors[i]
                    });
                }
                chart = new Chart(ctx, {
                    type: type,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of Votes',
                            data: data,
                            backgroundColor: colors,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        maintainAspectRatio: false
                    }
                });
            },
            destroyChart: function () {
                if (chart) {
                    chart.destroy();
                }
            }
        }, window.MoneyStatistic);
    })
})(jQuery);