## admin-vue

### 概述
该项目为waiterphp-admin项目的前端源码部分。
waiterphp-admin设计的目的，是为了快速开发的后台的基本功能，并保持架构的灵活性，以便实现复杂功能的定制。[了解更多，请点击这里。](https://github.com/waiterphp/admin)
admin-vue中，主要是在最基本vue项目结构的基础上，提供了一些基于config-builder的业务代码，来配合后端实现快速开发。项目本身基于[vue](https://cn.vuejs.org/)和[webpack](http://webpack.github.io/)。并不影响项目本身结构。所以也可以很灵活的定制自己的前端功能。

### 基本结构
项目采用比较常用的结构划分:router(项目路由)、views（页面视图）、components（视图小组件）、api（服务器接口）。
![struct.png](struct.png)

### list 模块
##### 配置

```json
[
    {
        "type":"list",
        "config": {
            "fields":[
                {"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},
                {"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
                {"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}}
            ],
            "search" : [
                {"field":"username", "search":"like"},
                {"field":"sex"}
            ],
            "publicActions":[
                {"name":"添加", "action":"page", "url":"", "isDisabled":false}
            ],
            "itemActions":[
                {"name":"编辑", "action":"page", "url":"", "isDisabled":false},
                {"name":"删除", "action":"ajax", "url":"", "isDisabled":false, "confirm":true},
                {"name":"详情", "action":"page", "url":"", "isDisabled":false}
            ],
            "checkbox":{},
            "paging":{}
        }
    }
]
```

##### getList接口

##### totalNum接口

##### action接口