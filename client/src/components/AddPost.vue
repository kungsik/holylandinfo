<template>

<v-content>
    <div class="headline" style="padding:5% 0 0 0">글쓰기</div>
    <div id="texteditor">
        <div id="editor"></div>
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

    const render = require('quill-render')

    export default {
        data() {
            return {
                content: '',
                issubmitted: false,
                quill: {}
            }
        },
        methods: {
            async add() {
                this.content = this.quill.getContents()
                var delta = JSON.stringify(this.content)
                var parseddelta = JSON.parse(delta)
                var rendereddata = render(parseddelta.ops)
                console.log(rendereddata)
            }
        },
        mounted: function() {

            var toolbarOptions = [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],

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

</style>