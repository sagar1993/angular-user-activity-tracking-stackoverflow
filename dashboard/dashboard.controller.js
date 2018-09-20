(function () {

    angular
        .module('app')
        // 
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['UserService'];

    function DashboardController(UserService) {
        var vm = this;

        var labels, series;
        var user_l = [];

        (function initController() {
            loadUserActivityChart();
        })();

        function loadUserActivityChart () {
            UserService.GetUserActivityChartData().then(function (res){
                console.log(res);
                
                // data for chart 3 pie chart 

                vm.chart0_labels = res.series;
                var data = [];
                for (var i = 0; i < vm.chart0_labels.length; i++) {
                    data.push(res.user_login[vm.chart0_labels[i]]);
                }
                vm.chart0_data = data;
                
                // data for chart 1 line charts
                vm.labels = res.labels;
                vm.series = res.series;
                var data = [];
                for (var i = 0; i < vm.series.length; i++) {
                    data.push(res.result_q[vm.series[i]]);
                }
                vm.data = data;

                // chart 2

                vm.chart2_labels = res.labels;
                vm.char2_series = res.series;

                var data = [];
                for (var i = 0; i < vm.series.length; i++) {
                    data.push(res.result_p[vm.series[i]]);
                }
                vm.chart2_data = data;

            });
        }

        // vm.chart0_labels = [];
        // vm.chart0_data = [];


        // vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
        // vm.series = ['Series A', 'Series B'];
        // vm.data = [
        //   [65, 59, 80, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 86, 27, 90]
        // ];
        // vm.onClick = function (points, evt) {
        //   console.log(points, evt);
        // };
        // vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        // vm.options = {
        //   scales: {
        //     yAxes: [
        //       {
        //         id: 'y-axis-1',
        //         type: 'linear',
        //         display: true,
        //         position: 'left'
        //       },
        //       {
        //         id: 'y-axis-2',
        //         type: 'linear',
        //         display: true,
        //         position: 'right'
        //       }
        //     ]
        //   }
        // }


        // chart 2

        // vm.chart2_labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        // vm.char2_series = ['Series A', 'Series B'];

        // vm.chart2_data = [
        //     [65, 59, 80, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 86, 27, 90]
        // ];

        // get visualization data and view ?
        
        // show visualizations ?

        // show tabels ?

        // show comparative data between users ?

        // number of question clicks by user - by date

        // number of profile clicks by user - by date

        // upvote clicks by user

    }

})();
