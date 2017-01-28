;(function ($) {

    $(document).ready(function () {
        window.MoneyStatistic = Object.assign({
            createChart: function (config) {
                var ctx  = config.ctx
                   ,type = config.type
                   ,data = config.data
                   ,labels = config.labels;
                var doughnutChart = new Chart(ctx, {
                    type: type,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of Votes',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
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