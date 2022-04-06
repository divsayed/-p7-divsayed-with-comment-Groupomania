

 // imposer les 2 champs obligatoire pour se connecter 

module.exports = (req, res, next) => {

    let {email, password } = req.body;

    if(email == "" || email == undefined){
        return res.status(400).json({error : "veuillez sisir un email"})

    } else if(password == "" || password == undefined) { 
        return res.status(400).json({error : "veuillez sisir le mot de passe"})    
    }  
    next()
    }
  


