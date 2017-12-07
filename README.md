# AppMercadoLibre

Applicación para exámen técnico de ingreso a Mercado Libre

## Stack utilizado

*Client Side* 

- BackboneJS - Marionette
- HTML - Handlebars
- SASS

*Server Side*

- NodeJS
- ExpressJS

 ## Descripción de la APP

 Aplicación creada para consumir la API de ML, con el fin de servir los productos que el usuario desea encontrar.

 Para realizar la tarea se creó una API con **expressJS** que consume a la API de ML para traer la data

 Por otro lado el **client side** corre con otro servidor express con el fin de poder ingresar de forma independiente a las urls sin necesidad de navegar por el **router** de Backbone

 ## Instalación

Una vez que se descargue el repositorio con todo el código, asegurarse de instalar *Node* en nuestra máquina.

Abrir la consola de node

```
 $ npm install
```

Luego abri una segunda consola y en el root de la carpeta donde esta toda la aplicación ejecutar

```
 $ webpack -d
```

 ## Ejecutar la aplicación

 En primer lugar se deberá ejecutar en:

 - /serverApi

 El siguiente comando: 

```
 $ node server.js
```
Tiene como instrucción ejecutar nuestra API, que será la encargada de la comunicación con ML

En segundo lugar abrimos una segunda consola y en el root de nuestra aplicación ejecutamos

```
 $ node server.js
```
Esto va a inicializar nuestra aplicación que corre en **http://localhost:9000**

Si quisieramos no correr express para el client side, viene dentro de nuestro package.json, instalado **webpack-dev-server**, que levantará nuestra aplicación del lado del cliente.

```
 $ npm run start:dev
```

**Tener en cuenta que si ejecutamos la aplicacion sin el servidor express, no podremos ingresar de forma independiente a las url, siempre que querramos hacer eso, por favor recordar correr nuestra app con el servidor express ubicado en el root** 