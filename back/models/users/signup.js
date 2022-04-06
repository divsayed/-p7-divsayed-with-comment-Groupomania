

const db = require("../../Database").db
require('dotenv').config();
const bcrypt = require('bcrypt')

// créer un compte 
module.exports = (req, res,) => {
    let sql = `SELECT * FROM users WHERE email=?`;
    db.query(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) {
            bcrypt
            .hash(req.body.password, 10)
            .then(hash => {
                const user = {
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: hash,  
                }
                let sql = `INSERT INTO users (lastName, firstName, email, password, profile_picture) VALUES (?,?,?,?, '')`;
                db.query(sql, [user.lastName, user.firstName, user.email, user.password], function (err, result) {
                    if (err){
                        res.status(500).json({ error: err })
                    } else{
                    res.status(201).json({ message: `Utilisateur ${user.lastName} ajouté` });
                }
            })
            })
                .catch(error => res.status(500).json({ error })) 
        } else{
            res.status(401).json({ message: "Email déja utiliser" })
        }
    }) 
};


