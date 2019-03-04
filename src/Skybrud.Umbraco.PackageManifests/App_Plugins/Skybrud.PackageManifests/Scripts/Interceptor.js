angular.module("umbraco.services").config(function ($httpProvider) {
    $httpProvider.interceptors.push(["$q", "$injector", "notificationsService", function ($q) {
        return {
            request: function (request) {
                var url = request.url.split("?");
                if (url[0] === "/App_Plugins/PackageManifests/backoffice/packageManifests/edit.html") {
                    request.url = "/App_Plugins/Skybrud.PackageManifests/backoffice/packageManifests/edit.html";
                }
                return request || $q.when(request);
            }
        };
    }]);
});