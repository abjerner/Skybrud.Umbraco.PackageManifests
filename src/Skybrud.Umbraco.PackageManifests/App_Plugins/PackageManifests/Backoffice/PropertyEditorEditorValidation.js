angular.module("umbraco").controller("PackageManifests.PropertyEditorEditorValidation.Controller", function ($scope) {

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

        $scope.overlay = {
            view: "/App_Plugins/PackageManifests/Views/Overlays/Properties.html",
            show: true,
            properties: properties,
            title: "Editor Validation",
            submitButtonLabel: "Continue",
            closeButtonLabel: "Close",
            submit: function () {
                angular.forEach(properties, function (p) {
                    if (p.view === "boolean") {
                        $scope.model.value[p.alias] = p.value === "1";
                    } else {
                        $scope.model.value[p.alias] = p.value;
                    }
                });
                $scope.overlay.show = false;
                $scope.overlay = null;
            }
        };

    }

});