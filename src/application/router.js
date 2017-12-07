'use strict';

var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio');
var channel = Radio.channel('router');
var _ = require('underscore');


module.exports = Backbone.Router.extend({

    routes:{                                     
        '': "index",
        'items': "items",           
        'item/:id': "itemDetail"    
    }
 });

