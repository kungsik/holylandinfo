<template>

<v-content style="padding-top: 70px">
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md8 offset-md2>
                <v-progress-circular indeterminate :size="70" :width="7" color="purple" v-if="!postData[0]"></v-progress-circular>
                <v-flex id="posts" v-for= "post in postData.slice().reverse()" :key="post.createddate">
                    <v-card color="blue-grey darken-2" class="white--text">
                        <v-card-title primary-title class="cardtitle">
                            <div class="headline"> {{ post.title }} </div>
                            <div>{{ removeHtmlandCut(post.content, 30) }}</div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat dark :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>                                
            </v-flex>
            <!-- <v-flex>
                <br>
                <v-divider></v-divider>
                <br>
            </v-flex>
            <v-flex md8 offset-md2>               
                                
            </v-flex>                 -->
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
                postData: [],
                removeHtmlandCut(str, num) {
                    var dots
                    if(str.length > num) {
                        dots = "..."
                    } else { dots = "" }
                    return str.replace(/(<([^>]+)>)/ig,"").substring(0, num) + dots
                }
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
    .cardtitle {
         display: block; 
         text-align: justify;
    }

</style>