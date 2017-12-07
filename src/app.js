
var $ = require('jquery');
$.support.cors = true;

window.jQuery = window.$ = $;

require('./app.scss');

//Requerimos la aplicación
var Application = require('./application');

//Iniciamos la aplicación
var app = new Application();

app.on('start', function () {
    console.log('la aplicación corrió con éxito');
})

//Starteamos la aplicación
window.onload = function () {
    app.start();
};
