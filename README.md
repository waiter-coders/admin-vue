## admin-vue

### 概述
该项目为waiterphp-admin项目的前端源码部分。它使用vue-webpack开发，采用了比较通用的文件架构划分，主要核心组件有:router(项目路由)、views（页面视图）、components（视图小组件）、api（服务器接口）。

该前端已经编写好一些基础的业务代码，帮助您快速开发后台。代码本身并不影响项目结构，所以，你可以在此基础上比较灵活的进行自己的开发工作。
，
### builder视图组件
项目提供了builder视图组件来快速构建常用页面。该视图更像一个解析器，它从服务器加载配置信息，然后根据这些配置信息，依次加载相应的小视图组件。配置信息的大致格式如下：

```json
[
    {
        "type":"list",
        "config": {
        }
    }
]
```
配置信息采用列表形式，以便页面中同时存在多个组件。

本样例第一个组件为list（type :list），第二个参数config为list组件的配置信息。builder组件会把config的内容传递给list组件，让它进一步进行自己的渲染工作。

form（表单）、statistics（统计）等组件，也采用类似机制。builder视图即通过配置信息，路由解析到不同的小组件上，依次渲染，得到最终结果。

##### builder的路由方案
builder视图做为一个比较特殊的视图，在路由文件中采用如下配置：

```javascript
[
    // 公共构建器
    {
        "path": "/:belong/:domain/show",
        "name": "builder",
        "title": "构建器",
        "component": Builder,
        "props":true
    },
]

```

其中，belong为模块的分类，domain为模块本身。builder组件会通过"belong/domain/getConfig"的接口，获取相应模块配置信息。自定义开发中，也可把自定义路由放置在其前面，以便应用自定义路由。


### list 组件
组件和服务端，有一些约定的配置信息格式，和接口定义。以便相互交互。以下对列表组件做相应的说明。

##### list组件的配置信息
``` javascript
{
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
```

##### list组件的获取数据的接口


##### getList接口

##### totalNum接口

##### action接口


