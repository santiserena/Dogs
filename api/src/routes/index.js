const { Router } = require('express');
const axios = require ('axios');  //ss
const {Dog, temper} = require ('../db'); //ss

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//?????????????????????????consignas de arriba

router.get('/dogs', async (req, res, next) => { //en desorden alfabetico
   
   try {
       const breedsApi = (await axios ('https://api.thedogapi.com/v1/breeds')).data;
       
       const breedsDb = await Dog.findAll({atributes: ['name']}); 

       let breedTotal = breedsApi.concat(breedsDb);
       breedTotal = breedTotal.map( e => e.name);
       res.send(breedTotal); 

   } catch (error) {
       next (error);
   }
})

module.exports = router;
