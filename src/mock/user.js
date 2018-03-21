import Mock from 'mockjs'

//返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {

    login:()=>{},
    loginOut:()=>{

    },
    fetchInfo:()=>{},
    fetchDomains: () =>{
        return {
            data: [
                {"domain":"user", "name":"用户管理", "belong":""},
                {"domain":"account", "name":"用户账号", "belong":"user"},
                {"domain":"record", "name":"数据记录", "belong":""},
                {"domain":"paging", "name":"列表", "belong":"record"},
                {"domain":"form", "name":"列表", "belong":"record"},
            ],
            code: 0,
            msg: 'success'
        };
    },
    fetchDomainPowers:() =>{

    },
    hasPower:()=>{

    }
}
