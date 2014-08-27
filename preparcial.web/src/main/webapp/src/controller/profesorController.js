/* ========================================================================
 * Copyright 2014 grupo2
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 grupo2

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['controller/_profesorController','delegate/profesorDelegate'], function() {
    App.Controller.ProfesorController = App.Controller._ProfesorController.extend({

        
         language: function(){
            alert('Usted est� viendo la versi�n en ESPA�OL de esta p�gina');
        },

         titulo: function(params){
              
              var exper= parseInt(params.aniosExperiencia);
              var pubs = parseInt(params.numPublicaciones);
              var promPubs= pubs/exper;
              
              
              var msg="";
              
              if(exper > 20 || promPubs>3)
              {
                  msg="Titular";
              }
              else if((exper >9 && exper <21 )||promPubs ==2)
              {
                  msg="Asistente";
              }
              else 
              {
                  msg="de Planta";
              }
             
                          alert('El profesor  '+ params.name+ ' es  ' +msg);
        },
   

        
         postInit: function(options) {
            var self = this;
            this.listPromedioTemplate = _.template($('#destacadosList').html());
            this.listPromedioModelClass = options.listModelClass;
     },
        _renderPromedio: function() {
            var self = this;
            /*Aqu� se utiliza el efecto gr�fico backbone deslizar. �$el� hace referencia al <div id=�main�> ubicado en el index.html. Dentro de este div se despliegue la tabla.*/
            this.$el.slideUp("fast", function() {
                /*Establece que en el <div> se despliegue el template de la variable ��. Como par�metros entran las variables establecidas dentro de los tags <%%> con sus valores como un objeto JSON. En este caso, la propiedad sports tendr� la lista que instanci� �sportSearch� en la variable del bucle <% _.each(sports, function(sport) { %>*/
 
                self.$el.html(self.listPromedioTemplate({sports: self.sportPromedioModelList.models}));
                self.$el.slideDown("fast");
            });
        },
        
        profe: function(params) {
        //Elementos para invocar el servicio getSports
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' + 'instead-sport-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-sport-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-sport-list', {view: this, data: data});
                var self = this;
                if (!this.sportModelList) {
                    this.sportModelList = new this.listModelClass();
                }
                //se obtienen los deportes del servicio getSports
                this.sportModelList.fetch({
                    data: data,
                    success: function() {
                        var elementos = self.sportModelList.models;
                        //Ahora se instancia el nuevo modelo construido
                        self.sportPromedioModelList = new App.Model.SportPromedioList;
                        //Se itera sobre la variable elementos, que corresponden a la lista de modelos obtenida del servico REST getSports
                        _.each(elementos, function(d) {
                            
                            var anio = d.attributes.fechaVinculacion.split("/");
                            var aniosTrabajando = 2014-parseInt(anio[2]);
                            /*Ahora se instancia un SportPromModel, con un nuevo objeto JSON como par�metro como constructor (antes sportModel), extrayendo los datos de �d�.*/
                            var i = new App.Model.SportPromedioModel({nombre: d.attributes.name, anios: aniosTrabajando});
                            //y se agrega finalmente a los modelos prom de la lista.
                            self.sportPromedioModelList.models.push(i);
                        });
                        
                        //Se invoca la funci�n de renderizado para que muestre los resultados en la nueva lista.
                        self._renderPromedio(params);
                        Backbone.trigger(self.componentId + '-' + 'post-sport-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'sport-list', view: self, error: error});
                    }
                });
            }
        }


    });
    return App.Controller.ProfesorController;
}); 
