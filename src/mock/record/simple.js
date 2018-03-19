import Mock from 'mockjs'

const List = [];

// 用paging不用list是因为php里面的list是保留字，函数
export default {
    getConfig:()=>{

    },
    totalNum: (search) =>{
        return 200;
    },
    getData:(search)=>{

    }
}
