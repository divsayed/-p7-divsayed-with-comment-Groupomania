const db = require("../../Database").db

module.exports = (req, res, next) => {
    db.query(`
        SELECT id_comment, message, date_comment, id_post, users.id_user, lastName, firstName, profile_picture
        FROM comments, users
        WHERE id_post = ?
        AND comments.id_user = users.id_user
        ORDER BY date_comment DESC
    `,
    [req.params.id_post],
    (error, result) => {
        if(error) {
            res.status(500).json({error: error})
        } else {
            res.status(200).json(result)
        }
    })
}