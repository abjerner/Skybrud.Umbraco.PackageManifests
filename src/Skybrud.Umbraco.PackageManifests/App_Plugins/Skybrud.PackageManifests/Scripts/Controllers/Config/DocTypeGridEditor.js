angular.module("umbraco").controller("PackageManifests.Config.DocTypeGridEditor.Controller", function ($scope) {

    $scope.editJson = function() {

        var properties = [
            {
                alias: "config",
                label: "Config",
                hideLabel: true,
                value: $scope.model.value,
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Config/Json.html",
                config: {
                    rows: 30
                }
            }
        ];

        editProperties(properties, "Edit raw JSON");

    };

    $scope.editConfig = function () {

        var properties = [
            {
                alias: "allowedDocTypes",
                label: "Allowed document types",
                description: "An array of doc type aliases of which should be allowed to be selected in the grid editor.Strings can be REGEX patterns to allow matching groups of doc types in a single entry. Ie <code>Widget$</code> will match all doc types with an alias ending in <code>Widget</code>.",
                hideLabel: false,
                value: $scope.model.value.allowedDocTypes,
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Config/DocTypeGridEditorAllowedTypes.html"
            },
            {
                alias: "nameTemplate",
                label: "Name template",
                hideLabel: false,
                value: $scope.model.value.nameTemplate,
                view: "textbox"
            },
            {
                alias: "enablePreview",
                label: "Enable preview",
                description: "Enables rendering a preview of the grid cell in the grid editor.",
                hideLabel: false,
                value: $scope.model.value.enablePreview,
                view: "boolean"
            },
            {
                alias: "viewPath",
                label: "View path",
                description: "Sets an alternative view path for where the Doc Type Grid Editor should look for views when rendering. Defaults to <code>/Views/Partials/</code>.",
                hideLabel: false,
                value: $scope.model.value.viewPath,
                view: "textbox"
            },
            {
                alias: "previewViewPath",
                label: "Preview view path",
                hideLabel: false,
                value: $scope.model.value.previewViewPath,
                view: "textbox"
            },
            {
                alias: "previewCssFilePath",
                label: "Preview CSS file path",
                hideLabel: false,
                value: $scope.model.value.previewCssFilePath,
                view: "textbox"
            },
            {
                alias: "previewJsFilePath",
                label: "Preview JS path",
                hideLabel: false,
                value: $scope.model.value.previewJsFilePath,
                view: "textbox"
            }
        ];

        editProperties(properties, "Edit configuration");

    };

    function editProperties(properties, title) {
        $scope.overlay = {
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties.html",
            show: true,
            properties: properties,
            title: title,
            submitButtonLabel: "Continue",
            closeButtonLabel: "Close",
            submit: function () {
                $scope.overlay.show = false;
                $scope.overlay = null;
                angular.forEach(properties, function (p) {

                    if (p.alias === "allowedDocTypes") {

                        var temp = [];

                        if (Array.isArray(p.value)) {
                            angular.forEach(p.value, function(item) {
                                if (item) temp.push(item);
                            });
                        }

                        $scope.model.value[p.alias] = temp;

                    } else {

                        $scope.model.value[p.alias] = p.value;

                    }

                });
            }
        };
    }

});