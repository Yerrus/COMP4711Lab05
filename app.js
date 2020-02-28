var express = require('express');
var app = express();
// var server = app.listen(8080);
var fs = require('fs');
var bodyParser = require('body-parser');

function listening() {
    console.log("listening...");
}

app.listen(process.env.PORT || 3000);

app.use(express.static('public'));
app.use(bodyParser.text());

app.post('/saveArtist', (req, res) => {
    var saveData = req.body;
    console.log(saveData);
    fs.writeFileSync('./artists.json', JSON.stringify(saveData));
    console.log("Data saved");
    return res.send();
}); 

app.get('/loadArtist', (req, res) => {
    fs.readFile('./artists.json', (err, data) => {
        if(!data == "") {
            var loadData = JSON.parse(data);
            res.send(loadData);
        }
    })
})


