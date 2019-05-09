angular.module("umbraco.services").config(function ($httpProvider) {
    $httpProvider.interceptors.push(["$q", "$injector", "notificationsService", function ($q) {
        return {
            request: function (request) {
                var url = request.url.split("?");


                switch (url[0]) {

                    case "/App_Plugins/PackageManifests/backoffice/packageManifests/create.html":
                    case "/App_Plugins/PackageManifests/backoffice/packageManifests/edit.html":
                        request.url = url[0].replace("/App_Plugins/PackageManifests/", "/App_Plugins/Skybrud.PackageManifests/");
                        break;
	                
                }

                return request || $q.when(request);
            }
        };
    }]);
});