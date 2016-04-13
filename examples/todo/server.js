const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();

const port = 1234;

app.use(jsonParser);

const entries = [];

function send404(response) {
  response.status(404).send({error: 'Not Found'});
}

app.post('/api/v1/entries', (request, response) => {
  var entry = request.body;
  const id = entries.push(entry);
  if (!entry.id) {
    entry.id = id - 1;
  }
  console.log('added entry ', entry.id);
  response.send(entry);
});

app.get('/api/v1/entries/:id?', (request, response) => {
  var id = request.params.id;
  if (!id) {
    console.log('get all entries');
    response.send(entries);
    return;
  }
  console.log('search for entry ', id);
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].id == id) {
      console.log('found entry ', entries[i].id);
      response.send(entries[i]);
      return;
    }
  }
  send404(response);
});

app.delete('/api/v1/entries/:id?', (request, response) => {
  var id = request.params.id;
  if (!id) {
    entries.length = 0;
    console.log('deleted all entries');
    response.status(204).send();
    return;
  }
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].id == id) {
      console.log('deleted entry ', entries[i].id);
      entries.splice(i, 1);
      response.status(204).send();
      return;
    }
  }
  send404(response);
});

app.get('/api/v1/*', (request, response) => {
  send404(response);
});

app.get('/todo', (request, response) => {
  response.sendFile(path.join(__dirname, 'todo.html'));
});
app.get('/jml.css', (request, response) => {
  response.sendFile(path.join(__dirname, 'jml.css'));
});
app.get('/todo.css', (request, response) => {
  response.sendFile(path.join(__dirname, 'todo.css'));
});
app.get('/todo.js', (request, response) => {
  response.sendFile(path.join(__dirname, '../../lib/todo.js'));
});

app.get('/*', (request, response) => {
  response.send('POST GET DELETE /api/v1/entries/:id?');
});

const server = app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Listening on port ${port}`);
});
