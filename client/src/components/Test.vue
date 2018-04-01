<template>

<v-content>
    <div v-text="result"></div>
</v-content>

</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'Test',
    data() {
        return {
            error: null,
            result: null
        }
    },
    created: function() {
        if(!localStorage.token) {
            this.result = "not logged in"
        }
        else {
            this.result = UserService.checkAuthentification()
            console.log(this.result)
        }
    }
}

</script>