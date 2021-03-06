// Generated by CoffeeScript 1.6.3
var CurriculaView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CurriculaView = (function(_super) {
  __extends(CurriculaView, _super);

  function CurriculaView() {
    _ref = CurriculaView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CurriculaView.prototype.events = {
    'click .import': 'gotoImport',
    'click .back': 'goBack'
  };

  CurriculaView.prototype.goBack = function() {
    return history.back();
  };

  CurriculaView.prototype.gotoImport = function() {
    return Tangerine.router.navigate("curriculum/import", true);
  };

  CurriculaView.prototype.initialize = function(options) {
    this.subView = new CurriculaListView({
      curricula: options.curricula
    });
    this.subView.on("render", this.render);
    return this.subView.render();
  };

  CurriculaView.prototype.render = function() {
    this.$el.html("    <button class='back navigation'>" + (t('back')) + "</button>    <h2>" + (t('loaded curricula')) + "</h2>    <button class='command import'>" + (t('import')) + "</button>    <br>    <div id='klass_list'></div>    ");
    this.$el.find('#klass_list').append(this.subView.el);
    return this.trigger("rendered");
  };

  return CurriculaView;

})(Backbone.View);
