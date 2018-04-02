<template>

<v-content>
    <div class="headline" style="padding-top:5%; padding-right:5%; padding-left:5%">글쓰기<br><br>
        <vue-editor id="editor" v-model="content"></vue-editor>
    </div>

    <div v-show="!issubmitted">
        <v-btn dark class="cyan" @click="add">글쓰기</v-btn>
    </div>
</v-content>

</template>

 <script>
   import { VueEditor } from 'vue2-editor'

   export default {
        components: {
            VueEditor
        },
        data() {
            return {
                content: '<h1>Some initial content</h1>',
                issubmitted: false
            }
        },
        methods: {
            async add() {
                console.log(issubmitted)
            }
        }
   }
 </script>

 <style>
  #editor {
    height: 100%;
  }
</style>