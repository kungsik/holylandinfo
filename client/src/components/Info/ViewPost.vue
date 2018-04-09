<template>

    <v-content>
        <v-dialog v-model="loadDialog" fullscreen transition="false">
                <div id="loadDialog">
                    <v-progress-circular indeterminate :size="70" :width="7" color="purple" id="loadImg"></v-progress-circular>
                </div>
        </v-dialog>

        <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
                <v-flex id="postView">
                    <v-flex md12 offset-md2>
                        <div class="subheading" style="text-align:left; padding-bottom:10px"><a href="#" id="category">{{ category }} 지역</a></div> 
                        <div class="display-1" style="text-align:left; padding-bottom:50px"> <b>{{ title }}</b> </div>
                        <div class="caption" style="text-align:left"> {{ username }} ({{ email }}) <br>작성일: {{ createddate }}</div>
                    </v-flex>

                    <br>
                    <v-divider></v-divider>
                    <br>

                    <div class="map" id="map"></div>

                    <v-flex md8 offset-md2>
                        <div class="ql-editor" v-html="content"></div> 
                        <div v-if="email === loggedemail">
                            <v-btn dark class="cyan" :to="{path:'/post/editpost/' + postId}">수정</v-btn>    
                        </div>               
                    </v-flex>                
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>

</template>

 <script> 
    import UserService from '@/services/UserService'
    import PostService from '@/services/PostService'
    import mapboxgl from 'mapbox-gl'

    export default {
        data() {
            return {
                title: '',
                content: '',
                email: '',
                createddate: '',
                category: '',
                username: '',
                loggedemail: '',
                postId: '',
                loadDialog: true
            }
        },
        created: function() {
            const self = this
            if(localStorage.token) {
                UserService.checkAuthentification()
                    .then(function(value) {
                        if(value.email) {
                            self.loggedemail = value.email
                        }
                    })
            }
        },
        mounted: async function() {
            try {
                const postUrl = this.$route.params.postUrl.split("-")
                const response = await PostService.viewpost({postId: postUrl[0]})

                var date = new Date(response.data.post.createddate)
                var month = date.getMonth() + 1
                this.createddate = date.getFullYear() + "." + month + "." + date.getDate()

                this.title = response.data.post.title
                this.content = response.data.post.content
                this.email = response.data.post.email
                this.category = response.data.post.category
                this.username = response.data.post.username    
                this.postId = response.data.post.postId

                var center = {
                    lat: 32.500084, 
                    lng: 34.8907343
                }

                this.showMap(center)

                //로딩이 완전히 끝났음을 반환
                this.loadDialog = false

            } catch(error) {
                console.log(error.response.data.error)
            }
        },
        methods: {
            showMap(center) {
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: center,
                    zoom: 10
                })
                var marker = new google.maps.Marker({
                    position: center,
                    map: map
                });
            }
        }
    }
 </script>

 <style>
    .ql-editor {
        min-height: 300px
    }
    #postView {
        padding-top: 70px
    }
    a#category:link {
        text-decoration: none;
    }
    #map {
        width: 100%;
        height: 300px;
        /* left정렬을 해야 정상적으로 맵이 로딩됨 */
        /* text-align: left; */
    }

</style>