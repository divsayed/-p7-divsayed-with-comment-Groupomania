import Trigger from '../../components/Trigger/Trigger.vue'
import Error from '../../components/Error/Error.vue'
import Success from '../../components/Success/Success.vue'
import Input from '../../components/Input/Input.vue'

export default {
    name: 'Connexion',
    data: function(){
        return {
            api: process.env.VUE_APP_API,
            
            tabs: true,
            
            connexionEmail: '',
            connexionPassword: '',
            connexionErreur: '',

            inscriptionLastName: '',
            inscriptionFirstName: '',
            inscriptionEmail: '',
            inscriptionPassword: '',
            inscriptionErreur: '',
            inscriptionSuccess: '',
            
        }
    },
    components: {
        Trigger,
        Input,
        Error,
        Success
    },
    methods: {
        // Permet de changer entre la connexion et l'inscription
        onChangeTabs: function(value){
            this.tabs = value
        },
        // Permet de se connecter
        onConnect: function() {
            if(
                this.connexionEmail != "" && 
                this.connexionPassword != "" 
            ) {
                this.connexionErreur = ""

                fetch(`${this.api}/api/users/login`, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.connexionEmail,
                        password: this.connexionPassword
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data.error) {
                        this.connexionErreur = data.error
                    } else {
                        localStorage.setItem('headers', JSON.stringify({
                            token: `Bearer ${data.token}`,
                            userId: data.userId,
                            isAdmin: data.admin
                        }))
                        this.$router.push('/home')
                    }
                })
                .catch(err => this.connexionErreur = err)
            } else {
                this.connexionErreur = "Veuillez compléter tous les champs !"
            }
        },
        // Permet de s'inscrire / Créer un utilisateur
        onSubscribe: function() {
            if(
                this.inscriptionEmail != "" && 
                this.inscriptionPassword != "" &&
                this.inscriptionLastName != "" &&
                this.inscriptionFirstName != ""
            ) {

                this.inscriptionErreur = ""
                
                fetch(`${this.api}/api/users/signup`, {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstName: this.inscriptionFirstName,
                            lastName: this.inscriptionLastName,
                            email: this.inscriptionEmail,
                            password: this.inscriptionPassword
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.error) {
                            this.inscriptionErreur = data.error
                        } else {
                            console.log(data)
                            this.inscriptionSuccess = "Utilisateur " + this.inscriptionLastName + " " + this.inscriptionFirstName + " inscrit avec succès !!!"
                        }
                    })
                    .catch(err => this.inscriptionErreur = err)

            } else {
                this.inscriptionSuccess = ""
                this.inscriptionErreur = "Veuillez compléter tous les champs !"
            }
        }
    }

}