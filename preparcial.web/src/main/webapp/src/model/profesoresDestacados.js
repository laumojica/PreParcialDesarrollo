/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['model/profesoresDestacados'], function() {
//Aquí se define la estructura de un ítem de la lista. Note que el modelo extiende el modelo estándar backbone.
    App.Model.SportPromedioModel = Backbone.Model.extend({
        defaults: {
         'nombre' : '',
         'anios' : ''
        },
        getDisplay: function(name) {
         return this.get(name);
        }
        });
//Aquí se define el modelo de la lista. El modelo de la lista extiende de Backbone.Collection. En el atributo ‘model’ se define el modelo  (definido arriba) que corresponde al molde de cada uno de los ítems de la lista.
    App.Model.SportPromedioList = Backbone.Collection.extend({
        model: App.Model.SportPromedioModel
    });
    return  App.Model.SportPromedioModel;
});