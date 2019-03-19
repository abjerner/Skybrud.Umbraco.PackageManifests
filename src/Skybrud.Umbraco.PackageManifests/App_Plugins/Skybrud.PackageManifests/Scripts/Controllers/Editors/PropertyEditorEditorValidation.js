angular.module("umbraco").controller("PackageManifests.PropertyEditorEditorValidation.Controller", function ($scope, editorService) {

    if (!$scope.model.value) $scope.model.value = {};

    $scope.edit = function() {

        var properties = [
            {
                alias: "mandatory",
                label: "Mandatory",
                description: "",
                hideLabel: false,
                value: $scope.model.value.mandatory ? "1" : "0",
                view: "boolean"
            },
            {
                alias: "pattern",
                label: "Pattern",
                description: "",
                hideLabel: false,
                value: $scope.model.value.pattern,
                view: "textbox"
            }
        ];

        editorService.open({
            title: "Editor Validation",
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties.html",
            properties: properties,
            submit: function (model) {
                angular.forEach(model, function (p) {
                    if (p.view === "boolean") {
                        $scope.model.value[p.alias] = p.value === "1";
                    } else {
                        $scope.model.value[p.alias] = p.value;
                    }
                });
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        });

    }

});