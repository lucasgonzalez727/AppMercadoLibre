'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var _ = require('underscore');

var template = require('./template.hbs');

var ItemList = require('components/ItemList');

var MLService = require('services/ApiML');

module.exports = Marionette.CompositeView.extend({
    tagName: 'div',
    className: 'items',
    childView: ItemList,
    childViewContainer: '.items_list',

    template: template,

    initialize: function (options) {
        if (options.params) {
            this.productsToSearch = options.params.substr(options.params.indexOf('=') + 1, options.params.length);
            this._getProducts();
        } else {
            Backbone.history.navigate('/', { trigger: true });
        }

        this.errorMessage = false;
    },

    templateHelpers: function () {
        var options = {};

        options.categories = this.categories ? this.categories : '';

        if (this.errorMessage) {
            options.errorMessage = this.errorMessage;
        }
        
        return options;
    },

    /***************************************
    * Métodos Privados
    ***************************************/

    _getProducts: function () {
        var that = this;
        var Service = new MLService();
        var data = {
            productToSearch: this.productsToSearch, 
            limit: 4
        };
        Service.getItems(data).then(function(data) {
            if (!data.items.length) {
                that.errorMessage = 'No se encontró ningún resultado :(';
                that.render();
            } else {
                that._prepareBackboneCollection(data);
            }
            
        }, function (error) {
            console.log(error.responseText + ' Intentalo nuevamente en unos minutos');
        });
    },

    _prepareBackboneCollection: function (data) {
        this.collection = new Backbone.Collection(data.items);
        this.categories = data.categories;
        this.render();
    }

});