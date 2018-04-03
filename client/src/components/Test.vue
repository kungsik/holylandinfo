<template>

<v-content>
    <div v-text="result"></div>
</v-content>

</template>

<script>
import UserService from '@/services/UserService'
// import router from '@/router/'

export default {
    name: 'Test',
    data() {
        return {
            error: null,
            result: null
        }
    },
    created: function() {
        const self = this
        UserService.checkAuthentification()
            .then(function(value) {
                self.result = value.username
            })
    }
}

</script>