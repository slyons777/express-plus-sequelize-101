const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = '0.0.0.0';

const logger = morgan('tiny');

// JS library that speaks to Postgres
const Sequelize = require('sequelize');
// Pets is an object that can
const {
  Pets
} = require('./models');

const db = [];

app.use(logger);
// Disabling for local development
// app.use(helmet());

// Parse any form data from POST requests
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send(`<h1>Hello!</h1><br><a href="/new">Go to the form</a>`)
});

app.get('/new', (req, res) => {
  res.send(`
<h1>Say something!</h1>
<form method="POST">
  <label>
    Name:
    <input name="name" type="text" autofocus />
  </label>
  <label>
    Breed:
    <input name="breed" type="text" />
  </label> 
 <input type="submit" value="do it!" />
</form>
    `);
});

// When using Sequelize, you need async/await
// Put async in front of (req, res)
// It means that you will use the `await` keyword in the function
app.post('/new', async (req, res) => {
  const {
    name,
    breed
  } = req.body;
  // db.push(thought);
  // await will "pause" before running the rest
  // of the function.
  // 1. We start to talk to Postgres: Pets.create()
  // 2. Pause...until Postgres answers
  // 3. Whenever we finish talking to Postgres, assign result
  //    to new variable: newPet
  // const petDataFromTheForm = {
  //     name,   // equivalent to name: name
  //     breed   // equivalent to breed: breed
  // };
  // const newPet = await Pets.create(petDataFromTheForm);
  // console.log(newPet);
  await Pets.create({
    name,
    breed
  });
  res.redirect('/list');
});

app.get('/list', (req, res) => {
  // Read/retrieve all pets
  Pets.findAll()
    .then(pets => {
      // res.json(pets);
      //console.log(pets);
      res.send(`
          <a href="/new">Go to the form</a>
          <ul>
            ${
              pets.map(pet => `<li>${pet.name}: ${pet.breed}</li>`).join('')
            }
          </ul>
              `);
    })
});

//updating
app.get('/list/:id', async (req, res) => {
  // updating list of all pets
  Pets.findAll()
    .then(pets => {
      // res.json(pets);
      //console.log(pets);
      res.send(`
          <a href="/new">Go to the form</a>
          <ul>
            ${
              pets.map(pet => `<li>${pet.name}: ${pet.breed}</li>`).join('')
            }
          </ul>
              `);
    })
});

app.post('/list/:id'
  async, (req, res) => {
    // returning update of new list
    Pets.findAll()
      .then(pets => {
        // res.json(pets);
        //console.log(pets);
        res.send(`
          <a href="/new">Go to the form</a>
          <ul>
            ${
              pets.map(pet => `<li>${pet.name}: ${pet.breed}</li>`).join('')
            }
          </ul>
              `);
      })
  });

//deleting
app.get('/list/:id/delete', (req, res) => {
  // find pet to delete
  Pets.findAll()
    .then(pets => {
      // res.json(pets);
      //console.log(pets);
      res.send(`
          <a href="/new">Go to the form</a>
          <ul>
            ${
              pets.map(pet => `<li>${pet.name}: ${pet.breed}</li>`).join('')
            }
          </ul>
              `);
    })
});

app.post('/list/:id/delete', (req, res) => {
  // remove specific pet
  Pets.findAll()
    .then(pets => {
      // res.json(pets);
      //console.log(pets);
      res.send(`
          <a href="/new">Go to the form</a>
          <ul>
            ${
              pets.map(pet => `<li>${pet.name}: ${pet.breed}</li>`).join('')
            }
          </ul>
              `);
    })
});


server.listen(PORT, HOST, () => {
  console.log(`Listening at http://${HOST}:${PORT}`);
});