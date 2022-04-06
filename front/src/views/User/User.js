import Box from '../../components/Box/Box.vue'
import BoxProfile from '../../components/Box/BoxProfile.vue'
import Title from '../../components/Title/Title.vue'
import Trigger from '../../components/Trigger/Trigger.vue'
import Input from '../../components/Input/Input.vue'

export default {
    name: 'User',
    data: function(){
        return {
            api: process.env.VUE_APP_API,
            token: JSON.parse(localStorage.getItem('headers')).token,
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            userIdProfile: this.$route.params.id,
            currentUser: {},
            currentUserProfile: {},
            newPostValue: '',
            errorCreatePost : '',
            successCreatePost: '',
            errorUpdateUser : '',
            successUpdateUser: '',
            posts: [],
            updateStatus: [],
            updatePostContent: [],
            password: '',
            picture: '',
        }
    },
    components: {
        Box,
        BoxProfile,
        Title,
        Trigger,
        Input
    },
    methods: {
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
                    this.onGetAllUserPosts()
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
                        console.log(data.error)
                    } else {
                        this.onGetAllUserPosts()
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
                        this.onGetAllUserPosts()
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
                    this.onGetAllUserPosts()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // Récupération des données de la page utilisateur
        onGetUser: function(){
            fetch(`${this.api}/api/users/${this.userIdProfile}`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(user => {
                this.currentUserProfile = user;
            })
            .catch(error => console.log(error))
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
        onGetAllUserPosts: function(){
            fetch(`${this.api}/api/post/${this.userIdProfile}`, {
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
                    this.onGetAllUserPosts()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // Mise à jour du profile utilisateur
        onUpdateUserProfile: function() {

            let formData = new FormData();
            formData.append('lastName', this.currentUserProfile.lastName)
            formData.append('firstName', this.currentUserProfile.firstName)
            formData.append('email', this.currentUserProfile.email)
            formData.append('password', this.password)
            formData.append('picture', this.picture)


            fetch(`${this.api}/api/users/${this.userIdProfile}`, {
                method: 'PUT',
                headers: {
                    'authorization': this.token,
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.errorUpdateUser = data.error
                    this.successUpdateUser = ''
                } else {
                    this.errorUpdateUser = ''
                    this.successUpdateUser = 'Profile modifié avec succés !'
                    this.onGetAllUserPosts()
                }
            })
            .catch(error => {
                this.errorUpdateUser = error
                this.successUpdateUser = ''
            })
        },
        // Suppression de l'utilisateur
        onDeleteUser: function() {
            if(confirm('Souhaitez-vous vraiment supprimer votre profile ?')){         
                fetch(`${this.api}/api/users/${this.userIdProfile}`, {
                    method: 'DELETE',
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
                        localStorage.removeItem('headers')
                        window.location.href = "/"
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        // Récupération de l'image
        setPicture: function(e){
            this.picture = e.target.files[0]
        },
    },
    beforeMount: function() {
        this.onGetCurrentUser()
        this.onGetUser()
        this.onGetAllUserPosts()
    }
}