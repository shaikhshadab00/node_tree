(function($) {
    Drupal.behaviors.node_tree = {
        attach: function(context, settings) {
	    var basePath = Drupal.settings.basePath;
	    // Created custom module for tree formatted node representation.
	    var app = angular.module('angularNodeTreeModule', ['ui.tree', 'ngRoute', 'ngDialog'])
		.controller('NodeTreeCtlr',
			    ['$scope', '$window', '$http', '$route', 'ngDialog', '$controller',
			     function($scope, $window, $http, $route, ngDialog, $controller) {
				 // Get hidden field value (i.e. nid) of tree container.
				 var tree_container_nid = $('#tree-container-nid').val();
				 // Draw tree if container have tree node present.
				 if ($('#tree-container-nid').val().length) {
				     // Parameter and url called on page load.
				     var url = "node-tree-form-json-ajax/" + tree_container_nid;

				     // Draw the tree on form of nodes.
                                     $http.get(url).then(function(response) {
                                         var add_form = '';
                                         var delete_form = '';
					 // Ajax callback to get form add new node.
					 $http.get(basePath + "node-tree-add-node-form-ajax").success(function(data, status, headers, config) {
					     add_form = data;
					 }).
					     error(function(data, status, headers, config) {
						 console.log("There is some error during node add form generation.");
					     });
					 // Ajax callback to get node delete confirmation form.
					 $http.get(basePath + "node-tree-delete-node-form-ajax").success(function(data, status, headers, config) {
					    delete_form = data;
					 }).
					     error(function(data, status, headers, config) {
						 console.log("There is some error during node delete confirmation form generation.");
					     });
					 // Added toggle function for expand and collapse.
					 $scope.toggle = function(scope) {
					     scope.toggle();
					 };
					 // Store tree structure in a json format.
					 $scope.json_nodes = response.data.nodes;
					 // console.log($scope.json_nodes);
					 // Save button hide/show depends on root nid.
					 $scope.isValid = function() {
					     var root_tree_nid = $scope.json_nodes.nid;
					     if (typeof root_tree_nid === "undefined") {
						 return false;
					     }
					     return true;
					 } // End of Save button hide/show.
					 // Converting json data to array formate.
					 $scope.nodes = [$scope.json_nodes];
					 // "Save Tree" button event function for saving order of tree in backend.
					 $scope.saveTreeOrder = function() {
					     var url = 'node-tree-save-tree-position-ajax';
					     var parameter = JSON.stringify({nodes: $scope.nodes});

					     // Ajax call for saving hierarchy of node.
					     $http.post(url, parameter).
						 success(function(data, status, headers, config) {
						     // Reload page once node updated
						     $window.location.reload();
						     // console.log(data);
						 }).
						 error(function(data, status, headers, config) {
						     console.log(data);
						 });
					 } // End of Save Tree

					 // Function call for add new sub tree node form parent content type.
					 $scope.clickToAddNode = function(scope) {
					     var nodeData = scope.$modelValue;
					     // Angularjs dialogbox initialisation for add new node.
					     console.log(nodeData);
					     var dialog = ngDialog.open({
						 template: add_form,
						 plain: 'true',
						 showClose: 'true',
						 closeByDocument: false,
						 scope: $scope,
						 // Define controller to pass a data in template for add a new node.
						 controller: $controller('addNodeCtrl', {
                                                     $scope: $scope,
                                                     $route: $route,
                                                     $window: $window,
                                                     nid: nodeData.nid,
						     type: nodeData.type,
						     rootTreeFieldName: nodeData.root_tree_field_name,
						     subTreeFieldName: nodeData.sub_tree_field_name,
                                                 })
					     });

					     // Add node function for close button of angular dialog box.
					     $scope.close = function(scope) {
						 $('#add-item-title').removeAttr('required');
						 dialog.close();
					     };

					     // Add node Function for save button of angular dialog box.
					     $scope.save = function(scope) {
						 var title_length = $.trim($('#add-item-title').val()).length;
						 // Validation title before ajax call.
						 if (title_length == 0) {
						     $('#add-item-title').attr('required', 'true');
						 }
						 else {
						     scope.buttonDisabled = true;
						     // Url for save node ajax call.
						     var url = 'node-tree-save-node-ajax';
						     // Pass parameter which are present in addNodeCtrl for node creation.
						     var parameter = JSON.stringify({
							 pnid: scope.nid,
							 title: scope.addTitle,
							 type: scope.type,
							 rootTreeFieldName: scope.rootTreeFieldName,
							 subTreeFieldName: scope.subTreeFieldName,
						     });
						     // Ajax post method for save node ajax call.

						     $http.post(url, parameter).
							 success(function(data, status, headers, config) {
							     // Reload page once node updated
							     $window.location.reload();
							     // $route.reload();
							     console.log(data);
							 }).
							 error(function(data, status, headers, config) {
							     scope.buttonDisabled = false;
							     dialog.close();
							     console.log(data);
							 });
						 }
					     }
					 }; // End of Add new node call.

					 // Delete node from backend.
					 $scope.clickToDeleteNode = function(scope) {
					     var nodeData = scope.$modelValue;
					     // Angularjs dialogbox initialisation for delete node.
					     console.log(nodeData);
					     var dialog = ngDialog.open({
						 template: delete_form,
						 plain: 'true',
						 showClose: 'true',
						 closeByDocument: false,
						 scope: $scope,
						// Define controller to pass data in template for a delete node.
						 controller: $controller('deleteNodeCtrl', {
						     $scope: $scope,
						     pnid: nodeData.pnid,
						     nid: nodeData.nid,
						     type: nodeData.type,
						     rootTreeFieldName: nodeData.root_tree_field_name,
                                                     deleteTitle: nodeData.title,
						     subTreeFieldName: nodeData.sub_tree_field_name,
						 })
					     });
					     // Delete node function call on close button of update form.
					     $scope.close = function() {
						 dialog.close();
					     };

					     // Delete node function call on save button of update form.
					     $scope.confirm = function(scope) {
						 // Url and parameter for ajax call for node delete.
						 var url = 'node-tree-delete-node-ajax';
						 // Pass parameter which are present in deleteNodeCtrl for delete node.
						 var parameter = JSON.stringify({
						     nid: scope.nid,
						     pnid: scope.pnid,
						     type: scope.type,
						     rootTreeFieldName: scope.rootTreeFieldName,
						     subTreeFieldName: scope.subTreeFieldName,
						 });
						 // Post method of ajax call for node delete.
						 $http.post(url, parameter).
						     success(function(data, status, headers, config) {
							 if (data == 'deleted') {
							     // Reload page once node updated
							     $window.location.reload();
							     // $route.reload();
							     console.log('node '+data);
							 }
						     }).
						     error(function(data, status, headers, config) {
							 console.log(data);
						     });
					     }
					 }; // End of Delete node call.

					 // Update node of content type.
					 $scope.clickToUpdateNode = function(scope) {
					     // nodeData is a detail of node which need to update.
					     var nodeData = scope.$modelValue;
					     console.log(nodeData);
					     // Open new window to edit node form
					     window.open(basePath + 'node/'+nodeData.nid+'/edit', "_blank");
					 }; // End of update node.
				     });
				 }
			     }]);

	    // Controller for Add node.
	    app.controller('addNodeCtrl', function($scope, nid, type, rootTreeFieldName, subTreeFieldName) {
		$scope.nid = nid;
		$scope.type = type;
		$scope.rootTreeFieldName = rootTreeFieldName;
		$scope.subTreeFieldName = subTreeFieldName;
	    });

	    // Controller for delete node.
	    app.controller('deleteNodeCtrl', function($scope, pnid, nid, type, rootTreeFieldName, deleteTitle, subTreeFieldName) {
		$scope.pnid = pnid;
		$scope.nid = nid;
		$scope.type = type;
		$scope.rootTreeFieldName = rootTreeFieldName;
		$scope.deleteTitle = 'Delete ' + deleteTitle;
		$scope.body = 'This action cannot be undone.';
		$scope.subTreeFieldName = subTreeFieldName;
	    });

	    // Initialize and start angular App.
	    angular.bootstrap($('#node-tree-app'), ['angularNodeTreeModule']);
	}
    };
})(jQuery);
