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
            <v-btn flat class="button" :to="{path:'/register'}">
            회원가입
            </v-btn>
        </v-toolbar-items>
     </v-toolbar>
</template>


<script>

export default {
  name: 'Header'
}

</script>

<style>

</style>
