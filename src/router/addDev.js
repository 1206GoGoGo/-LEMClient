import addDev from '@/components/addDev/add'
import listDev from '@/components/addDev/list'

export default [
    {
        path:"/addDev/add",
        meta:{
            loginUnRequired:false,
        },
        component:addDev,
    },
    {
        path:"/addDev/list",
        meta:{
            loginUnRequired:false,
        },
        component:listDev,
    }

]