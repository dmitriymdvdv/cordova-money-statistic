;(function ($) {

    $(document).ready(function () {
        window.MoneyStatistic = Object.assign({
            createChart: function (config) {
                let ctx  = config.ctx
                   ,type = config.type
                   ,data = config.data
                   ,labels = config.labels
                   ,colors = config.colors;
                let doughnutChart = new Chart(ctx, {
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
            }
        }, window.MoneyStatistic);
    })
})(jQuery);