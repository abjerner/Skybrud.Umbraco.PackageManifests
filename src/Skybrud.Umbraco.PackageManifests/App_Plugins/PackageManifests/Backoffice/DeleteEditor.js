angular.module('umbraco').controller('PackageManifests.DeleteEditor.Controller', function ($scope, $routeParams, $http, notificationsService, navigationService, treeService) {

    $scope.route = $routeParams;

    $scope.id = $scope.currentNode.id.split(',');
    $scope.name = $scope.currentNode.name;

    var baseUrl = '/umbraco/backoffice/PackageManifests/Manifests/';

    if ($scope.id.length == 3) {

        if ($scope.id[1] == 'propertyEditor') {
            $scope.type = 'property editor';
        } else if ($scope.id[1] == 'gridEditor') {
            $scope.type = 'grid editor';
        }

    }

    $scope.deletePropertyEditor = function () {

        //mark it for deletion (used in the UI)
        $scope.currentNode.loading = true;
        
        $http.delete(baseUrl + 'DeletePropertyEditor?packageAlias=' + $scope.id[0] + '&editorAlias=' + $scope.id[2]).success(function () {

            notificationsService.success('Property editor deleted', 'The property editor <strong>' + $scope.currentNode.name + '</strong> was successfully deleted.');

            $scope.currentNode.loading = false;

            //get the root node before we remove it
            var rootNode = treeService.getTreeRoot($scope.currentNode);

            //TODO: Need to sync tree, etc...
            treeService.removeNode($scope.currentNode);
            navigationService.hideMenu();

        });

    };

    $scope.cancel = function () {
        navigationService.hideDialog();
    };

});