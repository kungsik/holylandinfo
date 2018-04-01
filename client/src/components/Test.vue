<template>

<v-content>


    <div v-html="error"></div>
    <div v-text="result" id="result"></div>
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
    }
}

</script>