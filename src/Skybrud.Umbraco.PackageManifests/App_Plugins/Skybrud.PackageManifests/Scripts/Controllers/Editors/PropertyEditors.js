﻿angular.module("umbraco").controller("PackageManifests.PropertyEditors.Controller", function ($scope) {

    $scope.addEditor = function () {
        edit({}, "Add property editor", function (e) {
            $scope.model.value.push(e);
        });
    };

    $scope.editEditor = function (editor) {
        edit(editor, "Edit property editor");
    };

    function edit(editor, title, callback) {

        var properties = [
            {
                alias: "alias",
                label: "Alias",
                description: "This must be a unique alias to your property editor.",
                value: editor.alias,
                view: "textbox",
                validation: {
                    mandatory: true
                }
            },
            {
                alias: "name",
                label: "Name",
                description: "The friendly name of the property editor, shown in the Umbraco backoffice.",
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
                value: editor.icon,
                view: "/App_Plugins/Skybrud.PackageManifests/Views/Editors/IconPicker.html"
            },
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
        ];

        $scope.overlay = {
            view: "/App_Plugins/Skybrud.PackageManifests/Views/Overlays/Properties.html",
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