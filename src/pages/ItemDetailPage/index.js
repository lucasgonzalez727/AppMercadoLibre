'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var _ = require('underscore');
var formatCurrency = require('format-currency');

var store = require('store');

var Radio = require('backbone.radio');
var globalChannel = Radio.channel('global');

var template = require('./template.hbs');

var MLService = require('services/ApiML');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'itemDetail_view',

    template: template,

    initialize: function (options) {
        if (options.id) {
            this.itemId = options.id;
            this._getItemId();
            
            globalChannel.trigger('empty:search');
        } else {
            Backbone.history.navigate('/', { trigger: true });
        }
    },

    templateHelpers: function () {
        var options =  {};

        if (this.model) {
            options.productCondition = this.model.get('condition') === 'new' ? 'Nuevo' : 'Usado';
        }

        var price = this.model ? this.model.get('price') : 0;

        if (price) {
            var formatOptions = { format: '%s%v', symbol: '$', locale: 'de-DE'};
            options.priceFormatted = formatCurrency(price, formatOptions);
        }
        
        return options;
    },

    /***************************************
    * Métodos Privados
    ***************************************/

    _getItemId: function () {
        var that = this;
        
        var Service = new MLService();
        var data = {
            id: this.itemId
        };
        Service.getItemById(data).then(function(data) {
            that._prepareBackboneModel(data);
        }, function (error) {
            console.log(error.responseText + ' Intentalo nuevamente en unos minutos');
        });
    },

    _prepareBackboneModel: function (data) {
        this.model = new Backbone.Model(data.item);
        this.categories = data.categories;

        //Avisamos para modificar el title
        globalChannel.trigger('content:change', {title: this.model.get('title')});  
        this.render();
    }

});