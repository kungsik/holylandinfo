<template>     
     <v-content>
       <section>
         <v-parallax :src="require('../assets/img/galilee.jpg')" height="600">
           <v-layout
             column
             align-center
             justify-center
             class="white--text"
           >
             <img src="../assets/img/logo.png" alt="GoPilgrims" height="200">
             <v-btn
               class="blue lighten-2 mt-5"
               dark
               large
               href="/pre-made-themes"
             >
               시작하기
             </v-btn>
           </v-layout>
         </v-parallax>
       </section>

       <section>
         <v-layout
           column
           wrap
           class="my-5"
           align-center
         >
           <v-flex xs12 sm4 class="my-3">
             <div class="text-xs-center">
               <h2 class="headline">성지를 향한 지름길</h2>
               <span class="subheading">
                 보람있고 알찬 성지 여행을 위한 자상한 길동무가 되어 드립니다.
               </span>
             </div>
           </v-flex>
           <v-flex xs12>
             <v-container grid-list-xl>
               <v-layout row wrap align-center>
                 <v-flex xs12 md4>
                   <v-card class="elevation-0 transparent">
                     <v-card-text class="text-xs-center">
                       <v-icon x-large class="blue--text text--lighten-2">library_books</v-icon>
                     </v-card-text>
                     <v-card-title primary-title class="layout justify-center">
                       <div class="headline text-xs-center">성지 지역 안내</div>
                     </v-card-title>
                     <v-card-text style="text-align:justify">
                       성지순례는 사전 지식이 중요합니다. 
                       미리 준비가 되어 있지 않으면 자칫 많은 것을 놓칠 수 있죠. 
                       GoPilgrims는 성지의 다양한 장소에 대한 유익한 정보를 제공해 드립니다. 
                     </v-card-text>
                   </v-card>
                 </v-flex>
                 <v-flex xs12 md4>
                   <v-card class="elevation-0 transparent">
                     <v-card-text class="text-xs-center">
                       <v-icon x-large class="blue--text text--lighten-2">explore</v-icon>
                     </v-card-text>
                     <v-card-title primary-title class="layout justify-center">
                       <div class="headline">성지 여행 일정 만들기</div>
                     </v-card-title>
                     <v-card-text style="text-align:justify">
                       개인적으로 여행을 가고 싶어도 어떻게 일정을 짤 지 몰라 망설여질 때가 있습니다. 
                       GoPilgrims에서는 가기 원하시는 장소를 입력하시면 최적화된 일정을 자동으로 생성해서 알려드립니다.  
                     </v-card-text>
                   </v-card>
                 </v-flex>
                 <v-flex xs12 md4>
                   <v-card class="elevation-0 transparent">
                     <v-card-text class="text-xs-center">
                       <v-icon x-large class="blue--text text--lighten-2">search</v-icon>
                     </v-card-text>
                     <v-card-title primary-title class="layout justify-center">
                       <div class="headline text-xs-center">일정체크하기</div>
                     </v-card-title>
                     <v-card-text  style="text-align:justify">
                       단체 순례 여행 계획이 있으신가요? 여행사에서 합리적인 일정을 제공하는지
                       혹은 무리한 일정을 제공하는지 궁금하신가요? GoPilgrims에서 이에 대한
                       정보도 체크해 드립니다. 
                     </v-card-text>
                   </v-card>
                 </v-flex>
               </v-layout>
             </v-container>
           </v-flex>
         </v-layout>
       </section>

       <section>
         <v-parallax :src="require('../assets/img/desert.jpg')" height="380">
           <v-layout column align-center justify-center>
             <div class="headline">성지 여행의 동반자가 되어 드립니다.</div>
             <em>GoPilgrims를 통해 일정을 계획해 보세요.</em>
             <v-btn
               class="blue lighten-2 mt-5"
               dark
               large
               href="/pre-made-themes"
             >
               시작하기
             </v-btn>
           </v-layout>
         </v-parallax>
       </section>

       <section>
         <v-container grid-list-xl>
           <v-layout row wrap justify-center class="my-5">
             <v-flex xs12 sm4>
               <v-card class="elevation-0 transparent">
                 <v-card-title primary-title class="layout justify-center">
                   <div class="headline">Company info</div>
                 </v-card-title>
                 <v-card-text>
                   Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                   Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                   Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                 </v-card-text>
               </v-card>
             </v-flex>
             <v-flex xs12 sm4 offset-sm1>
               <v-card class="elevation-0 transparent">
                 <v-card-title primary-title class="layout justify-center">
                   <div class="headline">Contact us</div>
                 </v-card-title>
                 <v-card-text>
                   Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                 </v-card-text>
                 <v-list class="transparent">
                   <v-list-tile>
                     <v-list-tile-action>
                       <v-icon class="blue--text text--lighten-2">phone</v-icon>
                     </v-list-tile-action>
                     <v-list-tile-content>
                       <v-list-tile-title>777-867-5309</v-list-tile-title>
                     </v-list-tile-content>
                   </v-list-tile>
                   <v-list-tile>
                     <v-list-tile-action>
                       <v-icon class="blue--text text--lighten-2">place</v-icon>
                     </v-list-tile-action>
                     <v-list-tile-content>
                       <v-list-tile-title>Chicago, US</v-list-tile-title>
                     </v-list-tile-content>
                   </v-list-tile>
                   <v-list-tile>
                     <v-list-tile-action>
                       <v-icon class="blue--text text--lighten-2">email</v-icon>
                     </v-list-tile-action>
                     <v-list-tile-content>
                       <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                     </v-list-tile-content>
                   </v-list-tile>
                 </v-list>
               </v-card>
             </v-flex>
           </v-layout>
         </v-container>
       </section>

       <v-footer class="black darken-2">
         <v-layout row wrap align-center>
           <v-flex xs12>
             <div class="white--text ml-3">
               GoPilgrims (Since 2018)
             </div>
           </v-flex>
         </v-layout>
       </v-footer>
     </v-content>
</template>

<script>

export default {
  name: 'Main'
}

</script>

<style>

</style>
