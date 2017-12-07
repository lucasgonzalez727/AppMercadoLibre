'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

var globalChannel = Radio.channel('global');

var ApplicationRouter = require('./router');
var ApplicationView = require('./view');

var ItemsListPageView = require('pages/ItemsListPage');
var ItemDetailPageView = require('pages/ItemDetailPage');

module.exports = Marionette.Application.extend({
    initialize: function () {},

    onStart: function () {

        //inicializamos la vista principal de la app
        this.view = new ApplicationView();
        this.view.render();

        //generamos el setup del routeo
        this._setupRouting();

        //inicializamos el history de backbone
        Backbone.history.start({
            pushState: true
        });

        //Avisamos que la app se inicializo
        globalChannel.trigger('app:start');
    },

  /***************************************
   * Métodos Privados
   ***************************************/

   _setupRouting: function () {

        var that = this;
        
        this.router = new ApplicationRouter();

        this.router.on('route:index', function () {
            console.log('página de inicio');
        });

        this.router.on('route:itemDetail', function (id) {
            that.view.mainContent.show(new ItemDetailPageView({
                id: id
            }));
        });

        this.router.on('route:items', function (params) {
            //Avisamos para modificar el title
            globalChannel.trigger('content:change', {title: 'Página de Búsqueda'});  

            that.view.mainContent.show(new ItemsListPageView({
                params: params
            }));
        });
    }
});