
//controller creation un post
module.exports = (req, res, next) => {

    if(
        typeof req.body.message == 'undefined' ||
        req.body.message == ''
    ){
        res.status(400).json({error: 'Veuillez écrire quelque chose'})
    } else if(
        typeof req.body.userId == 'undefined' ||
        req.body.userId == ''
    ) {
        res.status(400).json({error: 'Veuillez renseigner un utilisateur'})
    } else {
        next()
    }
    
};


