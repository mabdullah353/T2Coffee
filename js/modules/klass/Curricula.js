// Generated by CoffeeScript 1.6.3
var Curricula, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Curricula = (function(_super) {
  __extends(Curricula, _super);

  function Curricula() {
    _ref = Curricula.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Curricula.prototype.url = "curriculum";

  Curricula.prototype.model = Curriculum;

  return Curricula;

})(Backbone.Collection);
