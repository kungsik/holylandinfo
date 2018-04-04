<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div v-show="!isregistered">
        <div class="headline" style="padding-top:50px">회원가입</div>
        <div>
          <form name="gopilgrims-form" autocomplete="off">
            <v-text-field label="이름" v-model="username"></v-text-field>
            <br>
            <v-text-field label="이메일" v-model="email"></v-text-field>
            <br>
            <v-text-field label="비밀번호" type="password" v-model="password" autocomplete="new-password"></v-text-field>
          </form>
          <br>
          <div v-html="result" />
          <br>
          <div v-show="!issubmitted">
            <v-btn dark class="cyan" @click="register">가입</v-btn>
          </div>
        </div>
      </div>
      <div v-show="isregistered">
        <div class="headline" style="padding-top:50px">
          {{ registeredname }}님 환영합니다. <br>
          회원가입이 정상적으로 완료되었습니다. <br>
          상단의 로그인 버튼을 눌러 로그인해 주세요.
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from '@/services/UserService'
import router from '@/router/'

export default {
    name: 'Register',
    data () {
      return {
        username: '',
        email: '',
        password: '',
        result: null,
        issubmitted: false,
        isregistered: false,
        registeredname: ''
      }
    },
    created: function() {
        // const self = this
        if(localStorage.token) {
            UserService.checkAuthentification()
                .then(function() {
                    alert('이미 로그인 되어 있습니다.')
                    router.push('/')
                })
        }
    },
    methods: {
      async register () {
        try {
          this.issubmitted = true
          const response = await UserService.register({
            username: this.username,
            email: this.email,
            password: this.password
          })
          this.result = response.data.message
          this.registeredname = response.data.user.username
          this.issubmitted = false
          this.isregistered = true
        } catch (error) {
          this.result = error.response.data.error
          this.issubmitted = false
        }
      }
    }
}
</script>