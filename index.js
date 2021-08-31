//Express Libraries
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const fs = require('fs');
//body-parser middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//set view to engine ejs
app.set('view engine', 'ejs');
app.use(ejsLayouts); //middleware

//PORT
const PORT = process.env.PORT || 8000;

//controllers
app.use('/disney', require('./controllers/disney'));


app.get('/', function(req, res) { //or app.get('/', (req, res) =>
    res.render('home');
  });

app.get('/disney/edit/:idx', function(req, res){
    const disneyChar = fs.readFileSync('./disney.json');
    const disneyData = JSON.parse(disneyChar);
    res.render('disney/edit', {disney: disneyData[req.params.idx], disneyId: req.params.idx});
  });

  app.put('/disney/:idx', function(req, res){
    const disneyChar = fs.readFileSync('./disney.json');
    const disneyData = JSON.parse(disneyChar);
  
    //re-assign the name and type fields of the disney character to be editted
    disneyData[req.params.idx].name = req.body.name;
    disneyData[req.params.idx].type = req.body.type;
  
     // save the editted disney characters to the data.json file
    fs.writeFileSync('./disney.json', JSON.stringify(disneyData));
    res.redirect('/disney');
  });

app.listen(PORT, () => {
    console.log(`Server running on PORT:`, PORT);
});