var app = angular.module('directivesModule', [])
.controller('ListsController', ['$scope', function ($scope) {
    //BEGIN factory
    var hostweburl;
    var appweburl;
    angular.element(document).ready(function () {
        hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
        appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
        var scriptbase = hostweburl + "/_layouts/15/";
        $.getScript(scriptbase + "SP.RequestExecutor.js", execCrossDomainRequest);
    });

    function execCrossDomainRequest() {
        console.log('appweburl: ' + appweburl);
        console.log('hostweburl: ' + hostweburl);
        var executor = new SP.RequestExecutor(appweburl);

        //BEGIN executor
        executor.executeAsync(
            {

                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('Tasker')/items?@target='" + hostweburl + "'",
                //url: appweburl + "/_api/web/lists/getbytitle('Things')/items",
                method: "GET",
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "Content-Type": "application/json; odata=verbose"
                },
                success: successHandler,
                error: errorHandler
            }
        );
        //END executor
        //END factory
    }

    function successHandler(data) {
        var jsonObject = JSON.parse(data.body);
        var results = jsonObject.d.results;

    }

    function errorHandler(data, errorCode, errorMessage) {
        document.getElementById("renderThings").innerText =
            "Could not complete cross-domain call: " + errorMessage;
    }

    function getQueryStringParameter(paramToRetrieve) {
        var params =
            document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }
    }
    /*
            $http({
                method: 'GET',
                url: _spPageContextInfo.siteServerRelativeUrl + "/_api/web/lists/getByTitle('Tasker')/items",
                headers: { "Accept": "application/json;odata=verbose" }
            }).success(function (data, status, headers, config) {
                $scope.tasks = data.d.results;
                console.log($scope.tasks);
            }).error(function (data, status, headers, config) {
            });
            */
}])

/*
    var app = angular.module('directivesModule', [])
    .controller('ListsController', ['$scope', 'callbackMaker', function ($scope, callbackMaker) { // veikia be link factory su paprastais duomenimis

        callbackMaker.tasks()
        .success(function (data, status, headers, config) {
            $scope.tasks = data.d.results;
            console.log("Status: " + status);
            console.log("Data: " + data);
            console.log("Config: " + config);
            console.log($scope.tasks);
            console.log('iWork');
        })

        .error(function (data, status, headers, config) {
            console.log("Status: " + status);
            console.log("Data: " + data);
            console.log("Config: " + config);
            console.log('iDont');
        });

    }])

    .factory('callbackMaker', ['$http', function ($http) {
        var requestEm = function () {
            return $http({
                method: 'GET',
                //url: _spPageContextInfo.siteServerRelativeUrl + "/_api/SP.AppContextSite(@target)/web/lists(guid'B490BE9B-603F-4C82-A295-12F63A9F1C10')/items?@target='" + siteServerRelativeUrl + "'",
                url: _spPageContextInfo.siteServerRelativeUrl + "/_api/web/lists/getbytitle('Tasker')/items?$skiptoken=Paged=Fa&p_ID=5&$top=10",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json; odata=verbose"
                }
            });
        }
        

        return {
            tasks: function () {
                return requestEm('tasks');
            },
        }
    }]);
    */
