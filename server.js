var express = require('express');

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
        console.log("howdy");
        console.log("i am name " + name);
        console.log("i am id " + id);
        var index = this.items.findIndex(function(item) {
            return item.id == id;
        });
        if (index == -1) {
            return false;
        }
        //splice in new name into existing array object... 
        //index targets appropriate array item... 
        console.log(this.items[index]);
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
    //console.log(request);
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

app.put('/items/:id', jsonParser, function(request, response) {
    console.log("changing");
    var id = request.params.id;
    var name = request.body.name;
    var item = {name: name, id: id};
    console.log(item);
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
app.listen(process.env.PORT || 8080, process.env.IP);
//able to access index not id.  need to acces id and subtract 1 to get index to remove?

 

