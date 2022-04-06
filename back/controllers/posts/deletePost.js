// Controller suppression d'un post (Admin ou Membre du post)
module.exports = (req, res, next) => {

    if (
        typeof req.params.id_post == 'undefined' ||
        req.params.id_post == ''
    ) {
        res.status(400).json({error: 'Veuillez renseigner un post'})
    } else {
        next()
    }
};