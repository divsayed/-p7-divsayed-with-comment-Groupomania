export default {
    name: 'Header',
    data: function(){
        return {
            userId: JSON.parse(localStorage.getItem('headers')).userId
        }
    },
    methods: {
        // Permet de se déconnecter
        onDisconnect: function(){
            localStorage.removeItem('headers')
            this.$router.push('/')
        }
    }
}