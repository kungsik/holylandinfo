<template>

<v-content style="padding-top: 70px">
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md10 offset-md1>
                <div class="headline">예루살렘</div>
                <v-progress-circular indeterminate :size="70" :width="7" color="purple" v-if="!jerusalem.postData[0]"></v-progress-circular>
                <v-layout row wrap>
                    <v-flex v-for= "post in jerusalem.postData" :key="post.createddate">
                        <v-card height="350px">
                            <v-card-media>
                                <img :src="getTitleImg(post.content)" height="200px" class="titleImg">
                            </v-card-media>
                            <v-card-title primary-title class="cardtitle" height="200px">
                                <div class="headline"> {{ post.title }} </div>
                                <div>{{ removeHtmlandCut(post.content, 30) }}</div>
                            </v-card-title>
                            <v-card-actions class="submitbutton">
                                <v-btn outline round color="indigo" :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
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

            <v-flex md10 offset-md1>
                <div class="headline">갈릴리</div>
                <v-layout row wrap>
                    <v-flex v-for= "post in galilee.postData" :key="post.createddate">
                        <v-card height="350px">
                            <v-card-media>
                                <img :src="getTitleImg(post.content)" height="200px" class="titleImg">
                            </v-card-media>
                            <v-card-title primary-title class="cardtitle" height="200px">
                                <div class="headline"> {{ post.title }} </div>
                                <div>{{ removeHtmlandCut(post.content, 30) }}</div>
                            </v-card-title>
                            <v-card-actions class="submitbutton">
                                <v-btn outline round color="indigo" :to="{path: '/post/viewpost/' + post.postUrl}">읽기</v-btn>
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
                    dataPerPage: 4,
                    startDataNum: 0,
                    category: "예루살렘" 
                },
                galilee: {
                    page: 1,
                    postData: [],
                    totalDataNum: 0,
                    pageNum: 0,
                    dataPerPage: 4,
                    startDataNum: 0,
                    category: "갈릴리"
                },
                removeHtmlandCut(str, num) {
                    var dots
                    if(str.length > num) {
                        dots = "..."
                    } else { dots = "" }
                    return str.replace(/(<([^>]+)>)/ig,"").substring(0, num) + dots
                },
                getTitleImg(content) {
                    var imgsrc = content.match("<img[^>]*src=[\"']?([^>\"']+)[\"']")[0]
                    var src = imgsrc.replace("<img src=", "").replace("\"", "").replace("\"", "")
                    return src
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
    .titleImg {
        object-fit: cover
    }
    .submitbutton {
        position: absolute; 
        bottom: 0px;
    }

</style>