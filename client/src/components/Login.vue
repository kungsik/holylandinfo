<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div v-show="!token">
        <div class="headline" style="padding-top:90px">로그인</div>
        <div>
          <form name="gopilgrims-form" autocomplete="off">
            <v-text-field label="이메일" v-model="email"></v-text-field>
            <br>
            <v-text-field label="비밀번호" type="password" v-model="password" autocomplete="new-password"></v-text-field>
          </form>
          <br>
          <div v-html="error" />
          <br>
          <div v-show="!issubmitted">
            <v-btn dark class="cyan" @click="login">로그인</v-btn>
          </div>
        </div>
      </div>
      <div v-show="token">
        <div class="headline" style="padding-top:50px">
          {{ username }}님으로 로그인 되셨습니다. <br>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from '@/services/UserService'
import router from '@/router/'

export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        issubmitted: false,
        isloggedin: false,
        error: '',
        token: localStorage.getItem("token"),
        username: ''
      }
    },
    created: function() {
        const self = this
        if(localStorage.token) {
            UserService.checkAuthentification()
                .then(function(value) {
                    self.islogged = true
                    self.username = value.username
                })
        }
    },
    methods: {
      async login () {
        try {
          this.issubmitted = true
          const response = await UserService.login({
            email: this.email,
            password: this.password
          })
          this.issubmitted = false
          this.token = response.data.token
          this.username = response.data.user.username
          localStorage.setItem("token", this.token)
          router.go()
          router.push('/')
        } catch (error) {
          this.error = error.response.data.error
          this.issubmitted = false
        }
      }
    }
}
</script>