## admin-vue

### 概述
该项目为waiterphp-admin项目的前端源码部分。项目使用vue-webpack基本项目结构。提供一些基础的业务代码，来实现后台的快速开发。基础代码并不影响项目本身的结构，故可在此基础上很灵活的实现二次开发。

### 基本结构
项目采用比较常用的结构划分，主要核心组件有:router(项目路由)、views（页面视图）、components（视图小组件）、api（服务器接口）。

### builder视图组件
项目采用builder视图组件提供快速构建常用页面的能力。它更像一个解析器，从服务器加载相关的配置信息，然后根据配置信息，加载不同的视图小组件，完成渲染任务。以列表页为例，视图从远程加载到列表页如下的配置文件：

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
配置文件采用列表形式，以便页面中同时存在多个组件。
本样例第一个组件为list（type :list），第二个参数config为list组件的配置信息。builder组件会把config的内容传递给list组件，让它进一步进行自己的渲染工作。
类似，form（表单）、statistics（统计）等组件，也采用类似机制。


##### getList接口

##### totalNum接口

##### action接口

##### builder的路由方案
