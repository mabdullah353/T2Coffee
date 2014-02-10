// Generated by CoffeeScript 1.6.3
var Resultd;

Resultd = Backbone.View.extend({
  id: 'graph',
  initialize: function(id) {
    console.log("Created View");
    this.id = id;
    return console.log(this.id);
  },
  render: function() {
    var Collections, collections, results, total;
    console.log("Rendering");
    $('#content').slideUp();
    Collections = Backbone.Collection.extend();
    collections = new Collections();
    results = new Results();
    total = 0;
    return Tangerine.$db.view('tangerine/questionsCountByAssessmentId?key="' + this.id + '"', {
      success: function(data) {
        total = data.rows[0].value;
        return results.fetch({
          key: this.id,
          success: function(data) {
            var dataSource, ob;
            $('#graph').slideDown();
            ob = {};
            data.each(function(model, index) {
              return ob[index] = model.get("subtestData");
            });
            _.each(ob, function(items, index) {
              var correct, dt, incorrect, name;
              name = '';
              correct = 0;
              incorrect = 0;
              if (_.last(items).prototype === "complete") {
                _.each(items, function(item) {
                  var g;
                  if (item.prototype === "location") {
                    name = item.data['location'].join();
                  }
                  if (item.prototype === "survey") {
                    g = item.data;
                    console.log("G which is item.data");
                    console.log(g);
                    console.log("correct");
                    console.log(correct);
                    return correct += Number(g[Object.keys(g)[0]]);
                  }
                });
                dt = true;
                collections.each(function(collection) {
                  if (collection.get('state') === name) {
                    return dt = false;
                  }
                });
                if (dt) {
                  return collections.add({
                    'state': name,
                    'correct': Number(((correct / total) * 100).toFixed(2))
                  });
                }
              }
            });
            dataSource = collections.toJSON();
            console.log("Data for graph");
            console.log(dataSource);
            return $("#chartContainer").dxChart({
              dataSource: dataSource,
              commonSeriesSettings: {
                argumentField: "state",
                type: "bar",
                hoverMode: "allArgumentPoints",
                selectionMode: "allArgumentPoints",
                label: {
                  connector: {
                    visible: true
                  },
                  showForZeroValues: true,
                  visible: true
                }
              },
              valueAxis: {
                title: 'Percentages Result'
              },
              series: [
                {
                  valueField: "correct",
                  name: "correct"
                }
              ],
              title: "Percentage Result Report",
              legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
              },
              pointClick: function(point) {
                return this.select();
              },
              commonAxisSettings: {
                label: {
                  font: {
                    color: 'black',
                    size: 15
                  },
                  overlappingBehavior: {
                    mode: 'rotate',
                    rotationAngle: 80
                  }
                }
              }
            });
          }
        });
      }
    });
  }
});