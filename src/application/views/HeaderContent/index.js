'use strict';

var _ = require('underscore');
var $ = require('jquery');

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var template = require('./template.hbs');

var Radio = require('backbone.radio');
var globalChannel = Radio.channel('global');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'header_main',
    template: template,

    ui: {
        'search_button': '.header_main_search_btn',
        'input_searchBox': '.header_main_search_input'
    },

    events: {
        'click @ui.search_button': '_searchItems'
    },

    initialize: function () {
        this.listenTo(globalChannel, 'empty:search', this._emptySearch);
    },

    templateHelpers: function () {
        var options = {};
        options.logoUrl = require('assets/img/logo_ML.png');

        return options;
    },

    /***************************************
    * Métodos Privados
    ***************************************/

    _searchItems: function (e) {
        e.preventDefault();
        //Disableamos el boton evitando los clicks por las llamadas
        $(this).prop('disabled', true);

        //Obtenemos los parametros
        var params = $('.header_main_search_input').val();
        
        if (params.length) {
            var paramsEncoded = encodeURIComponent(params);
            Backbone.history.navigate('/items?search=' + paramsEncoded, { trigger: true });
        } else {
            $(this).prop('disabled', false);
        }
    },

    _emptySearch: function () {
        this.ui.input_searchBox.val('');
    }

});