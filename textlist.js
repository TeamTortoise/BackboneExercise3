
var TextModel = Backbone.Model.extend({
    defaults : {"value" : ""},
    replace : function (str) {
      this.set("value", str);
    }
});

var TextView = Backbone.View.extend({
    render: function () {
        var textVal = this.model.get("value");
        var btn = '<button id="clearIt">Clear</button>';
        var delBtn = '<button id="deletebutton">Delete</button>';
        var input = '<input type="text" value="' + textVal + '" />';
        this.$el.html(textVal+"<br><div>" + input + btn + delBtn+"</div>");
    },
    initialize: function () {
        this.model.on("change", this.render, this);
        // last argument 'this' ensures that render's
        // 'this' means the view, not the model
    },
    events : {
        "click #clearIt" : "clear",
        "click #deletebutton" : "removeModel",
        "keypress input" : "updateOnEnter"

    },
    replace : function () {
        var str = this.$el.find("input").val();
        this.model.replace(str);
    },
    clear: function () {
        this.model.replace("");
    },

    updateOnEnter: function (e){
        if(e.keyCode == 13) {
            this.replace();
        }
    },

    removeModel : function (args){
      // this.model.destroy(); //destroys the model on the server but leave the modelView 
      this.remove(); //removes the modelView
      },
});

var TextCollection = Backbone.Collection.extend({
    model : TextModel
});

var TextCollectionView = Backbone.View.extend({
    render : function () {
        var btn = '<button id="addbutton">Add Text</button>';
        var div = '<div id="text-list"></div>';
        this.$el.html(div + btn);
    },
    initialize : function () {
        this.listenTo(this.collection, 'add', this.addView);
    },
    events : {
        "click #addbutton" : "addModel",

    },
    addModel : function () {
        this.collection.add({});
        // collection adds a model, fires add event, then listener calls this.addView(model)
    },
  
    addView : function (newModel) {
        newModel.set("value","Enter something here...");
        var view = new TextView({model : newModel});
        view.render();
        this.$("#text-list").append(view.$el);
    }

});

var textCollection;
var textCollectionView;
$(document).ready( function () {

textCollection = new TextCollection();
textCollectionView = new TextCollectionView({ collection : textCollection});

textCollectionView.render();

$("#listdiv").append(textCollectionView.$el);

});
