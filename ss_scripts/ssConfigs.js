var ssConfig = angular.module('ssConfig', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'ss_templates/ssBlankTemplate.html',
        })
        .when('/:listName', {
            templateUrl: 'ss_templates/ssTableDirective.html',
            controller: 'ssController'
        })
        .when('/lists1', {
            templateUrl: 'ss_templates/ssTableDirective.html',
            controllerAs: 'ssController'
        })
        .when('/lists3', {
            templateUrl: 'ss_templates/ssBlankTemplate.html',
        })
        .otherwise({
            redirectTo: '/'
        });
    }])

/* using ui-router
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("default", {
            url: "/default",
            templateUrl: 'ss_templates/ssBlankTemplate.html'
        });
    $stateProvider
      .state('listState1', {
          url: "",
          templateUrl: 'ss_templates/ssTableDirective.html'
      })
      .state('listState2', {
          url: "/list2",
          templateUrl: 'ss_templates/ssDifferentTemplate.html',
      })
      .state('listState3', {
          url: "/state3",
          templateUrl: 'ss_templates/ssTableTemplate.html'
      })
      .state('listState4', {
          url: "/list4",
          templateUrl: 'ss_templates/ssTableTemplate.html',

      });
});
*/

