angular.module("umbraco").controller("PackageManifests.SectionsPicker.Controller", function ($scope, $http, editorService) {

    $scope.sections = [];
    if (Array.isArray($scope.model.value)) {
        $http.get("/umbraco/backoffice/Skybrud/PackageManifests/GetSections").then(function(res) {
            var temp = [];
            angular.forEach(res.data, function (section) {
                if (!section.icon) section.icon = "icon-section";
                if ($scope.model.value.indexOf(section.alias) >= 0) {
                    temp.push(section);
                }
            });
            $scope.sections = temp;
        });
    }

    $scope.add = function () {

        var oldSelection = angular.copy($scope.sections);

        editorService.sectionPicker({
            selection: $scope.sections,
            submit: function (model) {
                var temp = [];
                angular.forEach(model.selection, function(section) {
                    temp.push(section.alias);
                });
                $scope.model.value = temp;
                editorService.close();
            },
            close: function () {
                $scope.sections = oldSelection;
                editorService.close();
            }
        });
    };

});