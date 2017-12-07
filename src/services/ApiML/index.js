'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');

var Promise = require('bluebird');

module.exports = Marionette.Object.extend({

    /***************************************
    * Métodos Públicos
    ***************************************/

    getItems: function (dataToSearch) {
        var options = {
            url: "http://localhost:3000/getItems",
            data: dataToSearch, 
            type: 'GET',
            cache: false
        };

        return new Promise(function (resolve, reject) {
            $.ajax(options).done(function (response) {
                resolve(response);
            }).fail(function(error) {
                reject(error);
            })
        });
    },

    getItemById: function (itemId) {
        var options = {
            url: "http://localhost:3000/getItemById",
            data: itemId, 
            type: 'GET',
            cache: false
        };

        return new Promise(function (resolve, reject) {
            $.ajax(options).done(function (response) {
                resolve(response);
            }).fail(function(error) {
                reject(error);
            })
        });
    }
});