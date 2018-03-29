<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div class="headline" style="padding-top:50px">회원가입</div>
      <div>
        <form 
          name="gopilgrims-form"
          autocomplete="off">
          <v-text-field
            label="이름"
            v-model="username"
          ></v-text-field>
          <br>
          <v-text-field
            label="이메일"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="비밀번호"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <div v-html="result" />
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
        username: '',
        email: '',
        password: '',
        result: null
      }
    },
    methods: {
      async register () {
        try {
          const response = await UserService.register({
            username: this.username,
            email: this.email,
            password: this.password
          })
          this.result = response.data.message
        } catch (error) {
          this.result = error.response.data.error
        }
      }
    }
}
</script>