angular.module("umbraco").controller("Skybrud.PackageManifests.CreateManifest.Controller", function ($scope, $http, notificationsService, navigationService) {

	var vm = this;

	vm.alias = "";

	var baseUrl = "/umbraco/backoffice/Skybrud/PackageManifests/";

	vm.createManifest = function () {

		vm.error = null;

		$http.put(baseUrl + "CreateManifest?packageAlias=" + vm.alias).success(function () {
			navigationService.hideMenu();
			notificationsService.success("Manifest created", "The package.manifest file for <strong>" + vm.alias + "</strong> was successfully created.");

			navigationService.syncTree({ tree: "packageManifests", path: vm.alias });

		}).error(function (err) {
			vm.error = err;
		});

	};

});