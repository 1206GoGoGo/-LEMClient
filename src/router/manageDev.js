import manageList from '@/components/manageDev/list'
import manageDetail from '@/components/manageDev/detail'


export default [
    {
        path:"/manageDev/list",
        meta:{
            loginUnRequired:false,
        },
        component: manageList
    },
    {
        path:"/manageDev/detail",
        meta:{
            loginUnRequired:false,
        },
        component: manageDetail,
        name: 'manageDetail'
    }
]