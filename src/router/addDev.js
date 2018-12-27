import addDev from '@/components/addDev/add'
import listDev from '@/components/addDev/list'

export default [
    {
        path:"/addDev/add",
        meta:{
            loginRequired:true,
        },
        component:addDev,
    },
    {
        path:"/addDev/list",
        meta:{
            loginRequired:true,
        },
        component:listDev,
    }

]