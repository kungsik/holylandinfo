<template>

<v-content>
    <div class="headline" style="padding:5% 0 0 0">글쓰기</div>
    <div id="texteditor">
        <textarea name="content" id="editor" v-model="content"></textarea>
    </div>

    <div v-show="!issubmitted">
        <v-btn dark class="cyan" @click="add">글쓰기</v-btn>
    </div>
</v-content>

</template>

 <script>
    export default {
        components: {
        },
        data() {
            return {
                content: '',
                issubmitted: false
            }
        },
        methods: {
            async add() {
                console.log(issubmitted)
            }
        },
        mounted: function() {
            ClassicEditor
                .create(document.querySelector('#editor'))
                .catch(error => {
                    console.error(error)
                })
        }
    }
 </script>

 <style>
    #texteditor {
        padding: 1% 5% 1% 5%
    }

    .ck-content {
        height: 200px;
        text-align: justify;
    }

</style>