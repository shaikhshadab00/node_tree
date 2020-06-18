<div>
    <!--Header-->
    <div class="modal-header alert alert-warning">
        <h3 class="modal-title">{{deleteTitle}}</h3>
        <p>{{body}}</p>
    </div>
    <!--OK and Cancel buttons-->
    <div class="modal-footer">
        <button class="btn" ng-click="close()">
            <i class="glyphicon glyphicon-remove"></i>
            CANCEL
        </button>
        <button class="btn btn-success" ng-click="confirm(this)">
            <i class="glyphicon glyphicon-ok"></i>
            CONFIRM
        </button>
    </div>
</div>