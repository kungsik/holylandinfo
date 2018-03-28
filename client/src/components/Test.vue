<template>

<v-content>

    <v-btn
    dark
    class="cyan"
    @click="test">
    실행
    </v-btn>

    <div v-text="error"></div>
    <div v-text="result"></div>
</v-content>

</template>

<script>
import TestService from '@/services/TestService'

export default {
    name: 'Test',
    data() {
        return {
            error: null,
            result: null
        }
    },
    methods: {
        async test () {
            try {
                const response = (await TestService.test()).data 
                this.result = response.test
                console.log(response)
            } 
            catch (error) {
                console.log(error)
            } 
        }
    }
}
</script>