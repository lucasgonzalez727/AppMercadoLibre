var compression     = require('compression'),
    express         = require('express'),
    http            = require('http'),
    request         = require('request'),
    Promise         = require('bluebird'),
    app             = express(),
    server          = http.createServer(app);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(compression());


var getItemDescription = (id) => {

        return new Promise(function (resolve, reject) {
            request({
                url: 'https://api.mercadolibre.com/items/' + id + '/description',
                method: 'GET',
            }, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    var totalDescription = JSON.parse(body);
                    response = totalDescription.plain_text;

                    resolve(response);
                }
            });
        });
};

var getItemCategories = (categoryId) => {

        return new Promise(function (resolve, reject) {
            request({
                url: 'https://api.mercadolibre.com/categories/' + categoryId,
                method: 'GET',
            }, function(error, response, body) {
                if(error) {
                    console.log(error);
                    reject(error);
                } else {
                    var category = JSON.parse(body);
                    response = category.path_from_root;
                    resolve(response);
                }
            }); 
        });

};


app.get('/getItems', (req, res, next) => {

   var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.productToSearch + '&limit=' + req.query.limit;
    request({
        url: url,
        method: 'GET',
    }, function(error, response, body){
        if (error) {
            console.log(error);
        } else {

            var data = JSON.parse(body);
            var categoriesResponse = [];

            if (data.filters.length) {
                var categories = data.filters[0].values[0].path_from_root;

                for(var i = 0; i < categories.length; i++) {
                    categoriesResponse.push({name: categories[i].name});
                }
            }
            
            var responseData = {
                'author': {
                    'name': 'Lucas',
                    'lastname': 'Gonzalez'
                },
                categories: categoriesResponse,
                items: data.results
            }
            res.json(responseData);
        }
    });
});

app.get('/getItemById', (req, res, next) => {

        var url = 'https://api.mercadolibre.com/items/' + req.query.id;
        request({
            url: url,
            method: 'GET',
        }, function(error, response, body){
            if (error) {
                console.error(error.stack);
            } else {
                var data = JSON.parse(body);

                if (data.error) {
                    return res.status(data.status).send('Algo en tu búsqueda fallo!! :(');
                }

                var responseData = {
                    'author': {
                        'name': 'Lucas',
                        'lastname': 'Gonzalez'
                    },
                    'item': {
                        'id': data.id,
                        'title': data.title,
                        'price': data.price,
                        'picture': data.pictures.length ? data.pictures[0].url : '',
                        'condition': data.condition,
                        'free_shipping': data.free_shipping ? true : false,
                        'sold_quantity': data.sold_quantity
                    }
                };

                getItemDescription(req.query.id).then(function (response) {
                    responseData.item.description = response;

                    getItemCategories(data.category_id).then(function (response) {
                        responseData.item.categories = response;
                        
                        res.json(responseData);
                    });
                }); 
            }
        });

});


server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('El servidor express esta escuchando');
});