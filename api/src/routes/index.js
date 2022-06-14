const { Router } = require('express');
const axios = require ('axios');  //ss
const {Dog, Temper} = require ('../db'); //ss

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//info format
async function getAllBreeds (){
    let breedsApi = (await axios ('https://api.thedogapi.com/v1/breeds')).data;
    let breedsDb = await Dog.findAll({
        include: Temper
    });
    
    breedsApi = breedsApi.map ( e => {
        return {
            id:e.id,
            name:e.name,
            height: e.height.imperial.split('-').map( e => parseInt (e)),  
            weight: e.weight.imperial.split('-').map( e => parseInt (e)),  
            lifeSpan: e.life_span.slice(0, -6).split(' - ').map ( e => parseInt(e)),
            image: e.image?.hasOwnProperty('url')? e.image.url : null,
            temperament:e.temperament? e.temperament.split(', ') : null
        }
    })
    
    breedsDb = breedsDb.map ( e => {
        
        
        return {
            id:e.id,
            name:e.name,
            height: e.height.split('-').map(e=>parseInt(e)),  
            weight: e.weight.split('-').map(e=>parseInt(e)),
            lifeSpan: e.lifeSpan? e.lifeSpan.split('-').map( e => parseInt(e)) : null,
            image: e.image? e.image : null,
            temperament: e.tempers?.length ? e.tempers?.map( e => e.name) : null //e.dataValues
        }
    })

    let all = breedsApi.concat(breedsDb);
    return all;
}

// initial load of temperaments from api -> on dev
 /* async function getTemperaments (){
    let temperamentString = '';
    let allInfo = (await axios ('https://api.thedogapi.com/v1/breeds')).data;
    allInfo.forEach ( e => temperamentString += e.temperament+ ', ') 
    temperamentArray = temperamentString.split (', ')

    const dataArr = new Set(temperamentArray);
    return [...dataArr];
} 
 (async function initialTemperamentsLoad (){
    const tem = await getTemperaments();
    let vvv = await Temper.findAll()
    if (vvv.length<1){
        for (let i = 0; i < tem.length-1; i++) {
            Temper.create({name: tem[i]})
        }
    }
})() */  


/* ROUTES */

// gives an array with all breeds, or looks for coincidences by name in a query
router.get('/dogs', async (req, res, next) => {  
    
    try {
        let breedTotal = await getAllBreeds()       
        
        if(!req.query.name) res.send(breedTotal);
        else {const filt = breedTotal.filter( e => e.name.toLowerCase().includes(req.query.name.toLowerCase())) 
        
            console.log('acaaaaaaaaaaaaaa',filt);
        filt.length? res.send(filt) : res.send ('Breed not found')
        }
    } catch (error) {
        next (error);
    }
})

// delete a breed by its id
router.delete('/erase/:id', async (req, res, next) => {

    let idd = req.params.id
    let encontrado = await getAllBreeds()
    encontrado = encontrado.find ( e => e.id === idd)
    console.log('acaa', encontrado);
    await Dog.destroy({
        where: {
            id:idd
        }
    })

   res.send ('borado')
})

// gives breed and temperament info, searched by an id using params

router.get('/dogs/:id', async (req, res, next) => { 
    const id = req.params.id
    try {
        if (id){ 
            const data = await getAllBreeds()    
            const oneBreed = data.find ( e => e.id.toString() === id);
            oneBreed? res.send (oneBreed) : res.send ('Id not found')
        }
        //else hacer
    } catch (error) {
        next (error);
    }
})

// gives and array with all temperaments from database
router.get('/temperament', async (req, res, next) => {
    try {

        res.send (await Temper.findAll()) 
    } catch (error) {
        next (error);
    }
})

// create a new breed with temperaments
router.post ('/dog', async (req, res, next) => {
    try {        
        let { name, height, weight, lifeSpan, temperaments, image } = req.body

        let existingName = await getAllBreeds();
        
        if(!existingName.find( e => e.name === name)){
            
            const dogCreate = await Dog.create({
                name,
                height,
                weight,
                lifeSpan,
                image
            })
            
            if(temperaments){
                for (let e of temperaments) {
                    let foundElement = await Temper.findOne({
                        where:{name: e}
                    });
                    
                   await dogCreate.addTemper (foundElement.id)
                }
                
                res.send ('Breed added'); 
            }
            else res.send ('Breed added without temperaments') 
        }
        else res.send ('The breed is already registered') 
           
    } catch (error) {
        next(error);
    }
})

// default routes
router.post ('*', (req, res, next) => {
    try {
        res.send ("that route doesn't exist")  
    } catch (error) {
        next(error);
    }
})
router.get ('*', (req, res, next) => {
    try {
        res.send ("that route doesn't exist")  
    } catch (error) {
        next(error);
    }
})

module.exports = router;
