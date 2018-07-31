<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :config="search" @search="searchClick" v-if="search.fields.length > 0"></search>
      <button-group class="list-table-actions" :config="{actions:tableActions}" @click="actionsClick" v-if="tableActions.length > 0"></button-group>
    </div>    
    <table-list class="list-table" :config="list" @click="actionsClick" ref="table_list"></table-list>
    <paging class="list-paging" 
    @changePaging="changePaging"
    :config="paging"
     v-if="paging.totalNum > paging.pageSize"></paging>
  </div>  
</template>

<script>
import { getList, getTotalNum, deleteByIds } from "@/api/admin/adminList";
import ButtonGroup from "@/widgets/admin/public/ButtonGroup";
import Search from "@/widgets/admin/public/Search";
import TableList from "./list/Table";
import Paging from "./list/Paging";
import { Loading } from "element-ui";

import fetch from "@/utils/service";
import pageUtil from "@/utils/page";

/*
【列表组件】
用于渲染列表

@配置：
config:{
  fields:[],
  search:[],
  tableActions:[],
  rowActions:[],
  paging:{}
}


@事件：无返回事件
*/

export default {
  name: "AdminList",
  props: ["config"],
  data() {
    return {
      baseUrl: this.$route.path,
      fields: [],
      search: { url: this.$route.path, fields: [], searchParams: {} },
      hiddenSearch: {},
      tableActions: [],
      list: { fields: [], rowActions: [], data: [], needSelect: false },
      paging: {
        pageSize: 10,
        totalNum: 0,
        currentPage: 1
      }
    };
  },
  components: {
    TableList,
    ButtonGroup,
    Search,
    Paging
  },
  created() {
    this.fields = "fields" in this.config ? this.config.fields : [];
    this.search.fields =
      "search" in this.config
        ? this.filterSearchFields(this.config.search, this.config.fields)
        : [];
    this.tableActions =
      "tableActions" in this.config ? this.config.tableActions : [];
    this.list.fields = this.fields;
    this.list.rowActions =
      "rowActions" in this.config ? this.config.rowActions : [];
    this.list.needSelect =
      this.tableActions.filter(function(row) {
        return row.location == "select";
      }).length > 0;
    this.paging.pageSize =
      "paging" in this.config && "pageSize" in this.config.paging
        ? this.config.paging["pageSize"]
        : 10;
    this.reloadData();
    this.$emit("showDialog", {
      type: "admin-form",
      fields: [
        {
          name: "id",
          field: "id",
          type: "number",
          primaryKey: true,
          fastEdit: false,
          value: "12"
        },
        {
          name: "姓名",
          field: "username",
          primaryKey: false,
          type: "string",
          fastEdit: true,
          value: "hanhan"
        },
        {
          name: "性别",
          field: "sex",
          type: "select",
          map: { "1": "男", "2": "女" },
          value: "2"
        },
        {
          name: "爱好",
          field: "hobby",
          type: "multiSelect",
          map: { "1": "电影", "2": "看书", "3": "旅行", "4": "烹饪" },
          value: "[2,4]"
        },
        {
          name: "年份",
          field: "year",
          type: "datetime",
          datetime: "year",
          value: "2018"
        }, //datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange
        {
          name: "月份",
          field: "month",
          type: "datetime",
          datetime: "month",
          value: "201807"
        },
        {
          name: "日期",
          field: "date",
          type: "datetime",
          datetime: "date",
          value: "20180706"
        },
        {
          name: "日期时间范围",
          field: "datetimerange",
          type: "datetime",
          datetime: "datetimerange",
          value: ["2018-07-01 00:00:00", "2018-08-01 00:00:00"]
        },
        {
          name: "日期时间",
          field: "datetime",
          type: "datetime",
          datetime: "datetime",
          value: "2018-06-30 10:10:23"
        }
      ],
      url: "controller/add"
    });
  },
  methods: {
    reloadData() {
      var _this = this;
      var loading = Loading.service({
        target: ".list-table",
        text: "加载中……",
        fullscreen: false
      });
      getTotalNum(_this.baseUrl, this.search.searchParams)
        .then(totalNum => {
          _this.paging.totalNum = parseInt(totalNum);
          if (totalNum == 0) {
            return Promise.resolve([]);
          }
          var offset = (_this.paging.currentPage - 1) * _this.paging.pageSize;
          return getList(
            _this.baseUrl,
            this.search.searchParams,
            _this.paging.pageSize,
            offset
          );
        })
        .then(data => {
          _this.list.data = data;
          loading.close();
        });
    },
    searchClick(searchParams) {
      this.search.searchParams = searchParams;
      this.paging.currentPage = 1; // 搜索自动跳回第一页
      this.reloadData();
    },
    actionsClick(action, params) {
      var _this = this;
      var post = {};
      if (params.location == "select") {
        post.ids = this.$refs.table_list.getSelectIds();
      }
      switch (params.type) {
        case "ajax":
          pageUtil
            .fetch(
              params.url,
              post,
              params.confirm,
              params.success,
              params.error
            )
            .then(function() {
              _this.reloadData();
            });
          break;
        case "dialog":
          this.$store.dispatch("showDialog", [{
            type: "admin-form",
            submitType:'dialog',
            fields: [
              { field: "qaId", name: "id", type: "number", primaryKey: true },
              {
                field: "title",
                type: "string",
                length: 30,
                name: "\u540d\u79f0"
              },
              {
                field: "brief",
                type: "string",
                length: 30,
                name: "\u7b80\u4ecb"
              }
            ],
            groups: [],
            primaryKey: "qaId",
            url: ""
          }]).then(()=>{
            // alert('update');
          });
          break;
        case "page":
        default:
          this.$router.push({ path: params.url, params: params.params });
      }
    },
    changePaging(paging) {
      this.paging = paging;
      this.reloadData();
    },
    filterSearchFields(searchFields, allFields) {
      var fields = [];
      allFields.forEach(row => {
        searchFields.forEach((search, index) => {
          if (search.field == row.field) {
            fields[index] = row;
            fields[index]["searchType"] = search.searchType;
          }
        });
      });
      return fields;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container {
  padding: 20px 30px;
}
.list-header {
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: stretch; */
}
.list-search {
  /* flex: 1; */
}
.list-table-actions {
  text-align: right;
  margin-bottom: 14px;
}
</style>
