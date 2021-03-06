// Generated by CoffeeScript 1.6.3
var Assessments, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Assessments = (function(_super) {
  __extends(Assessments, _super);

  function Assessments() {
    _ref = Assessments.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Assessments.prototype.model = Assessment;

  Assessments.prototype.url = 'assessment';

  Assessments.prototype.comparator = function(model) {
    return model.get("name");
  };

  Assessments.prototype.initialize = function(options) {
    if (options != null ? options.group : void 0) {
      return this.group = options.group;
    }
  };

  return Assessments;

})(Backbone.Collection);
