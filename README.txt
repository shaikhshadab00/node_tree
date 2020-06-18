Node Tree module:
------------------------
Requires - Drupal 7


Overview:
--------
Node tree module is a customizable tree for entity type node.
This module allows for integration of angularJS ui tree into Drupal entity type node tree.



Features:
---------

The Node tree module:

* Make any content type as tree container and nodes of the tree.
* Display nodes into tree format.
* Change existing postion of tree into new position.
* Create child node under the parent node.
* Delete and update node.

Installation:
------------
1. Download and unpack the angularJs in "sites/all/libraries".
    Make sure the path to the plugin file becomes:
    "sites/all/libraries/angularjs/angular.js"
    "sites/all/libraries/angularjs/angular-sanitize.min.js"
    "sites/all/libraries/angularjs/angular-route.js"
    Link: https://angularjs.org/
2. Download and unpack the ngDialog in "sites/all/libraries".
    Make sure the path to the plugin file becomes:
    "sites/all/libraries/ngDialog/js/ngDialog.js"
    "sites/all/libraries/ngDialog/css/ngDialog.min.css"
    "sites/all/libraries/ngDialog/css/ngDialog-theme-default.min.css"
    Link: https://github.com/likeastore/ngDialog
3. Download and unpack the angular ui tree in "sites/all/libraries".
    Make sure the path to the plugin file becomes:
    "sites/all/libraries/angular-ui-tree/dist/angular-ui-tree.js"
    "sites/all/libraries/angular-ui-tree/dist/angular-ui-tree.js"
    Link: https://github.com/angular-ui-tree/angular-ui-tree
4. Go to "Administer" -> "Modules" and enable the Node tree module.


Configuration:
-------------
* Go to "structure" -> "types" -> "content types" -> "YOUR_CONTENT_TYPE" -> "edit" find
  "Node Tree child options" select child content type.
* YOUR_CONTENT_TYPE become tree container(which hold the node tree struture) and selected content type as a tree nodes.
* Only one root node are allowed in the tree.
* In node tree container give reference of the root node.
* To View Tree url:BASE_URL/node-tree/[tree_container_node_nid].
