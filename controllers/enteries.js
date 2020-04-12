const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
}


const handleEnteries = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries => {
        if(enteries){
            res.json(enteries[0]);
        }else{
            res.status(400).json('No user found');
        }
    })
    .catch(err => res.status(400).json('Unable to get enteries'))
}

module.exports = {
    handleEnteries: handleEnteries,
    handleApiCall: handleApiCall
}