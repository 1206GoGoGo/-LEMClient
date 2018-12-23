import repairDev from '@/components/repairDev/list'
import isRepair from '@/components/repairDev/isRepair'

export default [
    {
        path:"/repairDev/list",
        component:repairDev,
    },
    {
        path:"/repairDev/isRepair",
        component:isRepair,
        name:'isRepair'
    }


]