const db = require("../../Database").db

//creation un post
module.exports = (req, res) => {

    sqlCreatePost = "INSERT INTO posts (message, date_post, id_user) VALUES (?, NOW(), ?)";
    db.query(sqlCreatePost, [req.body.message, req.body.userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        };
        res.status(201).json({
            message: "Message crée avec succés !"
        })
    });  
};

