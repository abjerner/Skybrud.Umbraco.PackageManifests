angular.module("umbraco").controller("PackageManifests.EditManifest.Controller", function ($scope, $routeParams, $http, notificationsService, navigationService) {
    
    $scope.route = $routeParams;

    $scope.loading = true;

    var id = $routeParams.id.split(",");

    $scope.name = "";
    $scope.alias = id[0];
    $scope.packageAlias = id[0];
    $scope.path = ["-1"];

    var baseUrl = "/umbraco/backoffice/PackageManifests/Manifests/";

    $scope.saveManifest = function () {

        // TODO: Validate the property editor (eg. check required properties)

        var data = $scope.manifest.manifest;

        $http.post(baseUrl + "PostManifest?packageAlias=" + $scope.alias, data).success(function () {
            notificationsService.success("Manifest saved", "The package.manifest file for <strong>" + $scope.manifest.name + "</strong> was successfully saved.");
        });

    };

    $http.get("/umbraco/backoffice/PackageManifests/Manifests/GetManifestByAlias?alias=" + $routeParams.id).success(function (r) {

        $scope.manifest = r;
        $scope.name = r.name;

        $scope.properties = [
            {
                alias: 'javascript',
                label: 'JavaScript',
                description: 'A list of JavaScript files with full path to load for your property editor.',
                hideLabel: false,
                value: r.manifest.javascript && Array.isArray(r.manifest.javascript) ? r.manifest.javascript : [],
                view: '/App_Plugins/PackageManifests/Views/Files.html',
                updated: function (p) { $scope.manifest.manifest.javascript = p.value; }
            },
            {
                alias: 'css',
                label: 'CSS',
                description: 'A list of CSS files with full path to load for your property editor.',
                hideLabel: false,
                value: r.manifest.css && Array.isArray(r.manifest.css) ? r.manifest.css : [],
                view: '/App_Plugins/PackageManifests/Views/Files.html',
                updated: function (p) { $scope.manifest.manifest.css = p.value; }
            },
            {
                alias: "gridEditors",
                label: "Grid editors",
                value: r.manifest.gridEditors && Array.isArray(r.manifest.gridEditors) ? r.manifest.gridEditors : [],
                view: "/App_Plugins/PackageManifests/Views/GridEditors.html",
                updated: function (p) { $scope.manifest.manifest.gridEditors = p.value; }
            },
            {
                alias: "propertyEditors",
                label: "Property editors",
                value: r.manifest.propertyEditors && Array.isArray(r.manifest.propertyEditors) ? r.manifest.propertyEditors : [],
                view: "/App_Plugins/PackageManifests/Views/PropertyEditors.html",
                updated: function (p) { $scope.manifest.manifest.propertyEditors = p.value; }
            }
        ];
            
        $scope.$watch(function () {
            return $scope.properties;
        }, function (array) {
            angular.forEach(array, function (property) {
                property.updated(property);
            });
        }, true);

        navigationService.syncTree({ tree: "packageManifests", path: id });

    });

});