import scrapDev from '@/components/scrapDev/list'
import isScrap from '@/components/scrapDev/isScrap'

export default [
    {
        path:"/scrapDev/list",
        meta:{
            loginRequired:true,
        },
        component:scrapDev,
        name:'scrapDev'
    },
    {
        path:"/scrapDev/isScrap",
        meta:{
            loginRequired:true,
        },
        component:isScrap,
        name:'isScrap'
    }


]