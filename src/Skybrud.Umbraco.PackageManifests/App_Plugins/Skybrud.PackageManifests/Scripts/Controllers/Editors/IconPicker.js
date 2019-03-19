angular.module("umbraco").controller("PackageManifests.IconPicker.Controller", function ($scope, editorService) {
    $scope.open = function () {
        var value = $scope.model.value + " ";
        editorService.iconPicker({
            icon: value.split(" ")[0],
            color: value.split(" ")[1],
            submit: function (model) {
                $scope.model.value = model.icon + (model.color ? ` ${model.color}` : "");
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        });
    };
});