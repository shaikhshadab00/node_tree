<div id='node-tree-app'>
  <div ng-controller="NodeTreeCtlr">
    <!-- Nested node template -->
    <script type="text/ng-template" id="nodes_renderer.html">
      <div ui-tree-handle ng-if="node.nodes" class="tree-node tree-node-content ng-scope ng-binding angular-ui-tree-handle">
        <a class="btn btn-info btn-sm" title="Toggle" style="margin-right:5px;" ng-if="node.nodes && node.nodes.length > 0" data-nodrag ng-click="toggle(this)">
          <span class="glyphicon" ng-class="{'glyphicon-chevron-right': collapsed, 'glyphicon-chevron-down': !collapsed}"></span>
        </a>
          {{node.title}} ({{node.nid}})
        <a class="pull-right btn btn-danger btn-xs" title="Delete" style="margin-right:5px;" ng-if="node.nodes.length == 0" data-nodrag ng-click="clickToDeleteNode(this)">
          <span class="glyphicon glyphicon-remove"></span>
        </a>
        <a class="pull-right btn btn-warning btn-xs" title="Edit" style="margin-right:5px;" data-nodrag ng-click="clickToUpdateNode(this)" style="margin-right: 8px;">
          <span class="glyphicon glyphicon-edit"></span>
        </a>
        <a class="pull-right btn btn-primary btn-xs" title="Add" style="margin-right:5px;" data-nodrag ng-click="clickToAddNode(this)" style="margin-right: 8px;">
          <span class="glyphicon glyphicon-plus"></span>
        </a>
      </div>
      <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
        <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'"></li>
      </ol>
    </script>
    <div class="row">
      <div class="col-sm-12">
        <div ui-tree  callbacks="options">
          <ol ui-tree-nodes="" ng-model="nodes" id="tree-root">
            <li ng-repeat="node in nodes" ui-tree-node ng-include="'nodes_renderer.html'"></li>
          </ol>
          <!-- Save node Tree button for saving order of tree nodes. -->
          <button ng-show="isValid()" type="button" id="save-tree-order" class="btn btn-success" ng-click="saveTreeOrder()">
            <span class="glyphicon glyphicon-check"></span>
             Save Tree Order
          </button>
        </div>
      </div>
    </div>
  </div>
</div>