<div class="item-header">
  <h2>Add {{addTitle}}</h2>
  <form class="item-body">
    <div class="item-detail">
      <div class="form-group">
        <label for="add-item-title">Title:</label>
        <input type="text"  ng-model="addTitle" class="form-control" id="add-item-title" />
      </div>
    <div class="item-detail-update">
      <input type="submit" ng-click="save(this)" class="btn btn-primary" ng-disabled="buttonDisabled"/>
      <button ng-click="close(this)" class="btn" >close</button>
    </div>
  </form>
</div>
