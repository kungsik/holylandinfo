<template>
  <v-toolbar class="white">
       <v-toolbar-title style="padding-right:40px">
           <router-link to= "/">
           <img src="../assets/img/logo.png" height="55">
           </router-link>
        </v-toolbar-title>
       <v-toolbar-items class="hidden-sm-and-down">
           <v-btn flat class="button">성지정보</v-btn>
           <v-btn flat class="button">여행일정</v-btn>
           <v-btn flat class="button">일정체크</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <template v-if="!islogged">
                <v-btn flat class="button" :to="{path:'/register'}">
                    회원가입
                </v-btn>
                <v-btn flat class="button" :to="{path:'/login'}">
                    로그인
                </v-btn>
            </template>
            <template v-if="islogged">
                <v-btn flat class="button" :to="{path:'/member'}">
                    {{username}} 님
                </v-btn>
                <v-btn flat class="button" @click="logout">
                    로그아웃
                </v-btn>
            </template>
        </v-toolbar-items>
     </v-toolbar>
</template>


<script>

import UserService from '@/services/UserService'
import router from '@/router/'

export default {
    name: 'Header',
    data() {
        return {
            islogged: false,
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
        async logout() {
            localStorage.clear()
            router.go()
            router.push('/')
        }
    }
}

</script>

<style>

</style>
