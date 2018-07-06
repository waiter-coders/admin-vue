import Mock from "mockjs";

const List = [];
const count = 10;
var obj = {
  "id|+1": 1,
  "icon|+1": ["all", "account", "form", "category"],
  path: "@url",
  name:
    "@string(https://shop.vivo.com.cn/product/10390?cid=gw_x_floor02, 3, 9)",
  title: "@ctitle(5, 9)"
};
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      "id|+1": 1,
      "icon|+1": ["all", "account", "form", "category"],
      path: "@url",
      name: '@string("lower", 3, 9)',
      title: "@ctitle(5, 9)",
      subMenus: {
        id: 1,
        icon: "all",
        path: "url",
        name: "asdsd",
        title: "你好吗"
      }
    })
  );
}
//返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {
  getConfigs: (request, response, next) => {
    if (request.url == "//admin/invite/getConfigs") {
      return {
        data: [
          {
            type: "admin-form",
            fields: [
              {
                name: "id",
                field: "id",
                type: "int",
                primaryKey: true,
                fastEdit: false
              },
              {
                name: "姓名",
                field: "username",
                primaryKey: false,
                fastEdit: true
              },
              {
                name: "性别",
                field: "sex",
                type: "enum",
                enum: { "1": "男", "2": "女" }
              },
              {
                name: "爱好",
                field: "hobby",
                type: "multi",
                multi: { "1": "电影", "2": "看书", "3": "旅行", "4": "烹饪" }
              },
              {
                name: "年份",
                field: "year",
                type: "datetime",
                datetime: "year"
              }, //datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange
              {
                name: "月份",
                field: "month",
                type: "datetime",
                datetime: "month"
              },
              {
                name: "日期",
                field: "date",
                type: "datetime",
                datetime: "date"
              },
              {
                name: "日期时间范围",
                field: "datetimerange",
                type: "datetime",
                datetime: "datetimerange"
              },
              {
                name: "日期时间",
                field: "datetime",
                type: "datetime",
                datetime: "datetime"
              },
              { name: "文章内容", field: "article", type: "editor" }
            ],
            url: "controller/add"
          }
        ],
        //data: List,
        code: 0,
        msg: "success"
      };
    }
    if (request.url == '//admin/account/submit/getConfigs') {
      return {
        data: [
          {
            type: "admin-form",
            fields: [
              {
                name: "id",
                field: "id",
                type: "int",
                primaryKey: true,
                fastEdit: false,
                value: "12"
              },
              {
                name: "姓名",
                field: "username",
                primaryKey: false,
                fastEdit: true,
                value: "hanhan"
              },
              {
                name: "性别",
                field: "sex",
                type: "enum",
                enum: { "1": "男", "2": "女" },
                value: "2"
              },
              {
                name: "爱好",
                field: "hobby",
                type: "multi",
                multi: { "1": "电影", "2": "看书", "3": "旅行", "4": "烹饪" },
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
          }
        ],
        //data: List,
        code: 0,
        msg: "success"
      };
    }

    if (request.url == "//admin/account/getConfigs") {
      return {
        code: 0,
        data: [
          {
            type: "admin-list",
            fields: [
              {
                field: "adminId",
                name: "id",
                type: "int",
                unsigned: true,
                primaryKey: true,
                pipeline: "int",
                isVirtual: false
              },
              {
                field: "name",
                type: "varchar",
                length: 50,
                name: "\u59d3\u540d",
                fastEdit: true
              },
              {
                field: "email",
                type: "varchar",
                length: 50,
                name: "\u90ae\u7bb1",
                isShort: 12
              },
              {
                field: "account",
                type: "varchar",
                length: 50,
                name: "\u8d26\u53f7"
              }
            ],
            search: [{ field: "name", searchType: "like" }],
            tableActions: [
              {
                id: "add",
                type: "page",
                isShow: true,
                isDisabled: false,
                url: "/admin/account/submit",
                name: "\u6dfb\u52a0",
                location: "public",
                needSelectIds: false
              },
              {
                id: "batchDelete",
                type: "select",
                isShow: true,
                isDisabled: false,
                url: "/admin/account/deleteByIds",
                name: "batchDelete",
                location: "public",
                needSelectIds: true
              },
              {
                id: "fastAdd",
                type: "dialog",
                isShow: true,
                isDisabled: false,
                url: "/fastAdd",
                name: "\u5feb\u901f\u6dfb\u52a0",
                location: "public",
                needSelectIds: false
              }
            ],
            rowActions: [
              {
                id: "edit",
                type: "page",
                isShow: true,
                isDisabled: false,
								url: "/admin/accunt/submit?@primaryKey=@data.adminId",							
                name: "edit",
								location: "item"
								
              },
              {
                id: "delete",
                type: "ajax",
                isShow: true,
								isDisabled: false,
								confirm:"你确定要删除@data.name?",
                url: "/admin/account/delete?@primaryKey=@data.adminId",
                name: "delete",
								location: "item",
								success:"删除成功"
              }
            ],
            paging: { pageSize: 12 }
          }
        ]
      };
    }

    return {};
  }
};
