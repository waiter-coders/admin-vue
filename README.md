## admin-vue

### 概述
该项目为waiterphp-admin项目的前端源码部分。
waiterphp-admin设计的目的，是为了快速开发的后台的基本功能，并保持架构的灵活性，以便实现复杂功能的定制。[了解更多，请点击这里。](https://github.com/waiterphp/admin)
admin-vue中，主要是在最基本vue项目结构的基础上，提供了一些基于config-builder的业务代码，来配合后端实现快速开发。项目本身基于[vue](https://cn.vuejs.org/)和[webpack](http://webpack.github.io/)。并不影响项目本身结构。所以也可以很灵活的定制自己的前端功能。

### 基本结构
项目采用比较常用的结构划分:router(项目路由)、views（页面视图）、components（视图小组件）、api（服务器接口）。
![struct.png](struct.png)

