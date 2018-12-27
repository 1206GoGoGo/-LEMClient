import repaiMoney from '@/components/repaiInfor/repaiMoney'
import scrapMoney from '@/components/repaiInfor/scrapMoney'

export default [
    {
        path:"/repaiInfor/repaiMoney",
        meta:{
            loginRequired:true,
        },
        component:repaiMoney,
    },
    {
        path:"/repaiInfor/scrapMoney",
        meta:{
            loginRequired:true,
        },
        component:scrapMoney,
    }

]