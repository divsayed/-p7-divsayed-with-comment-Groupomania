import Box from '../../components/Box/Box.vue'
import Title from '../../components/Title/Title.vue'
import Comments from '../../components/Comments/Comments.vue'

export default {
    name: 'Home',
    data: function(){
        return {
            api: process.env.VUE_APP_API,
            token: JSON.parse(localStorage.getItem('headers')).token,
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            currentUser: {},
            newPostValue: '',
            errorCreatePost : '',
            successCreatePost: '',
            posts: [],
            updateStatus: [],
            updatePostContent: [],
            comment_post: null,
        }
    },
    components: {
        Box,
        Title,
        Comments
    },
    methods: {
        // Ouverture des commentaires
        onOpenComments: function(id_post) {
            this.comment_post = id_post
        },
        // Création d'un post
        onCreatePost: function(){
            fetch(`${this.api}/api/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },
                body: JSON.stringify({
                    message: this.newPostValue
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.successCreatePost = ''
                    this.errorCreatePost = data.error
                } else {
                    this.errorCreatePost = ''
                    this.newPostValue = ''
                    this.successCreatePost = 'Post crée avec succés !'
                    this.onGetAllPosts()
                }
            })
            .catch(error => {
                this.successCreatePost = ''
                this.errorCreatePost = error
            })
        },
        // Suppression d'un post
        onDeletePost: function(postId){
            if(confirm("Souhaitez-vous réellement supprimer ce post ?")){
                fetch(`${this.api}/api/post/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': this.token,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        console.log(error)
                    } else {
                        this.onGetAllPosts()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        // Suppression d'un partage
        onDeleteShare: function(shareId) {
            if(confirm("Souhaitez-vous réellement supprimer ce partage ?")){
                fetch(`${this.api}/api/post/share/${shareId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': this.token,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        console.log(error)
                    } else {
                        this.onGetAllPosts()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        // Partage d'un post
        onSharePost: function(postId){
            fetch(`${this.api}/api/post/share/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    this.onGetAllPosts()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // Récupération des données de l'utilisateur connecté
        onGetCurrentUser: function(){
            fetch(`${this.api}/api/users/${this.userId}`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(user => {
                this.currentUser = user;
            })
            .catch(error => console.log(error))
        },
        // Récupération de tous les messages crée
        onGetAllPosts: function(){
            fetch(`${this.api}/api/post/`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(posts => {
                this.posts = posts;
                posts.forEach((item, key) => {
                    this.updateStatus[key] = false
                    this.updatePostContent[key] = item.text_content
                })
                console.log(posts)
            })
            .catch(error => console.log(error))
        },
        // Ouvrir/fermer la suppression
        onUpdateOpen: function(index){
            this.updateStatus[index] = !this.updateStatus[index]
        },
        // Mise à jour du message
        onUpdatePost: function(id_post, content){
            fetch(`${this.api}/api/post/${id_post}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },
                body: JSON.stringify({
                    message: content
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    this.onGetAllPosts()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        onCloseComments: function() {
            this.comment_post = null
        }
    },
    beforeMount: function() {
        this.onGetCurrentUser()
        this.onGetAllPosts()
    }
}