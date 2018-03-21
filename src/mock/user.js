import Mock from 'mockjs'

export default {
    login:()=>{},
    loginOut:()=>{},
    fetchInfo:()=>{},
    fetchDomains: () =>{
        return {
            data: [
                {"key":"user", "name":"用户管理", "domain":""},
                {"key":"account", "name":"用户账号", "domain":"user"},
                {"key":"record", "name":"数据记录", "domain":""},
                {"key":"list", "name":"列表", "domain":"record"},
                {"key":"form", "name":"列表", "domain":"record"},
            ],
            code: 0,
            msg: 'success'
        };
    },
    fetchDomainPowers:(domain)=>{

    },
    hasPower:(domain, action)=>{

    },
}
