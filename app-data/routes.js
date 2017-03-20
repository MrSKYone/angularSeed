var Mood = require('./models/mood');

function getMoods(res) {
    Mood.find(function (err, moods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(moods); // return all todos in JSON format
    });
}


module.exports = function (app) {
    
    ///////////
    // MOODS //
    ///////////
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/moods', function (req, res) {
        // use mongoose to get all todos in the database
        getMoods(res);
    });

    app.get('/api/moods/:mood_id', function (req, res) {
        // use mongoose to get all todos in the database
        Mood.findById(req.params.mood_id, function (err, user) { 
            res.send(user);
        } );
    });
  
    // find by name
    app.get('/api/moods/name/:mood_name', function (req, res) {
        // use mongoose to get all todos in the database
        Mood.findOne({slug:req.params.mood_name}, {name: 1}, function (err, mood) { 
            res.send(mood);
        } );
    });
  
    // create todo and send back all todos after creation
    app.post('/api/moods', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Mood.create({
            display: true,
            name: req.body.name,
            name_en: req.body.name_en,
            slug: req.body.slug,
            description: req.body.description,
            schedule: req.body.schedule,
            moodcolor: req.body.moodcolor,
            gifpath: req.body.gifpath,
            imagepath: req.body.imagepath,
            logopath: req.body.logopath,
            bannerpath: req.body.bannerpath,
            website: req.body.website,
            facebook: req.body.website,
            instagram: req.body.instagram,
            text: req.body.text,
            moodtype: req.body.moodtype
        }, function (err, mood) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getMoods(res);
        });

    });

    app.put('/api/moods/:mood_id', function (req, res) {
        console.log(req.body.name);
        Mood.findOneAndUpdate({_id:req.params.mood_id}, req.body, function (err, mood) {
          res.send(mood);
        });
    });

    // delete a todo
    app.delete('/api/moods/:mood_id', function (req, res) {
        Mood.remove({
            _id: req.params.mood_id
        }, function (err, mood) {
            if (err)
                res.send(err);
        });
    });
  
    
};