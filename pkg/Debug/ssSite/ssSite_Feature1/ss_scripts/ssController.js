var app = angular.module('ssControllers', [])
.controller('ssController', ['$routeParams', '$scope', '$q', function ($routeParams, $scope, $q) {
    //BEGIN factory
    var hostweburl; // https://ssoft.sharepoint.com/sites/dev
    var appweburl;  // https://ssoft-065ebd750fd3ce.sharepoint.com/sites/dev/ssSite
   
    hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    //split used to remove hashtag , hashtag cannot be used because sharepoint doesnt not accept such requests
        appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl")).split("#/")[0];
        var scriptbase = hostweburl + "/_layouts/15/";
        $.getScript(scriptbase + "SP.RequestExecutor.js", execCrossDomainRequest);

        execCrossDomainRequest().then(function (results) {
            $scope.tasks = results;
            console.log(results);
        });

    function execCrossDomainRequest() {
        var deferred = $q.defer();
        var executor = new SP.RequestExecutor(appweburl);
        $scope.listName = "Tasker";
        $scope.selects = "Title";
        console.log('Begin executor'); console.log(executor); console.log('End executor');
        //BEGIN executor
        executor.executeAsync({
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('" + $scope.listName + "')/items?$select=" + $scope.selects + "&@target='" + hostweburl + "'",
            //url translation:
            //url:
                method: "GET",
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "Content-Type": "application/json; odata=verbose"
                }, 
                success: successHandle,
                error: function(data, xhr, errorMessage) {
                    deferred.reject(JSON.stringify(xhr));
                }
        });

        //END executor

        function successHandle(data, results) {
            var jsonObject = JSON.parse(data.body);
            var announcementsHTML = "";
            results = jsonObject.d.results
            deferred.resolve(results);
        }
        
        return deferred.promise;
    }

    //END factory
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

}])

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
