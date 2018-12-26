import repairDev from '@/components/repairDev/list'
import isRepair from '@/components/repairDev/isRepair'

export default [
    {
        path:"/repairDev/list",
        meta:{
            loginUnRequired:false,
        },
        component:repairDev,
    },
    {
        path:"/repairDev/isRepair",
        meta:{
            loginUnRequired:false,
        },
        component:isRepair,
        name:'isRepair'
    }


]