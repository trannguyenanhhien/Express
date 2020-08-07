var db = require('../db')
var shortid = require('shortid')

module.exports.index = (req, res) => {
    res.render('animals/index', {
        animals: db.get('animals').value()
    })
}

module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedAnimals = db.get('animals').value().filter((animal) => {
        return animal.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })
    res.render('animals/index', {
        animals: matchedAnimals
    })
}

module.exports.create = (req, res) => {
    res.render('animals/create');
}

module.exports.getId = (req, res) => {
    var id = req.params.id;
    var animal = db.get('animals').find({ id: id }).value()
    res.render('animals/view', {
        animal: animal
    })
}

module.exports.postCreate = (req, res) => {
    req.body.id=shortid.generate()
    var errs = []
    if(!req.body.name){
        errs.push('Name is required')
    }
    if(!req.body.color){
        errs.push('Color is required')
    }
    if(errs.length){
        res.render('animals/create',{
            errs: errs,
            values: req.body
        })
        return;
    }
    db.get('animals').push(req.body).write();
    res.redirect('/animals');
}