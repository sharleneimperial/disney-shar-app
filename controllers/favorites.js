const express = require('express');
const router = express.Router();
const fs = require('fs');
const methodOverride = require('method-override');

router.get('/', function(req, res) {
    let disneyChar = fs.readFileSync('./disney.json');
    let disneyData = JSON.parse(disneyChar);
  
    let nameFilter = req.query.nameFilter;
  
    if (nameFilter) {
      disneyData = disneyData.filter(function(disney) {
        return disney.name.toLowerCase() === nameFilter.toLowerCase();
      });
    }

    res.render('disney/index', {myDisney: disneyData});
  });

router.post('/', function(req, res) {
  
    // read disney file
    let disneyChar = fs.readFileSync('./disney.json');
    disneyChar = JSON.parse(disneyChar);
  
    // add item to disney array
    disney.push(req.body);
  
    // save disney to the data.json file
    fs.writeFileSync('./disney.json', JSON.stringify(disney));
  
    //redirect to the GET /disney route (index)
    res.redirect('/disney');
  });
  
  //form to make a new disney character
router.get('/new', function(req, res){
      res.render('disney/new');
  });
  
    //express show route for disney character (lists one disney character)
router.get('/:idx', function(req, res) {
      // get disney characters
      let disneyChar = fs.readFileSync('./disney.json');
      let disneyData = JSON.parse(disneyChar);
    
      //get array index from url parameter
      let disneyIndex = parseInt(req.params.idx);
    
      //render page with data of the specified disney character
      res.render('disney/show', {myDisney: disneyData[disneyIndex]});
    });
  
router.get('/edit/:idx', function(req, res){
      let disneyChar = fs.readFileSync('./disney.json');
      let disneyData = JSON.parse(disneyChar);
      res.render('disney/edit', {disney: disneyData[req.params.idx], disneyId: req.params.idx});
    });
  
router.put('/:idx', function(req, res){
      let disneyChar = fs.readFileSync('./disney.json');
      let disneyData = JSON.parse(disneyChar);
    
      //re-assign the name and type fields of the disney character to be editted
      disneyData[req.params.idx].name = req.body.name;
      disneyData[req.params.idx].type = req.body.type;
    
       // save the editted disney characters to the data.json file
      fs.writeFileSync('./disney.json', JSON.stringify(disneyData));
      res.redirect('/disney');
    });
  
router.delete('/:idx', function(req, res){
      let disneyChar = fs.readFileSync('./disney.json');
      let disneyData = JSON.parse(disneyChar);
    
      // remove the deleted disney character from the dinosaurs array
      disneyData.splice(req.params.idx, 1)
    
      // save the new disney characters to the data.json file
      fs.writeFileSync('./disney.json', JSON.stringify(disneyData));
    
      //redirect to the GET /disney route (index)
      res.redirect('/disney');
    });
    

module.exports = router;