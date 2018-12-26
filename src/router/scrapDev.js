import scrapDev from '@/components/scrapDev/list'
import isScrap from '@/components/scrapDev/isScrap'

export default [
    {
        path:"/scrapDev/list",
        meta:{
            loginUnRequired:false,
        },
        component:scrapDev,
        name:'scrapDev'
    },
    {
        path:"/scrapDev/isScrap",
        meta:{
            loginUnRequired:false,
        },
        component:isScrap,
        name:'isScrap'
    }


]