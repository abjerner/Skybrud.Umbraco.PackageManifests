angular.module("umbraco").controller("PackageManifests.GridEditors.Controller", function ($scope, $http, editorService, overlayService) {

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
            editorService.open({
                title: "Select grid editor template",
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/AddGridEditor.html",
                size: "small",
                templateGroups: $scope.templateGroups,
                submit: function (model) {
                    editorService.close();
                    add(angular.copy(model.editor));
                },
                close: function () {
                    editorService.close();
                }
            });
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

    $scope.deleteEditor = function (index, editor) {
        overlayService.open({
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Delete.html",
            content: `Are you sure you wish to delete the grid editor <strong>${editor.name}</strong>? Changes are not saved to the disk before you click the <strong>Save</strong> button.`,
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

        var render = {
            alias: "render",
            label: "Render",
            description: "This is front end razor view for your grid editor. Accepts full path to a custom view eg.: <code>~/App_Plugins/FolderName/editor.cshtml</code>.",
            hideLabel: false,
            value: editor.render ? editor.render : "",
            view: "textbox"
        };

        var config = {
            alias: "config",
            label: "Config",
            description: "Configuration for the grid editor.",
            hideLabel: false,
            value: editor.config ? editor.config : "",
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Config.html",
            editorView: view.value
        };

        var data = {
            alias: editor.alias,
            name: editor.name,
            icon: editor.icon ? editor.icon : "icon-item-arrangement",
            properties: [ view, render, config ]
        };

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
            config.view = "/App_Plugins/Skybrud.PackageManifests/Views/Editors/Config/Json.html";

        }, true);




        editorService.open({
            title: title,
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties2.html",
            data: data,
            submit: function (model) {

                editorService.close();

                editor.icon = model.icon;
                editor.name = model.name;
                editor.alias = model.alias;

                angular.forEach(model.properties, function (p) {
                    editor[p.alias] = p.value;
                });

                if (callback) callback(editor);

            },
            close: function () {
                editorService.close();
            }
        });






        //$scope.overlay = {
        //    view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties.html",
        //    show: true,
        //    properties: properties,
        //    title: title,
        //    submitButtonLabel: "Continue",
        //    closeButtonLabel: "Close",
        //    submit: function () {
        //        angular.forEach(properties, function(p) {
        //            editor[p.alias] = p.value;
        //        });
        //        if (callback) callback(editor);
        //        $scope.overlay.show = false;
        //        $scope.overlay = null;
        //    }
        //};
    }

    $http.get("/umbraco/backoffice/Skybrud/PackageManifests/GetGridEditorTemplates").then(function(res) {
        $scope.templateGroups = res.data;
    });

});