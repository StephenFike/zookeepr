const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

router.post('/animals', (req,res) => {
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.')
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

router.get('/animals', (req, res) => {

    let results = animals;

    if(req.query){
        results = filterByQuery(req.query, results);
    }
    
    res.json(results);

});

router.get('/animals/:id', (req, res) => {

    const result = findById(req.params.id, animals);

    if(result){
        res.json(result);
    } else {
        res.send(404);
    }
});

module.exports = router;