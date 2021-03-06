// Generated by CoffeeScript 1.6.3
var Assessment, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Assessment = (function(_super) {
  __extends(Assessment, _super);

  function Assessment() {
    this.updateFromServer = __bind(this.updateFromServer, this);
    this.fetch = __bind(this.fetch, this);
    _ref = Assessment.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Assessment.prototype.url = 'assessment';

  Assessment.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.subtests = new Subtests;
  };

  Assessment.prototype.fetch = function(options) {
    var oldSuccess,
      _this = this;
    oldSuccess = options.success;
    options.success = function(model) {
      var allSubtests;
      allSubtests = new Subtests;
      return allSubtests.fetch({
        key: _this.id,
        success: function(collection) {
          _this.subtests = collection;
          _this.subtests.maintainOrder();
          return typeof oldSuccess === "function" ? oldSuccess(_this) : void 0;
        }
      });
    };
    return Assessment.__super__.fetch.call(this, options);
  };

  Assessment.prototype.updateFromServer = function(dKey) {
    var dKeys,
      _this = this;
    if (dKey == null) {
      dKey = this.id.substr(-5, 5);
    }
    this.trigger("status", "import lookup");
    dKeys = JSON.stringify(dKey.replace(/[^a-f0-9]/g, " ").split(/\s+/));
    $.ajax("" + Tangerine.config.address.cloud.host + ":" + Tangerine.config.address.port + "/" + Tangerine.db_name + "/_design/" + Tangerine.design_doc + "/_view/byDKey", {
      type: "POST",
      dataType: "jsonp",
      data: {
        keys: dKeys
      },
      success: function(data) {
        var datum, docList, _i, _len, _ref1;
        docList = [];
        _ref1 = data.rows;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          datum = _ref1[_i];
          docList.push(datum.id);
        }
        if (data.rows.length === 0) {
          _this.trigger("status", "import empty");
        }
        if (data.rows.length !== 0) {
          return $.couch.replicate(Tangerine.config.address.cloud.host + "/" + Tangerine.config.address.cloud.dbName, Tangerine.config.address.local.dbName, {
            success: function() {
              return _this.trigger("status", "import success");
            },
            error: function(a, b) {
              return _this.trigger("status", "import error", "" + a + " " + b);
            }
          }, {
            doc_ids: docList
          });
        }
      }
    });
    return false;
  };

  Assessment.prototype.duplicate = function(assessmentAttributes, subtestAttributes, questionAttributes, callback) {
    var newId, newModel, originalId, questions,
      _this = this;
    originalId = this.id;
    newModel = this.clone();
    newModel.set(assessmentAttributes);
    newId = Utils.guid();
    newModel.set({
      "_id": newId,
      "assessmentId": newId
    });
    newModel.save(null, {
      "wait": true
    });
    questions = new Questions;
    return questions.fetch({
      key: this.id,
      success: function(questions) {
        var subtests;
        subtests = new Subtests;
        return subtests.fetch({
          key: originalId,
          success: function(subtests) {
            var filteredSubtests, gridId, i, model, newQuestion, newQuestions, newSubtest, newSubtestId, newSubtests, oldId, question, subtestIdMap, _i, _j, _k, _len, _len1, _len2, _ref1;
            filteredSubtests = subtests.models;
            subtestIdMap = {};
            newSubtests = [];
            for (i = _i = 0, _len = filteredSubtests.length; _i < _len; i = ++_i) {
              model = filteredSubtests[i];
              newSubtest = model.clone();
              newSubtest.set("assessmentId", newModel.id);
              newSubtestId = Utils.guid();
              subtestIdMap[newSubtest.id] = newSubtestId;
              newSubtest.set("_id", newSubtestId);
              newSubtests.push(newSubtest);
            }
            for (i = _j = 0, _len1 = newSubtests.length; _j < _len1; i = ++_j) {
              model = newSubtests[i];
              gridId = model.get("gridLinkId");
              if ((gridId || "") !== "") {
                model.set("gridLinkId", subtestIdMap[gridId]);
              }
              model.save();
            }
            newQuestions = [];
            _ref1 = questions.models;
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              question = _ref1[_k];
              newQuestion = question.clone();
              oldId = newQuestion.get("subtestId");
              newQuestion.set("assessmentId", newModel.id);
              newQuestion.set("_id", Utils.guid());
              newQuestion.set("subtestId", subtestIdMap[oldId]);
              newQuestions.push(newQuestion);
              newQuestion.save();
            }
            return callback();
          }
        });
      }
    });
  };

  Assessment.prototype.destroy = function() {
    var assessmentId, questions, subtests;
    assessmentId = this.id;
    subtests = new Subtests;
    subtests.fetch({
      key: assessmentId,
      success: function(collection) {
        var _results;
        _results = [];
        while (collection.length !== 0) {
          _results.push(collection.pop().destroy());
        }
        return _results;
      }
    });
    questions = new Questions;
    questions.fetch({
      key: this.id,
      success: function(collection) {
        var _results;
        _results = [];
        while (collection.length !== 0) {
          _results.push(collection.pop().destroy());
        }
        return _results;
      }
    });
    return Assessment.__super__.destroy.call(this);
  };

  return Assessment;

})(Backbone.Model);
