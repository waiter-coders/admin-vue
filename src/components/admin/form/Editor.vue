<template>
    <div>
        <vue-editor v-model="content"></vue-editor>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
    name: 'editor',
    components:{
        VueEditor
    },
    data() {
        return {
            id: 'editor1',
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            content:"<h1>Some initial content</h1>"
        }
    },
    props: {
        field: {
            type: Object
        }
    }
}
</script>
