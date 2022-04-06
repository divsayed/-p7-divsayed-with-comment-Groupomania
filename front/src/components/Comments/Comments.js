import Box from '../../components/Box/Box.vue'
import Title from '../../components/Title/Title.vue'

export default {
    name: 'Comments',
    components: {
        Box,
        Title
    },
    data: function(){
        return {
            api: process.env.VUE_APP_API,
            token: JSON.parse(localStorage.getItem('headers')).token,
            newCommentValue: '',
            errorCreateComment : '',
            successCreateComment: '',
            comments: [],
            updateStatus: [],
            updateCommentContent: []
        }
    },
    props: ['id_post', 'actionCloseComments'],
    methods: {
        // Création d'un commentaire
        onCreateComment: function(){
            fetch(`${this.api}/api/post/${this.id_post}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },
                body: JSON.stringify({
                    message: this.newCommentValue
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.successCreateComment = ''
                    this.errorCreateComment = data.error
                } else {
                    this.errorCreateComment = ''
                    this.newCommentValue = ''
                    this.successCreateComment = 'Commentaire crée avec succés !'
                    this.onGetAllComments()
                }
            })
            .catch(error => {
                this.successCreateComment = ''
                this.errorCreateComment = error
            })
        },
        // Récupérer tous les commentaires d'un post
        onGetAllComments: function(){
            fetch(`${this.api}/api/post/${this.id_post}/comments`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(comments => {
                this.comments = comments;
                comments.forEach((item, key) => {
                    this.updateStatus[key] = false
                    this.updateCommentContent[key] = item.text_content
                })
            })
            .catch(error => console.log(error))
        },
        // Supprimer un commentaire
        onDeleteComment(commentId) {
            if(confirm("Souhaitez-vous réellement supprimer ce commentaire ?")){
                fetch(`${this.api}/api/post/comments/${commentId}`, {
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
                        this.onGetAllComments()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        // Mise à jour du commentaire
        onUpdateComment: function(id_comment, content){
            fetch(`${this.api}/api/post/comments/${id_comment}`, {
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
                    this.onGetAllComments()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // Ouvre la modification du commentaire
        onUpdateOpen: function(index){
            this.updateStatus[index] = !this.updateStatus[index]
        },
    },
    watch: {
        id_post(){
            this.onGetAllComments()
        }
    },
    beforeMount: function(){
        this.onGetAllComments()
    }
}