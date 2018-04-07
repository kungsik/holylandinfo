<template>

<v-content style="padding-top: 70px">
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md8 offset-md2>
                <div class="headline">예루살렘</div>
                <v-progress-circular indeterminate :size="70" :width="7" color="purple" v-if="!jerusalem.postData[0]"></v-progress-circular>
                <v-layout row wrap>
                    <v-flex xs4 v-for= "post in jerusalem.postData" :key="post.createddate">
                        <v-card color="blue-grey darken-2" class="white--text" height="200px">
                            <v-card-title primary-title class="cardtitle" height="200px">
                                <div class="headline"> {{ post.title }} </div>
                                <div>{{ removeHtmlandCut(post.content, 30) }}</div>
                            </v-card-title>
                            <v-card-actions style="position: absolute; bottom: 0px">
                                <v-btn flat dark :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>  
                </v-layout>
                <template>
                    <div class="text-xs-center">
                        <v-pagination :length="jerusalem.pageNum" v-model="jerusalem.page" circle @input="showPage(jerusalem, jerusalem.dataPerPage, jerusalem.page)"></v-pagination>
                    </div>
                </template>                              
            </v-flex>

            <v-flex md12>
                <br>
                <v-divider></v-divider>
                <br>
            </v-flex>

            <v-flex md8 offset-md2>
                <div class="headline">갈릴리</div>
                <v-layout row wrap>
                    <v-flex xs4 v-for= "post in galilee.postData" :key="post.createddate">
                        <v-card color="blue-grey darken-2" class="white--text" height="200px">
                            <v-card-title primary-title class="cardtitle" height="200px">
                                <div class="headline"> {{ post.title }} </div>
                                <div>{{ removeHtmlandCut(post.content, 30) }}</div>
                            </v-card-title>
                            <v-card-actions style="position: absolute; bottom: 0px">
                                <v-btn flat dark :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>  
                </v-layout>
                <template>
                    <div class="text-xs-center">
                        <v-pagination :length="galilee.pageNum" v-model="galilee.page" circle @input="showPage(galilee, galilee.dataPerPage, galilee.page)"></v-pagination>
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
                    totalDataNum: 0,
                    pageNum: 0,
                    dataPerPage: 3,
                    startDataNum: 0,
                    category: "예루살렘"
                },
                galilee: {
                    page: 1,
                    postData: [],
                    totalDataNum: 0,
                    pageNum: 0,
                    dataPerPage: 3,
                    startDataNum: 0,
                    category: "갈릴리"
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
                await this.showPage(this.jerusalem, this.jerusalem.dataPerPage)
                await this.showPage(this.galilee, this.galilee.dataPerPage)
            } catch(error) {
                console.log('에러')
                // console.log(error.response.data.error)
            }
        },
        methods: {
            async showPage(location, dataPerPage, page = 1) {
                await PostService.getpostcount({category: location.category})
                    .then(function(value) {
                        location.totalDataNum = value.data.count
                        location.pageNum = Math.ceil(location.totalDataNum / dataPerPage)
                        location.startDataNum = ((page - 1) * dataPerPage)
                    })
                    .then(function() {
                        var result = PostService.listpost({
                            category: location.category, 
                            dataPerPage: dataPerPage,
                            startDataNum: location.startDataNum
                        })
                        .then(function(value) {
                            location.postData = value.data
                        })
                    })                 
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