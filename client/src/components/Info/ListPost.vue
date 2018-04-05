<template>

<v-content style="padding-top: 70px">
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md8 offset-md2>
                <v-progress-circular indeterminate :size="70" :width="7" color="purple" v-if="!postData[0]"></v-progress-circular>
                <v-flex id="posts" v-for= "post in postData" :key="post.createddate">
                    <v-card color="blue-grey darken-2" class="white--text">
                        <v-card-title primary-title>
                            <div class="headline" style="display: block"> {{ post.title }} </div>
                            <!-- <div>{{ post.content.replace(/(<([^>]+)>)/ig,"").substring(0, 30) }} ...</div> -->
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat dark :to="{path: '/post/viewpost/' + post.postId}">읽기</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>                                
            </v-flex>
            <v-flex>
                <br>
                <v-divider></v-divider>
                <br>
            </v-flex>
            <v-flex md8 offset-md2>               
                                
            </v-flex>                
        </v-layout>
    </v-container>
</v-content>

</template>

 <script> 
    //import UserService from '@/services/UserService'
    import PostService from '@/services/PostService'
    //import router from '@/router/'

    export default {
        data() {
            return {
                postData: []
            }
        },
        mounted: async function() {
            try {
                const result = await PostService.listpost()
                this.postData = result.data


                // var date = new Date(response.data.post.createddate)
                // var month = date.getMonth() + 1
                // this.createddate = date.getFullYear() + "." + month + "." + date.getDate()            
            } catch(error) {
                console.log(error.response.data.error)
            }
        }
    }
 </script>

 <style>
    

</style>