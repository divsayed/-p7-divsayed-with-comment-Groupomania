import Trigger from '../Trigger/Trigger.vue'
import Poster from '../../components/Poster/Poster.vue'
import Error from '../../components/Error/Error.vue'
import Success from '../../components/Success/Success.vue'

export default {
    name: 'Box',
    components: {
        Trigger,
        Poster,
        Error,
        Success,
    },
    data: function(){
        return {
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            isAdmin: JSON.parse(localStorage.getItem('headers')).isAdmin
        }
    },
    methods: {
        // Permet de convertir la date/heure reçu
        getDateHour: function(theDate) {
            let date = theDate.split('T')[0].split('-')
            let hour = ('0' + (Number(theDate.split('T')[1].split('.')[0].split(':')[0]) + 2)).slice(-2)
            let minute = theDate.split('T')[1].split('.')[0].split(':')[1]

            return `${date[2]}/${date[1]}/${date[0]} à ${hour}:${minute}`
        }
    },
    props: [
        'create_picture_user',
        'create_name',
        'share_name',
        'create_date',
        'share_date',
        'create_description',
        'share_description',
        'post_id',
        'share_id',
        'create_user_id',
        'share_user_id',
        'text_content',
        'writing',
        'textarea_value',
        'action',
        'actionDeletePost',
        'actionDeleteShare',
        'actionUpdateOpen',
        'actionUpdatePost',
        'success',
        'error',
        'trigger_content',
        'type',
        'updateStatus',
        'comments',
        'actionOpenComments'
    ],
    beforeMount: function(){
        console.log(this.updateStatus)
    }

}