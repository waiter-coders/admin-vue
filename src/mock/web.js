import Mock from 'mockjs'

//返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {

    getConfig:()=>{
        return {
            data: [
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
            ],
            code: 0,
            msg: 'success'
        };
    }
}
