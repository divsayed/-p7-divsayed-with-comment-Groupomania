module.exports = (req, res, next) => {
    if(typeof req.body.message != 'undefined' && req.body.message.length != 0) {
        next()
    } else {
        res.status(400).json({message: `Veuillez rentrer un message`})
    }
}