import manageList from '@/components/manageDev/list'
import manageDetail from '@/components/manageDev/detail'


export default [
    {
        path:"/manageDev/list",
        meta:{
            loginRequired:true,
        },
        component: manageList
    },
    {
        path:"/manageDev/detail",
        meta:{
            loginRequired:true,
        },
        component: manageDetail,
        name: 'manageDetail'
    }
]