// Generated by CoffeeScript 1.6.3
var GridPrintView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GridPrintView = (function(_super) {
  __extends(GridPrintView, _super);

  function GridPrintView() {
    _ref = GridPrintView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  GridPrintView.prototype.initialize = function(options) {
    this.model = this.options.model;
    return this.parent = this.options.parent;
  };

  GridPrintView.prototype.className = "grid_prototype";

  GridPrintView.prototype.render = function() {
    var fields,
      _this = this;
    fields = "autostop    captureAfterSeconds    captureItemAtTime    columns    endOfLine    fontSize    layoutMode    order    randomize    timer    variableName";
    fields = fields.split(/\ +/);
    this.$el.html("      Properties:<br/>      <table>      " + (_.map(fields, function(field) {
      return "<tr><td>" + field + "</td><td>" + (_this.model.get(field)) + "</td></tr>";
    }).join("")) + "      </table>      Items:<br/>      " + (_.map(this.model.get("items"), function(item) {
      return item;
    }).join(", ")) + "    ");
    return this.trigger("rendered");
  };

  return GridPrintView;

})(Backbone.View);
