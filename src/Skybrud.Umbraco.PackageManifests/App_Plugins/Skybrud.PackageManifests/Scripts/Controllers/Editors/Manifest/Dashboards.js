angular.module("umbraco").controller("PackageManifests.Dashboards.Controller", function ($scope, editorService, overlayService) {

    $scope.add = function () {
        edit({
            alias: "",
            view: "",
            sections: [],
            weight: 100
        }, "Add dashboard", function (e) {
            $scope.model.value.push(e);
        });
    };

    $scope.edit = function (dashboard) {
        edit(dashboard, "Edit dashboard");
    };

    $scope.delete = function (index, dashboard) {
        overlayService.open({
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Delete.html",
            content: `Are you sure you wish to delete the dashboard <strong>${dashboard.alias}</strong>? Changes are not saved to the disk before you click the <strong>Save</strong> button.`,
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

    function edit(dashboard, title, callback) {

        var properties = [
            {
                alias: "alias",
                label: "Alias",
                description: "The alias of the dashboard which can be queried via Dashboard Service API.",
                value: dashboard.alias,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "view",
                label: "View",
                description: "This is the full path to the HTML view for your dashboard.",
                value: dashboard.view,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "sections",
                label: "Sections",
                description: "A list of section/application aliases that the dashboard should be visible in.",
                value: dashboard.sections,
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Sections/Picker.html",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "weight",
                label: "Weight",
                description: "The weight (sort order) of the dashboard. Defaults to 100 if not specified.",
                value: dashboard.weight,
                view: "integer"
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
                    dashboard[p.alias] = p.value;
                });

                if (callback) callback(dashboard);

            },
            close: function () {
                editorService.close();
            }
        });

    }

});