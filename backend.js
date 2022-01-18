const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    if (name != undefined){
        let result = findUserByName(name, id);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name, id) => { 
    return users['users_list'].filter( (user) => user['name'] === name && user['id'] == id); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    var newUser = addUser(userToAdd);
    res.status(201).send(newUser).end();
});

function addUser(user){
    if(user['id'] == null)
        user['id'] = generateID();
    users['users_list'].push(user);
    return user;
}

function generateID() {
    var id = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

app.delete('/users', (req, res) => {
    const userToDelete = req.body;
    let result = removeUser(userToDelete);
    res.status(204).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    removeUserByID(id);
    res.status(204).end();
})

function removeUser(user){
    users['users_list'] = users['users_list'].filter(value => value['id'] != user['id']);
}

function removeUserByID(id){
    users['users_list'] = users['users_list'].filter(value => value['id'] != id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  