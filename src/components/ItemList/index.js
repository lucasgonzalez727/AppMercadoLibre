'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var _ = require('underscore');
var formatCurrency = require('format-currency');

var template = require('./template.hbs');

var ItemList = require('components/ItemList');

var MLService = require('services/ApiML');

module.exports = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'items_list_product',
    template: template,

    events: {
        'click': '_goToDetail'
    },

    initialize: function (options) {},

    templateHelpers: function () {
        var options = {};
        var price = this.model ? this.model.get('price') : 0;

        if (price) {
            var formatOptions = { format: '%s%v', symbol: '$', locale: 'de-DE' };
            options.priceFormatted = formatCurrency(price, formatOptions);
        }

        if (this.model.get('shipping').free_shipping) {
            options.shippingImage = require('assets/img/free_shipping.png');
        }

        return options;
    },

    /***************************************
    * Métodos Privados
    ***************************************/

    _goToDetail: function () {
        var productId = this.model.get('id');
        Backbone.history.navigate('/item/' + productId, { trigger: true });
    }
});