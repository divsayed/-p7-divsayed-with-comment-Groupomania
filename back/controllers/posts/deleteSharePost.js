// Controller suppression d'un post (Admin ou Membre du post)
module.exports = (req, res, next) => {

    if (
        typeof req.params.id_share == 'undefined' ||
        req.params.id_share == ''
    ) {
        res.status(400).json({error: 'Veuillez renseigner un autre partage'})
    } else {
        next()
    }
};