var express = require('express');

var Storage = {
    add: function(name) {
        var item = {name: name, id: this.setId};
        this.items.push(item);
        this.setId += 1;
        return item;
    },
    delete: function(item) {
        console.log("at least it's getting here");
        console.log(this.item);
        delete this.item;
    },
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
    console.log("deleting");
    var id = request.params.id;
    console.log(id);
    if (!(id in storage.items)) {
        console.log("not Deleted");
        return response.sendStatus(404);
    }
    else if (id in storage.items) {
        storage.delete(storage.items.item);
        console.log("deleted");
        return response.sendStatus(200);    
    }
});
app.listen(process.env.PORT || 8080, process.env.IP);
//able to access index not id.  need to acces id and subtract 1 to get index to remove?

 

