var express = require('express');
//creates the storage object with methods to add, remove, and change a shopping list item
var Storage = {
    add: function(name) {
        var item = {name: name, id: this.setId};
        this.items.push(item);
        this.setId += 1;
        return item;
    },
    delete: function(id) {
        var index = this.items.findIndex(function(item) {
            return item.id == id;
        });
        if (index == -1) {
            return false;
        }
        this.items.splice(index,1);
        return true;
    },
    change: function(name, id) {
        var index = this.items.findIndex(function(item) {
            return item.id == id;
        });
        if (index == -1) {
            return false;
        }
        //var newItem = {name: name, id: id};
        //this.items.splice(index, 1, newItem);
        this.items[index].name=name;
        return true;
    },
};
//creates the actual shopping list
var createStorage = function() {
    var storage = Object.create(Storage);
    storage.items = [];
    storage.setId = 1;
    return storage;
};
var storage = createStorage();
//hardcode test items in shopping list
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
//include express moduld
var app = express();
//calls static items from public folder - shopping list items
app.use(express.static('public'));
//retrieves list of shopping list items
app.get('/items', function(request, response) {
    console.log(storage.items);
    response.json(storage.items);
});
//requires the body-parser module and instructs to use the jsonParser middleware when request are made
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//add shopping list items based on name entered
app.post('/items', jsonParser, function(request, response) {
    //console.log(request);
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name);
    response.status(201).json(item);
});
//deletes shopping list items based on selected id
app.delete('/items/:id', jsonParser, function(request, response) {
    var id = request.params.id;
    if (!id) {
        return response.sendStatus(500);
    }
    if (storage.delete(id)) {
        console.log("true");
        return response.status(200).json({status:"success"});
    }
    else {
        console.log("false");
        return response.sendStatus(404);
    }
});
//makes changes to existing shopping list items
app.put('/items/:id', jsonParser, function(request, response) {
    var id = request.params.id;
    var name = request.body.name;
    var item = {name: name, id: id};
    //console.log(request.body);
    if (!id) {
        return response.sendStatus(500);
    }
    if (storage.change(name, id)) {
        return response.status(200).json(item);
    }
    else {
        return response.sendStatus(404);
    }
});
//exports app and storage for testing
exports.app = app;
exports.storage = storage;

app.listen(process.env.PORT || 8080, process.env.IP);


 

