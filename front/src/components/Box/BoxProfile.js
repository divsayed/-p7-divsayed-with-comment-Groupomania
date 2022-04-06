import Trigger from '../Trigger/Trigger.vue'
import Error from '../Error/Error.vue'
import Success from '../Success/Success.vue'

export default {
    name: "BoxProfile",
    components: {
        Trigger,
        Error,
        Success
    },
    props: ['actionUpdate', 'actionDelete', 'error', 'success', 'picture']
}