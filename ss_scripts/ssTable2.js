var ssTableDirectives = angular.module('ssTableDirectives',[])
    .directive('ssTableRender', function () {

        var controller = ['$scope', function ($scope) {
            var vm = this,
                visibleProps = [];

            vm.columns = [];
            vm.reverse = false;
            vm.orderby;

            $scope.$watchCollection('datasource', getColumns);
            vm.sort = function (col) {
                if (vm.columnmap) {
                    rawCol = getRawColumnName(col);
                    vm.reverse = (vm.orderby === rawCol) ? !vm.reverse : false;
                    vm.orderby = rawCol;
                }
                else {
                    vm.reverse = (vm.orderby === col) ? !vm.reverse : false;
                    vm.orderby = col;
                }
            }
            function getColumns() {
                vm.columnmap = $scope.$eval(vm.columnmap);

                if (vm.columnmap) {
                    vm.columnmap.forEach(function (map) {
                        if (!map.hidden) {
                            for (var prop in map) {
                                if (prop !== 'hidden') pushColumns(prop, map[prop]);
                            }
                        }
                    });
                }
                else {
                    for (var prop in vm.datasource[0]) {
                        pushColumns(prop, prop);
                    }
                }
            }

            vm.getRowValues = function (row) {
                var sortedValues = [];
                if (vm.columnmap) {
                    visibleProps.forEach(function (prop) {
                        sortedValues.push(row[prop]);
                    });
                }
                return sortedValues;
            };

            function getRawColumnName(friendlyCol) {
                var rawCol;
                vm.columnmap.forEach(function (colMap) {
                    for (var prop in colMap) {
                        if (colMap[prop] === friendlyCol) {
                            rawCol = prop;
                            break;
                        }
                    }
                    return null;
                });
                return rawCol;
            }

            function pushColumns(rawCol, renamedCol) {
                visibleProps.push(rawCol);
                vm.columns.push(renamedCol);
            }

        }];

        return {
            restrict: 'E',
            replace: true,
            scope: {
                columnmap: '@',
                datasource: '='
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'ss_template/ssTableTemplate.html'
        };

    });