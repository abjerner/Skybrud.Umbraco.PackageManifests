angular.module("umbraco").controller("PackageManifests.PropertyEditorPrevalues.Controller", function($scope, editorService) {

    if (!$scope.model.value) {
        $scope.model.value = {};
    }

    if (!Array.isArray($scope.model.value.fields)) {
        $scope.model.value.fields = [];
    }

    $scope.add = function () {
        edit({}, "Add prevalue field", function (e) {
            $scope.model.value.fields.push(e);
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

        var data = {
            hideIcon: true,
            properties: properties
        };

        editorService.open({
            title: title,
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties2.html",
            data: data,
            submit: function (model) {
                angular.forEach(model.properties, function (p) {
                    field[p.alias] = p.value;
                });
                if (callback) callback(field);
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        });

    }

});