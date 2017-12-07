'use strict';

var Backbone = require('backbone');
var Radio = require('backbone.radio');

var LayoutView = require('backbone.marionette').LayoutView;

var HeaderContent = require('application/views/HeaderContent')

var template = require('./template.hbs');

var routerChannel = Radio.channel('router');
var globalChannel = Radio.channel('global');

module.exports = LayoutView.extend({
    el: '#app',
    template: template,

    regions: {
        header: '#header',
        mainContent: '#mainContent'
    },

    initialize: function () {
        this.listenTo(globalChannel, 'content:change', this._changeTitle)
    },

    onRender: function () {
        this.getRegion('header').show( new HeaderContent())
    },

    /***************************************
   * Métodos Privados
   ***************************************/

   _changeTitle: function (content) {
       var title = [];

       if (content.title) {
           title.push(content.title);
       }

       title.push('Mercado Libre');

       document.title = title.join(' - ');
   }

});