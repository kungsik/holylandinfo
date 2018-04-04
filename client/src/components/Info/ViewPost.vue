<template>

<v-content>
    <div class="headline" style="padding:5% 0 0 0">글읽기</div>
    <div id="postview">
        <v-layout row justify-space-between>
            <v-flex xs3>
                <div id="category"> {{ category }} </div>
            </v-flex>
            <v-flex xs8>
                <div id="title"> {{ title }} </div>
            </v-flex>
        </v-layout>
        <div id="content" v-html="content" class="ql-editor"></div>
        <br><br>
        <span style="text-align: right">
            작성일: {{ createddate }}<br>
            작성자: {{ username }} ({{ email }})
        </span>
    </div>
</v-content>

</template>

 <script> 
    import Quill from 'quill'
    import UserService from '@/services/UserService'
    import PostService from '@/services/PostService'
    import router from '@/router/'

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

                this.title = response.data.post.title
                this.content = response.data.post.content
                this.email = response.data.post.email
                this.createddate = response.data.post.createddate
                this.category = response.data.post.category
                this.username = response.data.post.username            
            } catch(error) {
                console.log(error.response.data.error)
            }
        }
    }
 </script>

 <style>
    #postview {
        padding: 1% 5% 1% 5%
    }
    .ql-editor {
        min-height: 300px
    }

</style>