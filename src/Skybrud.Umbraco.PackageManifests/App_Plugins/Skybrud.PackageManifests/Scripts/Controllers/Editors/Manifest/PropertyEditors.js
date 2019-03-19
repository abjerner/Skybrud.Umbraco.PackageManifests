angular.module("umbraco").controller("PackageManifests.PropertyEditors.Controller", function ($scope, editorService, overlayService) {

    $scope.addEditor = function () {
        edit({}, "Add property editor", function (e) {
            $scope.model.value.push(e);
        });
    };

    $scope.editEditor = function (editor) {
        edit(editor, "Edit property editor");
    };

    $scope.deleteEditor = function (index, editor) {
        overlayService.open({
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Delete.html",
            content: `Are you sure you wish to delete the property editor <strong>${editor.name}</strong>? Changes are not saved to the disk before you click the <strong>Save</strong> button.`,
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

        var data = {
            alias: editor.alias || "",
            name: editor.name || "",
            icon: editor.icon ? editor.icon : "icon-item-arrangement",
            properties: [
                {
                    alias: "group",
                    label: "Group",
                    description: "The group to place this editor in within the <strong>Select Editor</strong> dialog. Use a new group name or alternatively use an existing one such as <strong>Pickers</strong>.",
                    value: editor.group,
                    view: "textbox"
                },
                {
                    alias: "editor",
                    label: "Editor",
                    description: "",
                    value: editor.editor,
                    view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/PropertyEditorEditor.html"
                },
                {
                    alias: "prevalues",
                    label: "Prevalues",
                    description: "",
                    value: editor.prevalues,
                    view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/PropertyEditorPrevalues.html"
                }
            ]
        };

        editorService.open({
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

    }

});