var Counter = Backbone.Model.extend({
    defaults : {"value" : 0},

    inc: function(){
      var val = this.get("value");
      this.set("value", val+1);
      },

    dec: function(){
      var val = this.get("value");
      if(val > 0){
      this.set("value", val-1);
        }
      },

    clearIt: function(){
      var val = this.get("value");
      this.set("value", val=0);
    }

});


var CounterView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var btn = '<button id="incBtn">Increment</button>';
        var btnDec = '<button id="decBtn">Decrement</button>';
        var btnClear = '<button id="btnClear">Clear</button>';
        this.$el.html('<p>'+val+'</p>' + btn + btnDec + btnClear);

    },
    initialize: function () {
        // this.model.on("change", this.render, this);
        this.listenTo(this.model, "change", this.render)
        this.render();
        $("#counterdiv").append(this.$el);
    },
    events : {
        'click #incBtn' : 'increment',
        'click #decBtn' : 'decrement',
        'click #btnClear' : 'clearIt' 
    },
    increment : function () {
        this.model.inc();
    },
    decrement : function () {
        this.model.dec();
    },
    clearIt : function () {
        this.model.clearIt();
    }
});



$(document).ready( function () {
  var counterModel = new Counter();
  // var counterModel2 = new Counter();

  var counterView = new CounterView({model : counterModel});
  // var counterView2 = new CounterView({model : counterModel2});

  // counterView1.render();
  // counterView2.render();

  // $("#counterdiv").append(counterView1.$el);
  // $("#counterdiv").append(counterView2.$el);
});
