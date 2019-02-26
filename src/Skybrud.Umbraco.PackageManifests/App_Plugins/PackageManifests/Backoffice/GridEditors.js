angular.module("umbraco").controller("PackageManifests.GridEditors.Controller", function ($scope) {

    $scope.addEditor = function() {

        var editor = {
            name: "",
            alias: "",
            icon: "",
            view: "",
            render: ""
        };

        edit(editor, "Add grid editor", function(e) {
            $scope.model.value.push(e);
        });

    };

    $scope.editEditor = function (editor) {
        edit(editor, "Edit grid editor", function (e) {
            editor.alias = e.alias;
            editor.name = e.name;
            editor.icon = e.icon;
            editor.view = e.view;
            editor.render = e.render ? e.render : "";
            editor.config = e.config ? e.config : null;
        });
    };

    $scope.deleteEditor = function (index) {
        $scope.model.value.splice(index, 1);
    };

    function edit(editor, title, callback) {
        $scope.overlay = {
            view: "/App_Plugins/PackageManifests/Views/Overlays/EditGridEditor.html",
            show: true,
            editor: editor,
            title: title,
            width: "800px",
            submitButtonLabel: "Continue",
            submit: function (model) {
                callback(model.editor);
                $scope.overlay.show = false;
                $scope.overlay = null;
            }
        };
    }

});