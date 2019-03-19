angular.module("umbraco").controller("PackageManifests.Sections.Controller", function ($scope, editorService, overlayService) {

    $scope.add = function () {
        edit({}, "Add section", function (e) {
            $scope.model.value.push(e);
        });
    };

    $scope.edit = function (section) {
        edit(section, "Edit section");
    };

    $scope.delete = function(index, section) {
        overlayService.open({
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Delete.html",
            content: `Are you sure you wish to delete the section <strong>${section.name}</strong>? Changes are not saved to the disk before you click the <strong>Save</strong> button.`,
            submitButtonLabel: "Confirm",
            closeButtonLabel: "Cancel",
            submit: function () {
                $scope.model.value.splice(index, 1);
                overlayService.close();
            },
            close: function () {
                overlayService.close();
            }
        });
    };

    function edit(section, title, callback) {

        var properties = [
            {
                alias: "alias",
                label: "Alias",
                description: "The alias of the section/application which can be queried via Section Service API.",
                value: section.alias,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "name",
                label: "Name",
                description: "The friendly name of the section/application, shown in the Umbraco backoffice.",
                value: section.name,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            }
        ];

        var data = {
            properties: properties
        };

        editorService.open({
            title: title,
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties2.html",
            data: data,
            submit: function (model) {

                editorService.close();

                angular.forEach(model.properties, function (p) {
                    section[p.alias] = p.value;
                });

                if (callback) callback(section);

            },
            close: function () {
                editorService.close();
            }
        });

    }

});