<template>
    <div>
        <!-- <el-form-item :label="field.name"> -->
            <script id="" type="text/plain" style="width:1000px;height:500px"></script>
        <!-- </el-form-item> -->
    </div>
</template>
<script>
export default {
    name: 'UE',
    data() {
        return {
            id: 'editor1',
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            }
        }
    },
    props: {
        field: {
            type: Object
        }
    },
    mounted() {
        const _this = this;
        console.log(UE );
        this.editor = UE.getEditor(this.id, this.config);
        // this.editor.addListener('ready', function(){
           // _this.editor.setContent( _this.defaultMsg );
        // });
        console.log('上传接口')
    },
    methods: {
        getUEContent() {//获取内容
            return this.editor.getContent()
        },
        getUEContentTxt() {//获取纯文本
            return this.editor.getContentTxt()
        }
    },
    destroyed() {
        this.editor.destroy();
    }
}
</script>
