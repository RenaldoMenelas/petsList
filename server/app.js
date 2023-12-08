const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const knex = require('knex');
const config = require('../knexfile')
const app = express()
const port = 3000

const db = knex(config.development)


//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.get('/', async(req, res) => {
  //  res.sendFile(path.join(__dirname, 'public', 'index.html'));

//});

app.get('/pets', async (req, res) => {
  try {
    const orderedPets = await db.select('*').from('pets').orderBy('id', 'asc');
    const allPets = await db.select('*').from('pets'); // Fetch all records from 'pets' table
   // console.log(orderedPets)
    console.log('All Pets:', allPets);
    res.json(allPets)
  } catch (error) {
    console.error('Error:', error);
  }

})

app.post('/submit-form', async (req, res) => {
  const { pet_name, picture, animal, isFriendly } = req.body
  console.log(pet_name,picture)
  console.log('recieved', {
    petName: req.body.pet_name,
    pic: req.body.picture,
    animal: req.body.animal,
    isfriendly: req.body.isFriendly
  })

  try {
    await db('pets').insert({pet_name: pet_name, picture_pic: picture,species: animal,isfriendly: isFriendly})
    res.status(200).send('data was inserted successfully')
    
  } catch(error) {
    console.error('Error', error)
    res.status(500).send('An error occured while trying to insert data')
  }
  
})
app.delete('/delete-pet/:id', async (req,res) => {
  const petId = req.params.id
  console.log(petId)
  try {
    const deletePet = await db('pets').where('id', petId).del();
    if (deletePet > 0) {
      console.log(`pet with ID ${petId} has been deleted`)
    }else {
      console.log(`No pet found with ID ${petId}`);
      res.status(404).send(`No pet found with ID ${petId}`); // Send a 404 status code for not found
    }
  
  } catch(error) {
    console.error('Error:', error);
 
}
  
})



app.listen(port, () => {
    console.log(`server is running on ${port}`)
})