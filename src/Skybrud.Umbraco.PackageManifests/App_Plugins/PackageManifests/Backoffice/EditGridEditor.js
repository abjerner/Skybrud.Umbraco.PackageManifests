angular.module("umbraco").controller("PackageManifests.EditGridEditor.Controller", function ($scope) {

    $scope.properties = [
        {
            alias: "alias",
            label: "Alias",
            description: "This must be a unique alias to your grid editor.",
            hideLabel: false,
            value: $scope.model.editor.alias,
            view: "textbox",
            validation: {
                mandatory: true
            }
        },
        {
            alias: "name",
            label: "Name",
            description: "The friendly name of the grid editor, shown in the Umbraco backoffice.",
            hideLabel: false,
            value: $scope.model.editor.name,
            view: "textbox",
            validation: {
                mandatory: true
            }
        },
        {
            alias: "icon",
            label: "Icon",
            description: "A CSS class for the icon to be used in the <strong>Select Editor</strong> dialog eg: <code>icon-autofill</code>.",
            hideLabel: false,
            value: $scope.model.editor.icon,
            view: "textbox"
        },
        {
            alias: "view",
            label: "View",
            description: "This is backoffice HTML view for your grid editor. Either refers to one of the built-in view (textstring, rte, embed, macro, media) or the full path to a custom view eg.: <code>~/App_Plugins/FolderName/editor.html</code>.",
            hideLabel: false,
            value: $scope.model.editor.view,
            view: "textbox",
            validation: {
                mandatory: true
            }
        },
        {
            alias: "render",
            label: "Render",
            description: "This is front end razor view for your grid editor. Accepts full path to a custom view eg.: <code>~/App_Plugins/FolderName/editor.cshtml</code>.",
            hideLabel: false,
            value: $scope.model.editor.render ? $scope.model.editor.render : "",
            view: "textbox"
        },
        {
            alias: "config",
            label: "Config",
            description: "Configuration for the grid editor.",
            hideLabel: false,
            value: $scope.model.editor.config ? $scope.model.editor.config : "",
            view: "/App_Plugins/PackageManifests/Views/Json.html"
        }
    ];

    $scope.$watch(function () {
        return $scope.properties;
    }, function (array) {
        var m = {};
        angular.forEach(array, function (property) {
            m[property.alias] = property.value;
        });
        $scope.model.editor = m;
    }, true);

});