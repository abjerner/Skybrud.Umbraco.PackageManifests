angular.module("umbraco").controller("PackageManifests.EditManifest.Controller", function ($scope, $routeParams, $http, notificationsService, navigationService) {
    
    $scope.loading = true;;

    var baseUrl = "/umbraco/backoffice/Skybrud/PackageManifests/";

    $scope.saveManifest = function () {

        // TODO: Validate the property editor (eg. check required properties)

        var data = $scope.manifest.manifest;

        $http.post(baseUrl + "PostManifest?packageAlias=" + $routeParams.id, data).then(function () {
            notificationsService.success("Manifest saved", "The package.manifest file for <strong>" + $scope.manifest.name + "</strong> was successfully saved.");
        });

    };

    $http.get(baseUrl + "GetManifestByAlias?alias=" + $routeParams.id).then(function (r) {

        r = r.data;

        $scope.manifest = r;
        $scope.name = r.name;

        $scope.properties = [
            {
                alias: "javascript",
                label: "JavaScript",
                description: "A list of JavaScript files with full path to load for your property editor.",
                hideLabel: false,
                value: r.manifest.javascript && Array.isArray(r.manifest.javascript) ? r.manifest.javascript : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Files.html",
                updated: function (p) { $scope.manifest.manifest.javascript = p.value; }
            },
            {
                alias: "css",
                label: "CSS",
                description: "A list of CSS files with full path to load for your property editor.",
                hideLabel: false,
                value: r.manifest.css && Array.isArray(r.manifest.css) ? r.manifest.css : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Files.html",
                updated: function (p) { $scope.manifest.manifest.css = p.value; }
            },
            {
                alias: "gridEditors",
                label: "Grid editors",
                value: r.manifest.gridEditors && Array.isArray(r.manifest.gridEditors) ? r.manifest.gridEditors : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Manifest/GridEditors.html",
                updated: function (p) { $scope.manifest.manifest.gridEditors = p.value; }
            },
            {
                alias: "propertyEditors",
                label: "Property editors",
                value: r.manifest.propertyEditors && Array.isArray(r.manifest.propertyEditors) ? r.manifest.propertyEditors : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Manifest/PropertyEditors.html",
                updated: function (p) { $scope.manifest.manifest.propertyEditors = p.value; }
            },
            {
                alias: "contentApps",
                label: "Content apps",
                value: r.manifest.contentApps && Array.isArray(r.manifest.contentApps) ? r.manifest.contentApps : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Manifest/ContentApps.html",
                updated: function (p) { $scope.manifest.manifest.contentApps = p.value; }
            },
            {
                alias: "dashboards",
                label: "Dashboards",
                value: r.manifest.contentApps && Array.isArray(r.manifest.dashboards) ? r.manifest.dashboards : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Manifest/Dashboards.html",
                updated: function (p) { $scope.manifest.manifest.dashboards = p.value; }
            },
            {
                alias: "sections",
                label: "Sections",
                value: r.manifest.contentApps && Array.isArray(r.manifest.sections) ? r.manifest.sections : [],
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Manifest/Sections.html",
                updated: function (p) { $scope.manifest.manifest.sections = p.value; }
            }
        ];
            
        $scope.$watch(function () {
            return $scope.properties;
        }, function (array) {
            angular.forEach(array, function (property) {
                property.updated(property);
            });
        }, true);

        navigationService.syncTree({ tree: "packageManifests", path: $routeParams.id });

    });

});