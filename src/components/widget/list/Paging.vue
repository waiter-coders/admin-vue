<template>
<!-- 分页 -->
<nav style="width: 80%;text-align: center;">
    <ul class="pagination pagination-sm">
        <li v-if="paging.total == 1">
            <a :href="paging.preUrl" aria-label="Previous"><span aria-hidden="true">上一页</span></a>
        </li>
        <li >
        <a :href="paging.firstUrl" aria-label="Previous"><span aria-hidden="true">首页</span></a>
        </li>
        <li v-for="(key, url) in paging.pageRange" v-bind:key="key">
            <a :href="url">{{ num }}</a>
        </li>
        <li>
        <a :href="paging.lastUrl" aria-label="Previous"><span aria-hidden="true">末页</span></a>
        </li>
        <li v-if="paging.current != paging.total">
            <a :href="paging.nextUrl" aria-label="Next"><span aria-hidden="true">下一页</span></a>
        </li>
    </ul>
</nav>
</template>
<script>
export default {
    data(){
        return {
            paging:{

            }
        };
    },
    created:function(){
        this.loadPaging();
    },
    methods: {
        loadPaging : function(){
            this.paging = {};
        },
    },
}
</script>
