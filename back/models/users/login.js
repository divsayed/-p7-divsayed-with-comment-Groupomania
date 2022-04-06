const db = require("../../Database").db
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    let sql = `SELECT * FROM users WHERE email=?`;
    db.query(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) return res.status(401).json({ error: "Email incorrect !" });
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: " Mot de passe incorrect !" })
                }
                console.log("utilisateur connecté");
                res.status(200).json({
                    userId: user.id_user,
                    admin: user.admin,
                    token: jwt.sign(
                        { 
                            userId: user.id_user,
                            admin: user.admin
                        },
                        process.env.TOKEN_KEY,
                        { expiresIn: "24h" },
                    ),  
                })
            })
            .catch(error => res.status(500).json({ error: "Erreur authentification" }));
    })
} 

