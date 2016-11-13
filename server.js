var express = require('express');

var Storage = {
    add: function(name) {
        var item = {name: name, id: this.setId};
        this.items.push(item);
        this.setId += 1;
        return item;
    },
    delete: function(name) {
        var item = {name: name, id:this.setId};
        this.items.splice(item.id);
    }
};

var createStorage = function() {
    var storage = Object.create(Storage);
    storage.items = [];
    storage.setId = 1;
    return storage;
};

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    
    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
    if (!('id' in request.body)) {
        return response.sendStatus(404);
        console.log("at least it's making it here");
    }
    var item = storage.delete(request.body.name);
    response.status(200).json(item);
});
app.listen(process.env.PORT || 8080, process.env.IP);
 

