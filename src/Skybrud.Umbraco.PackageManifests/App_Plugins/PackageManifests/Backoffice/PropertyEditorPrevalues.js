angular.module("umbraco").controller("PackageManifests.PropertyEditorPrevalues.Controller", function($scope) {

    if (!$scope.model.value) {
        $scope.model.value = {};
    }

    if (!Array.isArray($scope.model.value.fields)) {
        $scope.model.value.fields = [];
    }

    $scope.add = function () {
        edit({}, "Add prevalue field", function (e) {
            $scope.model.value.push(e);
        });
    };

    $scope.edit = function (field) {
        edit(field, "Edit prevalue field");
    };

    $scope.delete = function (index) {
        $scope.model.value.fields.splice(index, 1);
    };

    function edit(field, title, callback) {

        var properties = [
            {
                alias: "key",
                label: "Key",
                description: "A unique key for the prevalue field.",
                value: field.key,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "label",
                label: "Label",
                description: "The user friendly label for the prevalue.",
                value: field.label,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "description",
                label: "Description",
                description: "A more detailed description for the user.",
                value: field.description,
                view: "textbox"
            },
            {
                alias: "view",
                label: "View",
                description: "The type of editor to use for this prevalue field.",
                value: field.view,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            }
        ];

        $scope.overlay = {
            view: "/App_Plugins/PackageManifests/Views/Overlays/Properties.html",
            show: true,
            properties: properties,
            title: title,
            submitButtonLabel: "Continue",
            closeButtonLabel: "Close",
            submit: function () {
                angular.forEach(properties, function (p) {
                    editor[p.alias] = p.value;
                });
                if (callback) callback(editor);
                $scope.overlay.show = false;
                $scope.overlay = null;
            }
        };

    }

});