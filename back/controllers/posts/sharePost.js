//Controller partager un post
module.exports = (req, res, next) => {

    if(
        typeof req.params.id_post == 'undefined' ||
        req.params.id_post == ''
    ) {
        res.status(400).json({error: 'Veuillez saisir un post à partager'})
    } else {
        next()
    }

};
