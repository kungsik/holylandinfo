<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div class="headline" style="padding-top:50px">회원가입</div>
      <div>
        <form 
          name="tab-tracker-form"
          autocomplete="off">
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          가입
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'Register',
    data () {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async register () {
        try {
          const response = await UserService.register({
            email: this.email,
            password: this.password
          })
          console.log(response)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
}
</script>