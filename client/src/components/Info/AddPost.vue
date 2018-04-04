<template>

<v-content>
    <div class="headline" style="padding:5% 0 0 0">글쓰기</div>
    <div id="texteditor">
        <form name="post" autocomplete="off">
            <v-layout row justify-space-between>
                <v-flex xs3>
                    <v-select label="카테고리" v-model="category" :items="categories" required></v-select>
                </v-flex>
                <v-flex xs8>
                    <v-text-field label="제목" v-model="title" required></v-text-field>
                </v-flex>
            </v-layout>
            <div id="editor"></div>
        </form>
    </div>

    <div v-show="!issubmitted">
        <v-btn dark class="cyan" @click="add">글쓰기</v-btn>
    </div>
</v-content>

</template>

 <script> 
    import Quill from 'quill'
    
    import { ImageDrop } from 'quill-image-drop-module'
    Quill.register('modules/imageDrop', ImageDrop)

    import BlotFormatter from "quill-blot-formatter"
    Quill.register('modules/blotFormatter', BlotFormatter)

    import UserService from '@/services/UserService'
    import PostService from '@/services/PostService'

    export default {
        data() {
            return {
                title: '',
                content: '',
                issubmitted: false,
                quill: {},
                email: '',
                username: '',
                createddate: '',
                category: '',
                categories: ["예루살렘", "갈릴리"]
            }
        },
        methods: {
            async add() {
                try {
                    this.issubmitted = true
                    const html = document.getElementsByClassName("ql-editor")
                    this.content = html[0].innerHTML
                    this.createddate = new Date().getTime()

                    //seo를 위한 접속 url 형식의 포스트 아이디 만들기
                    var random = Math.floor(Math.random() * 1000) + 1
                    var urlTitle = this.title.replace(/ /gi, "-")
                    const postId = random + "-" + urlTitle

                    const post = {
                        email: this.email,
                        username: this.username,
                        title: this.title,
                        content: this.content,
                        category: this.category,
                        createddate: this.createddate,
                        postId: postId
                    }

                    const response = await PostService.addpost(post)
                    
                    console.log(response.data.message)

                    
                } catch (error) {
                    console.log(error.response.data.error)
                    this.issubmitted = false
                }
            }
        },
        created: function() {
            const self = this
            UserService.checkAuthentification()
                .then(function(value) {
                    self.email = value.email
                    self.username = value.username
                })
        },
        mounted: function() {

            var toolbarOptions = [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],

                ['blockquote'],

                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'align': [] }],
                ['link', 'image']
            ]

            var quill = new Quill('#editor', {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions,
                    blotFormatter: {},
                    imageDrop: true
                }
            })
            this.quill = quill
        }
    }
 </script>

 <style>
    #texteditor {
        padding: 1% 5% 1% 5%
    }
    .ql-editor {
        min-height: 300px
    }

</style>