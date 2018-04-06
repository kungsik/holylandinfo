<template>

<v-content>
    <div class="headline addPostTitle" v-if="!editId">새로운 글 작성</div>
    <div class="headline addPostTitle" v-if="editId">글 수정</div>
    <div id="texteditor">
        <form name="post" autocomplete="off">
            <v-layout row justify-space-between>
                <v-flex md8 offset-md2>
                    <v-flex md2>
                        <v-select label="카테고리" v-model="category" :items="categories"></v-select>
                    </v-flex>
                    <v-flex md12>
                        <v-text-field label="제목" v-model="title" :rules="[rules.required]"></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <div id="editor"></div>
                    </v-flex>
                </v-flex>
            </v-layout>
        </form>
    </div>

    <!-- <div v-show="!issubmitted"> -->
    <div v-if="!editId">
        <v-btn dark class="cyan" @click="add">글쓰기</v-btn>
    </div>
    <div v-if="editId">
        <v-btn dark class="cyan" @click="edit">글수정</v-btn>
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
    import router from '@/router/'

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
                categories: ["예루살렘", "갈릴리"],
                rules: {
                    required: (value) => !!value || '필수 항목입니다.'
                },
                editId: this.$route.params.editId
            }
        },
        methods: {
            async add() {
                try {
                    this.issubmitted = true
                    const html = document.getElementsByClassName("ql-editor")
                    this.content = html[0].innerHTML
                    this.createddate = new Date().getTime()

                    const query = {
                        email: this.email,
                        username: this.username,
                        title: this.title,
                        content: this.content,
                        category: this.category,
                        createddate: this.createddate
                    }

                    const response = await PostService.addpost(query)
                    
                    console.log(response.data.message)

                    
                } catch (error) {
                    console.log(error.response.data.error)
                    this.issubmitted = false
                }
            },
            async edit() {
                try{
                    this.issubmitted = true
                    const html = document.getElementsByClassName("ql-editor")
                    this.content = html[0].innerHTML
                    this.editeddate = new Date().getTime()

                    const query = {
                        editId: this.editId,
                        content: this.content,
                        editeddate: this.editeddate,
                        category: this.category,
                        title: this.title
                    }

                    const response = await PostService.editpost(query)

                    console.log(response.data.message)

                } catch (error) {
                    console.log(error.response.data.error)
                    this.issubmitted = false
                }

            }
        },
        created: async function() {
            var self = this
            await UserService.checkAuthentification()
                .then(function(value) {
                    self.email = value.email
                    self.username = value.username
                    //수정 모드일 경우 유저의 이메일과 글의 이메일을 비교
                    if(self.$route.params.editId) {
                        const editId = self.$route.params.editId
                        PostService.viewpost({postId: editId})
                            .then(function(response) {
                                if(self.email !== response.data.post.email) {
                                    alert('글 수정 권한이 없습니다.' + this.email)
                                    router.push({path: '/'})
                                }
                                self.title = response.data.post.title
                                self.category = response.data.post.category
                                self.quill.clipboard.dangerouslyPasteHTML(response.data.post.content)
                            })                        
                    }
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
        min-height: 240px;
    }
    .ql-toolbar.ql-snow {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #bfbfbf
        
    }
    .ql-container.ql-snow {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #bfbfbf
    }
    .headline.addPostTitle {
        padding:90px 0 0 0;
    }

</style>