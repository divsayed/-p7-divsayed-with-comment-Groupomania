//importation de router
const router = require('express').Router(); //raccourci express et router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//importation des controllers
const controllerCreatePost = require('../controllers/posts/createPost')
const controllerGetAllPosts = require('../controllers/posts/getAllPosts')
const controllerDeletePost = require('../controllers/posts/deletePost')
const controllerGetAllByUser = require('../controllers/posts/getAllByUser')
const controllerSharePost = require('../controllers/posts/sharePost')
const controllerDeleteSharePost = require('../controllers/posts/deleteSharePost')
const controllerUpdatePost = require('../controllers/posts/updatePost')
const controllerCreateComment = require('../controllers/posts/createComment')
const controllerUpdateComment = require('../controllers/posts/updateComment')
const controllerDeleteComment = require ('../controllers/posts/deleteComment')
const controllerGetCommentsByPost = require('../controllers/posts/getCommentsByPost')

// Importation des models
const modelCreatPost = require('../models/posts/createPost')
const modeleDletePost = require('../models/posts/deletePost')
const modelGetAllByUser = require('../models/posts/getAllByUser')
const modelGetAllPosts = require('../models/posts/getAllPosts')
const modelSharePost = require('../models/posts/sharePost')
const modelDeleteSharePost = require('../models/posts/deleteSharePost')
const modelUpdatePost = require('../models/posts/updatePost')
const modelsCreateComment = require('../models/posts/createComment')
const modelsUpdateComment = require('../models/posts/updateComment')
const modelsDeleteComment = require ('../models/posts/deleteComment')
const modelsGetCommentsByPost = require('../models/posts/getCommentsByPost')



//creation des routes poste
router.get('/', auth, controllerGetAllPosts, modelGetAllPosts)
router.get('/:id_user', auth, controllerGetAllByUser, modelGetAllByUser)
router.post('/', auth, controllerCreatePost, modelCreatPost)
router.put('/:id_post', auth, controllerUpdatePost, modelUpdatePost)
router.delete('/:id_post', auth, controllerDeletePost, modeleDletePost)

//creation des routes share
router.post('/share/:id_post', auth, controllerSharePost, modelSharePost)
router.delete('/share/:id_share', auth, controllerDeleteSharePost, modelDeleteSharePost)

// creation des routes commentaire
router.get('/:id_post/comments', auth, controllerGetCommentsByPost, modelsGetCommentsByPost)
router.post('/:id_post/comments', auth, controllerCreateComment, modelsCreateComment)
router.put('/comments/:id_comment', auth, controllerUpdateComment, modelsUpdateComment)
router.delete('/comments/:id_comment', auth, controllerDeleteComment, modelsDeleteComment)

module.exports = router;