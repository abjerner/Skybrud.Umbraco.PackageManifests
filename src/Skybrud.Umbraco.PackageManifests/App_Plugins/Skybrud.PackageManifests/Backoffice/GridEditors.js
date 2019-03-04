angular.module("umbraco").controller("PackageManifests.GridEditors.Controller", function ($scope, $http) {

    $scope.templateGroups = [];

    $scope.addEditor = function () {
        if ($scope.templateGroups.length === 0) {
            add({
                name: "",
                alias: "",
                icon: "",
                view: "",
                render: ""
            });
        } else if ($scope.templateGroups.length === 1 && $scope.templateGroups[0].templates.length === 1) {
            add($scope.templateGroups[0].templates[0]);
        } else {
            $scope.overlay = {
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/AddGridEditor.html",
                show: true,
                templateGroups: $scope.templateGroups,
                title: "Select grid editor template",
                submitButtonLabel: "Continue",
                closeButtonLabel: "Close",
                submit: function (model) {
                    $scope.overlay.show = false;
                    $scope.overlay = null;
                    add(model.editor);
                }
            };
        }
    };

    function add(editor) {
        edit(editor, "Add grid editor", function (e) {
            $scope.model.value.push(e);
        });
    }

    $scope.editEditor = function (editor) {
        edit(editor, "Edit grid editor");
    };

    $scope.deleteEditor = function (index) {
        $scope.model.value.splice(index, 1);
    };

    function edit(editor, title, callback) {

        var view = {
            alias: "view",
            label: "View",
            description: "This is backoffice HTML view for your grid editor. Either refers to one of the built-in view (textstring, rte, embed, macro, media) or the full path to a custom view eg.: <code>~/App_Plugins/FolderName/editor.html</code>.",
            hideLabel: false,
            value: editor.view,
            view: "textbox",
            validation: {
                mandatory: true
            }
        };

        var config = {
            alias: "config",
            label: "Config",
            description: "Configuration for the grid editor.",
            hideLabel: false,
            value: editor.config ? editor.config : "",
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Config.html",
            editorView: view.value
        };

        var properties = [
            {
                alias: "alias",
                label: "Alias",
                description: "This must be a unique alias to your grid editor.",
                hideLabel: false,
                value: editor.alias,
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
                value: editor.name,
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
                value: editor.icon ? editor.icon : "icon-item-arrangement",
                view: "/App_Plugins/Skybrud.PackageManifests/Views/IconPicker.html"
            },
            view,
            {
                alias: "render",
                label: "Render",
                description: "This is front end razor view for your grid editor. Accepts full path to a custom view eg.: <code>~/App_Plugins/FolderName/editor.cshtml</code>.",
                hideLabel: false,
                value: editor.render ? editor.render : "",
                view: "textbox"
            },
            config
        ];

        $scope.$watch(function () {
            return view.value;
        }, function (view) {

            view = view.split("?")[0];

            // Do we have a matching template specifying a configh view?
            for (var i = 0; i < $scope.templateGroups.length; i++) {
                for (var j = 0; j < $scope.templateGroups[i].templates.length; j++) {
                    var item = $scope.templateGroups[i].templates[j];
                    if (view === item.view && item.config) {
                        config.view = item.config;
                        return;
                    }
                }
            }

            // Fallback to tdefault config view
            config.view = "/App_Plugins/Skybrud.PackageManifests/Views/Config/Json.html";

        }, true);

        $scope.overlay = {
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties.html",
            show: true,
            properties: properties,
            title: title,
            submitButtonLabel: "Continue",
            closeButtonLabel: "Close",
            submit: function () {
                angular.forEach(properties, function(p) {
                    editor[p.alias] = p.value;
                });
                if (callback) callback(editor);
                $scope.overlay.show = false;
                $scope.overlay = null;
            }
        };
    }

    $http.get("/umbraco/backoffice/Skybrud.PackageManifests/Manifests/GetGridEditorTemplates").success(function(res) {
        $scope.templateGroups = res;
    });

});