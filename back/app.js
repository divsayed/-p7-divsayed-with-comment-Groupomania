const express = require('express');
const morgan = require('morgan')
const app = express();
const userRoutes = require('./routes/user');
const userPost = require('./routes/post')
const path = require('path'); // importation pour accéder au path de notre serveur
var cors = require('cors')



//cors
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use(morgan('dev'))

//middlewares 
   app.use(express.json());
   app.use('/images', express.static(path.join(__dirname, 'images')));//gérer la ressource images de manière statique
   app.use('/api/users', userRoutes);
   app.use('/api/post', userPost);



 module.exports = app; 
