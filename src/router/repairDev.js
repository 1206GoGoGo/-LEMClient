import repairDev from '@/components/repairDev/list'
import isRepair from '@/components/repairDev/isRepair'

export default [
    {
        path:"/repairDev/list",
        meta:{
            loginRequired:true,
        },
        component:repairDev,
    },
    {
        path:"/repairDev/isRepair",
        meta:{
            loginRequired:true,
        },
        component:isRepair,
        name:'isRepair'
    }


]