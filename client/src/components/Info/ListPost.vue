<template>

<v-content style="padding-top: 70px">
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md8 offset-md2>
                <div class="headline">예루살렘</div>
                <v-progress-circular indeterminate :size="70" :width="7" color="purple" v-if="!jerusalem.postData[0]"></v-progress-circular>
                <v-layout row wrap>
                    <v-flex xs4 v-for= "post in jerusalem.showPostData" :key="post.createddate">
                        <v-card color="blue-grey darken-2" class="white--text" height="200px">
                            <v-card-title primary-title class="cardtitle" height="200px">
                                <div class="headline"> {{ post.title }} </div>
                                <!-- <div>{{ removeHtmlandCut(post.content, 30) }}</div> -->
                            </v-card-title>
                            <v-card-actions style="position: absolute; bottom: 0px">
                                <v-btn flat dark :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>  
                </v-layout>
                <template>
                    <div class="text-xs-center">
                        <v-pagination :length="jerusalem.pageNum" v-model="jerusalem.page" circle @input="showPage(jerusalem, jerusalem.page)"></v-pagination>
                    </div>
                </template>                              
            </v-flex>

            <v-flex md8 offset-md2>
                <br>
                <v-divider></v-divider>
                <br>
            </v-flex>

            <v-flex md8 offset-md2>
                <div class="headline">갈릴리</div>
                <v-layout row wrap>
                    <v-flex xs4 v-for= "post in galilee.showPostData" :key="post.createddate">
                        <v-card color="blue-grey darken-2" class="white--text" height="200px">
                            <v-card-title primary-title class="cardtitle" height="200px">
                                <div class="headline"> {{ post.title }} </div>
                                <!-- <div>{{ removeHtmlandCut(post.content, 30) }}</div> -->
                            </v-card-title>
                            <v-card-actions style="position: absolute; bottom: 0px">
                                <v-btn flat dark :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>  
                </v-layout>
                <template>
                    <div class="text-xs-center">
                        <v-pagination :length="galilee.pageNum" v-model="galilee.page" circle @input="showPage(galilee, galilee.page)"></v-pagination>
                    </div>
                </template>                                 
            </v-flex>   

        </v-layout>
    </v-container>
</v-content>

</template>

 <script> 
    import PostService from '@/services/PostService'

    export default {
        data() {
            return {
                jerusalem: {
                    page: 1,
                    postData: [],
                    showPostData: [],
                    totalDataNum: 0,
                    pageNum: 0,
                    dataPerPage: 3,
                    startDataNum: 0,
                    endDataNum: 0
                },
                galilee: {
                    page: 1,
                    postData: [],
                    showPostData: [],
                    totalDataNum: 0,
                    pageNum: 0,
                    dataPerPage: 3,
                    startDataNum: 0,
                    endDataNum: 0
                },
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

                this.jerusalem.postData = result.data.jerusalem.reverse()
                this.galilee.postData = result.data.galilee.reverse()

                this.showPage(this.jerusalem)
                this.showPage(this.galilee)


            } catch(error) {
                console.log(error.response.data.error)
            }
        },
        methods: {
            showPage(location, page = 1) {
                location.totalDataNum = location.postData.length
                location.pageNum = Math.ceil(location.totalDataNum/location.dataPerPage)
                location.startDataNum = (location.page - 1) * location.dataPerPage
                location.endDataNum = location.page * location.dataPerPage - 1
                location.showPostData = location.postData
                location.showPostData = location.showPostData.slice(location.startDataNum, location.endDataNum + 1)
            }
        }
    }
 </script>

 <style>
    .cardtitle {
         display: block; 
         text-align: left;
    }

</style>