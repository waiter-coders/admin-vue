## admin-vue

### 概述
该项目为waiterphp-admin项目的前端源码部分。它使用vue-webpack开发，采用了比较通用的文件结果，主要核心组件有:router(项目路由)、views（页面视图）、components（视图小组件）、api（服务器接口）。

该前端已经编写好一些基础的业务代码，帮助您快速开发后台。代码本身并不影响项目结构，所以，你可以很容易的在此基础上进行二次开发。

### builder视图组件
项目提供了builder视图组件来快速构建常用页面。该视图更像一个解析器，它从服务器加载配置信息，然后根据这些配置信息，依次加载相应的小视图组件。配置信息的大致格式如下：

```javascript
[
    {
        "type":"list",
        // ...
    },
    {
        "type":"form",
        //...
    }
]
```
配置信息采用列表形式，以便页面中同时存在多个组件。对于单个组件，使用type来代表所要使用的小组件名，config为小组件的配置信息，builder视图会把它传递给对应小组件。

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

其中，belong为模块的分类，domain为模块本身。builder组件会通过"belong/domain/getConfig"的接口，获取相应模块的配置信息。可通过在其前面设置新路由的方式覆盖该路由解析。


### list 组件
组件和服务端，有一些约定的数据返回格式，以便相互交互。以下对列表组件做相应的说明。

##### 获取配置信息的接口

调用样例：getConfig()

返回样例：
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
  "tableActions":[
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

##### 获取列表数据的接口
调用样例：getList(search = array(), offset, length)

返回样例：

```javascript
[
  {"name":"名字1", "publishTime":"2017-12-12 00:11:11"},
  {"name":"名字2", "publishTime":"2017-12-12 00:11:11"}
]
```

##### 获取数据总数
调用样例：totalNum(search = array())

返回样例：

```javascript
129
```

##### 执行操作
调用样例：action(action, ids, data = array())

返回样例：

```javascript
true
```


### form 组件
返回样例：
``` javascript
{
  "fields":[
      {"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},
      {"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
      {"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}}
  ],
}
```
