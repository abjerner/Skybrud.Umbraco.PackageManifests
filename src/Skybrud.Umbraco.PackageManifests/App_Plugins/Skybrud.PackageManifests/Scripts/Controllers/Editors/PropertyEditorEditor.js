angular.module("umbraco").controller("PackageManifests.PropertyEditorEditor.Controller", function ($scope) {

    if (!$scope.model.value) $scope.model.value = {};

    $scope.edit = function () {

        var properties = [
            {
                alias: "view",
                label: "View",
                description: "This is the full path to the HTML view for your property editor.",
                value: $scope.model.value.view,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "hideLabel",
                label: "Hide label",
                description: "If set to true this hides the label for the property editor when used in Umbraco on a document type.",
                value: $scope.model.value.hideLabel ? "1" : "0",
                view: "boolean"
            },
            {
                alias: "valueType",
                label: "Value type",
                description: "This is the type of data you want your property editor to save to Umbraco.",
                value: $scope.model.value.valueType,
                //view: "textbox",
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/ValueType.html",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "validation",
                label: "Validation",
                description: "Object describing required validators on the editor.",
                value: $scope.model.value.validation,
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/PropertyEditorEditorValidation.html"
            },
            {
                alias: "isReadOnly",
                label: "Readonly",
                description: "If set to true this makes the property editor read only.",
                value: $scope.model.value.isReadOnly ? "1" : "0",
                view: "boolean"
            }
        ];

        $scope.overlay = {
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties.html",
            show: true,
            properties: properties,
            title: "Editor",
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