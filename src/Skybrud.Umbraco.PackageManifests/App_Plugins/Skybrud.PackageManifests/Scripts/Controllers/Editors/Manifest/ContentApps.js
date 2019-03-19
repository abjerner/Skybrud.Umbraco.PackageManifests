angular.module("umbraco").controller("PackageManifests.ContentApps.Controller", function ($scope, editorService, overlayService) {

    $scope.add = function () {
        edit({}, "Add content app", function (e) {
            $scope.model.value.push(e);
        });
    };

    $scope.edit = function (contentApp) {
        edit(contentApp, "Edit content app");
    };

    $scope.delete = function (index, contentApp) {
        overlayService.open({
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Delete.html",
            content: `Are you sure you wish to delete the content app <strong>${contentApp.name}</strong>? Changes are not saved to the disk before you click the <strong>Save</strong> button.`,
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

    function edit(contentApp, title, callback) {

        var data = {
            alias: contentApp.alias,
            name: contentApp.name,
            icon: contentApp.icon ? contentApp.icon : "icon-item-arrangement",
            properties: [
                {
                    alias: "weight",
                    label: "Weight",
                    description: "Use values between -99 and +99 to appear between the existing Content (-100) and Info (100) apps.",
                    value: contentApp.weight,
                    view: "integer",
                    config: {
                        min: -99,
                        max: +99
                    }
                },
                {
                    alias: "view",
                    label: "View",
                    description: "The location of the view file.",
                    value: contentApp.view,
                    view: "textbox",
                    validation: {
                        mandatory: true
                    }
                },
                {
                    alias: "show",
                    label: "Show",
                    description: "Limit the content app to specific types or roles - eg. <code>+content/*</code> or <code>+role/admin</code>.",
                    value: contentApp.show,
                    view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Array.html",
                    config: {
                        addButtonLabel: "Add new rule"
                    }
                }
            ]
        };

        editorService.open({
            title: title,
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties2.html",
            data: data,
            submit: function (model) {

                editorService.close();

                contentApp.icon = model.icon;
                contentApp.name = model.name;
                contentApp.alias = model.alias;

                angular.forEach(model.properties, function (p) {
                    contentApp[p.alias] = p.value;
                });

                if (callback) callback(contentApp);

            },
            close: function () {
                editorService.close();
            }
        });

    }

});