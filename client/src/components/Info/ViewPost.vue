<template>

<v-content>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex id="postView">
                <v-flex md12 offset-md2>
                    <div class="subheading" style="text-align:left; padding-bottom:10px"><a href="#" id="category">{{ category }} 지역</a></div> 
                    <div class="display-1" style="text-align:left; padding-bottom:50px"> <b>{{ title }}</b> </div>
                    <div class="caption" style="text-align:left"> {{ username }} ({{ email }}) <br>작성일: {{ createddate }}</div>
                </v-flex>
                <!-- <v-flex> -->
                    <br>
                    <v-divider></v-divider>
                    <br>
                <!-- </v-flex> -->
                <v-flex md8 offset-md2>               
                    <div class="ql-editor" v-html="content"></div>                
                </v-flex>                
            </v-flex>
        </v-layout>
    </v-container>
</v-content>

</template>

 <script> 
    //import Quill from 'quill'
    //import UserService from '@/services/UserService'
    import PostService from '@/services/PostService'
    //import router from '@/router/'

    export default {
        data() {
            return {
                title: '',
                content: '',
                email: '',
                createddate: '',
                category: '',
                username: ''
            }
        },
        mounted: async function() {
            try {
                const postId = this.$route.params.postId 
                const response = await PostService.viewpost({postId: postId})

                var date = new Date(response.data.post.createddate)
                var month = date.getMonth() + 1
                this.createddate = date.getFullYear() + "." + month + "." + date.getDate()

                this.title = response.data.post.title
                this.content = response.data.post.content
                this.email = response.data.post.email
                this.category = response.data.post.category
                this.username = response.data.post.username            
            } catch(error) {
                console.log(error.response.data.error)
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

</style>